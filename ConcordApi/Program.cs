using ConcordApi.Data;
using ConcordApi.Hubs;
using ConcordApi.Services.Channel;
using ConcordApi.Services.Message;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IChannelService, ChannelService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ConcordDbContext>(
    opt =>
    {
        opt.UseNpgsql(connectionString);
        if (builder.Environment.IsDevelopment())
        {
            // The following three options help with debugging, but should
            // be changed or removed for production.
            opt.LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        }
    });

var port = Environment.GetEnvironmentVariable("PORT") ?? "8085";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/r/chatHub");

app.Run();