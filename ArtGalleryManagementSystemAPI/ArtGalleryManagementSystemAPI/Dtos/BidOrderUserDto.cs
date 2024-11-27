namespace ArtGalleryManagementSystemAPI.Dtos;

public class BidOrderUserDto
{
    public int Id { get; set; }
    public int BidOrderUserId { get; set; }

    public int UserId { get; set; }

    public string BidTransactionTime { get; set; }

    public double? BidTransactionAmount { get; set; }
}
