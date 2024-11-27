using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/cart")]
public class CartController : Controller
{
    private CartService cartService;
    private UserService userService;
    private PayPalService payPalService;
    public CartController(CartService _cartService, UserService _userService, PayPalService _payPalService)
    {
        cartService = _cartService;
        userService = _userService;
        payPalService = _payPalService;
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("addtocart")]
    public IActionResult AddToCart([FromBody] CartItemDto cartItemDto)
    {

        var itemsInCart = cartService.FindAllCartItem((int)cartItemDto.CartId);
        foreach (var item in itemsInCart)
        {
            if (item.ProductId == cartItemDto.ProductId)
            {
                return Ok(new
                {
                    result = cartService.UpdateProductInCart(cartItemDto)
                });
            }
        }
        try
        {
            return Ok(new
            {
                result = cartService.AddProductToCart(cartItemDto)
            });

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("innercart/{id}")]
    public IActionResult UserCart(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.FindAllCartItem(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findcartbyproductid/{id}")]
    public IActionResult FindCartByProductId(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.FindByProId(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("application/json")]

    [HttpDelete("deleteitem/{id}")]
    public IActionResult DeleteItem(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.DeleteItem(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("application/json")]

    [HttpDelete("deleteallitem/{cartId}")]
    public IActionResult DeleteAll(int cartId)
    {
        try
        {
            return Ok(new
            {
                result = cartService.DeleteAllItem(cartId)
            });

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPost("createorder")]
    public IActionResult CreateOrder(string invoicelist, string order)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter()
        {
            DateTimeFormat = "dd-MM-yyyy HH:mm:ss"
        });
        var invoicelistDto = JsonConvert.DeserializeObject<List<OrderItemDto>>(invoicelist);
        var orderDto = JsonConvert.DeserializeObject<OrderDetailDto>(order);
        try
        {
            return Ok(new
            {
                result = cartService.CreateOrder(orderDto, invoicelistDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPost("createpayment")]
    public IActionResult CreatePayment([FromBody] IEnumerable<ItemDto> items, HttpContext context)
    {
        var base_url = context.Request.Host.Value;
        try
        {
            return Ok(new
            {
                result = payPalService.CreatePayment(items, base_url)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpGet("findallorder/{id}")]
    public IActionResult FindAllorder(int id)
    {
        try
        {
            return Ok(new
            {
                result = cartService.FindAllOrder(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

}
