using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class Plant
{
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(255)]
    public string ScientificName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string CommonName { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public string? CareInstructions { get; set; }
    
    public bool IsNative { get; set; }
    
    [MaxLength(50)]
    public string? GrowthStage { get; set; }
    
    [MaxLength(100)]
    public string? WaterRequirements { get; set; }
    
    [MaxLength(100)]
    public string? SunRequirements { get; set; }
    
    [MaxLength(100)]
    public string? SoilType { get; set; }
    
    [MaxLength(100)]
    public string? BloomingSeason { get; set; }
    
    [MaxLength(500)]
    public string? ImageUrl { get; set; }
    
    [MaxLength(500)]
    public string? ModelUrl { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}