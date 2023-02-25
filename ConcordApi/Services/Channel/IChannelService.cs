namespace ConcordApi.Services.Channel;

public interface IChannelService
{

    Task<ICollection<Models.Channel>> GetChannelsAsync();
    
    Task<ICollection<Models.Channel>> GetChannelsWithMessagesAsync();

    Task<Models.Channel?> GetChannelAsync(int channelId);
    
    Task<Models.Channel> CreateChannelAsync(string name);
    
    Task DeleteChannelAsync(int channelId);
}