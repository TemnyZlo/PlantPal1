using Microsoft.EntityFrameworkCore;
using PlantPal.API.Services;
using PlantPal.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Entity Framework - Use InMemory for demo
builder.Services.AddDbContext<PlantPalDbContext>(options =>
    options.UseInMemoryDatabase("PlantPalDb"));

// Add HTTP Client
builder.Services.AddHttpClient();

// Add custom services
builder.Services.AddScoped<IPlantService, PlantService>();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddScoped<ICommunityService, CommunityService>();
builder.Services.AddScoped<IGamificationService, GamificationService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PlantPalDbContext>();
    await SeedData.SeedAsync(context);
}

app.Run();