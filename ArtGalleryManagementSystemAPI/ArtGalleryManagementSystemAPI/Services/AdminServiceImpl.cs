using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class AdminServiceImpl : AdminService
{
    private DatabaseContext db;
    private IMapper mapper;
    public AdminServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public bool ChangeRole(UserDto userDto)
    {
        var user = mapper.Map<User>(userDto);
        db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public bool CreateUserSeller(UserDto userdto)
    {
        try
        {
            var user = mapper.Map<User>(userdto);
            db.Users.Add(user);

            if (db.SaveChanges() > 0)
            {
                if (user.Role == 2)
                {
                    var seller = new Seller();
                    seller.Id = user.Id;
                    seller.Income = 0;
                    seller.CreatedAt = user.CreatedAt;
                    db.Sellers.Add(seller);
                }
                var cart = new Cart();
                cart.Id = user.Id;
                cart.Total = 0;
                cart.CreatedAt = user.CreatedAt;
                db.Carts.Add(cart);
            }
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool Delete(UserDto userDto)
    {
        var user = mapper.Map<User>(userDto);
        db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public List<UserDto> FindAllSeller()
    {
        return mapper.Map<List<UserDto>>(db.Users.Where(u => u.Role == 2).ToList());
    }

    public List<UserDto> FindAllUser()
    {
        return mapper.Map<List<UserDto>>(db.Users.Where(u => u.Role == 1).ToList());
    }
}
