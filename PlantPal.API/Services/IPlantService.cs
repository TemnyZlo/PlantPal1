using PlantPal.Shared.DTOs;
using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public interface IPlantService
{
    Task<List<PlantRecommendationDto>> GetPlantRecommendationsAsync(LocationDto location, string? soilType, string? sunExposure);
    Task<Plant?> GetPlantByIdAsync(Guid id);
    Task<List<Plant>> SearchPlantsAsync(string query, LocationDto? location = null);
    Task<List<Plant>> GetNativePlantsAsync(LocationDto location);
    Task<List<Plant>> GetAllPlantsAsync();
}