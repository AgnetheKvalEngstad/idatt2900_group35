using backend.controllers;
using backend.dto;
using backend.services;
using Castle.Components.DictionaryAdapter;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

/// <summary>
/// This class contains unit tests for the UsersController
/// </summary>
public class UserControllerTest
{
    [Fact]
    public async Task GetUsers_ShouldReturnOkResult_WithUsers()
    {
        var mockService = new Mock<IUserService>();
        mockService.Setup(u => u.GetAllUsersAsync())
            .ReturnsAsync(new List<UserDto>
            {
                new UserDto { Id = 1},
                new UserDto { Id = 2}
            });
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.GetUsers();
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var users = Assert.IsType<List<UserDto>>(okResult.Value);
        
        Assert.Collection(users,
            user =>
            {
                Assert.Equal(1, user.Id);
            },
            user =>
            {
                Assert.Equal(2, user.Id);
                
            });
    }
    
    [Fact]
    public async Task GetUser_ShouldReturnOkResult_WithUser()
    {
        var mockService = new Mock<IUserService>();
        mockService.Setup(u => u.GetUserByIdAsync(1))
            .ReturnsAsync(new UserDto { Id = 1});
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.GetUser(1);
        
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var user = Assert.IsType<UserDto>(okResult.Value);
        
        Assert.Equal(1, user.Id);
    }

    [Fact]
    public async Task GetUser_ShouldReturnNotFound_WhenUserDoesNotExist()
    {
        var mockService = new Mock<IUserService>();
        
        mockService.Setup(u => u.GetUserByIdAsync(1))
            .ReturnsAsync((UserDto)null);
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.GetUser(1);
        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    [Fact]
    public async Task PostUser_ShouldReturnCreatedResult_WithUser()
    {
        var mockService = new Mock<IUserService>();
        var userDto = new UserDto { Id = 1};
        
        mockService.Setup(u => u.CreateUserAsync(userDto))
            .ReturnsAsync(userDto);
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.CreateUser(userDto);
        
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var createdUser = Assert.IsType<UserDto>(createdResult.Value);
        
        Assert.Equal(1, createdUser.Id);
    }

    [Fact]
    public async Task UpdateUser_ShouldReturnNoContent_WhenUpdated()
    {
        var mockService = new Mock<IUserService>();
        var userDto = new UserDto { Id = 1};
        
        mockService.Setup(u => u.UpdateUserAsync(userDto))
            .Returns(Task.CompletedTask);
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.UpdateUser(1, userDto);
        
        var noContentResult = Assert.IsType<NoContentResult>(result.Result);
        Assert.Equal(204, noContentResult.StatusCode);

    }
    
    [Fact]
    public async Task UpdateUser_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<IUserService>();
        var userDto = new UserDto { Id = 1};
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.UpdateUser(2, userDto);
        
        var badRequestResult = Assert.IsType<BadRequestResult>(result.Result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }
    
    [Fact]
    public async Task DeleteUser_ShouldReturnNoContent_WhenDeleted()
    {
        var mockService = new Mock<IUserService>();
        
        mockService.Setup(u => u.DeleteUserAsync(1))
            .Returns(Task.CompletedTask);
        
        var controller = new UsersController(mockService.Object);
        
        var result = await controller.DeleteUser(1);
        
        var noContentResult = Assert.IsType<NoContentResult>(result.Result);
        Assert.Equal(204, noContentResult.StatusCode);
    }
    



    
}