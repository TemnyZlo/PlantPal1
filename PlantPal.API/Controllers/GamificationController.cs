using Microsoft.AspNetCore.Mvc;
using PlantPal.API.Services;
using PlantPal.Shared.Models;

namespace PlantPal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamificationController : ControllerBase
{
    private readonly IGamificationService _gamificationService;

    public GamificationController(IGamificationService gamificationService)
    {
        _gamificationService = gamificationService;
    }

    [HttpGet("badges")]
    public async Task<ActionResult<List<Badge>>> GetAllBadges()
    {
        var badges = await _gamificationService.GetAllBadgesAsync();
        return Ok(badges);
    }

    [HttpGet("users/{userId}/badges")]
    public async Task<ActionResult<List<Badge>>> GetUserBadges(Guid userId)
    {
        var badges = await _gamificationService.GetUserBadgesAsync(userId);
        return Ok(badges);
    }

    [HttpGet("users/{userId}/eco-score")]
    public async Task<ActionResult<int>> GetEcoScore(Guid userId)
    {
        var score = await _gamificationService.CalculateEcoScoreAsync(userId);
        return Ok(score);
    }

    [HttpPost("users/{userId}/check-badges")]
    public async Task<ActionResult> CheckBadges(Guid userId)
    {
        await _gamificationService.CheckAndAwardBadgesAsync(userId);
        return Ok();
    }
}