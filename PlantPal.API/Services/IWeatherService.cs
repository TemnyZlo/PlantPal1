using PlantPal.Shared.DTOs;
using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public interface IWeatherService
{
    Task<WeatherData?> GetCurrentWeatherAsync(LocationDto location);
    Task<List<WeatherData>> GetWeatherForecastAsync(LocationDto location, int days);
}