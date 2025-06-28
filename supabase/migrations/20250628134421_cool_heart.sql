/*
  # Initial Database Schema for PlantPal

  1. New Tables
    - `Users` - User accounts with location and eco score tracking
    - `Plants` - Plant database with care instructions and native status
    - `UserGardens` - User's garden spaces with location and soil info
    - `UserPlants` - Plants in user's gardens with status tracking
    - `CommunityPosts` - Blog posts and community sharing
    - `Badges` - Achievement badges for gamification
    - `UserBadges` - User's earned badges
    - `PlantCareReminders` - Care reminder system
    - `WeatherData` - Weather information cache

  2. Security
    - All tables have proper relationships and constraints
    - Indexes for performance on frequently queried columns

  3. Features
    - Gamification system with badges and eco scores
    - Community blog functionality
    - Plant care tracking and reminders
    - Location-based recommendations
*/

-- Users table
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Username NVARCHAR(100) UNIQUE NOT NULL,
    Latitude FLOAT NULL,
    Longitude FLOAT NULL,
    City NVARCHAR(100) NULL,
    State NVARCHAR(100) NULL,
    Country NVARCHAR(100) NULL,
    EcoScore INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Plants table
CREATE TABLE Plants (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ScientificName NVARCHAR(255) NOT NULL,
    CommonName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    CareInstructions NVARCHAR(MAX) NULL,
    IsNative BIT DEFAULT 0,
    GrowthStage NVARCHAR(50) NULL,
    WaterRequirements NVARCHAR(100) NULL,
    SunRequirements NVARCHAR(100) NULL,
    SoilType NVARCHAR(100) NULL,
    BloomingSeason NVARCHAR(100) NULL,
    ImageUrl NVARCHAR(500) NULL,
    ModelUrl NVARCHAR(500) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- User Gardens table
CREATE TABLE UserGardens (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Latitude FLOAT NULL,
    Longitude FLOAT NULL,
    Size DECIMAL(10,2) NULL,
    SoilType NVARCHAR(100) NULL,
    SunExposure NVARCHAR(100) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- User Plants table
CREATE TABLE UserPlants (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    PlantId UNIQUEIDENTIFIER NOT NULL,
    GardenId UNIQUEIDENTIFIER NULL,
    PlantedDate DATETIME2 DEFAULT GETUTCDATE(),
    Status NVARCHAR(50) DEFAULT 'Growing',
    Position NVARCHAR(100) NULL,
    Notes NVARCHAR(MAX) NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (PlantId) REFERENCES Plants(Id),
    FOREIGN KEY (GardenId) REFERENCES UserGardens(Id) ON DELETE SET NULL
);

-- Community Posts table
CREATE TABLE CommunityPosts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImageUrls NVARCHAR(MAX) NULL,
    Tags NVARCHAR(500) NULL,
    Likes INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Badges table
CREATE TABLE Badges (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(255) NULL,
    IconUrl NVARCHAR(500) NULL,
    Criteria NVARCHAR(MAX) NULL,
    EcoScoreReward INT DEFAULT 0
);

-- User Badges table (many-to-many)
CREATE TABLE UserBadges (
    UserId UNIQUEIDENTIFIER NOT NULL,
    BadgeId UNIQUEIDENTIFIER NOT NULL,
    EarnedAt DATETIME2 DEFAULT GETUTCDATE(),
    PRIMARY KEY (UserId, BadgeId),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (BadgeId) REFERENCES Badges(Id) ON DELETE CASCADE
);

-- Plant Care Reminders table
CREATE TABLE PlantCareReminders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserPlantId UNIQUEIDENTIFIER NOT NULL,
    ReminderType NVARCHAR(50) NOT NULL,
    NextDueDate DATETIME2 NOT NULL,
    Frequency INT NOT NULL,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (UserPlantId) REFERENCES UserPlants(Id) ON DELETE CASCADE
);

-- Weather Data table
CREATE TABLE WeatherData (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Latitude FLOAT NOT NULL,
    Longitude FLOAT NOT NULL,
    Temperature DECIMAL(5,2) NULL,
    Humidity DECIMAL(5,2) NULL,
    Precipitation DECIMAL(5,2) NULL,
    UVIndex DECIMAL(3,1) NULL,
    RecordedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Create indexes for performance
CREATE INDEX IX_Plants_ScientificName ON Plants(ScientificName);
CREATE INDEX IX_Plants_CommonName ON Plants(CommonName);
CREATE INDEX IX_Plants_IsNative ON Plants(IsNative);
CREATE INDEX IX_UserPlants_UserId ON UserPlants(UserId);
CREATE INDEX IX_UserPlants_PlantId ON UserPlants(PlantId);
CREATE INDEX IX_CommunityPosts_UserId ON CommunityPosts(UserId);
CREATE INDEX IX_CommunityPosts_CreatedAt ON CommunityPosts(CreatedAt);
CREATE INDEX IX_WeatherData_Location_Time ON WeatherData(Latitude, Longitude, RecordedAt);