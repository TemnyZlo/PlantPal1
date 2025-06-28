using Microsoft.EntityFrameworkCore;
using PlantPal.Data;
using PlantPal.Shared.DTOs;
using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public class PlantService : IPlantService
{
    private readonly PlantPalDbContext _context;
    private readonly IWeatherService _weatherService;

    public PlantService(PlantPalDbContext context, IWeatherService weatherService)
    {
        _context = context;
        _weatherService = weatherService;
    }

    public async Task<List<PlantRecommendationDto>> GetPlantRecommendationsAsync(
        LocationDto location, string? soilType, string? sunExposure)
    {
        // Get all plants (in a real app, you'd filter by location/region)
        var plants = await _context.Plants.ToListAsync();
        
        // Get current weather conditions
        var weather = await _weatherService.GetCurrentWeatherAsync(location);
        
        // Score plants based on compatibility
        var recommendations = plants.Select(plant => new PlantRecommendationDto
        {
            Plant = plant,
            CompatibilityScore = CalculateCompatibilityScore(plant, soilType, sunExposure, weather),
            Reason = GenerateRecommendationReason(plant, soilType, sunExposure),
            CareAdvice = GenerateCareAdvice(plant, weather)
        }).OrderByDescending(r => r.CompatibilityScore).Take(10).ToList();

        return recommendations;
    }

    public async Task<Plant?> GetPlantByIdAsync(Guid id)
    {
        return await _context.Plants.FindAsync(id);
    }

    public async Task<List<Plant>> SearchPlantsAsync(string query, LocationDto? location = null)
    {
        var plantsQuery = _context.Plants.AsQueryable();

        if (!string.IsNullOrEmpty(query))
        {
            plantsQuery = plantsQuery.Where(p => 
                p.CommonName.Contains(query) || 
                p.ScientificName.Contains(query) ||
                (p.Description != null && p.Description.Contains(query)));
        }

        return await plantsQuery.Take(20).ToListAsync();
    }

    public async Task<List<Plant>> GetNativePlantsAsync(LocationDto location)
    {
        // In a real implementation, you'd filter by geographic region
        return await _context.Plants.Where(p => p.IsNative).ToListAsync();
    }

    public async Task<List<Plant>> GetAllPlantsAsync()
    {
        return await _context.Plants.ToListAsync();
    }

    private double CalculateCompatibilityScore(Plant plant, string? soilType, string? sunExposure, WeatherData? weather)
    {
        double score = 0;
        
        // Base score for native plants
        if (plant.IsNative)
            score += 20;
        
        // Soil compatibility (0-30 points)
        if (!string.IsNullOrEmpty(soilType) && !string.IsNullOrEmpty(plant.SoilType))
        {
            if (plant.SoilType.Contains(soilType, StringComparison.OrdinalIgnoreCase) ||
                plant.SoilType.Contains("Any", StringComparison.OrdinalIgnoreCase))
                score += 30;
            else
                score += 10; // Partial compatibility
        }
        
        // Sun exposure compatibility (0-30 points)
        if (!string.IsNullOrEmpty(sunExposure) && !string.IsNullOrEmpty(plant.SunRequirements))
        {
            if (plant.SunRequirements.Contains(sunExposure, StringComparison.OrdinalIgnoreCase))
                score += 30;
            else if (plant.SunRequirements.Contains("Partial", StringComparison.OrdinalIgnoreCase))
                score += 20; // Partial sun plants are more adaptable
        }
        
        // Weather compatibility (0-20 points)
        if (weather != null)
        {
            score += CalculateWeatherCompatibility(plant, weather);
        }
        
        return Math.Min(score, 100); // Cap at 100%
    }

    private double CalculateWeatherCompatibility(Plant plant, WeatherData weather)
    {
        double score = 0;
        
        // Temperature compatibility (simplified)
        if (weather.Temperature.HasValue)
        {
            var temp = (double)weather.Temperature.Value;
            if (temp >= 15 && temp <= 25) // Ideal growing temperature
                score += 10;
            else if (temp >= 10 && temp <= 30) // Acceptable range
                score += 5;
        }
        
        // Humidity compatibility
        if (weather.Humidity.HasValue)
        {
            var humidity = (double)weather.Humidity.Value;
            if (humidity >= 40 && humidity <= 70) // Ideal humidity
                score += 10;
            else if (humidity >= 30 && humidity <= 80) // Acceptable range
                score += 5;
        }
        
        return score;
    }

    private string GenerateRecommendationReason(Plant plant, string? soilType, string? sunExposure)
    {
        var reasons = new List<string>();
        
        if (plant.IsNative)
            reasons.Add("native to your area");
        
        if (!string.IsNullOrEmpty(soilType) && !string.IsNullOrEmpty(plant.SoilType) &&
            plant.SoilType.Contains(soilType, StringComparison.OrdinalIgnoreCase))
            reasons.Add($"thrives in {soilType} soil");
        
        if (!string.IsNullOrEmpty(sunExposure) && !string.IsNullOrEmpty(plant.SunRequirements) &&
            plant.SunRequirements.Contains(sunExposure, StringComparison.OrdinalIgnoreCase))
            reasons.Add($"perfect for {sunExposure.ToLower()} conditions");
        
        if (plant.WaterRequirements?.Contains("Low", StringComparison.OrdinalIgnoreCase) == true)
            reasons.Add("drought tolerant");
        
        return reasons.Any() ? $"Great choice because it's {string.Join(", ", reasons)}." 
                            : "A beautiful addition to any garden.";
    }

    private List<string> GenerateCareAdvice(Plant plant, WeatherData? weather)
    {
        var advice = new List<string>();
        
        if (!string.IsNullOrEmpty(plant.WaterRequirements))
            advice.Add($"Water: {plant.WaterRequirements}");
        
        if (!string.IsNullOrEmpty(plant.SunRequirements))
            advice.Add($"Light: {plant.SunRequirements}");
        
        if (weather?.Temperature.HasValue == true)
        {
            var temp = (double)weather.Temperature.Value;
            if (temp < 10)
                advice.Add("Consider protection from cold weather");
            else if (temp > 30)
                advice.Add("Provide extra shade during hot weather");
        }
        
        if (!string.IsNullOrEmpty(plant.CareInstructions))
            advice.Add(plant.CareInstructions);
        
        return advice;
    }
}