
using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Helpers;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/home")]
public class HomeController : Controller
{
    private ProductService productService;
    private IWebHostEnvironment webHostEnvironment;
    private CartService cartService;
    public HomeController(ProductService _productService, IWebHostEnvironment _webHostEnvironment, CartService _cartService)
    {
        productService = _productService;
        webHostEnvironment = _webHostEnvironment;
        cartService = _cartService;
    }

    [Produces("application/json")]
    [HttpGet("findallproduct")]
    public IActionResult FindAllProduct()
    {

        try
        {
            return Ok(productService.FindAll());
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallcategory")]
    public IActionResult FindAllCategory()
    {

        try
        {
            return Ok(productService.FindAllCategory());
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findbycategoryid/{id}")]
    public IActionResult FindByCategoryid(int id)
    {

        try
        {
            return Ok(productService.FindByCategoryId(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallproductwithseller")]
    public IActionResult FindAllProductWithSeller()
    {

        try
        {
            return Ok(productService.AllProductWithSeller());
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findproductbyid/{id}")]
    public IActionResult FindProductById(int id)
    {

        try
        {
            return Ok(productService.FindById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallbyseller/{id}")]
    public IActionResult FindProductBySellerId(int id)
    {

        try
        {
            return Ok(productService.FindBySellerId(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findproductbyidwithseller/{id}")]
    public IActionResult FindProductByIdWithSeller(int id)
    {

        try
        {
            return Ok(new
            {
                result = productService.FindByIdWithSeller(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findproductbyidwithattributes/{id}")]
    public IActionResult findproductbyidwithattributes(int id)
    {

        try
        {
            return Ok(productService.FindByIdWithAttributes(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("sortbyprice")]
    public IActionResult SortByPrice([FromBody] PriceRangeDto values)
    {

        try
        {
            return Ok(productService.SortByPrice(values.min, values.max));

        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("sortbypricelowhigh")]
    public IActionResult SortByPriceLowHigh([FromBody] PriceRangeDto values)
    {

        try
        {
            return Ok(productService.SortByPriceLowHigh(values.value, values.min, values.max));

        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("searchbykeyword/{value}")]
    public IActionResult SearchByKeyword(string value)
    {

        try
        {
            if (value != "" || value != null)
            {
                return Ok(productService.SearchByKeyword(value.ToLower()));

            }
            else
            {
                return Ok(productService.AllProductWithSeller());

            }

        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("createrart")]
    public IActionResult CreateArt(IFormFile image, string productInfo, string attributeInfo)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });
        var productAttributeDto = JsonConvert.DeserializeObject<List<ProductAttributeDto>>(attributeInfo);
        var productDto = JsonConvert.DeserializeObject<ProductWithAttributesDto>(productInfo);
        if (image != null && image.Length > 0)
        {
            var newFileName = FileHelper.generateFileName(image.FileName);
            var path = Path.Combine(webHostEnvironment.WebRootPath, "images", newFileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
            productDto.Image = newFileName;
        }
        else
        {
            productDto.Image = "noimg.jpg";

        }
        productDto.ProductAttributes = productAttributeDto;
        try
        {

            return Ok(new
            {
                result = productService.PostArt(productDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("editart")]
    public IActionResult Editart(IFormFile image, string productInfo, string attributeInfo)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });
        var productAttributeDto = JsonConvert.DeserializeObject<List<ProductAttributeDto>>(attributeInfo);
        var productDto = JsonConvert.DeserializeObject<ProductWithAttributesDto>(productInfo);
        var imagePro = productService.FindById(productDto.Id);

        if (image != null && image.Length > 0)
        {
            var newFileName = FileHelper.generateFileName(image.FileName);
            var path = Path.Combine(webHostEnvironment.WebRootPath, "images", newFileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
            productDto.Image = newFileName;
        }
        else
        {
            productDto.Image = imagePro.Image;

        }
        productDto.ProductAttributes = productAttributeDto;
        try
        {

            return Ok(new
            {
                result = productService.EditArt(productDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("addreview")]
    public IActionResult Addreview(string reviewinfor)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy HH:mm:ss" });
        var reviewDto = JsonConvert.DeserializeObject<ReviewDto>(reviewinfor);
        try
        {

            return Ok(new
            {
                result = productService.AddReview(reviewDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("application/json")]
    [Produces("application/json")]
    [HttpPost("findreviewbyproid")]
    public IActionResult Findreviewbyproid([FromBody] ReviewedDto values)
    {
        try
        {

            return Ok(new
            {
                result = productService.FindReviewByProId(values.proId, values.userId, values.createdAt)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findreviewbyuserid/{userId}")]
    public IActionResult Findreviewbyuserid(int userId)
    {
        try
        {

            return Ok(new
            {
                result = productService.FindReviewByUserId(userId)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallauctionproductwithseller")]
    public IActionResult FindAllAuctionProductWithSeller()
    {

        try
        {
            return Ok(productService.AllAuctionProductWithSeller());
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findallreview")]
    public IActionResult Findallreview()
    {
        try
        {


            return Ok(new
            {
                result = productService.FindAllReview()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallreviewbyproid/{proId}")]
    public IActionResult Findallreviewbyproid(int proId)
    {
        try
        {

            return Ok(new
            {
                result = productService.FindAllReviewByProId(proId)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("delete")]
    public IActionResult delete(string deleteAt)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter()
            {
                DateTimeFormat = "dd-MM-yyyy"
            });
            var productDto = JsonConvert.DeserializeObject<ProductDto>(deleteAt);


            return Ok(new
            {
                Result = productService.Delete(productDto)
            });
        }
        catch
        {
            return BadRequest();
        }

    }
}

