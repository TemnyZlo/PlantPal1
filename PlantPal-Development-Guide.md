# PlantPal - Complete Development Guide

## Project Feasibility Analysis

### AR Garden Planner Feasibility (Solo Developer, 1 Month)
**Answer: Partially Feasible with limitations**

For a solo developer in one month:
- ✅ **Basic AR placement**: Using ARCore (Android) and ARKit (iOS) through .NET MAUI Community Toolkit
- ✅ **Simple 3D plant models**: Using basic shapes or low-poly models
- ❌ **Advanced AR features**: Complex terrain mapping, realistic plant growth simulation
- ✅ **MVP AR**: Plant positioning and basic visualization

**Recommended AR Approach:**
- Start with simple AR placement using camera overlay
- Use pre-made 3D plant models from Unity Asset Store or create basic geometric representations
- Focus on core functionality first, enhance AR later

### Weather + Soil + Terrain Analysis Solutions

**Weather APIs:**
- **OpenWeatherMap API** (Free tier: 1000 calls/day)
- **WeatherAPI** (Free tier: 1M calls/month)
- **National Weather Service API** (Free, US only)

**Soil Data Sources:**
- **USDA Web Soil Survey** (Free, comprehensive US soil data)
- **SoilGrids API** (Global soil data)
- **NASA POWER API** (Agricultural weather data)

**Terrain Analysis:**
- **Google Elevation API** (Paid)
- **OpenTopography API** (Free for research/education)
- **USGS Elevation Point Query Service** (Free, US only)

### Local Flora Database Options

**Existing Databases:**
- **GBIF (Global Biodiversity Information Facility)** - Free API, comprehensive species data
- **iNaturalist API** - Community-driven, excellent for native species
- **USDA PLANTS Database** - US native plants, free API
- **Encyclopedia of Life (EOL)** - Global species database
- **PlantNet API** - Plant identification and information

**Recommended Approach:** Combine GBIF + iNaturalist APIs with crowdsourced data

## Technology Stack Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PlantPal Architecture                     │
├─────────────────────────────────────────────────────────────┤
│  Frontend Layer                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐│
│  │   Blazor Web    │    │      .NET MAUI Mobile          ││
│  │   - PWA Support │    │   - Android (ARCore)           ││
│  │   - Responsive  │    │   - iOS (ARKit)                ││
│  │   - Blog System │    │   - Camera/GPS Integration     ││
│  └─────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  API Layer (.NET 8 Web API)                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Controllers: Plants, Users, Community, Weather, AR    ││
│  │  Services: PlantService, WeatherService, ARService     ││
│  │  SignalR Hubs: Real-time notifications                 ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                 │
│  ┌─────────────────┐    ┌─────────────────────────────────┐│
│  │   SQL Server    │    │     External APIs               ││
│  │   - EF Core     │    │   - Weather APIs                ││
│  │   - Plants DB   │    │   - Flora Databases             ││
│  │   - Users       │    │   - Soil Data APIs              ││
│  │   - Community   │    │   - Elevation APIs              ││
│  └─────────────────┘    └─────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Step-by-Step Development Plan

### Phase 1: Foundation Setup (Week 1)

#### Day 1-2: Project Structure & Database

1. **Create Solution Structure**
```bash
dotnet new sln -n PlantPal
dotnet new webapi -n PlantPal.API
dotnet new blazorserver -n PlantPal.Web
dotnet new maui -n PlantPal.Mobile
dotnet new classlib -n PlantPal.Shared
dotnet new classlib -n PlantPal.Data
```

