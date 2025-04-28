using backend.dto;
using backend.repositories;
using backend.services;
using Moq;

namespace backend.Tests.ServicesTests;

public class TaskServiceTest
{
    private readonly Mock<IRepository<models.Task>> _taskRepositoryMock;
    private readonly ITaskService _taskService;

    public TaskServiceTest()
    {
        _taskRepositoryMock = new Mock<IRepository<models.Task>>();
        _taskService = new TaskService(_taskRepositoryMock.Object);
    }
    
    [Fact]
    public async Task GetAllTasks_ShouldReturnAllTasks()
    {
        var tasks = new List<models.Task>
        {
            new models.Task { Id = 1, Title = "Task 1", TaskContent = "Content 1", IsDone = false,
                TopicId = 1, TaskType = "Type 1" },
            new models.Task { Id = 2, Title = "Task 2", TaskContent = "Content 2", IsDone = true,
                TopicId = 2, TaskType = "Type 2" }
        };
        
        _taskRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(tasks);
        
        var result = await _taskService.GetAllTasksAsync();
        
        Assert.Equal(2, result.Count());
        Assert.Contains(result, t => t.Id == 1);
        Assert.Contains(result, t => t.Id == 2);
    }
    
    [Fact]
    public async Task GetTaskByIdAsync_ShouldReturnTask()
    {
        var task = new models.Task { Id = 1, Title = "Task 1", TaskContent = "Content 1", IsDone = false,
            TopicId = 1, TaskType = "Type 1" };
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(task);
        
        var result = await _taskService.GetTaskByIdAsync(1);
        
        Assert.NotNull(result);
        Assert.Equal(task.Id, result.Id);
        Assert.Equal(task.Title, result.Title);
        Assert.Equal(task.TaskContent, result.TaskContent);
        Assert.Equal(task.IsDone, result.IsDone);
        Assert.Equal(task.TopicId, result.TopicId);
    }
    
    [Fact]
    public async Task GetTaskByIdAsync_TaskNotFound_ShouldThrowException()
    {
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((models.Task)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _taskService.GetTaskByIdAsync(1));
    }

    [Fact]
    public async Task CreateTaskAsync_ShouldCreateTask()
    {
        var taskDto = new TaskDto { Id = 1, Title = "Task 1", TaskContent = "Content 1", IsDone = false,
            TopicId = 1, TaskType = "Type 1" };
        _taskRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<models.Task>()))
            .Returns(Task.CompletedTask).Callback<models.Task>(t => t.Id = 2);
        
        var result = await _taskService.CreateTaskAsync(taskDto);
        
        Assert.NotNull(result);
        Assert.Equal(2, result.Id);
        Assert.Equal(taskDto.Title, result.Title);
        Assert.Equal(taskDto.TaskContent, result.TaskContent);
        Assert.Equal(taskDto.IsDone, result.IsDone);
        Assert.Equal(taskDto.TopicId, result.TopicId);
    }

    [Fact]
    public async Task UpdateTaskAsync_ShouldUpdateTask()
    {
        var task = new models.Task { Id = 1, Title = "Task 1", TaskContent = "Content 1", IsDone = false,
                TopicId = 1, TaskType = "Type 1" }; 
        var updatedTaskDto = new TaskDto { Id = 1, Title = "Updated Task", TaskContent = "Updated Content",
            IsDone = true, TopicId = 1, TaskType = "Type 1" };
        
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(task);
        _taskRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<models.Task>()))
            .Returns(Task.CompletedTask);
        
        await _taskService.UpdateTaskAsync(updatedTaskDto);
        
        _taskRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<models.Task>()), Times.Once);
        
        _taskRepositoryMock.Verify(repo =>
            repo.UpdateAsync(It.Is<models.Task>(t => t.Id == updatedTaskDto.Id)), Times.Once);
        
        Assert.Equal(updatedTaskDto.Title, task.Title);
        Assert.Equal(updatedTaskDto.TaskContent, task.TaskContent);
        Assert.Equal(updatedTaskDto.IsDone, task.IsDone);
    }
    
    [Fact]
    public async Task UpdateTaskAsync_TaskNotFound_ShouldThrowException()
    {
        var updatedTaskDto = new TaskDto { Id = 1};
        
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((models.Task)null!);
        
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _taskService.UpdateTaskAsync(updatedTaskDto));
    }

    [Fact]
    public async Task DeleteTaskAsync_ShouldDeleteTask()
    {
        var task = new models.Task { Id = 1, Title = "Task 1", TaskContent = "Content 1", IsDone = false,
            TopicId = 1, TaskType = "Type 1" };
        
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(task);
        
        await _taskService.DeleteTaskAsync(task.Id);
        
        _taskRepositoryMock.Verify(repo => repo.Remove(It.IsAny<models.Task>()), Times.Once);
    }
    
    [Fact]
    public async Task DeleteTaskAsync_TaskNotFound_ShouldThrowException()
    {
        _taskRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((models.Task)null!);
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _taskService.DeleteTaskAsync(1));
    }
    
}