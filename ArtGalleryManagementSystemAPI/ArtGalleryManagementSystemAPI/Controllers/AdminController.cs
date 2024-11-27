using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/admin")]
public class AdminController : Controller
{
    private AdminService adminService;
    private IWebHostEnvironment webHostEnvironment;
    public AdminController(AdminService _adminService, IWebHostEnvironment _webHostEnvironment)
    {
        adminService = _adminService;
        webHostEnvironment = _webHostEnvironment;

    }
    [Produces("application/json")]
    [HttpGet("findalluser")]
    public IActionResult FindAll()
    {
        try
        {

            return Ok(new
            {
                result = adminService.FindAllUser()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findallseller")]
    public IActionResult FindAllseller()
    {
        try
        {

            return Ok(new
            {
                result = adminService.FindAllSeller()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("createuserseller")]
    public IActionResult Create(string usersellerinfo)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });

        var userDto = JsonConvert.DeserializeObject<UserDto>(usersellerinfo);
        userDto.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        try
        {

            return Ok(new
            {
                result = adminService.CreateUserSeller(userDto)
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
            var userDto = JsonConvert.DeserializeObject<UserDto>(deleteAt);


            return Ok(new
            {
                Result = adminService.Delete(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }

    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("changerole")]
    public IActionResult updateDto(string profile)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter()
            {
                DateTimeFormat = "dd-MM-yyyy"
            });
            var userDto = JsonConvert.DeserializeObject<UserDto>(profile);
            //if (!userDto.Avatar.StartsWith("https"))
            //{
            //    Uri uri = new Uri(userDto.Avatar);
            //    userDto.Avatar = Path.GetFullPath(uri.AbsolutePath);
            //}

            //convert JSon to productDTO


            return Ok(new
            {
                Result = adminService.ChangeRole(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
