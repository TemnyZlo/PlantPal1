using PlantPal.Shared.DTOs;
using PlantPal.Shared.Models;
using System.Text;
using System.Text.Json;

namespace PlantPal.Web.Services;

public class ApiService
{
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonOptions;

    public ApiService(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient("PlantPalAPI");
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    // Plant methods
    public async Task<List<PlantRecommendationDto>> GetPlantRecommendationsAsync(PlantRecommendationRequest request)
    {
        var json = JsonSerializer.Serialize(request, _jsonOptions);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await _httpClient.PostAsync("api/plants/recommendations", content);
        response.EnsureSuccessStatusCode();
        
        var responseJson = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<PlantRecommendationDto>>(responseJson, _jsonOptions) ?? new();
    }

    public async Task<List<Plant>> GetAllPlantsAsync()
    {
        var response = await _httpClient.GetAsync("api/plants");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Plant>>(json, _jsonOptions) ?? new();
    }

    public async Task<List<Plant>> SearchPlantsAsync(string query)
    {
        var response = await _httpClient.GetAsync($"api/plants/search?query={Uri.EscapeDataString(query)}");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Plant>>(json, _jsonOptions) ?? new();
    }

    // Community methods
    public async Task<List<CommunityPost>> GetRecentPostsAsync(int count = 20)
    {
        var response = await _httpClient.GetAsync($"api/community/posts?count={count}");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<CommunityPost>>(json, _jsonOptions) ?? new();
    }

    public async Task<CommunityPost> CreatePostAsync(CommunityPost post)
    {
        var json = JsonSerializer.Serialize(post, _jsonOptions);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await _httpClient.PostAsync("api/community/posts", content);
        response.EnsureSuccessStatusCode();
        
        var responseJson = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<CommunityPost>(responseJson, _jsonOptions)!;
    }

    public async Task LikePostAsync(Guid postId)
    {
        var response = await _httpClient.PostAsync($"api/community/posts/{postId}/like", null);
        response.EnsureSuccessStatusCode();
    }

    // Gamification methods
    public async Task<List<Badge>> GetAllBadgesAsync()
    {
        var response = await _httpClient.GetAsync("api/gamification/badges");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Badge>>(json, _jsonOptions) ?? new();
    }

    public async Task<List<Badge>> GetUserBadgesAsync(Guid userId)
    {
        var response = await _httpClient.GetAsync($"api/gamification/users/{userId}/badges");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Badge>>(json, _jsonOptions) ?? new();
    }

    public async Task<int> GetEcoScoreAsync(Guid userId)
    {
        var response = await _httpClient.GetAsync($"api/gamification/users/{userId}/eco-score");
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<int>(json, _jsonOptions);
    }
}