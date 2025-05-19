namespace backend.Tests.ServicesTests;
using Xunit;
using Moq;
using services;
using repositories;
using models;
using dto;

/// <summary>
/// This class contains unit tests for the UserService
/// </summary>
public class UserServiceTests
{
    private readonly Mock<IRepository<User>> _userRepositoryMock;
    private readonly Mock<IRepository<Topic>> _topicRepositoryMock;
    private readonly IUserService _userService;

    public UserServiceTests()
    {
        _userRepositoryMock = new Mock<IRepository<User>>();
        _topicRepositoryMock = new Mock<IRepository<Topic>>();
        _userService = new UserService(_userRepositoryMock.Object, _topicRepositoryMock.Object);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAllUsersAsync_ShouldReturnAllUsers()
    {
        _userRepositoryMock
            .Setup(repo => repo.
                GetAllWithQueryAsync(It.IsAny<Func<IQueryable<User>, IQueryable<User>>>()))
            .ReturnsAsync(new List<User>
            {
                new User { Id = 1 },
                new User { Id = 2 }
            });        
        var result = await _userService.GetAllUsersAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, u => u.Id == 1);
        Assert.Contains(result, u => u.Id == 2);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetUserByIdAsync_ShouldReturnUser()
    {
        var user = new User { Id = 1 };
        
        _userRepositoryMock
            .Setup(repo => repo.GetByIdWithQueryAsync(1, 
                It.IsAny<Func<IQueryable<User>, IQueryable<User>>>()))
            .ReturnsAsync(user);
        
        var result = await _userService.GetUserByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(user.Id, result.Id);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetUserByIdAsync_UserNotFound_ShouldThrowException()
    {
        _userRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((User)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _userService.GetUserByIdAsync(1));
    }

    [Fact]
    public async System.Threading.Tasks.Task CreateUserAsync_ShouldCreateUser()
    {
        var userDto = new UserDto { Id = 1 };
        _userRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<User>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask).Callback<User>(u => u.Id = 2);
        
        var result = await _userService.CreateUserAsync(userDto);
        
        Assert.NotNull(result);
        Assert.Equal(2, result.Id);
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateUserAsync_ShouldUpdateUser()
    {
        var user = new User { Id = 1 };
        var updatedUserDto = new UserDto { Id = 1 };
        
        _userRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(user);
        _userRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<User>()))
            .Returns(System.Threading.Tasks.Task.CompletedTask);
        
        await _userService.UpdateUserAsync(updatedUserDto);
        
        _userRepositoryMock.Verify(repo => 
            repo.UpdateAsync(It.Is<User>(u => u.Id == updatedUserDto.Id)), Times.Once);
        
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateUserAsync_UserNotFound_ShouldThrowException()
    {
        var userDto = new UserDto { Id = 1 };
        _userRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((User)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _userService.UpdateUserAsync(userDto));
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteUserAsync_ShouldDeleteUser()
    {
        var user = new User { Id = 1 };
        _userRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(user);
        
        await _userService.DeleteUserAsync(1);
        
        _userRepositoryMock.Verify(repo => repo.Remove(user), Times.Once);
    }

    [Fact]
    public async System.Threading.Tasks.Task DeleteUserAsync_UserNotFound_ShouldThrowException()
    {
        _userRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((User)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _userService.DeleteUserAsync(1));
    }
    
    
    
}