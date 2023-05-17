using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetApp.API.Models;

namespace MeetApp.API.Data
{
    public interface IMeetAppRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;

        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}