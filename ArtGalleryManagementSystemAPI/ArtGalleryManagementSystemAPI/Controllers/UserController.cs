using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Helpers;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Security.Cryptography;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/user")]
public class UserController : Controller
{
    private UserService userService;
    private IWebHostEnvironment webHostEnvironment;
    private IConfiguration configuration;

    public UserController(UserService _userService, IWebHostEnvironment _webHostEnvironment, IConfiguration _configuration)
    {
        userService = _userService;
        webHostEnvironment = _webHostEnvironment;
        configuration = _configuration;
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("siginwithgg")]
    public IActionResult SiginWithGG(string usergg)
    {
        //var newFilename = "noimg.jpg";
        //if (avt != null && avt.Length > 0)
        //{
        //    newFilename = FileHelper.generateFileName(avt.FileName);
        //    var path = Path.Combine(webHostEnvironment.WebRootPath, "images", newFilename);
        //    using (var fileStream = new FileStream(path, FileMode.Create))
        //    {
        //        avt.CopyTo(fileStream);
        //    }
        //}
        //convert JSon to productDTO
        var userDTO = JsonConvert.DeserializeObject<UserDto>(usergg);
        //userDTO.Avatar = newFilename;
        try
        {

            return Ok(new
            {
                result = userService.SiginGG(userDTO)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("register")]
    public IActionResult Register(string userinfo)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });

        var userDto = JsonConvert.DeserializeObject<UserDto>(userinfo);
        userDto.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        try
        {

            return Ok(new
            {
                result = userService.Register(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findbyid/{id}")]
    public IActionResult FindById(int id)
    {
        try
        {

            return Ok(new
            {
                result = userService.FindById(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findall")]
    public IActionResult FindAll()
    {
        try
        {

            return Ok(new
            {
                result = userService.FindAll()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findbyemail/{email}")]
    public IActionResult FindByEmail(string email)
    {
        try
        {

            return Ok(new
            {
                result = userService.FindByEmail(email)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPost("login")]
    public IActionResult Login([FromBody] UserDto userDto)
    {
        try
        {


            return Ok(new
            {
                result = userService.Login(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("editprofile")]
    public IActionResult updateDto(IFormFile avatar, string profile)
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

            if (avatar != null && avatar.Length > 0)
            {
                var newFileName = FileHelper.generateFileName(avatar.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", newFileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    avatar.CopyTo(fileStream);
                }
                userDto.Avatar = newFileName;
            }
            //convert JSon to productDTO


            return Ok(new
            {
                Result = userService.EditProfile(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPost("send-reset-mail")]
    public IActionResult SendMail([FromBody] UserDto userDto)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy HH:mm:ss" });
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            userDto.ResetPasswordToken = emailToken;
            userDto.ResetPasswordExpiry = DateTime.Now.AddMinutes(15).ToString("dd-MM-yyyy HH:mm:ss");
            userService.SendMail(userDto);
            var mailHelper = new MailHelper(configuration);
            mailHelper.Send("artgallerykbktm@gmail.com", userDto.Email, "Reset Password!!!!", EmailBody.EmailStringBody(userDto.Email, emailToken));
            return Ok();
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("reset-password")]
    public IActionResult ResetPass(string resetinfo)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy HH:mm:ss" });

            var userDto = JsonConvert.DeserializeObject<UserDto>(resetinfo);
            return Ok(new
            {
                Result = userService.ResetPassword(userDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
