using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class AddressServiceImpl : AddressService
{
    private DatabaseContext db;
    private IMapper mapper;
    public AddressServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public bool AddAddress(AddressDto addressDto)
    {
        var address = mapper.Map<Address>(addressDto);
        db.Addresses.Add(address);
        return db.SaveChanges() > 0;
    }

    public bool EditAddress(AddressDto addressDto)
    {
        var address = mapper.Map<Address>(addressDto);
        db.Entry(address).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public AddressDto FindAddressById(int id)
    {
        return mapper.Map<AddressDto>(db.Addresses.Find(id));
    }

    public List<AddressDto> FindAllAddress(int userId)
    {
        return mapper.Map<List<AddressDto>>(db.Addresses.Where(a => a.UserId == userId).ToList());
    }

    public List<ProvinceDto> FindAllProvince()
    {
        return mapper.Map<List<ProvinceDto>>(db.Provinces.ToList());

    }

    public List<DistrictDto> FindDistrictByProvinceCode(string provinceCode)
    {
        return mapper.Map<List<DistrictDto>>(db.Districts.Where(u => u.ProvinceCode == provinceCode));

    }

    public List<WardDto> FindWardByDistrictCode(string districtCode)
    {
        return mapper.Map<List<WardDto>>(db.Wards.Where(u => u.DistrictCode == districtCode));
    }
}
