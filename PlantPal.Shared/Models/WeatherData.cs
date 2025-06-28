namespace PlantPal.Shared.Models;

public class WeatherData
{
    public Guid Id { get; set; }
    
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    
    public decimal? Temperature { get; set; }
    public decimal? Humidity { get; set; }
    public decimal? Precipitation { get; set; }
    public decimal? UVIndex { get; set; }
    
    public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
}