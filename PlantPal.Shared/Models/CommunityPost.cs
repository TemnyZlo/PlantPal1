using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class CommunityPost
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    [Required]
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    public string? ImageUrls { get; set; } // JSON array
    
    [MaxLength(500)]
    public string? Tags { get; set; }
    
    public int Likes { get; set; } = 0;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
}