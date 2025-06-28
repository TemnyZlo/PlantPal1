using Microsoft.EntityFrameworkCore;
using PlantPal.Data;
using PlantPal.Shared.Models;
using System.Text.Json;

namespace PlantPal.API.Services;

public class GamificationService : IGamificationService
{
    private readonly PlantPalDbContext _context;

    public GamificationService(PlantPalDbContext context)
    {
        _context = context;
    }

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
                
                user.UserBadges.Add(new UserBadge
                {
                    UserId = userId,
                    BadgeId = badge.Id,
                    EarnedAt = DateTime.UtcNow
                });

                user.EcoScore += badge.EcoScoreReward;
            }
        }

        if (newBadges.Any())
        {
            await _context.SaveChangesAsync();
        }
    }

    public async Task<int> CalculateEcoScoreAsync(Guid userId)
    {
        var user = await _context.Users
            .Include(u => u.UserPlants)
            .ThenInclude(up => up.Plant)
            .Include(u => u.UserBadges)
            .ThenInclude(ub => ub.Badge)
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

        // Add badge rewards
        score += user.UserBadges.Sum(ub => ub.Badge.EcoScoreReward);

        return score;
    }

    public async Task<List<Badge>> GetUserBadgesAsync(Guid userId)
    {
        return await _context.UserBadges
            .Where(ub => ub.UserId == userId)
            .Include(ub => ub.Badge)
            .Select(ub => ub.Badge)
            .ToListAsync();
    }

    public async Task<List<Badge>> GetAllBadgesAsync()
    {
        return await _context.Badges.ToListAsync();
    }

    private async Task<bool> CheckBadgeCriteria(User user, Badge badge)
    {
        if (string.IsNullOrEmpty(badge.Criteria)) return false;

        try
        {
            var criteria = JsonSerializer.Deserialize<BadgeCriteria>(badge.Criteria);
            if (criteria == null) return false;
            
            return criteria.Type switch
            {
                "plant_count" => user.UserPlants.Count >= criteria.Value,
                "native_plants" => user.UserPlants.Count(up => up.Plant.IsNative) >= criteria.Value,
                "community_posts" => user.CommunityPosts.Count >= criteria.Value,
                _ => false
            };
        }
        catch
        {
            return false;
        }
    }

    private class BadgeCriteria
    {
        public string Type { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}