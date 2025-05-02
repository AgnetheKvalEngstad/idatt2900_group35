using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using backend.data;

namespace backend.repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly BackendDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(BackendDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        
        //Get an entity by id
        public async Task<T> GetByIdAsync(int id)
        {
            //must be able to return null if entity is not found
            return await _context.Set<T>().FindAsync(id);
        }
        
        //Get an entity by id with a query
        public async Task<T?> GetByIdWithQueryAsync(int id, Func<IQueryable<T>, IQueryable<T>> queryCustomizer)
        {
            IQueryable<T> query = _dbSet;
            query = queryCustomizer(query);
            return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
        }
        
        //Get all entities
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
        
        //Get all entities with a query
        public async Task<IEnumerable<T>> GetAllWithQueryAsync(Func<IQueryable<T>, IQueryable<T>> queryCustomizer)
        {
            IQueryable<T> query = _dbSet;
            query = queryCustomizer(query);
            return await query.ToListAsync();
        }
        
        //Get entities that match a predicate
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }
        
        //Add an entity
        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        
        //Add a range of entities
        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _context.Set<T>().AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }
        
        //Update an entity
        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }
        
        //Remove an entity
        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }
        
        //Remove a range of entities
        public void RemoveRange(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
            _context.SaveChanges();
        }


    }
}