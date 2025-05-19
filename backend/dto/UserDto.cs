namespace backend.dto
{
    public class UserDto
    {
        /// <summary>
        /// DTO class for User
        /// </summary>
        public int Id { get; set; }
        public List<int> TopicIds { get; set; } = new List<int>();
        public int AllUserPoints { get; set; }
    }
}