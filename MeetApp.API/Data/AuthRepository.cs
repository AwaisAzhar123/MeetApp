using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
         _context = context;   
        }
        public async Task<User> Register(User user, string password)
        {
             byte[] passwordHash, passwordSalt;
             createPasswordHash(password, out passwordHash, out passwordSalt); 
             user.PasswordHash = passwordHash;
             user.PasswordSalt = passwordSalt;

             await _context.Users.AddAsync(user);
             await _context.SaveChangesAsync();

             return user;
        }

        public async Task<User?> Login(string username, string password) 
        {
            var user = await _context.Users.FirstOrDefaultAsync( x => x.Username == username);

            if (user == null)
            return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

            return user;
        }
        public async Task<bool> UserExists(string username)
        {
           if (await _context.Users.AnyAsync( x => x.Username == username))
           return true;

           return false;
        }
        private void createPasswordHash(string password , out byte[] passwordHash, out byte[] passwordSalt)
        {
          using (var hwind = new System.Security.Cryptography.HMACSHA512())
          {
            passwordSalt = hwind.Key;
            passwordHash = hwind.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
          }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
           using( var hwind= new System.Security.Cryptography.HMACSHA512(passwordSalt))
           {
            var computedHash = hwind.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for(int i=0; i<computedHash.Length ; i++)
            {
                 if(computedHash[i] != passwordHash[i])
                 return false;
            }
           }
           return true;
        }
    }
}