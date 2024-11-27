namespace ArtGalleryManagementSystemAPI.Dtos;

public class CartItemDto
{
    public int Id { get; set; }

    public int? CartId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public string CreatedAt { get; set; }

    public string UpdatedAt { get; set; }
}
