using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArtGalleryManagementSystemAPI.Controllers;
[Route("api/address")]
public class AddressController : Controller
{
    private AddressService addressService;
    private IWebHostEnvironment webHostEnvironment;
    public AddressController(AddressService _addressService, IWebHostEnvironment _webHostEnvironment)
    {
        addressService = _addressService;
        webHostEnvironment = _webHostEnvironment;

    }
    [Produces("application/json")]
    [HttpGet("findalladdress/{userId}")]
    public IActionResult FindAlladdress(int userId)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindAllAddress(userId)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findaddressbyid/{id}")]
    public IActionResult FindaddressbyId(int id)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindAddressById(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("addAddress")]
    public IActionResult Addaddress(string addressInfor)
    {
        try
        {
            var addressDto = JsonConvert.DeserializeObject<AddressDto>(addressInfor);

            return Ok(new
            {
                result = addressService.AddAddress(addressDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [Consumes("multipart/form-data")]
    [HttpPut("editaddress")]
    public IActionResult updateDto(string addressProfile)
    {
        try
        {
            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter()
            {
                DateTimeFormat = "dd-MM-yyyy"
            });
            var addressDto = JsonConvert.DeserializeObject<AddressDto>(addressProfile);


            return Ok(new
            {
                Result = addressService.EditAddress(addressDto)
            });
        }
        catch
        {
            return BadRequest();
        }

    }
    [Produces("application/json")]
    [HttpGet("findallprovince")]
    public IActionResult FindAll()
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindAllProvince()
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("finddistrictbyprovincecode/{provinceCode}")]
    public IActionResult FindDistrictByProvincecode(string provinceCode)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindDistrictByProvinceCode(provinceCode)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [Produces("application/json")]
    [HttpGet("findwardbydistrictcode/{districtCode}")]
    public IActionResult FindWardByDistrictcode(string districtCode)
    {
        try
        {

            return Ok(new
            {
                result = addressService.FindWardByDistrictCode(districtCode)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
