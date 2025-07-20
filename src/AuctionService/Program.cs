using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AuctionDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// configure RabbitMQ via MassTransit
builder.Services.AddMassTransit(configurator =>
{
    // setup outbox in our service DB for our event bus
    configurator.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
    {
        // every 10 seconds, poll and try to deliver to the service bus
        o.QueryDelay = TimeSpan.FromSeconds(10);

        o.UsePostgres();
        o.UseBusOutbox();
    });

    // Add the consumers, only 1 consumer from 1 namespace is enough
    configurator.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
    configurator.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction", false));

    configurator.UsingRabbitMq((context, cfg) => { cfg.ConfigureEndpoints(context); });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // this will be our IdentityService, the token issuer
        options.Authority = builder.Configuration["IdentityServiceUrl"];

        // this is because our IdentityService is running on HTTP for testing
        options.RequireHttpsMetadata = false;

        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

try
{
    app.InitDb();
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();