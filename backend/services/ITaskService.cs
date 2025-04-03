using backend.dto;

namespace backend.services;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllTasksAsync();
    Task<TaskDto?> GetTaskByIdAsync(int id);
    Task<TaskDto> CreateTaskAsync(TaskDto taskDto);
    Task UpdateTaskAsync(TaskDto taskDto);
    Task DeleteTaskAsync(int id);
    
}