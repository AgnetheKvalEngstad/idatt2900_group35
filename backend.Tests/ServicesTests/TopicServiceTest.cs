using backend.dto;
using backend.repositories;
using backend.services;
using Moq;

namespace backend.Tests.ServicesTests;

public class TopicServiceTest
{
    private readonly Mock<IRepository<models.Topic>> _topicRepositoryMock;
    private readonly ITopicService _topicService;
    
    public TopicServiceTest()
    {
        _topicRepositoryMock = new Mock<IRepository<models.Topic>>();
        _topicService = new TopicService(_topicRepositoryMock.Object);
    }
    
    [Fact]
    public async Task GetAllTopicsAsync_ShouldReturnAllTopics()
    {
        // Arrange
        var topics = new List<models.Topic>
        {
            new models.Topic { Id = 1, Title = "Topic 1", SkillLevel = "Beginner", Icon = "icon1", UserId = 1 },
            new models.Topic { Id = 2, Title = "Topic 2", SkillLevel = "Intermediate", Icon = "icon2", UserId = 2 }
        };
        
        _topicRepositoryMock.Setup(repo => repo
            .GetAllWithQueryAsync(It.IsAny<Func<IQueryable<models.Topic>, IQueryable<models.Topic>>>()))
            .ReturnsAsync(topics);
        
        // Act
        var result = await _topicService.GetAllTopicsAsync();
        
        // Assert
        Assert.Equal(2, result.Count());
        Assert.Contains(result, t => t.Id == 1);
        Assert.Contains(result, t => t.Id == 2);
    }
    
    [Fact]
    public async Task GetTopicByIdAsync_ShouldReturnTopic()
    {
        // Arrange
        var topic = new models.Topic
        {
            Id = 1, Title = "Topic 1", SkillLevel = "Beginner", Icon = "icon1", UserId = 1
        };
        
        _topicRepositoryMock.Setup(repo => repo
            .GetByIdWithQueryAsync(1, It.IsAny<Func<IQueryable<models.Topic>, IQueryable<models.Topic>>>()))
            .ReturnsAsync(topic);
        
        // Act
        var result = await _topicService.GetTopicByIdAsync(1);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(topic.Id, result.Id);
        Assert.Equal(topic.Title, result.Title);
        Assert.Equal(topic.SkillLevel, result.SkillLevel);
        Assert.Equal(topic.Icon, result.Icon);
    }
    
    [Fact]
    public async Task GetTopicByIdAsync_TopicNotFound_ShouldThrowException()
    {
        // Arrange
        _topicRepositoryMock.Setup(repo => repo
            .GetByIdWithQueryAsync(1, It.IsAny<Func<IQueryable<models.Topic>, IQueryable<models.Topic>>>()))
            .ReturnsAsync((models.Topic)null);
        
        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _topicService.GetTopicByIdAsync(1));
    }
    
    [Fact]
    public async Task CreateTopicAsync_ShouldCreateTopic()
    {
        // Arrange
        var topicDto = new TopicDto { Id = 1, Title = "Topic 1", SkillLevel = "Beginner", Icon = "icon1", UserId = 1 };
        
        var topic = new models.Topic
        {
            Id = topicDto.Id,
            Title = topicDto.Title,
            SkillLevel = topicDto.SkillLevel,
            Icon = topicDto.Icon,
            UserId = topicDto.UserId
        };
        
        _topicRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<models.Topic>()))
            .Callback<models.Topic>(t => t.Id = topic.Id);
        
        // Act
        var result = await _topicService.CreateTopicAsync(topicDto);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(topic.Id, result.Id);
        Assert.Equal(topic.Title, result.Title);
        Assert.Equal(topic.SkillLevel, result.SkillLevel);
        Assert.Equal(topic.Icon, result.Icon);
    }

    [Fact]
    public async Task UpdateTopicAsync_ShouldUpdateTopic()
    {
        var topic = new models.Topic
        {
            Id = 1, Title = "Topic 1", SkillLevel = "Beginner", Icon = "icon1", UserId = 1
        };
        var updatedTopicDto = new TopicDto
        {
            Id = 1, Title = "Updated Topic", SkillLevel = "Intermediate", Icon = "icon2", UserId = 1
        };
        
        _topicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(topic);
        _topicRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<models.Topic>()))
            .Returns(Task.CompletedTask);
        
        await _topicService.UpdateTopicAsync(updatedTopicDto);
        
        _topicRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<models.Topic>()), Times.Once);
        
        Assert.Equal(updatedTopicDto.Title, topic.Title);
        Assert.Equal(updatedTopicDto.SkillLevel, topic.SkillLevel);
        Assert.Equal(updatedTopicDto.Icon, topic.Icon);
    }
    
    [Fact]
    public async Task UpdateTopicAsync_TopicNotFound_ShouldThrowException()
    {
        var updatedTopicDto = new TopicDto { Id = 1 };
        
        _topicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((models.Topic)null);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _topicService.UpdateTopicAsync(updatedTopicDto));
    }
    
    [Fact]
    public async Task DeleteTopicAsync_ShouldDeleteTopic()
    {
        var topic = new models.Topic { Id = 1, Title = "Topic 1", SkillLevel = "Beginner", Icon = "icon1", UserId = 1 };
        
        _topicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(topic);
        
        await _topicService.DeleteTopicAsync(topic.Id);
        
        _topicRepositoryMock.Verify(repo => repo.Remove(It.IsAny<models.Topic>()), Times.Once);
    }
    
    [Fact]
    public async Task DeleteTopicAsync_TopicNotFound_ShouldThrowException()
    {
        _topicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((models.Topic)null);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _topicService.DeleteTopicAsync(1));
    }
}