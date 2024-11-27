namespace ArtGalleryManagementSystemAPI.Dtos;

public class BidOrderDto
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public string BidStartTime { get; set; }

    public string BidEndTime { get; set; }

    public double? BidBasePrice { get; set; }

    public double? BidSoldPrice { get; set; }

    public double? IncrementInPrice { get; set; }

    public string IncrementInTime { get; set; }

    public byte[] BidStamp { get; set; }
}
