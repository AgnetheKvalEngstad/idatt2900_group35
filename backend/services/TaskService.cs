using System.Text.Json;
using backend.data;
using backend.dto;
using backend.models;
using backend.queries;
using backend.repositories;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace backend.services
{

    public class TaskService(IRepository<backend.models.Task> taskRepository) : ITaskService
    { 
        
        //Get all tasks
        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await taskRepository.GetAllWithQueryAsync(new TaskWithQuestionQuery().Apply);
            
            return tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                TaskContent = t.TaskContent,
                IsDone = t.IsDone,
                TopicId = t.TopicId,
                TaskType = t.TaskType,
                Questions = t.Questions.Select(q => new QuestionDto
                {
                    Id = q.Id,
                    QuestionText = q.QuestionText,
                    CorrectAnswer = q.CorrectAnswer,
                    Options = q.Options != null ? JsonSerializer.Deserialize<List<string>>(q.Options) : null,
                    CorrectOption = q.CorrectOption
                }).ToList(),
                MaximumPoints = t.MaximumPoints,
                AchievedPoints = t.AchievedPoints
            });
        }
        
        //Get task by id
        public async Task<TaskDto?> GetTaskByIdAsync(int id)
        {
            var task = await taskRepository.GetByIdWithQueryAsync(id, new TaskWithQuestionQuery().Apply);
            
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
                TaskType = task.TaskType,
                Questions = task.Questions.Select(q => new QuestionDto
                {
                    Id = q.Id,
                    QuestionText = q.QuestionText,
                    CorrectAnswer = q.CorrectAnswer,
                    Options = q.Options != null ? JsonSerializer.Deserialize<List<string>>(q.Options) : null,
                    CorrectOption = q.CorrectOption
                }).ToList(),
                MaximumPoints = task.MaximumPoints,
                AchievedPoints = task.AchievedPoints
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
                TaskType = taskDto.TaskType,
                Questions = taskDto.Questions.Select(q => new Question
                {
                    QuestionText = q.QuestionText,
                    CorrectAnswer = q.CorrectAnswer,
                    Options = q.Options != null ? JsonSerializer.Serialize(q.Options) : null,
                    CorrectOption = q.CorrectOption
                }).ToList(),
                AchievedPoints = taskDto.AchievedPoints,
            };
            await taskRepository.AddAsync(task);
            taskDto.Id = task.Id;
            return taskDto;
        }
        
        //Update task
        public async System.Threading.Tasks.Task UpdateTaskAsync(TaskDto taskDto)
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
            task.Questions = taskDto.Questions.Select(q => new Question
            {
                QuestionText = q.QuestionText,
                CorrectAnswer = q.CorrectAnswer,
                Options = q.Options != null ? JsonSerializer.Serialize(q.Options) : null,
                CorrectOption = q.CorrectOption,
                TaskId = task.Id
            }).ToList();
            task.AchievedPoints = taskDto.AchievedPoints;
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