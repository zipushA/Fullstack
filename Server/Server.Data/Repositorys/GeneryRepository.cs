using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Server.Core.Interfaces.IRepository; 
namespace Server.Data.Repositorys
{
    public class GeneryRepository<T>(DataContext dataContext) : IGeneryRepository<T> where T : class
    {
        private readonly DbSet<T> _dataSet = dataContext.Set<T>();
        public async Task<IEnumerable<T>> GetAsync()
        {
            return await _dataSet.ToListAsync();
        }
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dataSet.FindAsync(id);
        }
        public async Task<T> AddAsync(T t)
        {
            await _dataSet.AddAsync(t);
            return t;
        }
        public async Task<T> UpdateAsync(int id, T updatedEntity)
        {
            var existingEntity = await _dataSet.FindAsync(id);
            if (existingEntity == null)
            {
                return null; // הישות לא קיימת
            }

            // קבלת כל המאפיינים של הישות, חוץ מה-ID
            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                       .Where(prop => prop.Name != "Id");

            foreach (var property in properties)
            {
                var updatedValue = property.GetValue(updatedEntity);

                if (updatedValue != null)
                {
                    property.SetValue(existingEntity, updatedValue); // עדכון הערך
                }
            }

            // שמירת השינויים בבסיס הנתונים
          

            return existingEntity; // מחזיר את הישות המעודכנת
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var find = await _dataSet.FindAsync(id);
            if (find != null)
            {
                _dataSet.Remove(find);
                return true;
            }
            return false;
        }
    } 
}


