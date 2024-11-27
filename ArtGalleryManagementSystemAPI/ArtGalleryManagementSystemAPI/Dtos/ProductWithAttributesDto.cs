namespace ArtGalleryManagementSystemAPI.Dtos;

public class ProductWithAttributesDto
{
    public int Id { get; set; }

    public int? SellerId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? CategoryId { get; set; }

    public double? Price { get; set; }
    public int? Type { get; set; }

    public int? Quantity { get; set; }
    public string? Image { get; set; }

    public string CreatedAt { get; set; }

    public string DeletedAt { get; set; }

    public string Username { get; set; } = null!;
    public string? Avatar { get; set; }
    public List<ProductAttributeDto> ProductAttributes { get; set; } = new List<ProductAttributeDto>();
}