2. **Database Design (SQL Server)**
```sql
-- Core Tables
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Username NVARCHAR(100) UNIQUE NOT NULL,
    Location GEOGRAPHY,
    EcoScore INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE Plants (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ScientificName NVARCHAR(255) NOT NULL,
    CommonName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CareInstructions NVARCHAR(MAX),
    IsNative BIT DEFAULT 0,
    GrowthStage NVARCHAR(50),
    WaterRequirements NVARCHAR(100),
    SunRequirements NVARCHAR(100),
    SoilType NVARCHAR(100),
    BloomingSeason NVARCHAR(100),
    ImageUrl NVARCHAR(500),
    ModelUrl NVARCHAR(500) -- For AR models
);

CREATE TABLE UserGardens (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    Name NVARCHAR(255) NOT NULL,
    Location GEOGRAPHY,
    Size DECIMAL(10,2), -- Square meters
    SoilType NVARCHAR(100),
    SunExposure NVARCHAR(100),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE UserPlants (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    PlantId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Plants(Id),
    GardenId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UserGardens(Id),
    PlantedDate DATETIME2 DEFAULT GETUTCDATE(),
    Status NVARCHAR(50) DEFAULT 'Growing', -- Growing, Flowering, Dormant, Dead
    Position NVARCHAR(100), -- JSON coordinates for AR
    Notes NVARCHAR(MAX)
);

CREATE TABLE CommunityPosts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImageUrls NVARCHAR(MAX), -- JSON array
    Tags NVARCHAR(500),
    Likes INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE Badges (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    IconUrl NVARCHAR(500),
    Criteria NVARCHAR(MAX) -- JSON criteria
);

CREATE TABLE UserBadges (
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    BadgeId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Badges(Id),
    EarnedAt DATETIME2 DEFAULT GETUTCDATE(),
    PRIMARY KEY (UserId, BadgeId)
);

CREATE TABLE PlantCareReminders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserPlantId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES UserPlants(Id),
    ReminderType NVARCHAR(50), -- Water, Fertilize, Prune, etc.
    NextDueDate DATETIME2 NOT NULL,
    Frequency INT, -- Days between reminders
    IsActive BIT DEFAULT 1
);

CREATE TABLE WeatherData (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Location GEOGRAPHY NOT NULL,
    Temperature DECIMAL(5,2),
    Humidity DECIMAL(5,2),
    Precipitation DECIMAL(5,2),
    UVIndex DECIMAL(3,1),
    RecordedAt DATETIME2 DEFAULT GETUTCDATE()
);
```

#### Day 3: Shared Models & DTOs

3. **Create Shared Models** (PlantPal.Shared)
```csharp
// Models/Plant.cs
public class Plant
{
    public Guid Id { get; set; }
    public string ScientificName { get; set; }
    public string CommonName { get; set; }
    public string Description { get; set; }
    public string CareInstructions { get; set; }
    public bool IsNative { get; set; }
    public string GrowthStage { get; set; }
    public string WaterRequirements { get; set; }
    public string SunRequirements { get; set; }
    public string SoilType { get; set; }
    public string BloomingSeason { get; set; }
    public string ImageUrl { get; set; }
    public string ModelUrl { get; set; }
}

// DTOs/PlantRecommendationDto.cs
public class PlantRecommendationDto
{
    public Plant Plant { get; set; }
    public double CompatibilityScore { get; set; }
    public string Reason { get; set; }
    public List<string> CareAdvice { get; set; }
}

// DTOs/LocationDto.cs
public class LocationDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
}
```

#### Day 4-5: Data Layer Setup

4. **Entity Framework Configuration** (PlantPal.Data)
```csharp
// PlantPalDbContext.cs
public class PlantPalDbContext : DbContext
{
    public PlantPalDbContext(DbContextOptions<PlantPalDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Plant> Plants { get; set; }
    public DbSet<UserGarden> UserGardens { get; set; }
    public DbSet<UserPlant> UserPlants { get; set; }
    public DbSet<CommunityPost> CommunityPosts { get; set; }
    public DbSet<Badge> Badges { get; set; }
    public DbSet<UserBadge> UserBadges { get; set; }
    public DbSet<PlantCareReminder> PlantCareReminders { get; set; }
    public DbSet<WeatherData> WeatherData { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure spatial data
        modelBuilder.Entity<User>()
            .Property(u => u.Location)
            .HasColumnType("geography");

        modelBuilder.Entity<UserGarden>()
            .Property(g => g.Location)
            .HasColumnType("geography");

        // Configure relationships
        modelBuilder.Entity<UserBadge>()
            .HasKey(ub => new { ub.UserId, ub.BadgeId });
        
        base.OnModelCreating(modelBuilder);
    }
}
```

### Phase 2: Core API Development (Week 2)

#### Day 6-8: API Controllers & Services

