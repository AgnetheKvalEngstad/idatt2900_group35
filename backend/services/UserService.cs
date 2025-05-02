using backend.data;
using backend.dto;
using backend.models;
using backend.repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> userRepository;
        private readonly IRepository<Topic> topicRepository;

        public UserService(IRepository<User> userRepository, IRepository<Topic> topicRepository)
        {
            this.userRepository = userRepository;
            this.topicRepository = topicRepository;
        }
        //Get all users
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await userRepository
                .GetAllWithQueryAsync(query => query.Include(u => u.Topics));
            
            return users.Select(u => new UserDto
            {
                Id = u.Id,
                AllUserPoints = u.AllUserPoints,
                TopicIds = u.Topics.Select(t => t.Id).ToList()
            });
        }
        
        //Get user by id
        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = 
                await userRepository.GetByIdWithQueryAsync
                    (id, query => query.Include(u => u.Topics));
            
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            return new UserDto()
            {
                Id = user.Id,
                AllUserPoints = user.AllUserPoints,
                TopicIds = user.Topics.Select(t => t.Id).ToList()
            };
        }
        
        //seeding method to create users with preloaded data
        private async System.Threading.Tasks.Task SeedUsersAsync(int userId)
        {
            var seededTopics = await topicRepository.GetAllWithQueryAsync(query => query
                .Include(t => t.Subtopic)
                .Include(t => t.Task)
                .Include(t => t.Reason)
                .Include(t => t.Progress));
            
            var userTopics = seededTopics.Select(topic => new Topic
            {
                Title = topic.Title,
                SkillLevel = topic.SkillLevel,
                Icon = topic.Icon,
                UserId = userId,
                Subtopic = topic.Subtopic != null ? new Subtopic
                {
                    Title = topic.Subtopic.Title,
                    SubtopicContent = topic.Subtopic.SubtopicContent,
                    IsRead = false
                } : null,
                Task = topic.Task != null ? new models.Task
                {
                    Title = topic.Task.Title,
                    TaskContent = topic.Task.TaskContent,
                    IsDone = false,
                    TaskType = topic.Task.TaskType
                } : null,
                Reason = topic.Reason != null ? new Reason
                {
                    ReasonTitle = topic.Reason.ReasonTitle,
                    ReasonContent = topic.Reason.ReasonContent,
                    IsRead = false
                } : null,
                Progress = topic.Progress != null ? new Progress
                {
                    ProgressPercentage = 0,
                    UserId = userId
                } : null
            }).ToList();
            
            await topicRepository.AddRangeAsync(userTopics);
        }
        
        //Create user
        public async Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            var user = new User
            {
                Id = userDto.Id
            };
            await userRepository.AddAsync(user);
            await SeedUsersAsync(user.Id);
            var userTopics = await topicRepository.FindAsync(t => t.UserId == user.Id);
            userDto.TopicIds = userTopics.Select(t => t.Id).ToList();
            userDto.Id = user.Id;
            return userDto;
        }
        
        //Update user
        public async System.Threading.Tasks.Task UpdateUserAsync(UserDto userDto)
        {
            var user = await userRepository.GetByIdAsync(userDto.Id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {userDto.Id} not found");
            }

            user.Id = userDto.Id;
            await userRepository.UpdateAsync(user);
        }
        
        //Delete user
        public async System.Threading.Tasks.Task DeleteUserAsync(int id)
        {
            var user = await userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            userRepository.Remove(user);
        }
        
        
    }
}