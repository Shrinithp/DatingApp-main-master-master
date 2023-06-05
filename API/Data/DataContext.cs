using API.Entities;
using Microsoft.EntityFrameworkCore;
 namespace API.Data
{
    public class DataContext:DbContext
    {
        //creating a class.
        public DataContext(DbContextOptions options): base(options)
        {

        }
        //our table name is going to be users and the columns inside our User table are column for Id and column for users(inside AppUsers)
        public DbSet<AppUser> Users { get; set;}
        
        
    }
}