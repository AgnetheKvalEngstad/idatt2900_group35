using System.Linq.Expressions;

namespace backend.repositories
{
    public interface IRepository<T> where T : class
    {
        //Get an entity by id
        Task<T> GetByIdAsync(int id);
        
        //Get all entities
        Task<IEnumerable<T>> GetAllAsync();
        
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