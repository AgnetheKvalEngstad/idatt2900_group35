namespace backend.queries;

public interface IQueryObject<T>
{
    /// <summary>
    /// Interface for query objects.
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    IQueryable<T> Apply(IQueryable<T> query);
}