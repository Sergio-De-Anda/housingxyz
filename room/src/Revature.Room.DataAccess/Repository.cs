using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revature.Room.DataAccess.Entities;
using Revature.Room.Lib;
using Data = Revature.Room.DataAccess.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Revature.Room.DataAccess
{
  public class Repository : IRepository
  {
    private readonly RoomServiceContext _context;
    private readonly IMapper _map;
    private readonly ILogger<Repository> _logger;

    public Repository(RoomServiceContext context, IMapper mapper, ILogger<Repository> logger)
    {
      _context = context;
      _map = mapper;
      _logger = logger;
    }

    public async Task CreateRoom(Lib.Room myRoom)
    {
      Data.Room roomEntity = _map.ParseRoom(myRoom);
      await _context.AddAsync(roomEntity);
      await _context.SaveChangesAsync();

      //Log here, not too sure about myRoom
      _logger.LogInformation("Successfully added room to database!", myRoom);

    }

    public async Task ReadRoom(Lib.Room myRoom)
    {

    }
    public async Task UpdateRoom(Lib.Room myRoom)
    {
      //Either use the Guid or RoomNumber to find room by.  Most likely using Guyd which is RoomID
      Data.Room roomEntity = _context.Room.Where(r => r.RoomID == myRoom.RoomID).Include(r => r.Gender).Include(r => r.RoomType).First();
      try
      {

        if (roomEntity == null)
        {
          throw new ArgumentNullException("There is no such room!", nameof(myRoom));
        }

        //Figure out why _context.Gender does not work
        roomEntity.Gender.Type = myRoom.Gender;
        roomEntity.LeaseStart = myRoom.LeaseStart;
        roomEntity.LeaseEnd = myRoom.LeaseEnd;


      }
      catch(ArgumentNullException e)
      {
        _logger.LogError("There is no such room!", myRoom);
      }
      catch(InvalidOperationException e)
      {
        _logger.LogError("Invalid operation. Can't change those!",myRoom);
      }


      await _context.SaveChangesAsync();
      _logger.LogInformation("Updating room successful!",myRoom);
    }

    public async Task DeleteRoom(int roomId)
    {
      var roomEntity = await _context.Room.FindAsync(roomId);
      _context.Remove(roomEntity);
      _logger.LogInformation("Successfully removed room from database!", roomEntity);
    }

    public async Task<IEnumerable<Lib.Room>> GetFilteredRooms(
      Guid complexId,
      string roomNumber,
      int? numberOfBeds,
      string roomType,
      string gender,
      DateTime? endDate)
    {
      IEnumerable<Entities.Room> rooms = _context.Room.Where(r => r.ComplexID == complexId);
      if (roomNumber != null)
      {
        rooms = rooms.Where(r => r.RoomNumber == roomNumber);
      }
      if (numberOfBeds != null)
      {
        rooms = rooms.Where(r => r.NumberOfBeds == numberOfBeds);
      }
      if (roomType != null)
      {
        rooms = rooms.Where(r => r.RoomType.Type == roomType);
      }
      if (gender != null)
      {
        rooms = rooms.Where(r => r.Gender.Type == gender);
      }
      if (endDate != null)
      {
        rooms = rooms.Where(r => endDate < r.LeaseEnd);
      }
      return _map.ParseRooms(rooms);
    }
  }
}
