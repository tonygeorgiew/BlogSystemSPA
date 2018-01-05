using BlogSystem.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogSystem.Data
{
    public class BlogSystemContext : DbContext
    {
        public BlogSystemContext(DbContextOptions<BlogSystemContext> options) 
            : base(options)
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
