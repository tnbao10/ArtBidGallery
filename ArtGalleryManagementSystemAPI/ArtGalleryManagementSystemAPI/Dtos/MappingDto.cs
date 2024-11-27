using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using System.Globalization;


namespace ArtGalleryManagementSystemAPI.Dtos;

public class MappingDto : Profile
{
    private DatabaseContext db;
    private IMapper mapper;
    public MappingDto(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }
    public MappingDto()
    {
        CreateMap<Province, ProvinceDto>().ReverseMap();
        CreateMap<District, DistrictDto>().ReverseMap();
        CreateMap<Ward, WardDto>().ReverseMap();
        CreateMap<User, UserDto>()
            .ForMember(
                des => des.BirthOfDate,
                src => src.MapFrom(des => des.BirthOfDate != null ? ((DateTime)des.BirthOfDate).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.Income,
                src => src.MapFrom(src => src.Role == 2 ? src.Seller.Income : null)
            )
            .ForMember(
                des => des.ResetPasswordExpiry,
                src => src.MapFrom(desc => desc.ResetPasswordExpiry != null ? ((DateTime)desc.ResetPasswordExpiry).ToString("dd-MM-yyyy HH:mm:ss") : null)
            );
        CreateMap<UserDto, User>()
            .ForMember(
                des => des.BirthOfDate,
                src => src.MapFrom(src => src.BirthOfDate != null ? DateTime.ParseExact(src.BirthOfDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            )
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            )
            .ForMember(
                des => des.ResetPasswordExpiry,
                src => src.MapFrom(src => src.ResetPasswordExpiry != null ? DateTime.ParseExact(src.ResetPasswordExpiry, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Seller, SellerDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<SellerDto, Seller>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Address, AddressDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.ProvinceName,
                src => src.MapFrom(src => src.ProvinceCodeNavigation.Name)
            )
            .ForMember(
                des => des.DistrictName,
                src => src.MapFrom(src => src.DistrictCodeNavigation.Name)
            )
            .ForMember(
                des => des.WardName,
                src => src.MapFrom(src => src.WardCodeNavigation.Name)
            )
            ;
        CreateMap<AddressDto, Address>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Cart, CartDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<CartDto, Cart>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );

        CreateMap<Product, ProductDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<ProductDto, Product>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );


        CreateMap<CartItem, CartItemDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<CartItemDto, CartItem>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );


        CreateMap<Product, ProductWithSellerDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.Username,
                src => src.MapFrom(des => des.Seller.IdNavigation.Username)
            )
            .ForMember(
                des => des.Avatar,
                src => src.MapFrom(desc => desc.Seller.IdNavigation.Avatar)
            );

        CreateMap<ProductAttribute, ProductAttributeDto>();
        CreateMap<ProductAttributeDto, ProductAttribute>();
        CreateMap<ProductAttributesProduct, ProductAttributesProductDto>();

        CreateMap<Product, ProductWithAttributesDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.Username,
                src => src.MapFrom(des => des.Seller.IdNavigation.Username)
            )
            .ForMember(
                des => des.Avatar,
                src => src.MapFrom(desc => desc.Seller.IdNavigation.Avatar)
            )
            .ForMember(
                des => des.ProductAttributes,
                 src => src.MapFrom(desc => desc.ProductAttributesProducts.Select(pap => pap.ProductAttributes)));
        CreateMap<ProductWithAttributesDto, Product>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != "" ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<Wishlist, WishListDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            )
            .ForMember(
                des => des.ProductName,
                src => src.MapFrom(src => src.WishlistProducts.Select(src => src.Products.Name))
            );
        CreateMap<WishListDto, Wishlist>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );
        CreateMap<OrderDetail, OrderDetailDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        //.ForMember(
        //    des => des.ProductImage,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.OrderItemProducts.Select(src => src.Products.Image)))
        //)
        //.ForMember(
        //    des => des.ProductName,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.OrderItemProducts.Select(src => src.Products.Name)))
        //)
        //.ForMember(
        //    des => des.ProductPrice,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.OrderItemProducts.Select(src => src.Products.Price)))
        //)
        //.ForMember(
        //    des => des.ProductQuantity,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.Quantity))
        //)
        //.ForMember(
        //    des => des.SellerName,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.OrderItemProducts.Select(src => src.Products.Seller.IdNavigation.Username)))
        //)
        //.ForMember(
        //    des => des.SellerAvatar,
        //    src => src.MapFrom(src => src.OrderItems.Select(src => src.OrderItemProducts.Select(src => src.Products.Seller.IdNavigation.Avatar)))
        //);
        CreateMap<OrderDetailDto, OrderDetail>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );

        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy HH:mm:ss"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<OrderItemDto, OrderItem>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(src => src.UpdatedAt != null ? DateTime.ParseExact(src.UpdatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );

        CreateMap<OrderItem, OrderItemWithPaypalDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy HH:mm:ss"))
            )
            .ForMember(
                des => des.UpdatedAt,
                src => src.MapFrom(desc => desc.UpdatedAt != null ? ((DateTime)desc.UpdatedAt).ToString("dd-MM-yyyy") : null)
            ).ForMember(
                des => des.ProductPrice,
                src => src.MapFrom(desc => db.Products.Find(desc.ProductId).Price)
            ).ForMember(
                des => des.ProductName,
                src => src.MapFrom(desc => db.Products.Find(desc.ProductId).Name)
            );
        CreateMap<Category, CategoryDto>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy"))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(desc => desc.DeletedAt != null ? ((DateTime)desc.DeletedAt).ToString("dd-MM-yyyy") : null)
            );
        CreateMap<CategoryDto, Category>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.DeletedAt,
                src => src.MapFrom(src => src.DeletedAt != null ? DateTime.ParseExact(src.DeletedAt, "dd-MM-yyyy", CultureInfo.InvariantCulture) : default(DateTime?))
            );

        //Bid Order
        CreateMap<BidOrder, BidOrderDto>()
            .ForMember(
                des => des.BidStartTime,
                src => src.MapFrom(des => des.BidStartTime.ToString("dd-MM-yyyy HH:mm:ss"))
            )
            .ForMember(
                des => des.BidEndTime,
                src => src.MapFrom(des => des.BidEndTime.ToString("dd-MM-yyyy HH:mm:ss"))
            )
            .ForMember(
                des => des.IncrementInTime,
                src => src.MapFrom(des => des.IncrementInTime.ToString("HH:mm:ss"))
            );

        CreateMap<BidOrderDto, BidOrder>()
            .ForMember(
                des => des.BidStartTime,
                src => src.MapFrom(src => DateTime.ParseExact(src.BidStartTime, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))
            )
            .ForMember(
                des => des.IncrementInTime,
                src => src.MapFrom(src => TimeOnly.FromDateTime(DateTime.ParseExact(src.IncrementInTime, "HH:mm:ss", CultureInfo.InvariantCulture)))
            )
            .ForMember(
                des => des.BidEndTime,
                src => src.MapFrom(src => DateTime.ParseExact(src.BidEndTime, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))
           );

        CreateMap<BidOrderUserDto, BidOrderUser>()
            .ForMember(
                des => des.BidTransactionTime,
                src => src.MapFrom(src => DateTime.ParseExact(src.BidTransactionTime, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))
           );
        CreateMap<BidOrderUser, BidOrderUserDto>()
            .ForMember(
                des => des.BidTransactionTime,
                src => src.MapFrom(des => des.BidTransactionTime.ToString("dd-MM-yyyy HH:mm:ss"))
            );

        CreateMap<Review, ReviewDto>()
           .ForMember(
               des => des.CreatedAt,
               src => src.MapFrom(des => des.CreatedAt.ToString("dd-MM-yyyy HH:mm:ss"))
           )
           .ForMember(
                des => des.UserName,
                src => src.MapFrom(src => src.User.Username)
            )
           .ForMember(
                des => des.UserAvatar,
                src => src.MapFrom(src => src.User.Avatar)
            );
        CreateMap<ReviewDto, Review>()
            .ForMember(
                des => des.CreatedAt,
                src => src.MapFrom(src => DateTime.ParseExact(src.CreatedAt, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture))

            );
    }
}