5. **Plant Service & Controller**
```csharp
// Services/IPlantService.cs
public interface IPlantService
{
    Task<List<PlantRecommendationDto>> GetPlantRecommendationsAsync(LocationDto location, string soilType, string sunExposure);
    Task<Plant> GetPlantByIdAsync(Guid id);
    Task<List<Plant>> SearchPlantsAsync(string query, LocationDto location);
    Task<List<Plant>> GetNativePlantsAsync(LocationDto location);
}

// Services/PlantService.cs
public class PlantService : IPlantService
{
    private readonly PlantPalDbContext _context;
    private readonly IWeatherService _weatherService;
    private readonly HttpClient _httpClient;

    public async Task<List<PlantRecommendationDto>> GetPlantRecommendationsAsync(
        LocationDto location, string soilType, string sunExposure)
    {
        // Query native plants based on location
        var nativePlants = await GetNativePlantsAsync(location);
        
        // Get current weather conditions
        var weather = await _weatherService.GetCurrentWeatherAsync(location);
        
        // Score plants based on compatibility
        var recommendations = nativePlants.Select(plant => new PlantRecommendationDto
        {
            Plant = plant,
            CompatibilityScore = CalculateCompatibilityScore(plant, soilType, sunExposure, weather),
            Reason = GenerateRecommendationReason(plant, soilType, sunExposure),
            CareAdvice = GenerateCareAdvice(plant, weather)
        }).OrderByDescending(r => r.CompatibilityScore).ToList();

        return recommendations;
    }

    private double CalculateCompatibilityScore(Plant plant, string soilType, 
        string sunExposure, WeatherData weather)
    {
        double score = 0;
        
        // Soil compatibility (0-30 points)
        if (plant.SoilType?.Contains(soilType, StringComparison.OrdinalIgnoreCase) == true)
            score += 30;
        
        // Sun exposure compatibility (0-30 points)
        if (plant.SunRequirements?.Contains(sunExposure, StringComparison.OrdinalIgnoreCase) == true)
            score += 30;
        
        // Weather compatibility (0-40 points)
        score += CalculateWeatherCompatibility(plant, weather);
        
        return score;
    }
}

// Controllers/PlantsController.cs
[ApiController]
[Route("api/[controller]")]
public class PlantsController : ControllerBase
{
    private readonly IPlantService _plantService;

    [HttpPost("recommendations")]
    public async Task<ActionResult<List<PlantRecommendationDto>>> GetRecommendations(
        [FromBody] PlantRecommendationRequest request)
    {
        var recommendations = await _plantService.GetPlantRecommendationsAsync(
            request.Location, request.SoilType, request.SunExposure);
        return Ok(recommendations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Plant>> GetPlant(Guid id)
    {
        var plant = await _plantService.GetPlantByIdAsync(id);
        if (plant == null) return NotFound();
        return Ok(plant);
    }
}
```

6. **Weather Service Integration**
```csharp
// Services/IWeatherService.cs
public interface IWeatherService
{
    Task<WeatherData> GetCurrentWeatherAsync(LocationDto location);
    Task<List<WeatherData>> GetWeatherForecastAsync(LocationDto location, int days);
    Task<SoilData> GetSoilDataAsync(LocationDto location);
}

// Services/WeatherService.cs
public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public async Task<WeatherData> GetCurrentWeatherAsync(LocationDto location)
    {
        var apiKey = _configuration["OpenWeatherMap:ApiKey"];
        var url = $"https://api.openweathermap.org/data/2.5/weather?lat={location.Latitude}&lon={location.Longitude}&appid={apiKey}&units=metric";
        
        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode) return null;
        
        var json = await response.Content.ReadAsStringAsync();
        var weatherResponse = JsonSerializer.Deserialize<OpenWeatherMapResponse>(json);
        
        return new WeatherData
        {
            Location = CreateGeographyPoint(location.Latitude, location.Longitude),
            Temperature = (decimal)weatherResponse.Main.Temp,
            Humidity = (decimal)weatherResponse.Main.Humidity,
            Precipitation = 0, // Calculate from forecast if needed
            UVIndex = 0, // Requires separate UV API call
            RecordedAt = DateTime.UtcNow
        };
    }

    public async Task<SoilData> GetSoilDataAsync(LocationDto location)
    {
        // Integrate with USDA Web Soil Survey or SoilGrids API
        var url = $"https://rest.soilgrids.org/query?lon={location.Longitude}&lat={location.Latitude}";
        
        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode) return null;
        
        var json = await response.Content.ReadAsStringAsync();
        // Parse soil data response
        return ParseSoilData(json);
    }
}
```

