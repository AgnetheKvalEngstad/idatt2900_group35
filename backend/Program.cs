using backend.services;
using backend.repositories;
using backend.models;
using backend.data;
using Microsoft.EntityFrameworkCore;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1"));
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();