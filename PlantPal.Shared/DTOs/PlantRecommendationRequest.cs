namespace PlantPal.Shared.DTOs;

public class PlantRecommendationRequest
{
    public LocationDto Location { get; set; } = null!;
    public string? SoilType { get; set; }
    public string? SunExposure { get; set; }
    public decimal? GardenSize { get; set; }
}