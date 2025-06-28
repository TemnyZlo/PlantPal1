namespace PlantPal.Shared.Models;

public class UserBadge
{
    public Guid UserId { get; set; }
    
    public Guid BadgeId { get; set; }
    
    public DateTime EarnedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Badge Badge { get; set; } = null!;
}