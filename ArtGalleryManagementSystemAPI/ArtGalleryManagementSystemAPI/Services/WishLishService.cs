using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface WishLishService
{
    public List<WishListDto> FindByName(string name);
    public bool AddProductToWishList(WishListDto wishListDto);

    public List<WishListDto> FindAllWishListItem(int id);
    public bool DeleteItem(int id);
    public bool DeleteAllItem(string name);
}
