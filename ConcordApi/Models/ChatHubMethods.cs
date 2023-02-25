namespace ConcordApi.Models;

public static class HubMethods
{
    public static string ReceiveMessage { get; } = "ReceiveMessage";
    public static string UpdateMessage { get; } = "UpdateMessage";
    public static string DeleteMessage { get; } = "DeleteMessage";
    public static string NewChannel { get; } = "NewChannel";
    public static string DeleteChannel { get; } = "DeleteChannel";
}