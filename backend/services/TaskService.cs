using backend.dto;
using backend.repositories;
namespace backend.services
{

    public class TaskService(IRepository<models.Task> taskRepository) : ITaskService
    {
        
        //Get all tasks
        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await taskRepository.GetAllAsync();
            return tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                TaskContent = t.TaskContent,
                IsDone = t.IsDone,
                TopicId = t.TopicId,
                TaskType = t.TaskType
            });
        }
        
        //Get task by id
        public async Task<TaskDto?> GetTaskByIdAsync(int id)
        {
            var task = await taskRepository.GetByIdAsync(id);
            if (task == null)
            {
                throw new KeyNotFoundException($"Task with id {id} not found");
            }
            return new TaskDto() 
            {
                Id = task.Id,
                Title = task.Title,
                TaskContent = task.TaskContent,
                IsDone = task.IsDone,
                TopicId = task.TopicId,
                TaskType = task.TaskType
            };
        }
        
        //Create task
        public async Task<TaskDto> CreateTaskAsync(TaskDto taskDto)
        {
            var task = new backend.models.Task
            {
                Title = taskDto.Title,
                TaskContent = taskDto.TaskContent,
                IsDone = taskDto.IsDone,
                TopicId = taskDto.TopicId,
                TaskType = taskDto.TaskType
            };
            await taskRepository.AddAsync(task);
            taskDto.Id = task.Id;
            return taskDto;
        }
        
        //Update task
        public async Task UpdateTaskAsync(TaskDto taskDto)
        {
            var task = await taskRepository.GetByIdAsync(taskDto.Id);
            if (task == null)
            {
                throw new KeyNotFoundException($"Task with id {taskDto.Id} not found");
            }
            task.Id = taskDto.Id;
            task.TopicId = taskDto.TopicId;
            task.Title = taskDto.Title;
            task.TaskContent = taskDto.TaskContent;
            task.IsDone = taskDto.IsDone;
            task.TaskType = taskDto.TaskType;
            await taskRepository.UpdateAsync(task);
        }
        
        //Delete reason
        public async Task DeleteTaskAsync(int id)
        {
            var task = await taskRepository.GetByIdAsync(id);
            if (task == null)
            {
                throw new KeyNotFoundException($"Task with id {id} not found");
            }
            taskRepository.Remove(task);
        }

    }
}