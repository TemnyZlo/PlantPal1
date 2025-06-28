using Microsoft.EntityFrameworkCore;
using PlantPal.Shared.Models;
using System.Text.Json;

namespace PlantPal.Data;

public static class SeedData
{
    public static async Task SeedAsync(PlantPalDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Seed Plants
        if (!await context.Plants.AnyAsync())
        {
            var plants = new List<Plant>
            {
                new Plant
                {
                    Id = Guid.NewGuid(),
                    ScientificName = "Echinacea purpurea",
                    CommonName = "Purple Coneflower",
                    Description = "A beautiful native wildflower that attracts butterflies and bees.",
                    CareInstructions = "Plant in full sun to partial shade. Water regularly during first year, then drought tolerant.",
                    IsNative = true,
                    GrowthStage = "Perennial",
                    WaterRequirements = "Low to Medium",
                    SunRequirements = "Full Sun to Partial Shade",
                    SoilType = "Well-drained",
                    BloomingSeason = "Summer to Fall",
                    ImageUrl = "https://images.pexels.com/photos/56866/garden-flower-purple-echinacea-56866.jpeg"
                },
                new Plant
                {
                    Id = Guid.NewGuid(),
                    ScientificName = "Rudbeckia fulgida",
                    CommonName = "Black-eyed Susan",
                    Description = "Bright yellow flowers that bloom from summer through fall.",
                    CareInstructions = "Very easy to grow. Tolerates poor soil and drought conditions.",
                    IsNative = true,
                    GrowthStage = "Perennial",
                    WaterRequirements = "Low",
                    SunRequirements = "Full Sun",
                    SoilType = "Any well-drained soil",
                    BloomingSeason = "Summer to Fall",
                    ImageUrl = "https://images.pexels.com/photos/158028/bellis-perennis-daisy-flower-spring-158028.jpeg"
                },
                new Plant
                {
                    Id = Guid.NewGuid(),
                    ScientificName = "Asclepias speciosa",
                    CommonName = "Showy Milkweed",
                    Description = "Essential for monarch butterflies and other pollinators.",
                    CareInstructions = "Plant in full sun. Drought tolerant once established. Do not use pesticides.",
                    IsNative = true,
                    GrowthStage = "Perennial",
                    WaterRequirements = "Low",
                    SunRequirements = "Full Sun",
                    SoilType = "Sandy to clay",
                    BloomingSeason = "Late Spring to Summer",
                    ImageUrl = "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg"
                },
                new Plant
                {
                    Id = Guid.NewGuid(),
                    ScientificName = "Ocimum basilicum",
                    CommonName = "Sweet Basil",
                    Description = "Popular culinary herb that's easy to grow indoors or outdoors.",
                    CareInstructions = "Needs warm temperatures and regular watering. Pinch flowers to encourage leaf growth.",
                    IsNative = false,
                    GrowthStage = "Annual",
                    WaterRequirements = "Medium",
                    SunRequirements = "Full Sun",
                    SoilType = "Rich, well-drained",
                    BloomingSeason = "Summer",
                    ImageUrl = "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg"
                },
                new Plant
                {
                    Id = Guid.NewGuid(),
                    ScientificName = "Lavandula angustifolia",
                    CommonName = "English Lavender",
                    Description = "Fragrant herb with beautiful purple flowers. Great for relaxation and cooking.",
                    CareInstructions = "Plant in full sun with excellent drainage. Drought tolerant once established.",
                    IsNative = false,
                    GrowthStage = "Perennial",
                    WaterRequirements = "Low",
                    SunRequirements = "Full Sun",
                    SoilType = "Well-drained, alkaline",
                    BloomingSeason = "Summer",
                    ImageUrl = "https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg"
                }
            };

            await context.Plants.AddRangeAsync(plants);
        }

        // Seed Badges
        if (!await context.Badges.AnyAsync())
        {
            var badges = new List<Badge>
            {
                new Badge
                {
                    Id = Guid.NewGuid(),
                    Name = "Green Thumb",
                    Description = "Plant your first plant",
                    IconUrl = "🌱",
                    Criteria = JsonSerializer.Serialize(new { Type = "plant_count", Value = 1 }),
                    EcoScoreReward = 10
                },
                new Badge
                {
                    Id = Guid.NewGuid(),
                    Name = "Native Gardener",
                    Description = "Plant 5 native species",
                    IconUrl = "🌿",
                    Criteria = JsonSerializer.Serialize(new { Type = "native_plants", Value = 5 }),
                    EcoScoreReward = 50
                },
                new Badge
                {
                    Id = Guid.NewGuid(),
                    Name = "Community Helper",
                    Description = "Share 10 posts with the community",
                    IconUrl = "🤝",
                    Criteria = JsonSerializer.Serialize(new { Type = "community_posts", Value = 10 }),
                    EcoScoreReward = 25
                },
                new Badge
                {
                    Id = Guid.NewGuid(),
                    Name = "Garden Master",
                    Description = "Maintain 20 healthy plants",
                    IconUrl = "🏆",
                    Criteria = JsonSerializer.Serialize(new { Type = "plant_count", Value = 20 }),
                    EcoScoreReward = 100
                }
            };

            await context.Badges.AddRangeAsync(badges);
        }

        await context.SaveChangesAsync();
    }
}