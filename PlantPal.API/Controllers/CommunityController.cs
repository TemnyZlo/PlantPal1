using Microsoft.AspNetCore.Mvc;
using PlantPal.API.Services;
using PlantPal.Shared.Models;

namespace PlantPal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommunityController : ControllerBase
{
    private readonly ICommunityService _communityService;

    public CommunityController(ICommunityService communityService)
    {
        _communityService = communityService;
    }

    [HttpGet("posts")]
    public async Task<ActionResult<List<CommunityPost>>> GetRecentPosts([FromQuery] int count = 20)
    {
        var posts = await _communityService.GetRecentPostsAsync(count);
        return Ok(posts);
    }

    [HttpGet("posts/{id}")]
    public async Task<ActionResult<CommunityPost>> GetPost(Guid id)
    {
        var post = await _communityService.GetPostByIdAsync(id);
        if (post == null) return NotFound();
        return Ok(post);
    }

    [HttpPost("posts")]
    public async Task<ActionResult<CommunityPost>> CreatePost([FromBody] CommunityPost post)
    {
        var createdPost = await _communityService.CreatePostAsync(post);
        return CreatedAtAction(nameof(GetPost), new { id = createdPost.Id }, createdPost);
    }

    [HttpPost("posts/{id}/like")]
    public async Task<ActionResult> LikePost(Guid id)
    {
        var success = await _communityService.LikePostAsync(id);
        if (!success) return NotFound();
        return Ok();
    }

    [HttpGet("users/{userId}/posts")]
    public async Task<ActionResult<List<CommunityPost>>> GetUserPosts(Guid userId)
    {
        var posts = await _communityService.GetPostsByUserAsync(userId);
        return Ok(posts);
    }
}