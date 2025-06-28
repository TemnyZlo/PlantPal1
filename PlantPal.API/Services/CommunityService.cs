using Microsoft.EntityFrameworkCore;
using PlantPal.Data;
using PlantPal.Shared.Models;

namespace PlantPal.API.Services;

public class CommunityService : ICommunityService
{
    private readonly PlantPalDbContext _context;

    public CommunityService(PlantPalDbContext context)
    {
        _context = context;
    }

    public async Task<List<CommunityPost>> GetRecentPostsAsync(int count = 20)
    {
        return await _context.CommunityPosts
            .Include(p => p.User)
            .OrderByDescending(p => p.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<CommunityPost?> GetPostByIdAsync(Guid id)
    {
        return await _context.CommunityPosts
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<CommunityPost> CreatePostAsync(CommunityPost post)
    {
        post.Id = Guid.NewGuid();
        post.CreatedAt = DateTime.UtcNow;
        
        _context.CommunityPosts.Add(post);
        await _context.SaveChangesAsync();
        
        return post;
    }

    public async Task<bool> LikePostAsync(Guid postId)
    {
        var post = await _context.CommunityPosts.FindAsync(postId);
        if (post == null) return false;

        post.Likes++;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<CommunityPost>> GetPostsByUserAsync(Guid userId)
    {
        return await _context.CommunityPosts
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
}