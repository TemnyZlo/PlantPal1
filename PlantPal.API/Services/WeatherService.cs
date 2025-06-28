using PlantPal.Shared.DTOs;
using PlantPal.Shared.Models;
using System.Text.Json;

namespace PlantPal.API.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<WeatherData?> GetCurrentWeatherAsync(LocationDto location)
    {
        try
        {
            // For demo purposes, return mock data
            // In production, you would call OpenWeatherMap API
            return new WeatherData
            {
                Id = Guid.NewGuid(),
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Temperature = 22.5m, // Mock temperature in Celsius
                Humidity = 65m,
                Precipitation = 0m,
                UVIndex = 6m,
                RecordedAt = DateTime.UtcNow
            };

            // Uncomment below for real API integration:
            /*
            var apiKey = _configuration["ExternalAPIs:OpenWeatherMap:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                return null;

            var url = $"https://api.openweathermap.org/data/2.5/weather?lat={location.Latitude}&lon={location.Longitude}&appid={apiKey}&units=metric";
            
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) 
                return null;
            
            var json = await response.Content.ReadAsStringAsync();
            var weatherResponse = JsonSerializer.Deserialize<OpenWeatherMapResponse>(json);
            
            return new WeatherData
            {
                Id = Guid.NewGuid(),
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Temperature = (decimal)weatherResponse.Main.Temp,
                Humidity = (decimal)weatherResponse.Main.Humidity,
                Precipitation = 0,
                UVIndex = 0,
                RecordedAt = DateTime.UtcNow
            };
            */
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<List<WeatherData>> GetWeatherForecastAsync(LocationDto location, int days)
    {
        // Mock forecast data for demo
        var forecast = new List<WeatherData>();
        var baseDate = DateTime.UtcNow;

        for (int i = 0; i < days; i++)
        {
            forecast.Add(new WeatherData
            {
                Id = Guid.NewGuid(),
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Temperature = 20m + (decimal)(Random.Shared.NextDouble() * 10), // 20-30°C
                Humidity = 50m + (decimal)(Random.Shared.NextDouble() * 30), // 50-80%
                Precipitation = (decimal)(Random.Shared.NextDouble() * 5), // 0-5mm
                UVIndex = 3m + (decimal)(Random.Shared.NextDouble() * 7), // 3-10
                RecordedAt = baseDate.AddDays(i)
            });
        }

        return forecast;
    }
}