using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class UserServiceImpl : UserService
{
    private DatabaseContext db;
    private IMapper mapper;
    public UserServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<UserDto> FindAll()
    {
        return mapper.Map<List<UserDto>>(db.Users).ToList();
    }

    public UserDto FindByEmail(string email)
    {
        return mapper.Map<UserDto>(db.Users.SingleOrDefault(u => u.Email == email));
    }

    public UserDto FindById(int id)
    {
        return mapper.Map<UserDto>(db.Users.Find(id));
    }

    public bool Register(UserDto userdto)
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
    public bool Login(UserDto userdto)
    {
        var account = mapper.Map<UserDto>(db.Users.SingleOrDefault(u => u.Email == userdto.Email));
        if (account != null)
        {
            return BCrypt.Net.BCrypt.Verify(userdto.Password, account.Password);
        }
        return false;
    }

    public bool SiginGG(UserDto userdto)
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

    public bool AddAddress(AddressDto addressdto)
    {
        var address = mapper.Map<Address>(addressdto);
        db.Addresses.Add(address);
        return db.SaveChanges() > 0;
    }

    public bool EditProfile(UserDto userDto)
    {
        var user = mapper.Map<User>(userDto);
        db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public bool UpdateAddress(AddressDto addressdto)
    {
        throw new NotImplementedException();
    }

    public bool ResetPassword(UserDto userDto)
    {
        var account = db.Users.SingleOrDefault(u => u.Email == userDto.Email);
        var user = mapper.Map<User>(userDto);
        if (account != null)
        {
            if (DateTime.Compare((DateTime)account.ResetPasswordExpiry, (DateTime)user.ResetPasswordExpiry) >= 0)
            {
                if (account.ResetPasswordToken.Replace(" ", "+") == user.ResetPasswordToken.Replace(" ", "+"))
                {
                    account.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    return db.SaveChanges() > 0;
                }
            }
        }
        return false;

    }

    public bool SendMail(UserDto userDto)
    {
        var account = db.Users.SingleOrDefault(u => u.Email == userDto.Email);
        var user = mapper.Map<User>(userDto);
        if (account != null)
        {
            account.ResetPasswordToken = user.ResetPasswordToken;
            account.ResetPasswordExpiry = user.ResetPasswordExpiry;
        }
        db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }
}
