using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Revature.Complex.DataAccess.Entities;
using Serilog;
using Serilog.Events;
using System;
using System.Threading.Tasks;

namespace Revature.Complex.Api
{
  public static class Program
  {
    /// <summary>
    /// main method of web api
    /// automatically generated by visual studio 2019
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public static async Task Main(string[] args)
    {
      ConfigureLogger();

      try
      {
        Log.Information("Building web host");
        using var host = CreateHostBuilder(args).Build();
        await EnsureDatabaseCreatedAsync(host);

        Log.Information("Starting web host");
        await host.RunAsync();
      }
#pragma warning disable CA1031 // Do not catch general exception types
      catch (Exception ex)
      {
        Log.Fatal(ex, "Host terminated unexpectedly");
      }
#pragma warning restore CA1031 // Do not catch general exception types
      finally
      {
        Log.CloseAndFlush();
      }
    }

    /// <summary>
    /// add logger service to be used by controller, service bus, and data access
    /// </summary>
    public static void ConfigureLogger()
    {
      Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .CreateLogger();
    }

    /// <summary>
    /// add host service
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          webBuilder.UseStartup<Startup>();
          webBuilder.UseSerilog();
        });

    /// <summary>
    /// add service to ensure the database is existed every time
    /// </summary>
    /// <param name="host"></param>
    /// <returns></returns>
    public static async Task EnsureDatabaseCreatedAsync(IHost host)
    {
      using var scope = host.Services.CreateScope();
      var serviceProvider = scope.ServiceProvider;

      Log.Information("Ensuring database created");
      using var context = serviceProvider.GetRequiredService<ComplexDbContext>();

      var created = await context.Database.EnsureCreatedAsync();
      if (created)
      {
        Log.Information("Database created");
      }
      else
      {
        Log.Information("Database already exists; not created");
      }
    }
  }
}
