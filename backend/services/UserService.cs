using backend.dto;
using backend.models;
using backend.repositories;

namespace backend.services
{
    public class UserService(IRepository<User> userRepository) : IUserService
    {
        
        //Get all users
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await userRepository.GetAllAsync();
            return users.Select(u => new UserDto
            {
                Id = u.Id
            });
        }
        
        //Get user by id
        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            return new UserDto()
            {
                Id = user.Id
            };
        }
        
        //Create user
        public async Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            var user = new User
            {
                Id = userDto.Id
            };
            await userRepository.AddAsync(user);
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