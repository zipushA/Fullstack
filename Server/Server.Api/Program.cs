using DotNetEnv;
using Microsoft.OpenApi.Models;
using Server.Api;
using Server.Api.Extensions;
using Server.Core;
using Server.Core.Interfaces.IRepository;
using Server.Core.Interfaces.Services;
using Server.Data;
using Server.Data.Repositorys;
using Server.Service.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

// Add services to the container.
builder.Services.AddDbContext<DataContext>();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; // הוספת הגדרת ReferenceLoopHandling
    });
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IMatchingDataRepository, MatchingDataRepository>();
builder.Services.AddScoped<IMatchingDataService, MatchingDataService>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped(typeof(IGeneryRepository<>), typeof(GeneryRepository<>));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddAutoMapper(typeof(MappingPostProfile));
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddSingleton<MyOpenAiService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
Env.Load();
// îåñéó àú äîùúðéí ì-AppSettings áöåøä ãéðàîéú
builder.Configuration["AWS:BucketName"] = Env.GetString("AWS_BUCKET_NAME");
builder.Configuration["AWS:Region"] = Env.GetString("AWS_REGION");
builder.Configuration["AWS:AccessKey"] = Env.GetString("AWS_ACCESS_KEY");
builder.Configuration["AWS:SecretKey"] = Env.GetString("AWS_SECRET_KEY");

builder.Services.AddSwagger();

builder.AddJwtAuthentication();

builder.AddJwtAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();



app.MapControllers();

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty; // כדי שה-Swagger UI יופיע ב-root URL
});
app.Run();
