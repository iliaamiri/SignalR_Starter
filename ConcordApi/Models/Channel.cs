namespace ConcordApi.Models;

public class Channel
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public ICollection<Message> Messages { get; set; } = new List<Message>();
}