using System.Linq.Expressions;

namespace backend.repositories
{
    /// <summary>
    /// Interface for a repository pattern with CRUD operations and queries.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> where T : class
    {
        //Get an entity by id
        Task<T> GetByIdAsync(int id);
        
        //Get an entity by id with a query
        Task<T?> GetByIdWithQueryAsync(int id, Func<IQueryable<T>, IQueryable<T>> queryCustomizer);
        
        //Get all entities
        Task<IEnumerable<T>> GetAllAsync();
        
        //Get all entities with a query
        Task<IEnumerable<T>> GetAllWithQueryAsync(Func<IQueryable<T>, IQueryable<T>> queryCustomizer);
        
        //Get entities that match a predicate
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        
        //Add an entity
        Task AddAsync(T entity);
        
        //Add a range of entities
        Task AddRangeAsync(IEnumerable<T> entities);
        
        //Update an entity
        Task UpdateAsync(T entity);
        
        //Remove an entity
        void Remove(T entity);
        
        //Remove a range of entities
        void RemoveRange(IEnumerable<T> entities);
    }
}