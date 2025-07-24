using BiddingService.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// configure RabbitMQ via MassTransit
builder.Services.AddMassTransit(configurator =>
{
    configurator.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

    configurator.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

    configurator.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", hostOptions =>
        {
            // specify our hosts here of internal docker netrworking
            hostOptions.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            hostOptions.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });

        cfg.ConfigureEndpoints(context);
    });
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

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();


app.UseAuthorization();

app.MapControllers();

await DB.InitAsync("BidDb",
    MongoClientSettings.FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnection")));

app.Run();