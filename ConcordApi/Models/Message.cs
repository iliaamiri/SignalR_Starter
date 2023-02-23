namespace ConcordApi.Models;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public string Sender { get; set; } = null!;
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public int ChannelId { get; set; }
    public Channel Channel { get; set; }
}