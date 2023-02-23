using ConcordApi.Dtos;

namespace ConcordApi.Services.Message;

public interface IMessageService
{
    Task<ICollection<Models.Message>> GetMessagesAsync();
    
    Task<Models.Message> GetMessageAsync(int messageId);

    Task<Models.Message> CreateMessageAsync(CreateMessageDto createMessageDto);

    Task<Models.Message> UpdateMessageAsync(UpdateMessageDto updateMessageDto);
    
    Task<Models.Message> DeleteMessageAsync(int messageId);
}