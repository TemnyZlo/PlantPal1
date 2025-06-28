using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class UserPlant
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public Guid PlantId { get; set; }
    
    public Guid? GardenId { get; set; }
    
    public DateTime PlantedDate { get; set; } = DateTime.UtcNow;
    
    [MaxLength(50)]
    public string Status { get; set; } = "Growing"; // Growing, Flowering, Dormant, Dead
    
    [MaxLength(100)]
    public string? Position { get; set; } // JSON coordinates for AR
    
    public string? Notes { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Plant Plant { get; set; } = null!;
    public virtual UserGarden? Garden { get; set; }
    public virtual ICollection<PlantCareReminder> CareReminders { get; set; } = new List<PlantCareReminder>();
}