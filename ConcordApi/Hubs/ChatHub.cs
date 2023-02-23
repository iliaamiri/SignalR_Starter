using ConcordApi.Dtos;
using ConcordApi.Models;
using ConcordApi.Services.Channel;
using ConcordApi.Services.Message;
using Microsoft.AspNetCore.SignalR;

namespace ConcordApi.Hubs;

public class ChatHub : Hub
{
    private readonly ILogger<ChatHub> _logger;
    
    private readonly IChannelService _channelService;
    private readonly IMessageService _messageService;
    
    public ChatHub(ILogger<ChatHub> logger, IChannelService channelService, IMessageService messageService)
    {
        _logger = logger;
        _channelService = channelService;
        _messageService = messageService;
    }

    public async Task<ICollection<Channel>> GetChannels() =>
        await _channelService.GetChannelsWithMessagesAsync();
    
    public async Task<Channel> CreateChannel(string name)
    {
        return await _channelService.CreateChannelAsync(name);
    }
    
    public async Task SendMessage(CreateMessageDto createMessageDto)
    {
        var message = await _messageService.CreateMessageAsync(createMessageDto);
        await Clients.Group(message.ChannelId.ToString()).SendAsync(HubMethods.ReceiveMessage, message);
    }

    public async Task<HubResponse<Message>> UpdateMessage(UpdateMessageDto updateMessageDto)
    {
        try
        {
            var message = await _messageService.UpdateMessageAsync(updateMessageDto);
            await Clients.Group(message.ChannelId.ToString()).SendAsync(HubMethods.UpdateMessage, message);
            return new HubResponse<Message>()
            {
                Success = true,
                Data = message
            };
        }
        catch (Exception e)
        {
            return new HubResponse<Message>()
            {
                Success = false,
                Error = e.Message
            };
        }
    }

    public async Task DeleteMessage(Message message)
    {
        await _messageService.DeleteMessageAsync(message.Id);
        await Clients.Group(message.ChannelId.ToString()).SendAsync(HubMethods.DeleteMessage, message);
    }

    public async Task JoinChannel(int channelId) => await Groups.AddToGroupAsync(Context.ConnectionId, channelId.ToString());
    
    public async Task LeaveChannel(int channelId) => await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelId.ToString());
    
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }
    
    public override Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogDebug(exception?.Message);
        return base.OnDisconnectedAsync(exception);
    }
}