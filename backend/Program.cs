using backend.services;
using backend.repositories;
using backend.models;
using backend.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register the DbContext
builder.Services.AddDbContext<BackendDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IReasonService, ReasonService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IBonusService, BonusService>();
builder.Services.AddScoped<ISubtopicService, SubtopicService>();

builder.Services.AddScoped<IRepository<Reason>, Repository<Reason>>();
builder.Services.AddScoped<IRepository<User>, Repository<User>>();
builder.Services.AddScoped<IRepository<backend.models.Task>, Repository<backend.models.Task>>();
builder.Services.AddScoped<IRepository<Topic>, Repository<Topic>>();
builder.Services.AddScoped<IRepository<Bonus>, Repository<Bonus>>();
builder.Services.AddScoped<IRepository<Subtopic>, Repository<Subtopic>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(7040);
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<BackendDbContext>();

    var retries = 10;
    while (retries > 0)
    {
        try
        {
            dbContext.Database.Migrate();
            break;
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Database not ready yet: {ex.Message}");
            retries--;
            Thread.Sleep(3000);
        }
    }

    if (retries == 0)
    {
        Console.WriteLine("Could not connect to the database after multiple attempts.");
        throw new Exception("Failed to connect to the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost5173");
app.UseAuthorization();
app.MapControllers();
app.Run();