#### Day 9-10: External API Integration

7. **Flora Database Integration**
```csharp
// Services/FloraService.cs
public class FloraService : IFloraService
{
    private readonly HttpClient _httpClient;

    public async Task<List<Plant>> SearchFloraAsync(string query, LocationDto location)
    {
        // GBIF API Integration
        var gbifUrl = $"https://api.gbif.org/v1/species/search?q={query}&limit=20";
        var gbifResponse = await _httpClient.GetAsync(gbifUrl);
        
        if (gbifResponse.IsSuccessStatusCode)
        {
            var gbifJson = await gbifResponse.Content.ReadAsStringAsync();
            var gbifData = JsonSerializer.Deserialize<GBIFSearchResponse>(gbifJson);
            
            // Convert GBIF data to Plant objects
            var plants = gbifData.Results.Select(ConvertGBIFToPlant).ToList();
            
            // Enhance with iNaturalist data
            foreach (var plant in plants)
            {
                await EnhanceWithiNaturalistData(plant, location);
            }
            
            return plants;
        }
        
        return new List<Plant>();
    }

    private async Task EnhanceWithiNaturalistData(Plant plant, LocationDto location)
    {
        var query = Uri.EscapeDataString(plant.ScientificName);
        var url = $"https://api.inaturalist.org/v1/taxa?q={query}&place_id={await GetPlaceIdAsync(location)}";
        
        var response = await _httpClient.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            var json = await response.Content.ReadAsStringAsync();
            var iNatData = JsonSerializer.Deserialize<iNaturalistResponse>(json);
            
            if (iNatData.Results.Any())
            {
                var taxon = iNatData.Results.First();
                plant.ImageUrl = taxon.DefaultPhoto?.MediumUrl;
                plant.IsNative = taxon.Native == true;
            }
        }
    }
}
```

### Phase 3: Web Application (Week 3)

#### Day 11-13: Blazor Web Application

8. **Blazor Pages & Components**
```razor
@* Pages/PlantRecommendations.razor *@
@page "/recommendations"
@inject IPlantService PlantService
@inject IJSRuntime JSRuntime

<PageTitle>Plant Recommendations - PlantPal</PageTitle>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-green-600 mb-6">Recommended Plants for Your Garden</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Tell us about your garden</h2>
        <EditForm Model="@recommendationRequest" OnValidSubmit="@GetRecommendations">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                    <InputSelect @bind-Value="recommendationRequest.SoilType" class="w-full p-2 border rounded-md">
                        <option value="">Select soil type</option>
                        <option value="clay">Clay</option>
                        <option value="sandy">Sandy</option>
                        <option value="loam">Loam</option>
                        <option value="rocky">Rocky</option>
                    </InputSelect>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sun Exposure</label>
                    <InputSelect @bind-Value="recommendationRequest.SunExposure" class="w-full p-2 border rounded-md">
                        <option value="">Select sun exposure</option>
                        <option value="full-sun">Full Sun</option>
                        <option value="partial-sun">Partial Sun</option>
                        <option value="shade">Shade</option>
                    </InputSelect>
                </div>
                <div class="flex items-end">
                    <button type="submit" class="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors">
                        Get Recommendations
                    </button>
                </div>
            </div>
        </EditForm>
    </div>

    @if (recommendations?.Any() == true)
    {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach (var recommendation in recommendations)
            {
                <PlantCard Plant="@recommendation.Plant" 
                          CompatibilityScore="@recommendation.CompatibilityScore"
                          Reason="@recommendation.Reason" />
            }
        </div>
    }
</div>

@code {
    private PlantRecommendationRequest recommendationRequest = new();
    private List<PlantRecommendationDto> recommendations = new();
    private LocationDto userLocation = new();

    protected override async Task OnInitializedAsync()
    {
        await GetUserLocation();
    }

    private async Task GetUserLocation()
    {
        var position = await JSRuntime.InvokeAsync<GeolocationPosition>("getLocation");
        userLocation = new LocationDto
        {
            Latitude = position.Coords.Latitude,
            Longitude = position.Coords.Longitude
        };
        recommendationRequest.Location = userLocation;
    }

    private async Task GetRecommendations()
    {
        if (recommendationRequest.Location == null)
        {
            await GetUserLocation();
        }
        
        recommendations = await PlantService.GetPlantRecommendationsAsync(
            recommendationRequest.Location, 
            recommendationRequest.SoilType, 
            recommendationRequest.SunExposure);
    }
}
```

