using backend.controllers;
using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

public class SubtopicsControllerTest
{
    [Fact]
    public async Task GetSubtopics_ShouldReturnOkResult_WithSubtopics()
    {
        var mockService = new Mock<ISubtopicService>();
        mockService.Setup(s => s.GetAllSubtopicsAsync())
            .ReturnsAsync(new List<SubtopicDto>
            {
                new SubtopicDto { Id = 1, Title = "Test Subtopic 1", SubtopicContent = "Test Content 1" },
                new SubtopicDto { Id = 2, Title = "Test Subtopic 2", SubtopicContent = "Test Content 2" }
            });

        var controller = new SubtopicsController(mockService.Object);

        var result = await controller.GetSubtopics();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var subtopics = Assert.IsType<List<SubtopicDto>>(okResult.Value);

        Assert.Collection(subtopics,
            subtopic =>
            {
                Assert.Equal(1, subtopic.Id);
                Assert.Equal("Test Subtopic 1", subtopic.Title);
                Assert.Equal("Test Content 1", subtopic.SubtopicContent);
            },
            subtopic =>
            {
                Assert.Equal(2, subtopic.Id);
                Assert.Equal("Test Subtopic 2", subtopic.Title);
                Assert.Equal("Test Content 2", subtopic.SubtopicContent);
            });
    }
    
    [Fact]
    public async Task GetSubtopic_ShouldReturnOkResult_WithSubtopic()
    {
        var mockService = new Mock<ISubtopicService>();
        mockService.Setup(s => s.GetSubtopicByIdAsync(1))
            .ReturnsAsync(new SubtopicDto { Id = 1, Title = "Test Subtopic", SubtopicContent = "Test Content" });

        var controller = new SubtopicsController(mockService.Object);

        var result = await controller.GetSubtopic(1);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var subtopic = Assert.IsType<SubtopicDto>(okResult.Value);

        Assert.Equal(1, subtopic.Id);
        Assert.Equal("Test Subtopic", subtopic.Title);
        Assert.Equal("Test Content", subtopic.SubtopicContent);
    }
    
    [Fact]
    public async Task GetSubtopic_ShouldReturnNotFound_WhenSubtopicDoesNotExist()
    {
        var mockService = new Mock<ISubtopicService>();
        mockService.Setup(s => s.GetSubtopicByIdAsync(1))
            .ReturnsAsync((SubtopicDto)null);

        var controller = new SubtopicsController(mockService.Object);

        var result = await controller.GetSubtopic(1);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task PostSubtopic_ShouldReturnCreatedResult_WithSubtopic()
    {
        var mockService = new Mock<ISubtopicService>();
        var subtopicDto = new SubtopicDto { Id = 1, Title = "New Subtopic", SubtopicContent = "New Content" };
        
        mockService.Setup(s => s.CreateSubtopicAsync(subtopicDto))
            .ReturnsAsync(subtopicDto);
        
        var controller = new SubtopicsController(mockService.Object);
        
        var result = await controller.CreateSubtopic(subtopicDto);
        
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var createdSubtopic = Assert.IsType<SubtopicDto>(createdResult.Value);
        
        Assert.Equal(1, createdSubtopic.Id);
        Assert.Equal("New Subtopic", createdSubtopic.Title);
        Assert.Equal("New Content", createdSubtopic.SubtopicContent);
    }

    [Fact]
    public async Task PutSubtopic_ShouldReturnNoContent_WhenUpdated()
    {
        var mockService = new Mock<ISubtopicService>();
        var subtopicDto = new SubtopicDto { Id = 1, Title = "Updated Subtopic", SubtopicContent = "Updated Content" };
        
        var controller = new SubtopicsController(mockService.Object);
        
        var result = await controller.UpdateSubtopic(1, subtopicDto);
        
        Assert.IsType<NoContentResult>(result);
        
    }

    [Fact]
    public async Task PutSubtopic_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<ISubtopicService>();
        var subtopicDto = new SubtopicDto { Id = 1, Title = "Updated Subtopic", SubtopicContent = "Updated Content" };
        
        var controller = new SubtopicsController(mockService.Object);
        
        var result = await controller.UpdateSubtopic(2, subtopicDto);
        
        var badRequestResult = Assert.IsType<BadRequestResult>(result);
        
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task DeleteSubtopic_ShouldReturnNoContent_WhenSubtopicIsDeleted()
    {
        var mockService = new Mock<ISubtopicService>();
        mockService.Setup(s => s.DeleteSubtopicAsync(1))
            .Returns(Task.CompletedTask);
        
        var controller = new SubtopicsController(mockService.Object);
        
        var result = await controller.DeleteSubtopic(1);
        
        var noContentResult = Assert.IsType<NoContentResult>(result);
        
        Assert.Equal(204, noContentResult.StatusCode);
    }
    
    
    
}