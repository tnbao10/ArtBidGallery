using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/wishlist")]
public class WishListController : Controller
{
    private WishLishService wishLishService;
    private UserService userService;
    public WishListController(WishLishService _wishLishService, UserService _userService)
    {
        wishLishService = _wishLishService;
        userService = _userService;
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("addtowishlist")]
    public IActionResult AddToWishList(string wishListInfo)
    {
        var wishlistDto = JsonConvert.DeserializeObject<WishListDto>(wishListInfo);

        try
        {
            return Ok(new
            {
                result = wishLishService.AddProductToWishList(wishlistDto)
            });

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findallwishlist/{userId}")]
    public IActionResult FindAll(int userId)
    {
        try
        {
            return Ok(new
            {
                result = wishLishService.FindAllWishListItem(userId)
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
                result = wishLishService.DeleteItem(id)
            });

        }
        catch
        {
            return BadRequest();
        }
    }
    //[Produces("application/json")]
    //[Consumes("application/json")]

    //[HttpDelete("deleteallitem/{cartId}")]
    //public IActionResult DeleteAll(int cartId)
    //{
    //    try
    //    {
    //        return Ok(new
    //        {
    //            result = cartService.DeleteAllItem(cartId)
    //        });

    //    }
    //    catch
    //    {
    //        return BadRequest();
    //    }
    //}
}
