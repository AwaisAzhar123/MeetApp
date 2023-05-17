using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetApp.API.Models;
using System.Text.Json;

namespace MeetApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }
        public void SeedUsers()
        {
          //  var userData = System.IO.File.ReadAllText("../Data/UserSeedData.json");
            var userData = System.IO.File.ReadAllText("D:/MeetApp/MeetApp.API/Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);

            foreach (var user in users)
            {
                byte[] passwaordHash, passwordSalt;
                createPasswordHash("password", out passwaordHash, out passwordSalt);

                user.PasswordHash = passwaordHash;
                user.PasswordSalt = passwordSalt;

                user.Username = user.Username.ToLower();
                _context.Users.Add(user);

            }
            _context.SaveChanges();
        }
        private void createPasswordHash(string password , out byte[] passwordHash, out byte[] passwordSalt)
        {
          using (var hwind = new System.Security.Cryptography.HMACSHA512())
          {
            passwordSalt = hwind.Key;
            passwordHash = hwind.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
          }
        }
    }
}