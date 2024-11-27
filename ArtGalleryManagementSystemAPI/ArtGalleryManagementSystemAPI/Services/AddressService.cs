using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface AddressService
{
    public List<AddressDto> FindAllAddress(int userId);
    public AddressDto FindAddressById(int id);
    public List<ProvinceDto> FindAllProvince();

    public List<DistrictDto> FindDistrictByProvinceCode(string provinceCode);
    public List<WardDto> FindWardByDistrictCode(string districtCode);
    public bool AddAddress(AddressDto addressDto);
    public bool EditAddress(AddressDto addressDto);
}
