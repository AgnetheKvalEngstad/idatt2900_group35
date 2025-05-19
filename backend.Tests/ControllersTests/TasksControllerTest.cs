using backend.controllers;
using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace backend.Tests.ControllersTests;

/// <summary>
/// This class contains unit tests for the TasksController
/// </summary>
public class TasksControllerTest
{
    [Fact]
    public async Task GetTasks_ShouldReturnOkResult_WithTasks()
    {
        var mockService = new Mock<ITaskService>();
        mockService.Setup(s => s.GetAllTasksAsync())
            .ReturnsAsync(new List<TaskDto>
            {
                new TaskDto { Id = 1, Title = "Test Task 1", TaskContent = "Test Content 1", IsDone = false },
                new TaskDto { Id = 2, Title = "Test Task 2", TaskContent = "Test Content 2", IsDone = true }
            });

        var controller = new TasksController(mockService.Object);

        var result = await controller.GetTasks();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var tasks = Assert.IsType<List<TaskDto>>(okResult.Value);

        Assert.Collection(tasks,
            task =>
            {
                Assert.Equal(1, task.Id);
                Assert.Equal("Test Task 1", task.Title);
                Assert.Equal("Test Content 1", task.TaskContent);
                Assert.False(task.IsDone);
            },
            task =>
            {
                Assert.Equal(2, task.Id);
                Assert.Equal("Test Task 2", task.Title);
                Assert.Equal("Test Content 2", task.TaskContent);
                Assert.True(task.IsDone);
            });
    }
    
    [Fact]
    public async Task GetTask_ShouldReturnOkResult_WithTask()
    {
        var mockService = new Mock<ITaskService>();
        mockService.Setup(s => s.GetTaskByIdAsync(1))
            .ReturnsAsync(new TaskDto { Id = 1, Title = "Test Task", TaskContent = "Test Content", IsDone = false });

        var controller = new TasksController(mockService.Object);

        var result = await controller.GetTask(1);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var task = Assert.IsType<TaskDto>(okResult.Value);

        Assert.Equal(1, task.Id);
        Assert.Equal("Test Task", task.Title);
        Assert.Equal("Test Content", task.TaskContent);
        Assert.False(task.IsDone);
    }

    [Fact]
    public async Task GetTask_ShouldReturnNotFoundResult_WhenTaskDoesNotExist()
    {
        var mockService = new Mock<ITaskService>();
        
        mockService.Setup(s => s.GetTaskByIdAsync(1))
            .ReturnsAsync((TaskDto)null);
        var controller = new TasksController(mockService.Object);
        
        var result = await controller.GetTask(1);
        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        
        Assert.Equal(404, notFoundResult.StatusCode);
    }

    [Fact]
    public async Task PostTask_ShouldReturnCreatedResult_WithTask()
    {
        var mockService = new Mock<ITaskService>();
        var taskDto = new TaskDto { Id = 1, Title = "Test Task", TaskContent = "Test Content", IsDone = false };
        
        mockService.Setup(s => s.CreateTaskAsync(taskDto))
            .ReturnsAsync(taskDto);
        
        var controller = new TasksController(mockService.Object);
        
        var result = await controller.CreateTask(taskDto);
        
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var createdTask = Assert.IsType<TaskDto>(createdResult.Value);
        
        Assert.Equal(1, createdTask.Id);
        Assert.Equal("Test Task", createdTask.Title);
        Assert.Equal("Test Content", createdTask.TaskContent);
        Assert.False(createdTask.IsDone);
    }
    
    [Fact]
    public async Task PutTask_ShouldReturnNoContent_WhenTaskIsUpdated()
    {
        var mockService = new Mock<ITaskService>();
        var taskDto = new TaskDto { Id = 1, Title = "Test Task", TaskContent = "Test Content", IsDone = false };
        
        mockService.Setup(s => s.UpdateTaskAsync(taskDto))
            .Returns(Task.CompletedTask);
        
        var controller = new TasksController(mockService.Object);
        
        var result = await controller.UpdateTask(1, taskDto);
        
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task PuReason_ShouldReturnBadRequest_WhenIdMismatch()
    {
        var mockService = new Mock<ITaskService>();
        var taskDto = new TaskDto { Id = 1, Title = "Test Task", TaskContent = "Test Content", IsDone = false };
        
        var controller = new TasksController(mockService.Object);
        
        var result = await controller.UpdateTask(2, taskDto);
        
        var badRequestResult = Assert.IsType<BadRequestResult>(result);
        
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task DeleteTask_ShouldReturnNoContent_WhenTaskIsDeleted()
    {
        var mockService = new Mock<ITaskService>();
        mockService.Setup(s => s.DeleteTaskAsync(1))
            .Returns(Task.CompletedTask);
        
        var controller = new TasksController(mockService.Object);
        
        var result = await controller.DeleteTask(1);
        
        var noContentResult = Assert.IsType<NoContentResult>(result);
        
        Assert.Equal(204, noContentResult.StatusCode);
    }
}