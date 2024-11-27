using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class WishListServiceImpl : WishLishService
{
    private DatabaseContext db;
    private IMapper mapper;
    public WishListServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }
    public bool AddProductToWishList(WishListDto wishListItemDto)
    {
        var wishList = mapper.Map<Wishlist>(wishListItemDto);
        db.Wishlists.Add(wishList);
        return db.SaveChanges() > 0;
    }

    public bool DeleteAllItem(string name)
    {
        var item = db.Wishlists.Where(c => c.Name == name).ToList();
        db.Wishlists.RemoveRange(item);
        return db.SaveChanges() > 0;
    }

    public bool DeleteItem(int id)
    {
        var item = db.Wishlists.Find(id);
        db.Wishlists.Remove(item);
        return db.SaveChanges() > 0;
    }

    public List<WishListDto> FindAllWishListItem(int id)
    {
        return mapper.Map<List<WishListDto>>(db.Wishlists.Where(c => c.UserId == id).ToList());
    }

    public List<WishListDto> FindByName(string name)
    {
        return mapper.Map<List<WishListDto>>(db.Wishlists.Where(c => c.Name == name).ToList());
    }
}
