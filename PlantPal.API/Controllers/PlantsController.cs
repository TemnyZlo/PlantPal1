using Microsoft.AspNetCore.Mvc;
using PlantPal.API.Services;
using PlantPal.Shared.DTOs;

namespace PlantPal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlantsController : ControllerBase
{
    private readonly IPlantService _plantService;

    public PlantsController(IPlantService plantService)
    {
        _plantService = plantService;
    }

    [HttpPost("recommendations")]
    public async Task<ActionResult<List<PlantRecommendationDto>>> GetRecommendations(
        [FromBody] PlantRecommendationRequest request)
    {
        var recommendations = await _plantService.GetPlantRecommendationsAsync(
            request.Location, request.SoilType, request.SunExposure);
        return Ok(recommendations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PlantRecommendationDto>> GetPlant(Guid id)
    {
        var plant = await _plantService.GetPlantByIdAsync(id);
        if (plant == null) return NotFound();
        return Ok(plant);
    }

    [HttpGet]
    public async Task<ActionResult<List<PlantRecommendationDto>>> GetAllPlants()
    {
        var plants = await _plantService.GetAllPlantsAsync();
        return Ok(plants);
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<PlantRecommendationDto>>> SearchPlants([FromQuery] string query)
    {
        var plants = await _plantService.SearchPlantsAsync(query);
        return Ok(plants);
    }

    [HttpPost("native")]
    public async Task<ActionResult<List<PlantRecommendationDto>>> GetNativePlants([FromBody] LocationDto location)
    {
        var plants = await _plantService.GetNativePlantsAsync(location);
        return Ok(plants);
    }
}