using System.ComponentModel.DataAnnotations;

namespace PlantPal.Shared.Models;

public class PlantCareReminder
{
    public Guid Id { get; set; }
    
    public Guid UserPlantId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string ReminderType { get; set; } = string.Empty; // Water, Fertilize, Prune, etc.
    
    public DateTime NextDueDate { get; set; }
    
    public int Frequency { get; set; } // Days between reminders
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public virtual UserPlant UserPlant { get; set; } = null!;
}