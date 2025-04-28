using Xunit;
using Moq;
using backend.controllers;
using backend.services;
using backend.dto;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Tests.ControllersTests;

public class TopicsControllerTests
{
    [Fact]
    public async Task GetTopics_ShouldReturnOk_WithListOfTopics()
    {
        var mockService = new Mock<ITopicService>();
        mockService.Setup(s => s.GetAllTopicsAsync())
                   .ReturnsAsync(new List<TopicDto>
                   {
                       new TopicDto { Id = 1, Title = "Topic1" }, 
                       new TopicDto { Id = 2, Title = "Topic2" }
                   });

        var controller = new TopicsController(mockService.Object);

        var result = await controller.GetTopics();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var topics = Assert.IsType<List<TopicDto>>(okResult.Value);
        
        Assert.Equal(2, topics.Count);
        Assert.Equal("Topic1", topics[0].Title);
        Assert.Equal("Topic2", topics[1].Title);
    }

    [Fact]
    public async Task GetTopic_ShouldReturnOk_WhenTopicExists()
    {
        var mockService = new Mock<ITopicService>();
        mockService.Setup(s => s.GetTopicByIdAsync(1))
                   .ReturnsAsync(new TopicDto { Id = 1, Title = "Topic1" });

        var controller = new TopicsController(mockService.Object);

        var result = await controller.GetTopic(1);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var topic = Assert.IsType<TopicDto>(okResult.Value);
        Assert.Equal(1, topic.Id);
    }

    [Fact]
    public async Task GetTopic_ShouldReturnNotFound_WhenTopicDoesNotExist()
    {
        var mockService = new Mock<ITopicService>();
        mockService.Setup(s => s.GetTopicByIdAsync(1)).ReturnsAsync((TopicDto)null);

        var controller = new TopicsController(mockService.Object);

        var result = await controller.GetTopic(1);

        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    [Fact]
    public async Task CreateTopic_ShouldReturnCreatedAtAction_WithCreatedTopic()
    {
        var mockService = new Mock<ITopicService>();
        var topicToCreate = new TopicDto { Title = "Topic1" };
        var createdTopic = new TopicDto { Id = 2, Title = "Topic1" };

        mockService.Setup(s => s.CreateTopicAsync(topicToCreate))
                   .ReturnsAsync(createdTopic);

        var controller = new TopicsController(mockService.Object);

        var result = await controller.CreateTopic(topicToCreate);

        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnValue = Assert.IsType<TopicDto>(createdAtActionResult.Value);
        Assert.Equal(2, returnValue.Id);
    }

    [Fact]
    public async Task UpdateTopic_ShouldReturnNoContent_WhenUpdateIsSuccessful()
    {
        var mockService = new Mock<ITopicService>();
        var topic = new TopicDto { Id = 1, Title = "Topic1" };

        mockService.Setup(s => s.UpdateTopicAsync(topic)).Returns(Task.CompletedTask);

        var controller = new TopicsController(mockService.Object);

        var result = await controller.UpdateTopic(1, topic);

        var noContentResult = Assert.IsType<NoContentResult>(result.Result);
        Assert.Equal(204, noContentResult.StatusCode);
    }

    [Fact]
    public async Task UpdateTopic_ShouldReturnBadRequest_WhenIdDoesNotMatch()
    {
        var mockService = new Mock<ITopicService>();
        var topic = new TopicDto { Id = 2, Title = "Topic1" };

        var controller = new TopicsController(mockService.Object);

        var result = await controller.UpdateTopic(1, topic);

        var badRequestResult = Assert.IsType<BadRequestResult>(result.Result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task DeleteTopic_ShouldReturnNoContent_WhenSuccessful()
    {
        var mockService = new Mock<ITopicService>();
        mockService.Setup(s => s.DeleteTopicAsync(1)).Returns(Task.CompletedTask);

        var controller = new TopicsController(mockService.Object);

        var result = await controller.DeleteTopic(1);

        var noContentResult = Assert.IsType<NoContentResult>(result);
        Assert.Equal(204, noContentResult.StatusCode);
    }
}
