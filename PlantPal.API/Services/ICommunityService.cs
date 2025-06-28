using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public interface ICommunityService
{
    Task<List<CommunityPost>> GetRecentPostsAsync(int count = 20);
    Task<CommunityPost?> GetPostByIdAsync(Guid id);
    Task<CommunityPost> CreatePostAsync(CommunityPost post);
    Task<bool> LikePostAsync(Guid postId);
    Task<List<CommunityPost>> GetPostsByUserAsync(Guid userId);
}