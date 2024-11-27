namespace ArtGalleryManagementSystemAPI.Dtos;

public class OrderItemWithPaypalDto
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public double? ProductPrice { get; set; }
    public string ProductName { get; set; }

    public int? Quantity { get; set; }

    public string CreatedAt { get; set; }

    public string UpdatedAt { get; set; }
}
