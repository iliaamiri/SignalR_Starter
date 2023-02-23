using ConcordApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ConcordApi.Services.Channel;

public class ChannelService : IChannelService
{
    private readonly ConcordDbContext _dbContext;
    
    public ChannelService(ConcordDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ICollection<Models.Channel>> GetChannelsAsync() => await _dbContext.Channels.ToListAsync();

    public async Task<ICollection<Models.Channel>> GetChannelsWithMessagesAsync() =>
        await _dbContext.Channels.Include(c => c.Messages).ToListAsync();

    public async Task<Models.Channel?> GetChannelAsync(int channelId) => await _dbContext.Channels.FindAsync(channelId);

    public async Task<Models.Channel> CreateChannelAsync(string name)
    {
        var channel = await _dbContext.Channels.AddAsync(new Models.Channel()
        {
            Name = name
        });

        await _dbContext.SaveChangesAsync();
        
        return channel.Entity;
    }
}