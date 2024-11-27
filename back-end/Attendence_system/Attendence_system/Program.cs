
using Attendence_system.Context;
using Attendence_system.Mapper;
using Attendence_system.Repository;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Attendence_system
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Logger
            var logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File("logs/AttendenceSystem_log.txt", rollingInterval: RollingInterval.Minute)
                .MinimumLevel.Information();
            builder.Logging.ClearProviders();
            builder.Logging.AddSerilog();

            builder.Services.AddDbContext<AttendenceSystem>(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("AttendenceSystem")));
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.DateFormatString = "yyyy-MM-dd";
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Add Repository
            builder.Services.AddScoped<IUserRepository, SqlUserRepo>();

            //Add AutoMapper
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile)); 

            //For Angular Connection
            builder.Services.AddCors(option =>
            {
                option.AddPolicy("MyPolicy", builder
                    =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });

            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("MyPolicy");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
