using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface AdminService
{
    public List<UserDto> FindAllUser();
    public List<UserDto> FindAllSeller();
    public bool CreateUserSeller(UserDto userDto);
    public bool Delete(UserDto userDto);
    public bool ChangeRole(UserDto userDto);
}
