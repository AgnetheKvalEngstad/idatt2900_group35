using Microsoft.AspNetCore.Mvc;
using backend.services;
using backend.dto;

namespace backend.controllers
{
    /// <summary>
    /// Controller for managing tasks
    /// </summary>
    /// <param name="taskService"></param>
    
    
    [ApiController]
    [Route("[controller]")]
    public class TasksController(ITaskService taskService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await taskService.GetAllTasksAsync();
            return Ok(tasks);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
        { 
            var createdTask = await taskService.CreateTaskAsync(taskDto);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskDto taskDto)
        {
            if (id != taskDto.Id)
            {
                return BadRequest();
            }
            await taskService.UpdateTaskAsync(taskDto);
            return NoContent();
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            await taskService.DeleteTaskAsync(id);
            return NoContent();
        }

    }
}