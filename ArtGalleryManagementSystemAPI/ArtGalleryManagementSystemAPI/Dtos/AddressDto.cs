namespace ArtGalleryManagementSystemAPI.Dtos;

public partial class AddressDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Name { get; set; }

    public string? AddressLine { get; set; }

    public string? ProvinceCode { get; set; }
    public string? ProvinceName { get; set; }

    public string? DistrictCode { get; set; }
    public string? DistrictName { get; set; }

    public string? WardCode { get; set; }
    public string? WardName { get; set; }

    public string? PostalCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string CreatedAt { get; set; }

    public string DeletedAt { get; set; }

}
