namespace backend.queries;

public interface IQueryObject<T>
{
    IQueryable<T> Apply(IQueryable<T> query);
}