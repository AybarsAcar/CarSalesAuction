using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

/// <summary>
/// Make sure, for your consumer implements IConsumer
/// and includes the type of the contract it will consume
/// - This Consumer consumes AuctionCreated contract
/// </summary>
public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;

    public AuctionCreatedConsumer(IMapper _mapper)
    {
        this._mapper = _mapper;
    }

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> Consuming auction created: " + context.Message.Id);

        var item = _mapper.Map<Item>(context.Message);

        // save the item to our db
        await item.SaveAsync();
    }
}