using ConcordApi.Dtos;

namespace ConcordApi.Services.Message;

public class MessageService : IMessageService
{
    public async Task<ICollection<Models.Message>> GetMessagesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Message> GetMessageAsync(int messageId)
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Message> CreateMessageAsync(CreateMessageDto createMessageDto)
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Message> UpdateMessageAsync(UpdateMessageDto updateMessageDto)
    {
        throw new NotImplementedException();
    }

    public async Task<Models.Message> DeleteMessageAsync(int messageId)
    {
        throw new NotImplementedException();
    }
}