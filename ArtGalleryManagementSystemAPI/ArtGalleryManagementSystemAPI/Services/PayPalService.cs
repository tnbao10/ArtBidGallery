using ArtGalleryManagementSystemAPI.Dtos;
using PayPal.Api;

namespace ArtGalleryManagementSystemAPI.Services;

public interface PayPalService
{
    public Payment CreatePayment(IEnumerable<ItemDto> items, string base_url);
    public Payment ExecutePayment(ExecutePaymentDto paymentDto);
}
