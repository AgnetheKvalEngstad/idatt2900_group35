using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class UserWithTopicsQuery : IQueryObject<User>
{
    /// <summary>
    /// Query object for users with topics.
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    public IQueryable<User> Apply(IQueryable<User> query)
    {
        return query.Include(u => u.Topics);
    }
    
}