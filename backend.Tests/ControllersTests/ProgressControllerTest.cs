using backend.controllers;
using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

public class ProgressControllerTest
{
    [Fact]
    public async Task GetProgresses_ShouldReturnOkResult_WithProgresses()
    {
        var mockService = new Mock<IProgressService>();
        mockService.Setup(s => s.GetAllProgressesAsync())
            .ReturnsAsync(new List<ProgressDto>
            {
                new ProgressDto { Id = 1, ProgressPercentage = 50},
                new ProgressDto { Id = 2, ProgressPercentage = 40}
            });
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.GetProgresses();
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var progresses = Assert.IsType<List<ProgressDto>>(okResult.Value);
        
        Assert.Collection(progresses,
            progress =>
            {
                Assert.Equal(1, progress.Id);
                Assert.Equal(50, progress.ProgressPercentage);
            },
            progress =>
            {
                Assert.Equal(2, progress.Id);
                Assert.Equal(40, progress.ProgressPercentage);
            });
    }
    
    [Fact]
    public async Task GetProgress_ShouldReturnOkResult_WithProgress()
    {
        var mockService = new Mock<IProgressService>();
        mockService.Setup(s => s.GetProgressByIdAsync(1))
            .ReturnsAsync(new ProgressDto { Id = 1, ProgressPercentage = 50});
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.GetProgress(1);
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var progress = Assert.IsType<ProgressDto>(okResult.Value);
        
        Assert.Equal(1, progress.Id);
        Assert.Equal(50, progress.ProgressPercentage);
    }

    [Fact]
    public async Task GetProgresses_ShouldReturnNotFound_WhenProgressDoesNotExist()
    {
        var mockService = new Mock<IProgressService>();
        
        mockService.Setup(s => s.GetProgressByIdAsync(1))
            .ReturnsAsync((ProgressDto)null); 
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.GetProgress(1);
        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        
        Assert.Equal(404, notFoundResult.StatusCode);
    }
    
    [Fact]
    public async Task PostReason_ShouldReturnCreatedResult_WithProgress()
    {
        var mockService = new Mock<IProgressService>();
        var progressDto = new ProgressDto { Id = 1, ProgressPercentage = 50};
        
        mockService.Setup(s => s.CreateProgressAsync(progressDto))
            .ReturnsAsync(progressDto);
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.CreateProgress(progressDto);
        
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var createdProgress = Assert.IsType<ProgressDto>(createdAtActionResult.Value);
        
        Assert.Equal(1, createdProgress.Id);
        Assert.Equal(50, createdProgress.ProgressPercentage);
    }

    [Fact]
    public async Task PutProgress_ShouldReturnNoContent_WhenUpdated()
    {
        var mockService = new Mock<IProgressService>();
        var progressDto = new ProgressDto { Id = 1, ProgressPercentage = 50};
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.UpdateProgress(1, progressDto);
        
        Assert.IsType<NoContentResult>(result.Result);
    }
    
    [Fact]
    public async Task PutProgress_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<IProgressService>();
        var progressDto = new ProgressDto { Id = 1, ProgressPercentage = 50};
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.UpdateProgress(2, progressDto);
        
        Assert.IsType<BadRequestResult>(result.Result);
    }
    
    [Fact]
    public async Task DeleteProgress_ShouldReturnNoContent_WhenDeleted()
    {
        var mockService = new Mock<IProgressService>();
        
        var controller = new ProgressesController(mockService.Object);
        
        var result = await controller.DeleteProgress(1);
        
        Assert.IsType<NoContentResult>(result.Result);
    }
    

    
    
}