9. **Plant Card Component**
```razor
@* Components/PlantCard.razor *@
<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative">
        <img src="@(Plant.ImageUrl ?? "/images/placeholder-plant.jpg")" 
             alt="@Plant.CommonName" 
             class="w-full h-48 object-cover">
        <div class="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
            @($"{CompatibilityScore:F0}% Match")
        </div>
    </div>
    
    <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">@Plant.CommonName</h3>
        <p class="text-sm text-gray-600 mb-2 italic">@Plant.ScientificName</p>
        
        <div class="flex items-center mb-2">
            @if (Plant.IsNative)
            {
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">Native</span>
            }
            <span class="text-xs text-gray-500">@Plant.BloomingSeason</span>
        </div>
        
        <p class="text-sm text-gray-700 mb-3">@Reason</p>
        
        <div class="flex justify-between items-center">
            <div class="flex space-x-2 text-xs">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">@Plant.WaterRequirements</span>
                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">@Plant.SunRequirements</span>
            </div>
            <button class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    @onclick="() => ViewPlantDetails(Plant.Id)">
                View Details
            </button>
        </div>
    </div>
</div>

@code {
    [Parameter] public Plant Plant { get; set; }
    [Parameter] public double CompatibilityScore { get; set; }
    [Parameter] public string Reason { get; set; }

    private void ViewPlantDetails(Guid plantId)
    {
        // Navigate to plant details page
    }
}
```

10. **Community Blog System**
```razor
@* Pages/Community.razor *@
@page "/community"
@inject ICommunityService CommunityService

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-green-600">Community Garden</h1>
        <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                @onclick="ShowCreatePostModal">
            Share Your Experience
        </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
            @if (communityPosts?.Any() == true)
            {
                @foreach (var post in communityPosts)
                {
                    <CommunityPostCard Post="@post" />
                }
            }
        </div>
        
        <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 class="text-lg font-semibold mb-4">Top Contributors</h3>
                @* Top contributors list *@
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">Popular Tags</h3>
                @* Popular tags *@
            </div>
        </div>
    </div>
</div>

@code {
    private List<CommunityPost> communityPosts = new();

    protected override async Task OnInitializedAsync()
    {
        communityPosts = await CommunityService.GetRecentPostsAsync();
    }
}
```

### Phase 4: Mobile Application (.NET MAUI) - Week 4

#### Day 14-16: MAUI Setup & Core Features

11. **MAUI Project Configuration**
```xml
<!-- PlantPal.Mobile/Platforms/Android/AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />

<!-- AR Core support -->
<uses-feature android:name="android.hardware.camera.ar" android:required="true"/>
<meta-data android:name="com.google.ar.core" android:value="required" />
```

12. **AR Garden Planner (Basic Implementation)**
```csharp
// Views/ARGardenView.xaml.cs
public partial class ARGardenView : ContentPage
{
    private readonly IARService _arService;

    public ARGardenView(IARService arService)
    {
        InitializeComponent();
        _arService = arService;
    }

    private async void OnStartARClicked(object sender, EventArgs e)
    {
        try
        {
            // Check AR availability
            var isARSupported = await _arService.IsARSupportedAsync();
            if (!isARSupported)
            {
                await DisplayAlert("AR Not Supported", "AR is not available on this device", "OK");
                return;
            }

            // Start AR session
            await _arService.StartARSessionAsync();
            
            // Show AR overlay
            AROverlay.IsVisible = true;
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", $"Failed to start AR: {ex.Message}", "OK");
        }
    }

    private async void OnPlacePlantClicked(object sender, EventArgs e)
    {
        if (SelectedPlant != null)
        {
            await _arService.PlacePlantAsync(SelectedPlant);
        }
    }
}
```

