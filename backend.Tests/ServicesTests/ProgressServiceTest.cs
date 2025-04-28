using backend.dto;
using backend.models;
using backend.repositories;
using backend.services;
using Moq;

namespace backend.Tests.ServicesTests;

public class ProgressServiceTest
{
    private readonly Mock<IRepository<Progress>> _progressRepositoryMock;
    private IProgressService _progressService;
    
    public ProgressServiceTest()
    {
        _progressRepositoryMock = new Mock<IRepository<Progress>>();
        _progressService = new ProgressService(_progressRepositoryMock.Object);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAllProgressesAsync_ShouldReturnAllProgresses()
    {
        var progresses = new List<Progress>
        {
            new Progress { Id = 1, ProgressPercentage = 50},
            new Progress { Id = 2, ProgressPercentage = 40}
        };
        
        _progressRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(progresses);
        
        var result = await _progressService.GetAllProgressesAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, p => p.Id == 1);
        Assert.Contains(result, p => p.Id == 2);
        Assert.Contains(result, p => p.ProgressPercentage == 40);
        Assert.Contains(result, p => p.ProgressPercentage == 50);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetProgressByIdAsync_ShouldReturnProgress()
    {
        var progress = new Progress { Id = 1, ProgressPercentage = 50};
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(progress);
        
        var result = await _progressService.GetProgressByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(progress.Id, result.Id);
        Assert.Equal(progress.ProgressPercentage, result.ProgressPercentage);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetProgressByIdAsync_ProgressNotFound_ShouldThrowException()
    {
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Progress)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _progressService.GetProgressByIdAsync(1));
    }

    [Fact]
    public async System.Threading.Tasks.Task CreateProgressAsync_ShouldCreateProgress()
    {
        //TODO: Find out if possible
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateProgressAsync_ShouldUpdateProgress()
    {
        var progress = new Progress { Id = 1, ProgressPercentage = 50};
        var updatedProgressDto = new ProgressDto { Id = 1, ProgressPercentage = 75};
        
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(progress);
        _progressRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Progress>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask);
        
        await _progressService.UpdateProgressAsync(updatedProgressDto);
        
        _progressRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<Progress>()), Times.Once);
        
        _progressRepositoryMock.Verify(repo => 
            repo.UpdateAsync(It.Is<Progress>(p => p.Id == updatedProgressDto.Id)), Times.Once);
        
        Assert.Equal(updatedProgressDto.ProgressPercentage, progress.ProgressPercentage);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task UpdateProgress_ProgressNotFound_ShouldThrowException()
    {
        var updatedProgressDto = new ProgressDto { Id = 1, ProgressPercentage = 75};
        
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Progress)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _progressService.UpdateProgressAsync(updatedProgressDto));
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteProgressAsync_ShouldDeleteProgress()
    {
        var progress = new Progress { Id = 1, ProgressPercentage = 50};
        
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(progress);
        
        await _progressService.DeleteProgressAsync(progress.Id);
        
        _progressRepositoryMock.Verify(repo => repo.Remove(progress), Times.Once);
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteProgressAsync_ProgressNotFound_ShouldThrowExeption()
    {
        _progressRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Progress)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _progressService.DeleteProgressAsync(1));
    }
    
    
    
    
    
}