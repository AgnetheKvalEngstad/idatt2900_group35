using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class UserWithTopicsQuery : IQueryObject<User>
{
    public IQueryable<User> Apply(IQueryable<User> query)
    {
        return query.Include(u => u.Topics);
    }
    
}