13. **Location-based Plant Service (Mobile)**
```csharp
// Services/MobileLocationService.cs
public class MobileLocationService : ILocationService
{
    public async Task<LocationDto> GetCurrentLocationAsync()
    {
        try
        {
            var request = new GeolocationRequest
            {
                DesiredAccuracy = GeolocationAccuracy.Medium,
                Timeout = TimeSpan.FromSeconds(10)
            };

            var location = await Geolocation.Default.GetLocationAsync(request);
            
            if (location != null)
            {
                return new LocationDto
                {
                    Latitude = location.Latitude,
                    Longitude = location.Longitude
                };
            }
        }
        catch (Exception ex)
        {
            // Handle location errors
        }

        return null;
    }

    public async Task<List<PlantRecommendationDto>> GetNearbyRecommendationsAsync()
    {
        var location = await GetCurrentLocationAsync();
        if (location == null) return new List<PlantRecommendationDto>();

        // Call API for recommendations
        var recommendations = await _apiService.GetPlantRecommendationsAsync(location);
        return recommendations;
    }
}
```

#### Day 17-18: Push Notifications & Reminders

14. **Plant Care Reminder System**
```csharp
// Services/ReminderService.cs
public class ReminderService : IReminderService
{
    public async Task SchedulePlantCareReminderAsync(UserPlant userPlant)
    {
        var reminders = await GetPlantCareScheduleAsync(userPlant.PlantId);
        
        foreach (var reminder in reminders)
        {
            var notification = new NotificationRequest
            {
                NotificationId = GenerateReminderNotificationId(userPlant.Id, reminder.Type),
                Title = $"Time to {reminder.Type} your {userPlant.Plant.CommonName}",
                Subtitle = reminder.Description,
                Description = $"Your {userPlant.Plant.CommonName} needs {reminder.Type.ToLower()}",
                BadgeNumber = 1,
                Schedule = new NotificationRequestSchedule
                {
                    NotifyTime = reminder.NextDueDate,
                    RepeatType = NotificationRepeat.Daily // Adjust based on reminder frequency
                }
            };

            await LocalNotificationCenter.Current.Show(notification);
        }
    }

    private async Task<List<CareReminder>> GetPlantCareScheduleAsync(Guid plantId)
    {
        // Get plant care requirements and generate reminder schedule
        var plant = await _plantService.GetPlantByIdAsync(plantId);
        var reminders = new List<CareReminder>();

        // Water reminder
        if (!string.IsNullOrEmpty(plant.WaterRequirements))
        {
            var waterFrequency = ParseWaterFrequency(plant.WaterRequirements);
            reminders.Add(new CareReminder
            {
                Type = "Water",
                Description = $"Water according to {plant.WaterRequirements}",
                NextDueDate = DateTime.Now.AddDays(waterFrequency),
                FrequencyDays = waterFrequency
            });
        }

        return reminders;
    }
}
```

#### Day 19-21: Gamification & Badge System

