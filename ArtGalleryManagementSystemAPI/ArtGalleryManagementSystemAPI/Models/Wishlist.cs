﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ArtGalleryManagementSystemAPI.Models;

public partial class Wishlist
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int? UserId { get; set; }

    public int? ProductId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual User User { get; set; }

    public virtual ICollection<WishlistProduct> WishlistProducts { get; set; } = new List<WishlistProduct>();
}