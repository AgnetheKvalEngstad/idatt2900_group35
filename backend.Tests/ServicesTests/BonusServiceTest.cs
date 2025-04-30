using backend.dto;
using backend.models;
using backend.repositories;
using backend.services;
using Moq;

namespace backend.Tests.ServicesTests;

public class BonusServiceTest
{
    private readonly Mock<IRepository<Bonus>> _bonusRepositoryMock;
    private readonly IBonusService _bonusService;
    
    public BonusServiceTest()
    {
        _bonusRepositoryMock = new Mock<IRepository<Bonus>>();
        _bonusService = new BonusService(_bonusRepositoryMock.Object);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetAllBonuses_ShouldReturnAllBonuses()
    {
        var bonuses = new List<Bonus>
        {
            new Bonus { Id = 1, Title = "Bonus 1", Description = "Description 1", Icon = "Icon 1" , PointsNeeded = 70},
            new Bonus { Id = 2, Title = "Bonus 2", Description = "Description 2", Icon = "Icon 2" , PointsNeeded = 80}
        };
        
        _bonusRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(bonuses);
        
        var result = await _bonusService.GetAllBonusesAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, r => r.Id == 1);
        Assert.Contains(result, r => r.Id == 2);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetBonusBy_ShouldReturnBonus()
    {
        var bonus = new Bonus { Id = 1, Title = "Bonus 1", Description = "Description 1", Icon = "Icon 1" , PointsNeeded = 70};
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(bonus);
        
        var result = await _bonusService.GetBonusByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(bonus.Id, result.Id);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task GetBonusByIdAsync_BonusNotFound_ShouldThrowException()
    {
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Bonus)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _bonusService.GetBonusByIdAsync(1));
    }
    
    [Fact]
    public async System.Threading.Tasks.Task CreateBonus_ShouldReturnCreatedBonus()
    {
        var bonusDto = new BonusDto { Title = "Bonus 1", Description = "Description 1", 
            Icon = "Icon 1", PointsNeeded = 70 };

        _bonusRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Bonus>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask).Callback < Bonus>(b => b.Id = 2);
        
        var result = await _bonusService.CreateBonusAsync(bonusDto);
        
        Assert.NotNull(result);
        Assert.Equal(2, result.Id);
        Assert.Equal(bonusDto.Title, result.Title);
        Assert.Equal(bonusDto.Description, result.Description);
        Assert.Equal(bonusDto.Icon, result.Icon);
        Assert.Equal(bonusDto.PointsNeeded, result.PointsNeeded);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task UpdateBonus_ShouldUpdateBonus()
    {
        var bonus = new Bonus { Id = 1, Title = "Bonus 1", Description = "Description 1", Icon = "Icon 1" , PointsNeeded = 70};
        var updatedBonusDto = new BonusDto { Id = 1, Title = "Updated Bonus", Description = "Updated Description",
            Icon = "Updated Icon", PointsNeeded = 80 };
        
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(bonus);
        _bonusRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Bonus>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask);
        
        await _bonusService.UpdateBonusAsync(updatedBonusDto);
        
        _bonusRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<Bonus>()), Times.Once);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task UpdateBonus_BonusNotFound_ShouldThrowException()
    {
        var updatedBonusDto = new BonusDto { Id = 1 };
        
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Bonus)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _bonusService.UpdateBonusAsync(updatedBonusDto));
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteBonus_ShouldDeleteBonus()
    {
        var bonus = new Bonus { Id = 1 };
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(bonus);
        
        await _bonusService.DeleteBonusAsync(bonus.Id);
        
        _bonusRepositoryMock.Verify(repo => repo.Remove(bonus), Times.Once);
    }
    
    [Fact]
    public async System.Threading.Tasks.Task DeleteBonus_BonusNotFound_ShouldThrowException()
    {
        _bonusRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Bonus)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _bonusService.DeleteBonusAsync(1));
    }
    
}