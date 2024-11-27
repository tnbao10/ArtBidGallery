namespace ArtGalleryManagementSystemAPI.Dtos;

public class OrderDetailDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public double? Total { get; set; }

    public string CreatedAt { get; set; }

    public string UpdatedAt { get; set; }
    public int ProductId { get; set; }

    public string ProductName { get; set; }
    public string ProductImage { get; set; }

    public double? ProductPrice { get; set; }
    public int? ProductQuantity { get; set; }
    public string SellerName { get; set; }
    public string SellerAvatar { get; set; }
}
