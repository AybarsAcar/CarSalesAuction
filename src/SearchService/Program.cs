using System.Net;
using Polly;
using Polly.Extensions.Http;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

// add services container
builder.Services.AddControllers();
builder.Services.AddHttpClient<AuctionServiceHttpClient>()
    .AddPolicyHandler(GetRetryPolicy());

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

// so our Service does not stall if the Auction service goes down
app.Lifetime.ApplicationStarted.Register(async void () =>
{
    try
    {
        await DbInitializer.InitializeDb(app);
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
    }
});

app.Run();

// we will keep trying to make a request to Auction service
// we will keep making it until we return results
static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
    => HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
        .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(5));