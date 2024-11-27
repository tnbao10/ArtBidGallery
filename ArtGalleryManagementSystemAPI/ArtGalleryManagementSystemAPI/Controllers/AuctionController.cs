using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Helpers;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Text;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/auction")]
public class AuctionController : Controller
{
    private UserService userService;
    private IWebHostEnvironment webHostEnvironment;
    private IConfiguration configuration;
    private AuctionService auctionService;
    private ProductService productService;

    public AuctionController(UserService _userService, IWebHostEnvironment _webHostEnvironment, IConfiguration _configuration, AuctionService _auctionService, ProductService _productService)
    {
        userService = _userService;
        webHostEnvironment = _webHostEnvironment;
        configuration = _configuration;
        auctionService = _auctionService;
        productService = _productService;
    }

    [Produces("application/json")]
    [HttpPut("rejectauction/{id}")]
    public IActionResult rejectAuction(int id)
    {
        try
        {
            if (auctionService.RejectAuction(id))
            {
                var product = productService.FindByIdWithSeller(id);
                var user = userService.FindById((int)product.SellerId);
                var mailHelper = new MailHelper(configuration);
                mailHelper.Send("artgallerykbktm@gmail.com", user.Email, $"Your Product Submission - {product.Name} - Rejected", RejectEmail.EmailStringBody(product, user));
                return Ok(new
                {
                    Result = true
                });
            }
            else
            {
                return BadRequest();

            }
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [HttpPost("auctiontoproduct/{id}")]
    public IActionResult auctionToProduct(int id)
    {
        try
        {

            return Ok(new
            {
                Result = auctionService.AuctionToProduct(id)
            });
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [HttpPost("auctiontoproductcancle/{id}")]
    public IActionResult auctionToProductCancle(int id)
    {
        try
        {
            return Ok(new
            {
                Result = auctionService.AuctionToProductCancle(id)
            });
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPost("addbidorder")]
    public IActionResult addBidOrder(string bidinfo, string bidlist)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy hh:mm:ss" });

        var bidList = JsonConvert.DeserializeObject<List<ProductWithSellerDto>>(bidlist);
        var bidInfo = JsonConvert.DeserializeObject<BidOrderDto>(bidinfo);
        //var Date = TimeOnly.FromDateTime(DateTime.ParseExact(bidInfo.IncrementInTime, "HH:mm:ss", CultureInfo.InvariantCulture));
        try
        {
            return Ok(new
            {
                Result = auctionService.AddBidOrder(bidList, bidInfo)
            });
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [HttpGet("findallauction")]
    public IActionResult FindAllAuction()
    {
        try
        {
            return Ok(auctionService.FindAllValidAuction());
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [HttpGet("findauctionbyid/{id}")]
    public IActionResult FindAuctionById(int id)
    {
        try
        {
            return Ok(auctionService.FindAuctionById(id));
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPost("createbidorderuser")]
    public IActionResult CreateBidOrderUser([FromBody] BidOrderUserDto bidoreruserdto)
    {
        try
        {
            return Ok(new
            {
                result = auctionService.AddBidOrderUser(bidoreruserdto)
            });

        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [HttpGet("findallbidorderuserbyid/{id}")]
    public IActionResult FindAllBidOrderUserById(int id)
    {
        try
        {
            return Ok(auctionService.FindAllBidOrderUserById(id));
        }
        catch
        {
            return BadRequest();
        }

    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPost("updatebidorder")]
    public IActionResult UpdateBidOrder([FromBody] BidOrderDto2 bidOrderDto)
    {
        var bidorderdto = new BidOrderDto();
        bidorderdto.Id = int.Parse(bidOrderDto.Id);
        bidorderdto.BidStamp = Encoding.UTF8.GetBytes(bidOrderDto.BidStamp);
        try
        {
            return Ok(auctionService.UpdateBidOrder(bidorderdto));
        }
        catch
        {
            return BadRequest();
        }

    }
}
