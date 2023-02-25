using ConcordApi.Data;
using ConcordApi.Dtos;
using ConcordApi.Services.Channel;
using Microsoft.EntityFrameworkCore;

namespace ConcordApi.Services.Message;

public class MessageService : IMessageService
{
    private readonly ConcordDbContext _dbContext;
    private readonly IChannelService _channelService;
    public MessageService(ConcordDbContext dbContext, IChannelService channelService)
    {
        _dbContext = dbContext;
        _channelService = channelService;
    }

    public async Task<ICollection<Models.Message>> GetMessagesAsync() => await _dbContext.Messages.ToListAsync();

    public async Task<Models.Message?> GetMessageAsync(int messageId) => await _dbContext.Messages.FindAsync(messageId);

    public async Task<Models.Message> CreateMessageAsync(CreateMessageDto createMessageDto)
    {
        var message = await _dbContext.Messages.AddAsync(new Models.Message()
        {
            Text = createMessageDto.Text,
            Sender = createMessageDto.Sender,
            ChannelId = createMessageDto.ChannelId
        });
        
        await _dbContext.SaveChangesAsync();

        return message.Entity;
    }

    public async Task<Models.Message> UpdateMessageAsync(UpdateMessageDto updateMessageDto)
    {
        var message = await GetMessageAsync(updateMessageDto.Id);
        if (message == null) throw new Exception("Message not found");
        
        message.Text = updateMessageDto.Text;
        message.UpdatedAt = DateTime.UtcNow;
        
        await _dbContext.SaveChangesAsync();
        
        return message;
    }

    public async Task DeleteMessageAsync(int messageId)
    {
        var message = await GetMessageAsync(messageId);
        if (message == null) throw new Exception("Message not found");
        
        _dbContext.Messages.Remove(message);

        await _dbContext.SaveChangesAsync();
    }
}