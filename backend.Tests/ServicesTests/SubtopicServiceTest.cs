using backend.dto;
using backend.models;
using backend.repositories;
using backend.services;
using Moq;

namespace backend.Tests.ServicesTests;

/// <summary>
/// This class contains unit tests for the SubtopicService
/// </summary>
public class SubtopicServiceTest
{
    private readonly Mock <IRepository<Subtopic>> _subtopicRepositoryMock;
    private readonly ISubtopicService _subtopicService;
    
    
    public SubtopicServiceTest()
    {
        _subtopicRepositoryMock = new Mock<IRepository<Subtopic>>();
        _subtopicService = new SubtopicService(_subtopicRepositoryMock.Object);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAllSubtopics_ShouldReturnAllSubtopics()
    {
        var subtopics = new List<Subtopic>
        {
            new Subtopic { Id = 1, Title = "Subtopic 1", SubtopicContent = "Content 1", IsRead = false, TopicId = 1 },
            new Subtopic { Id = 2, Title = "Subtopic 2", SubtopicContent = "Content 2", IsRead = true, TopicId = 2 }
        };
        _subtopicRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(subtopics);
        
        var result = await _subtopicService.GetAllSubtopicsAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, s => s.Id == 1);
        Assert.Contains(result, s => s.Id == 2);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetSubtopicByIdAsync_ShouldReturnSubtopic()
    {
        var subtopic = new Subtopic { Id = 1, Title = "Subtopic 1", SubtopicContent = "Content 1", IsRead = false, TopicId = 1 };
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(subtopic);
        
        var result = await _subtopicService.GetSubtopicByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(subtopic.Id, result.Id);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetSubtopicByIdAsync_SubtopicNotFound_ShouldThrowException()
    {
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Subtopic)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _subtopicService.GetSubtopicByIdAsync(1));
    }
    
    [Fact]
    public async System.Threading.Tasks.Task CreateSubtopicAsync_ShouldCreateSubtopic()
    {
        var subtopicDto = new SubtopicDto { Id = 1 };
        _subtopicRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Subtopic>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask).Callback<Subtopic>(s => s.Id = 2);
        
        var result = await _subtopicService.CreateSubtopicAsync(subtopicDto);
        
        Assert.NotNull(result);
        Assert.Equal(2, result.Id);
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateSubtopicAsync_ShouldUpdateSubtopic()
    {
        var subtopic = new Subtopic { Id = 1, Title = "Subtopic 1", SubtopicContent = "Content 1", 
            IsRead = false, TopicId = 1 };
        var updatedSubtopicDto = new SubtopicDto { Id = 1, Title = "Updated Subtopic", 
            SubtopicContent = "Updated Content", IsRead = true, TopicId = 1 };
        
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(subtopic);
        _subtopicRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Subtopic>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask);
        
        await _subtopicService.UpdateSubtopicAsync(updatedSubtopicDto);
        
        _subtopicRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<Subtopic>()), Times.Once);
        
        _subtopicRepositoryMock.Verify(repo =>
            repo.UpdateAsync(It.Is<Subtopic>(s => s.Id == updatedSubtopicDto.Id)), Times.Once);
        
        Assert.Equal(updatedSubtopicDto.Title, subtopic.Title);
        Assert.Equal(updatedSubtopicDto.SubtopicContent, subtopic.SubtopicContent);
        Assert.Equal(updatedSubtopicDto.IsRead, subtopic.IsRead);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task UpdateSubtopicAsync_SubtopicNotFound_ShouldThrowException()
    {
        var updatedSubtopicDto = new SubtopicDto { Id = 1};
        
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Subtopic)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _subtopicService.UpdateSubtopicAsync(updatedSubtopicDto));
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteSubtopicAsync_ShouldDeleteSubtopic()
    {
        var subtopic = new Subtopic { Id = 1, Title = "Subtopic 1", SubtopicContent = "Content 1",
            IsRead = false, TopicId = 1 };
        
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(subtopic);
        
        await _subtopicService.DeleteSubtopicAsync(subtopic.Id);
        
        _subtopicRepositoryMock.Verify(repo => repo.Remove(subtopic), Times.Once);
        
    }
    
    [Fact]
    public async System.Threading.Tasks.Task DeleteSubtopicAsync_SubtopicNotFound_ShouldThrowException()
    {
        _subtopicRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Subtopic)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _subtopicService.DeleteSubtopicAsync(1));
    }
    
    
}