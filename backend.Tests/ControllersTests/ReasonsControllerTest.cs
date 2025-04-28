using backend.controllers;
using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

public class ReasonsControllerTest
{
    [Fact]
    public async Task GetReasons_ShouldReturnOkResult_WithReasons()
    {
        var mockService = new Mock <IReasonService>();
        mockService.Setup(s => s.GetAllReasonsAsync())
            .ReturnsAsync(new List<ReasonDto>{
                new ReasonDto { Id = 1, ReasonTitle = "Test Reason 1", 
                    ReasonContent = "Test Content 1", IsRead = false },
                new ReasonDto { Id = 2, ReasonTitle = "Test Reason 2", 
                    ReasonContent = "Test Content 2", IsRead = true }
            });
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.GetReasons();
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var reasons = Assert.IsType<List<ReasonDto>>(okResult.Value);
        
        Assert.Collection(reasons,
            reason =>
            {
                Assert.Equal(1, reason.Id);
                Assert.Equal("Test Reason 1", reason.ReasonTitle);
                Assert.Equal("Test Content 1", reason.ReasonContent);
                Assert.False(reason.IsRead);
            },
            reason =>
            {
                Assert.Equal(2, reason.Id);
                Assert.Equal("Test Reason 2", reason.ReasonTitle);
                Assert.Equal("Test Content 2", reason.ReasonContent);
                Assert.True(reason.IsRead);
            });
    }

    [Fact]
    public async Task GetReason_ShouldReturnOkResult_WithReason()
    {
        var mockService = new Mock<IReasonService>();
        mockService.Setup(s => s.GetReasonByIdAsync(1))
            .ReturnsAsync(new ReasonDto { Id = 1, ReasonTitle = "Test Reason", 
                ReasonContent = "Test Content", IsRead = false });
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.GetReason(1);
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var reason = Assert.IsType<ReasonDto>(okResult.Value);
        
        Assert.Equal(1, reason.Id);
        Assert.Equal("Test Reason", reason.ReasonTitle);
        Assert.Equal("Test Content", reason.ReasonContent);
        Assert.False(reason.IsRead);
    }

    [Fact]
    public async Task GetReason_ShouldReturnNotFound_WhenReasonDoesNotExist()
    {
        var mockService = new Mock<IReasonService>();
        
        mockService.Setup(s => s.GetReasonByIdAsync(1))
            .ReturnsAsync((ReasonDto)null);
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.GetReason(1);
        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    [Fact]
    public async Task PostReason_ShouldReturnCreatedResult_WithReason()
    {
        var mockService = new Mock<IReasonService>();
        var reasonDto = new ReasonDto { Id = 1, ReasonTitle = "Test Reason", 
            ReasonContent = "Test Content", IsRead = false };
        
        mockService.Setup(s => s.CreateReasonAsync(reasonDto))
            .ReturnsAsync(reasonDto);
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.CreateReason(reasonDto);
        
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var createdReason = Assert.IsType<ReasonDto>(createdResult.Value);
        
        Assert.Equal(1, createdReason.Id);
        Assert.Equal("Test Reason", createdReason.ReasonTitle);
        Assert.Equal("Test Content", createdReason.ReasonContent);
        Assert.False(createdReason.IsRead);
    }

    [Fact]
    public async Task PutReason_ShouldReturnNoContent_WhenUpdated()
    {
        var mockService = new Mock<IReasonService>();
        var reasonDto = new ReasonDto { Id = 1, ReasonTitle = "Updated Reason", 
            ReasonContent = "Updated Content", IsRead = true };
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.UpdateReason(1, reasonDto);
        
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task PutReason_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<IReasonService>();
        var reasonDto = new ReasonDto { Id = 1, ReasonTitle = "Updated Reason", 
            ReasonContent = "Updated Content", IsRead = true };
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.UpdateReason(2, reasonDto);
        
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task DeleteReason_ShouldReturnNoContent_WhenReasonIsDeleted()
    {
        var mockService = new Mock<IReasonService>();
        mockService.Setup(s => s.DeleteReasonAsync(1))
            .Returns(Task.CompletedTask);
        
        var controller = new ReasonsController(mockService.Object);
        
        var result = await controller.DeleteReason(1);
        
        Assert.IsType<NoContentResult>(result);
    }
    
}