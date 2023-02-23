namespace ConcordApi.Dtos;

public class CreateMessageDto
{
    public string Text { get; set; } = null!;
    public string Sender { get; set; } = null!;
    public int ChannelId { get; set; }
}