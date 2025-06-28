using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class Badge
{
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Description { get; set; }
    
    [MaxLength(500)]
    public string? IconUrl { get; set; }
    
    public string? Criteria { get; set; } // JSON criteria
    
    public int EcoScoreReward { get; set; } = 0;
    
    // Navigation properties
    public virtual ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}