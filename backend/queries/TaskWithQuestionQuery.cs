using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class TaskWithQuestionQuery : IQueryObject<backend.models.Task>
{
    public IQueryable<backend.models.Task> Apply(IQueryable<backend.models.Task> query)
    {
        return query.Include(t => t.Questions);
    }
}