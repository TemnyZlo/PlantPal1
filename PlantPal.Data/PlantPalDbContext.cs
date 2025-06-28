using Microsoft.EntityFrameworkCore;
using PlantPal.Shared.Models;

namespace PlantPal.Data;

public class PlantPalDbContext : DbContext
{
    public PlantPalDbContext(DbContextOptions<PlantPalDbContext> options) : base(options)
    {
    }

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
        // Configure User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Username).IsUnique();
        });

        // Configure Plant entity
        modelBuilder.Entity<Plant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.ScientificName);
            entity.HasIndex(e => e.CommonName);
        });

        // Configure UserGarden entity
        modelBuilder.Entity<UserGarden>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                  .WithMany(u => u.UserGardens)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure UserPlant entity
        modelBuilder.Entity<UserPlant>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                  .WithMany(u => u.UserPlants)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Plant)
                  .WithMany()
                  .HasForeignKey(e => e.PlantId)
                  .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Garden)
                  .WithMany(g => g.UserPlants)
                  .HasForeignKey(e => e.GardenId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Configure CommunityPost entity
        modelBuilder.Entity<CommunityPost>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                  .WithMany(u => u.CommunityPosts)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure Badge entity
        modelBuilder.Entity<Badge>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name).IsUnique();
        });

        // Configure UserBadge entity (many-to-many)
        modelBuilder.Entity<UserBadge>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.BadgeId });
            entity.HasOne(e => e.User)
                  .WithMany(u => u.UserBadges)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Badge)
                  .WithMany(b => b.UserBadges)
                  .HasForeignKey(e => e.BadgeId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure PlantCareReminder entity
        modelBuilder.Entity<PlantCareReminder>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.UserPlant)
                  .WithMany(up => up.CareReminders)
                  .HasForeignKey(e => e.UserPlantId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure WeatherData entity
        modelBuilder.Entity<WeatherData>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.Latitude, e.Longitude, e.RecordedAt });
        });

        base.OnModelCreating(modelBuilder);
    }
}