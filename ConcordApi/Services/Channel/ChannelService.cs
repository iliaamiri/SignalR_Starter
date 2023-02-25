using ConcordApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ConcordApi.Services.Channel;

public class ChannelService : IChannelService
{
    private readonly IServiceProvider _serviceProvider;
    
    public ChannelService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task<ICollection<Models.Channel>> GetChannelsAsync()
    {
        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            return await db.Channels.ToListAsync();
        }
    }

    public async Task<ICollection<Models.Channel>> GetChannelsWithMessagesAsync()
    {
        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            return await db.Channels.Include(c => c.Messages).ToListAsync();
        }
    }

    public async Task<Models.Channel?> GetChannelAsync(int channelId)
    {
        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            var channel = await db.Channels.FindAsync(channelId);
        
            return channel;
        }
    }

    public async Task<Models.Channel> CreateChannelAsync(string name)
    {
        using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            var channel = await db.Channels.AddAsync(new Models.Channel()
            {
                Name = name
            });

            await db.SaveChangesAsync();
        
            return channel.Entity;
        }
    }

    public async Task DeleteChannelAsync(int channelId)
    {
        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            var channel = await db.Channels.FindAsync(channelId);
            if (channel == null) throw new Exception("Channel not found");
            
            db.Channels.Remove(channel);
            
            await db.SaveChangesAsync();
        }
    }
}