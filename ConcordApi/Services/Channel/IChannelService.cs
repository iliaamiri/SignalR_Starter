namespace ConcordApi.Services.Channel;

public interface IChannelService
{
    Task AddMessageToChannelsPoolAsync(Models.Message message);

    Task RemoveMessageFromChannelsPoolAsync(int messageId);

    Task UpdateMessageToChannelsPoolAsync(Models.Message message);
    
    Task<ICollection<Models.Channel>> GetChannelsAsync();
    
    Task<ICollection<Models.Channel>> GetChannelsWithMessagesAsync();

    Task<Models.Channel?> GetChannelAsync(int channelId);
    
    Task<Models.Channel> CreateChannelAsync(string name);
}