namespace backend.dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public List<string> Topics { get; set; } = null!;
        public int AllUserPoints { get; set; }
    }
}