namespace ArtGalleryManagementSystemAPI.Dtos;

public class UserDto
{
    public int Id { get; set; }

    public int? Role { get; set; }

    public string? Avatar { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Password { get; set; }
    public int? Gender { get; set; }
    public int? Income { get; set; }
    public string BirthOfDate { get; set; }

    public string? PhoneNumber { get; set; }
    public string ResetPasswordToken { get; set; }

    public string ResetPasswordExpiry { get; set; }
    public string CreatedAt { get; set; }

    public string DeletedAt { get; set; }

}
