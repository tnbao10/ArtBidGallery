using ArtGalleryManagementSystemAPI.Dtos;
using PayPal.Api;

namespace ArtGalleryManagementSystemAPI.Services;

public class PayPalServiceImpl : PayPalService
{
    private IConfiguration configuration;
    public PayPalServiceImpl(IConfiguration _configuration)
    {
        configuration = _configuration;
    }
    public Payment CreatePayment(IEnumerable<ItemDto> items, string base_url)
    {
        double subtotal = 0;

        double shipping = 0;
        var itemList = new ItemList
        {
            items = items.Select(x =>
            {
                subtotal += (double)(x.Price * x.Quantity);
                return new Item
                {
                    name = x.Name,
                    currency = "USD",
                    price = x.Price.ToString(),
                    quantity = x.Quantity.ToString()
                };
            }).ToList()
        };
        double tax = subtotal * 10 / 100;
        var transaction = new List<Transaction> {
            new()
            {
                description = "Shopping Cart purchase",
                item_list =itemList,
                amount = new()
                {
                    currency = "USD",
                    details = new()
                    {
                        shipping = shipping.ToString(),
                        tax = tax.ToString(),
                        subtotal = subtotal.ToString()
                    },
                    total = (shipping + tax + subtotal).ToString()
                }
            }
        };


        var payment = new Payment
        {
            intent = "sale",
            payer = new Payer { payment_method = "paypal" },
            transactions = transaction,
            redirect_urls = new()
            {
                cancel_url = "/",
                return_url = $"/{base_url}/executepayment"
            }

        };
        return payment.Create(GetContext());
    }

    public Payment ExecutePayment(ExecutePaymentDto paymentDto)
    {
        var paymentExecution = new PaymentExecution { payer_id = paymentDto.PayerId };
        var payment = new Payment { id = paymentDto.PaymentId };
        return payment.Execute(GetContext(), paymentExecution);
    }
    private APIContext GetContext() =>
        new(GetAccessToken())
        {
            Config = GetConfig(),
        };

    private string GetAccessToken() => new OAuthTokenCredential(GetConfig()).GetAccessToken();

    private Dictionary<string, string> GetConfig() =>
        new()
        {
            { "mode", configuration["PayPal:Mode"]},
            { "clientId", configuration["PayPal:ClientId"]},
            { "clientSecret", configuration["PayPal:ClientSecret"]},

        };

}
