using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public interface IGamificationService
{
    Task CheckAndAwardBadgesAsync(Guid userId);
    Task<int> CalculateEcoScoreAsync(Guid userId);
    Task<List<Badge>> GetUserBadgesAsync(Guid userId);
    Task<List<Badge>> GetAllBadgesAsync();
}