using Microsoft.EntityFrameworkCore;

namespace backend.queries;

public class TaskWithQuestionQuery : IQueryObject<backend.models.Task>
{
    /// <summary>
    /// Query object for tasks with questions.
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    public IQueryable<backend.models.Task> Apply(IQueryable<backend.models.Task> query)
    {
        return query.Include(t => t.Questions);
    }
}