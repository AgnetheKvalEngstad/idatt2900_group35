using backend.dto;

namespace backend.services;

/// <summary>
/// Interface for managing tasks
/// </summary>

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllTasksAsync();
    Task<TaskDto?> GetTaskByIdAsync(int id);
    Task<TaskDto> CreateTaskAsync(TaskDto taskDto);
    Task UpdateTaskAsync(TaskDto taskDto);
    Task DeleteTaskAsync(int id);
    
}