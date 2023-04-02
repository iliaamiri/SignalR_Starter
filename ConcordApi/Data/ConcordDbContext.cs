using ConcordApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcordApi.Data;

public class ConcordDbContext : DbContext
{
    public ConcordDbContext(DbContextOptions<ConcordDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>().Property("CreatedAt")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
        modelBuilder.Entity<Channel>().Property("CreatedAt")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }

    public DbSet<Message> Messages => Set<Message>();
    public DbSet<Channel> Channels => Set<Channel>();
}