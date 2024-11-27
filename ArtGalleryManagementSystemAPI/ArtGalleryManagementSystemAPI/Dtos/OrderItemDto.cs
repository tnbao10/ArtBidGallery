namespace ArtGalleryManagementSystemAPI.Dtos;

public class OrderItemDto
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public string CreatedAt { get; set; }

    public string UpdatedAt { get; set; }
}
