using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class TopicWithDetailsQuery : IQueryObject<Topic>
{
    /// <summary>
    /// Query object for topics with details.
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    public IQueryable<Topic> Apply(IQueryable<Topic> query)
    {
        return query
            .Include(t => t.Subtopic)
            .Include(t => t.Task)
            .Include(t => t.Reason);
    }
}