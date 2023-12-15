using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/{controller}")]
public class AuctionsController : ControllerBase
{
  private readonly AuctionDbContext _context;
  private readonly IMapper _mapper;

  public AuctionsController(AuctionDbContext context, IMapper mapper)
  {
    _context = context;
    _mapper = mapper;
  }

  [HttpGet]
  public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
  {
    var auctions = await _context.Auctions
      .Include(a => a.Item)
      .OrderBy(a => a.Item.Make)
      .ToListAsync();

    return Ok(_mapper.Map<List<AuctionDto>>(auctions));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<AuctionDto>> GetAuctionById([FromRoute] Guid id)
  {
    var auction = await _context.Auctions
      .Include(a => a.Item)
      .FirstOrDefaultAsync(a => a.Id == id);

    if (auction == null)
    {
      return NotFound();
    }

    return Ok(_mapper.Map<AuctionDto>(auction));
  }

  [HttpPost]
  public async Task<ActionResult<AuctionDto>> CreateAuction([FromBody] CreateAuctionDto auctionDto)
  {
    var auction = _mapper.Map<Auction>(auctionDto);

    // TODO: add current user as seller
    auction.Seller = "test";

    _context.Auctions.Add(auction);

    var result = await _context.SaveChangesAsync() > 0;

    if (!result)
    {
      return BadRequest("Could not save changes to the DB");
    }

    // make sure to return where the newly added it is located
    return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, _mapper.Map<AuctionDto>(auction));
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateAuction([FromRoute] Guid id, [FromBody] UpdateAuctionDto updateAuctionDto)
  {
    var auction = await _context.Auctions.Include(a => a.Item)
      .FirstOrDefaultAsync(a => a.Id == id);

    if (auction == null)
    {
      return NotFound();
    }

    // TODO: check the seller == username

    // update the properties
    auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
    auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
    auction.Item.Colour = updateAuctionDto.Colour ?? auction.Item.Colour;
    auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
    auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

    var results = await _context.SaveChangesAsync() > 0;

    if (results)
    {
      return Ok();
    }

    return BadRequest("Problem saving changes");
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAuction([FromRoute] Guid id)
  {
    var auction = await _context.Auctions.FindAsync(id);
    
    if (auction == null)
    {
      return NotFound();
    }
    
    // TODO: check the seller == username

    _context.Auctions.Remove(auction);
    
    var results = await _context.SaveChangesAsync() > 0;

    if (results)
    {
      return Ok();
    }
    
    return BadRequest("Could not delete auction");
  }
}