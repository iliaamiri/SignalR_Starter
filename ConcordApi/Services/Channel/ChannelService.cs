namespace ConcordApi.Services.Channel;

public class ChannelService : IChannelService
{
    public async Task<ICollection<Models.Channel>> GetChannelsAsync()
    {
        throw new NotImplementedException();
    }
    
    public async Task<ICollection<Models.Channel>> GetChannelsWithMessagesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Channel> GetChannelAsync(int channelId)
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Channel> CreateChannelAsync(string name)
    {
        throw new NotImplementedException();
    }
}