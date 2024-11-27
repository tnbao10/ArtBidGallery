using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface UserService
{
    public bool Register(UserDto userdto);
    public bool SiginGG(UserDto userdto);
    public UserDto FindByEmail(string email);
    public bool Login(UserDto userdto);
    public List<UserDto> FindAll();
    public UserDto FindById(int id);
    public bool EditProfile(UserDto userDto);
    public bool AddAddress(AddressDto addressdto);
    public bool UpdateAddress(AddressDto addressdto);
    public bool ResetPassword(UserDto userDto);
    public bool SendMail(UserDto userDto);
}
