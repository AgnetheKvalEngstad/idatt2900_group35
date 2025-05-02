using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class TopicWithDetailsQuery : IQueryObject<Topic>
{
    public IQueryable<Topic> Apply(IQueryable<Topic> query)
    {
        return query
            .Include(t => t.Subtopic)
            .Include(t => t.Task)
            .Include(t => t.Reason);
    }
}