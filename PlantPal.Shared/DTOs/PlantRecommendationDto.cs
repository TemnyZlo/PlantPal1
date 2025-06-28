using PlantPal.Shared.Models;

namespace PlantPal.Shared.DTOs;

public class PlantRecommendationDto
{
    public Plant Plant { get; set; } = null!;
    public double CompatibilityScore { get; set; }
    public string Reason { get; set; } = string.Empty;
    public List<string> CareAdvice { get; set; } = new();
}