using backend.dto;
using backend.models;
using backend.services;
using backend.repositories;
using Moq;
using Xunit;

namespace backend.Tests.ServicesTests;

public class ReasonServiceTest
{
    private readonly Mock<IRepository<Reason>> _reasonRepositoryMock;
    private readonly IReasonService _reasonService;
    
    public ReasonServiceTest()
    {
        _reasonRepositoryMock = new Mock<IRepository<Reason>>();
        _reasonService = new ReasonService(_reasonRepositoryMock.Object);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAllReasons_ShouldReturnAllReasons()
    {
        var reasons = new List<Reason>
        {
            new Reason { Id = 1, ReasonTitle = "Reason 1", ReasonContent = "Content 1", IsRead = false, TopicId = 1 },
            new Reason { Id = 2, ReasonTitle = "Reason 2", ReasonContent = "Content 2", IsRead = true, TopicId = 2 }
        };
        
        _reasonRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(reasons);
        
        var result = await _reasonService.GetAllReasonsAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, r => r.Id == 1);
        Assert.Contains(result, r => r.Id == 2);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetReasonByIdAsync_ShouldReturnReason()
    {
        var reason = new Reason { Id = 1, ReasonTitle = "Reason 1", ReasonContent = "Content 1",
            IsRead = false, TopicId = 1 };
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(reason);
        
        var result = await _reasonService.GetReasonByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(reason.Id, result.Id);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetReasonByIdAsync_ReasonNotFound_ShouldThrowException()
    {
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Reason)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _reasonService.GetReasonByIdAsync(1));
    }

    [Fact]
    public async System.Threading.Tasks.Task CreateReasonAsync_ShouldCreateReason()
    {
        //TODO
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateReasonAsync_ShouldUpdateReason()
    {
        var reason = new Reason { Id = 1, ReasonTitle = "Reason 1", ReasonContent = "Content 1",
            IsRead = false, TopicId = 1 };
        var updatedReasonDto = new ReasonDto { Id = 1, ReasonTitle = "Updated Reason", ReasonContent = "Updated Content",
            IsRead = true, TopicId = 1 };
        
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(reason);
        _reasonRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Reason>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask);
        
        await _reasonService.UpdateReasonAsync(updatedReasonDto);
        
        _reasonRepositoryMock.Verify(repo =>
            repo.UpdateAsync(It.Is<Reason>(r => r.Id == updatedReasonDto.Id)), Times.Once);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task UpdateReasonAsync_ReasonNotFound_ShouldThrowException()
    {
        var updatedReasonDto = new ReasonDto { Id = 1};
        
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Reason)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _reasonService.UpdateReasonAsync(updatedReasonDto));
    }
    
    [Fact]
    public async System.Threading.Tasks.Task DeleteReasonAsync_ShouldDeleteReason()
    {
        var reason = new Reason { Id = 1 };
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(reason);
        
        await _reasonService.DeleteReasonAsync(reason.Id);
        
        _reasonRepositoryMock.Verify(repo => repo.Remove(reason), Times.Once);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task DeleteReasonAsync_ReasonNotFound_ShouldThrowException()
    {
        _reasonRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Reason)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _reasonService.DeleteReasonAsync(1));
    }
    
}