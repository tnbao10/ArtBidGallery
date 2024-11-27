namespace ArtGalleryManagementSystemAPI.Dtos;

public class ReviewDto
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public int? UserId { get; set; }

    public int? Rating { get; set; }

    public string ReviewText { get; set; }
    public string CreatedAt { get; set; }
    public string UserName { get; set; }
    public string UserAvatar { get; set; }

}
