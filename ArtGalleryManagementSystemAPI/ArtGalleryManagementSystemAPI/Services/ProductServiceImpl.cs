
using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ArtGalleryManagementSystemAPI.Services;

public class ProductServiceImpl : ProductService
{
    private DatabaseContext db;
    private IMapper mapper;
    public ProductServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public List<ProductWithSellerDto> AllProductWithSeller()
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).ToList());
    }

    public List<ProductDto> FindAll()
    {
        return mapper.Map<List<ProductDto>>(db.Products.ToList());
    }

    public List<CategoryDto> FindAllCategory()
    {
        return mapper.Map<List<CategoryDto>>(db.Categories.ToList());
    }

    public List<ProductWithSellerDto> FindByCategoryId(int id)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.CategoryId == id && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).ToList());
    }

    public ProductWithAttributesDto FindById(int id)
    {
        return mapper.Map<ProductWithAttributesDto>(db.Products.SingleOrDefault(src => src.Id == id && src.SellerId == src.Seller.IdNavigation.Id && src.Seller.IdNavigation.DeletedAt == null && src.Type == 1 && src.DeletedAt == null));
    }
    public List<ProductDto> FindBySellerId(int id)
    {
        return mapper.Map<List<ProductDto>>(db.Products.Where(src => src.SellerId == id && src.Type == 1));
    }
    public ProductWithAttributesDto FindByIdWithAttributes(int id)
    {
        return mapper.Map<ProductWithAttributesDto>(
            db.Products
            .Include(p => p.ProductAttributesProducts)
        .ThenInclude(pap => pap.ProductAttributes).FirstOrDefault(p => p.Id == id && p.DeletedAt == null)
        );

    }

    public ProductWithSellerDto FindByIdWithSeller(int id)
    {
        return mapper.Map<ProductWithSellerDto>(db.Products.Find(id));

    }

    public bool PostArt(ProductWithAttributesDto productWithAttributesDto)
    {
        try
        {

            var product = mapper.Map<Product>(productWithAttributesDto);

            db.Products.Add(product);
            if (db.SaveChanges() > 0)
            {

                for (var i = 0; i < productWithAttributesDto.ProductAttributes.Count; i++)
                {
                    var productAttribute = new ProductAttribute();
                    productAttribute.Type = productWithAttributesDto.ProductAttributes[i].Type;
                    productAttribute.Value = productWithAttributesDto.ProductAttributes[i].Value;
                    db.ProductAttributes.Add(productAttribute);
                    if (db.SaveChanges() > 0)
                    {
                        var product_productAttribute = new ProductAttributesProduct
                        {
                            ProductsId = product.Id,
                            ProductAttributesId = productAttribute.Id
                        };
                        db.ProductAttributesProducts.Add(product_productAttribute);
                        db.SaveChanges();
                    }
                }

            }
            return true;
        }
        catch
        {
            return false;
        }
    }
    public bool EditArt(ProductWithAttributesDto productWithAttributesDto)
    {
        try
        {
            var product = db.Products.Find(productWithAttributesDto.Id);
            product.Image = productWithAttributesDto.Image;
            product.Name = productWithAttributesDto.Name;
            product.Description = productWithAttributesDto.Description;
            product.Price = productWithAttributesDto.Price;
            product.CategoryId = productWithAttributesDto.CategoryId;
            product.Quantity = productWithAttributesDto.Quantity;

            //product = mapper.Map<Product>(productWithAttributesDto);
            db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            if (db.SaveChanges() > 0)
            {
                var productAttribute = db.ProductAttributesProducts.Where(p => p.ProductsId == product.Id).Include(p => p.ProductAttributes).ToList();

                for (var i = 0; i < productWithAttributesDto.ProductAttributes.Count; i++)
                {
                    if (productAttribute[i].ProductAttributes.Type == productWithAttributesDto.ProductAttributes[i].Type)
                    {
                        productAttribute[i].ProductAttributes.Value = productWithAttributesDto.ProductAttributes[i].Value;
                    }
                    db.Entry(productAttribute[i]).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                }

            }
            return true;
        }
        catch
        {
            return false;
        }
    }
    public List<ProductWithSellerDto> SearchByKeyword(string value)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => (p.Name.ToLower().Contains(value) || p.Seller.IdNavigation.Username.ToLower().Contains(value)) && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).ToList());
    }

    public List<ProductWithSellerDto> SortByPrice(double min, double max)
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price <= max && p.Price >= min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).ToList());
    }

    public List<ProductWithSellerDto> SortByPriceLowHigh(string value, double min, double max)
    {
        if (value == "1")
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price <= max && p.Price >= min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).OrderBy(p => p.Price).ToList());
        }
        else if (value == "2")
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price <= max && p.Price >= min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).OrderByDescending(p => p.Price).ToList());
        }
        else
        {
            return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Price <= max && p.Price >= min && p.Seller.IdNavigation.DeletedAt == null && p.Type == 1 && p.DeletedAt == null).ToList());
        }

    }

    public List<ProductWithSellerDto> AllAuctionProductWithSeller()
    {
        return mapper.Map<List<ProductWithSellerDto>>(db.Products.Where(p => p.Seller.IdNavigation.DeletedAt == null && p.Type == 2).ToList());
    }
    public bool AddReview(ReviewDto reviewDto)
    {
        var review = mapper.Map<Review>(reviewDto);
        db.Reviews.Add(review);
        return db.SaveChanges() > 0;
    }

    public List<ReviewDto> FindAllReview()
    {
        return mapper.Map<List<ReviewDto>>(db.Reviews);
    }

    public ReviewDto FindReviewByProId(int proId, int userId, string createdAt)
    {
        var createdReview = DateTime.ParseExact(createdAt, "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture);
        return mapper.Map<ReviewDto>(db.Reviews.SingleOrDefault(r => r.ProductId == proId && r.UserId == userId && DateTime.Compare(createdReview, r.CreatedAt) == 0));
    }

    public List<ReviewDto> FindReviewByUserId(int userId)
    {
        return mapper.Map<List<ReviewDto>>(db.Reviews.Where(r => r.UserId == userId).ToList());
    }

    public List<ReviewDto> FindAllReviewByProId(int proId)
    {
        return mapper.Map<List<ReviewDto>>(db.Reviews.Where(r => r.ProductId == proId).ToList());

    }
    public bool Delete(ProductDto productDto)
    {
        var product = mapper.Map<Product>(productDto);
        db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

}

