﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class User
{
    public int Id { get; set; }

    public int? Role { get; set; }

    public string Avatar { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public int? Gender { get; set; }

    public bool? Status { get; set; }

    public DateTime? BirthOfDate { get; set; }

    public string PhoneNumber { get; set; }

    public string ResetPasswordToken { get; set; }

    public DateTime? ResetPasswordExpiry { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<BidOrderUser> BidOrderUsers { get; set; } = new List<BidOrderUser>();

    public virtual Cart Cart { get; set; }

    public virtual ICollection<Connection> Connections { get; set; } = new List<Connection>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Seller Seller { get; set; }

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}