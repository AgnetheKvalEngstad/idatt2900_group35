using backend.data;
using backend.dto;
using backend.models;
using backend.repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.services
{
    public class UserService : IUserService
    {
        private readonly BackendDbContext _context;
        
        public UserService(BackendDbContext context)
        {
            _context = context;
        }
        
        //Get all users
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.Topics)
                .ToListAsync();
            
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
            var user = _context.Users
                .Include(u => u.Topics)
                .FirstOrDefault(u => u.Id == id);
            
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
        
        //Create user
        public async Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            var user = new User
            {
                Id = userDto.Id
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            userDto.Id = user.Id;
            return userDto;
        }
        
        //Update user
        public async System.Threading.Tasks.Task UpdateUserAsync(UserDto userDto)
        {
            var user = await _context.Users.FindAsync(userDto.Id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {userDto.Id} not found");
            }

            user.Id = userDto.Id;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        
        //Delete user
        public async System.Threading.Tasks.Task DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        
        
    }
}