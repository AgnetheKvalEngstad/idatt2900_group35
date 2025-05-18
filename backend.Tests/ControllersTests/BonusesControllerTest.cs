using backend.controllers;
using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

/// <summary>
/// This class contains unit tests for the BonusesController
/// </summary>
public class BonusesControllerTest
{
    [Fact]
    public async Task GetBonuses_ShouldReturnOkResult_WithBonuses()
    {
        var mockService = new Mock<IBonusService>();
        mockService.Setup(b => b.GetAllBonusesAsync())
            .ReturnsAsync(new List<BonusDto>
            {
                new BonusDto
                {
                    Id = 1, Title = "Test Bonus 1", Description = "Test Bonus 1" ,
                    Icon = "Test Icon 1", PointsNeeded = 10},
                new BonusDto
                {
                    Id = 2, Title = "Test Bonus 2", Description = "Test Bonus 2" ,
                    Icon = "Test Icon 2", PointsNeeded = 20}
                });
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.GetBonuses();
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var bonuses = Assert.IsType<List<BonusDto>>(okResult.Value);
        
        Assert.Collection(bonuses,
            bonus =>
            {
                Assert.Equal(1, bonus.Id);
                Assert.Equal("Test Bonus 1", bonus.Title);
                Assert.Equal("Test Bonus 1", bonus.Description);
                Assert.Equal("Test Icon 1", bonus.Icon);
                Assert.Equal(10, bonus.PointsNeeded);
            },
            bonus =>
            {
                Assert.Equal(2, bonus.Id);
                Assert.Equal("Test Bonus 2", bonus.Title);
                Assert.Equal("Test Bonus 2", bonus.Description);
                Assert.Equal("Test Icon 2", bonus.Icon);
                Assert.Equal(20, bonus.PointsNeeded);
            });
    }
    
    [Fact]
    public async Task GetBonus_ShouldReturnOkResult_WithBonus()
    {
        var mockService = new Mock<IBonusService>();
        mockService.Setup(b => b.GetBonusByIdAsync(1))
            .ReturnsAsync(new BonusDto
            {
                Id = 1, Title = "Test Bonus", Description = "Test Bonus" ,
                Icon = "Test Icon", PointsNeeded = 10});
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.GetBonus(1);
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var bonus = Assert.IsType<BonusDto>(okResult.Value);
        
        Assert.Equal(1, bonus.Id);
        Assert.Equal("Test Bonus", bonus.Title);
        Assert.Equal("Test Bonus", bonus.Description);
        Assert.Equal("Test Icon", bonus.Icon);
        Assert.Equal(10, bonus.PointsNeeded);
    }
    
    [Fact]
    public async Task GetBonus_ShouldReturnNotFound_WhenBonusDoesNotExist()
    {
        var mockService = new Mock<IBonusService>();
        mockService.Setup(b => b.GetBonusByIdAsync(1))
            .ReturnsAsync((BonusDto)null);
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.GetBonus(1);
        
        Assert.IsType<NotFoundResult>(result.Result);
    }
    
    [Fact]
    public async Task PostBonus_ShouldReturnCreatedResult_WithBonus()
    {
        var mockService = new Mock<IBonusService>();
        var bonusDto = new BonusDto
        {
            Id = 1, Title = "Test Bonus", Description = "Test Bonus" ,
            Icon = "Test Icon", PointsNeeded = 10};
        
        mockService.Setup(b => b.CreateBonusAsync(bonusDto))
            .ReturnsAsync(bonusDto);
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.CreateBonus(bonusDto);
        
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var bonus = Assert.IsType<BonusDto>(createdAtActionResult.Value);
        
        Assert.Equal(1, bonus.Id);
        Assert.Equal("Test Bonus", bonus.Title);
        Assert.Equal("Test Bonus", bonus.Description);
        Assert.Equal("Test Icon", bonus.Icon);
        Assert.Equal(10, bonus.PointsNeeded);
    }

    [Fact]
    public async Task PutBonus_ShouldReturnNoContent_WhenUpdated()
    {
        var mockService = new Mock<IBonusService>();
        var bonusDto = new BonusDto
        {
            Id = 1, Title = "Test Bonus", Description = "Test Bonus" ,
            Icon = "Test Icon", PointsNeeded = 10};
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.UpdateBonus(1, bonusDto);
        
        Assert.IsType<NoContentResult>(result.Result);
    }

    [Fact]
    public async Task PutBonus_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<IBonusService>();
        var bonusDto = new BonusDto
        {
            Id = 1, Title = "Test Bonus", Description = "Test Bonus" ,
            Icon = "Test Icon", PointsNeeded = 10};
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.UpdateBonus(2, bonusDto);
        
        Assert.IsType<BadRequestResult>(result.Result);
    }
    
    
    [Fact]
    public async Task DeleteBonus_ShouldReturnNoContent_WhenDeleted()
    {
        var mockService = new Mock<IBonusService>();
        mockService.Setup(b => b.DeleteBonusAsync(1))
            .Returns(Task.CompletedTask);
        
        var controller = new BonusesController(mockService.Object);
        
        var result = await controller.DeleteBonus(1);
        
        Assert.IsType<NoContentResult>(result.Result);
    }
}