using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class UserGarden
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    public decimal? Size { get; set; } // Square meters
    
    [MaxLength(100)]
    public string? SoilType { get; set; }
    
    [MaxLength(100)]
    public string? SunExposure { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<UserPlant> UserPlants { get; set; } = new List<UserPlant>();
}