15. **Badge & Achievement System**
```csharp
// Services/GamificationService.cs
public class GamificationService : IGamificationService
{
    private readonly PlantPalDbContext _context;

    public async Task CheckAndAwardBadgesAsync(Guid userId)
    {
        var user = await _context.Users
            .Include(u => u.UserBadges)
            .Include(u => u.UserPlants)
            .Include(u => u.CommunityPosts)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return;

        var availableBadges = await _context.Badges.ToListAsync();
        var newBadges = new List<Badge>();

        foreach (var badge in availableBadges)
        {
            if (user.UserBadges.Any(ub => ub.BadgeId == badge.Id)) continue;

            if (await CheckBadgeCriteria(user, badge))
            {
                newBadges.Add(badge);
                
                // Award badge
                user.UserBadges.Add(new UserBadge
                {
                    UserId = userId,
                    BadgeId = badge.Id,
                    EarnedAt = DateTime.UtcNow
                });

                // Update eco score
                user.EcoScore += badge.EcoScoreReward;
            }
        }

        if (newBadges.Any())
        {
            await _context.SaveChangesAsync();
            
            // Send notification about new badges
            await _notificationService.SendBadgeNotificationAsync(userId, newBadges);
        }
    }

    private async Task<bool> CheckBadgeCriteria(User user, Badge badge)
    {
        var criteria = JsonSerializer.Deserialize<BadgeCriteria>(badge.Criteria);
        
        return criteria.Type switch
        {
            "plant_count" => user.UserPlants.Count >= criteria.Value,
            "native_plants" => user.UserPlants.Count(up => up.Plant.IsNative) >= criteria.Value,
            "community_posts" => user.CommunityPosts.Count >= criteria.Value,
            "consecutive_days" => await CheckConsecutiveDays(user.Id, criteria.Value),
            _ => false
        };
    }

    public async Task<int> CalculateEcoScoreAsync(Guid userId)
    {
        var user = await _context.Users
            .Include(u => u.UserPlants)
            .ThenInclude(up => up.Plant)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return 0;

        int score = 0;
        
        // Points for native plants (higher value)
        score += user.UserPlants.Count(up => up.Plant.IsNative) * 15;
        
        // Points for non-native plants (lower value)
        score += user.UserPlants.Count(up => !up.Plant.IsNative) * 5;
        
        // Bonus for plant diversity
        var uniqueSpecies = user.UserPlants.Select(up => up.Plant.ScientificName).Distinct().Count();
        score += uniqueSpecies * 10;
        
        // Points for plant care (healthy plants)
        score += user.UserPlants.Count(up => up.Status == "Growing" || up.Status == "Flowering") * 5;

        return score;
    }
}
```

## Deployment Strategy

### Database Deployment
1. **Azure SQL Database** or **SQL Server on premises**
2. **Entity Framework Migrations** for schema updates
3. **Seed data** for initial plant database

### API Deployment
1. **Azure App Service** or **Docker containers**
2. **Application Insights** for monitoring
3. **Azure Key Vault** for API keys

### Web Application Deployment
1. **Azure Static Web Apps** or **Netlify**
2. **PWA** support for offline functionality
3. **CDN** for global performance

### Mobile App Distribution
1. **Google Play Store** (Android)
2. **Apple App Store** (iOS)
3. **Microsoft App Center** for testing and analytics

## Development Timeline

### Week 1: Foundation (7 days)
- Database design and setup
- Shared models and DTOs
- Entity Framework configuration
- Basic API structure

### Week 2: Core API (7 days)
- Plant service implementation
- Weather API integration
- Flora database integration
- Location services

### Week 3: Web Application (7 days)
- Blazor components
- Plant recommendation system
- Community blog features
- User dashboard

### Week 4: Mobile Application (7 days)
- MAUI setup and basic UI
- AR implementation (basic)
- Push notifications
- Gamification features

### Additional Features (Optional - Week 5+)
- Advanced AR features
- Machine learning plant identification
- Social features enhancement
- Advanced analytics

## Cost Estimation

### Development Tools (Free Tier Available)
- Visual Studio Community: Free
- SQL Server Developer Edition: Free
- Azure free tier: $200 credit

### External APIs (Monthly Costs)
- OpenWeatherMap: $0-40/month
- Google Maps API: $0-200/month
- Azure hosting: $50-200/month

### App Store Fees
- Google Play: $25 one-time
- Apple App Store: $99/year

## Technical Challenges & Solutions

### AR Implementation Challenges
**Challenge**: Complex AR features for solo developer
**Solution**: Start with basic AR placement, use existing AR frameworks

### Database Scale
**Challenge**: Large flora database management
**Solution**: Implement caching, use external APIs, paginated results

### Cross-platform Consistency
**Challenge**: UI/UX consistency across web and mobile
**Solution**: Shared component library, consistent design system

### Real-time Features
**Challenge**: Real-time notifications and updates
**Solution**: SignalR for web, push notifications for mobile

This comprehensive guide provides a realistic 4-week development plan for a solo developer to create the PlantPal MVP. The AR features are simplified but functional, and the system is designed to scale and add more advanced features over time.