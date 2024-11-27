
using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface ProductService
{
    public List<ProductDto> FindAll();
    public List<ProductDto> FindBySellerId(int id);
    public ProductWithAttributesDto FindById(int id);
    public ProductWithSellerDto FindByIdWithSeller(int id);
    public ProductWithAttributesDto FindByIdWithAttributes(int id);
    public List<ProductWithSellerDto> FindByCategoryId(int id);
    public List<ProductWithSellerDto> AllProductWithSeller();
    public List<ProductWithSellerDto> SortByPrice(double min, double max);
    public List<ProductWithSellerDto> SortByPriceLowHigh(string value, double min, double max);
    public List<ProductWithSellerDto> SearchByKeyword(string value);
    public List<CategoryDto> FindAllCategory();
    public bool PostArt(ProductWithAttributesDto productWithAttributesDto);

    public List<ProductWithSellerDto> AllAuctionProductWithSeller();

    public bool EditArt(ProductWithAttributesDto productWithAttributesDto);

    public bool AddReview(ReviewDto reviewDto);
    public List<ReviewDto> FindAllReview();
    public List<ReviewDto> FindAllReviewByProId(int proId);

    public ReviewDto FindReviewByProId(int proId, int userId, string createdAt);
    public List<ReviewDto> FindReviewByUserId(int userId);
    public bool Delete(ProductDto productDto);


}

