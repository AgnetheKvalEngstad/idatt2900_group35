using Microsoft.AspNetCore.Mvc;
using backend.services;
using backend.dto;

namespace backend.controllers
{
    /// <summary>
    /// Controller for managing topics
    /// </summary>
    /// <param name="topicService"></param>
    
    [ApiController]
    [Route("[controller]")]
    public class TopicsController(ITopicService topicService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopicDto>>> GetTopics()
        {
            var topics = await topicService.GetAllTopicsAsync();
            return Ok(topics);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<TopicDto>> GetTopic(int id)
        {
            var topic = await topicService.GetTopicByIdAsync(id);
            if (topic == null)
            {
                return NotFound();
            }
            return Ok(topic);
        }
        
        [HttpPost]
        public async Task<ActionResult<TopicDto>> CreateTopic(TopicDto topicDto)
        {
            var createdTopic = await topicService.CreateTopicAsync(topicDto);
            return CreatedAtAction(nameof(GetTopic), new { id = createdTopic.Id }, createdTopic);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TopicDto>> UpdateTopic(int id, TopicDto topicDto)
        {
            if (id != topicDto.Id)
            {
                return BadRequest();
            }
            
            await topicService.UpdateTopicAsync(topicDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopic(int id)
        {
            await topicService.DeleteTopicAsync(id);
            return NoContent();
        }
    }
    
}