using ConcordApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ConcordApi.Services.Channel;

public class ChannelService : IChannelService
{
    private readonly IServiceProvider _serviceProvider;
    
    private ICollection<Models.Channel> _channels = new List<Models.Channel>();
    private bool _didFetchedFromDb = false;

    public ChannelService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public async Task AddMessageToChannelsPoolAsync(Models.Message message)
    {
        await Task.Run(() =>
        {
            _channels.FirstOrDefault(c => c.Id == message.ChannelId)?.Messages.Add(message);
        });
    }
    
    public async Task UpdateMessageToChannelsPoolAsync(Models.Message message)
    {
        await Task.Run(() =>
        {
            var _message = _channels.FirstOrDefault(c => c.Id == message.ChannelId)?.Messages.FirstOrDefault(m => m.Id == message.Id);
            if (_message != null)
            {
                _message.UpdatedAt = message.UpdatedAt;
                _message.Text = message.Text;
            }
        });
    }

    public async Task RemoveMessageFromChannelsPoolAsync(int messageId)
    {
        var channel = _channels.FirstOrDefault(c => c.Messages.Any(m => m.Id == messageId));
        if (channel == null) return;
        
        var message = channel.Messages.FirstOrDefault(m => m.Id == messageId);
        
        await Task.Run(() =>
        {
            channel.Messages.Remove(message);
        });
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
        if (_didFetchedFromDb) return _channels;
        
        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            _channels = await db.Channels.Include(c => c.Messages).ToListAsync();

            _didFetchedFromDb = true;

            return _channels;   
        }
    }

    public async Task<Models.Channel?> GetChannelAsync(int channelId)
    {
        var channel = _channels.FirstOrDefault(c => c.Id == channelId);
        if (channel != null) return channel;

        await using var db =
            new ConcordDbContext(_serviceProvider
                .GetRequiredService<DbContextOptions<ConcordDbContext>>());
        {
            channel = await db.Channels.FindAsync(channelId);
        
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

            _channels.Add(channel.Entity);
        
            await db.SaveChangesAsync();
        
            return channel.Entity;
        }
    }
}