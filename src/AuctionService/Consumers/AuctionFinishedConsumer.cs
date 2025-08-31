using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _dbContext;

    public AuctionFinishedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine($"--> Consuming AuctionFinishedConsumer: {context.MessageId}");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        if (context.Message.ItemSold)
        {
            // set the auction properties for the winner and sold amount
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount;
        }

        // define the auction status
        auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }
}