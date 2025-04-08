using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using backend.data;

namespace backend.repositories
{
    public class Repository<T>(BackendDbContext context) : IRepository<T>
        where T : class
    {
        //Get an entity by id
        public async Task<T> GetByIdAsync(int id)
        {
            //must be able to return null if entity is not found
            return await context.Set<T>().FindAsync(id);
        }
        
        //Get all entities
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }
        
        //Get entities that match a predicate
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await context.Set<T>().Where(predicate).ToListAsync();
        }
        
        //Add an entity
        public async Task AddAsync(T entity)
        {
            await context.Set<T>().AddAsync(entity);
        }
        
        //Add a range of entities
        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await context.Set<T>().AddRangeAsync(entities);
        }
        
        //Update an entity
        public async Task UpdateAsync(T entity)
        {
            context.Set<T>().Update(entity);
            await context.SaveChangesAsync();
        }
        
        //Remove an entity
        public void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }
        
        //Remove a range of entities
        public void RemoveRange(IEnumerable<T> entities)
        {
            context.Set<T>().RemoveRange(entities);
        }


    }
}