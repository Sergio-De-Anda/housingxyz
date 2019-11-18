using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Revature.Room.DataAccess.Entities;
using Revature.Room.Lib;
using Data = Revature.Room.DataAccess.Entities;

namespace Revature.Room.DataAccess
{
  public class Repository : IRepository
  {
    private readonly RoomServiceContext _context;
    private readonly IMapper _map;

    public Repository(RoomServiceContext context, IMapper mapper)
    {
      _context = context;
      _map = mapper;
    }

    public async Task CreateRoom(Lib.Room myRoom)
    {
      Data.Room roomEntity = _map.ParseRoom(myRoom);
      await _context.AddAsync(roomEntity);
      await _context.SaveChangesAsync();
    }

    public async Task<List<Lib.Room>> ReadRoom(Guid roomId)
    {
      //if Guid does not exist then it will return all rooms
      if (roomId == null)
      {
        List<Data.Room> roomList = await _context.Room.Include(r => r.Gender).Include(r => r.RoomType).ToListAsync();

        return _map.ParseRooms(roomList).ToList();
      }

      //Find room by Guid and return that particular room
      var listRoom = await _context.Room.Include(r => r.Gender).Include(r => r.RoomType).ToListAsync();

      var x = listRoom.Where(r => r.RoomID == roomId).ToList();

      return _map.ParseRooms(x).ToList();

    }

    //Update room by Guid
    public async Task UpdateRoom(Lib.Room myRoom)
    {
      Data.Room roomEntity = await _context.Room.Where(r => r.RoomID == myRoom.RoomID)
        .Include(r => r.Gender)
        .Include(r => r.RoomType)
        .FirstOrDefaultAsync() ?? throw new ArgumentNullException("There is not such room!", nameof(roomEntity));

      //Figure out why _context.Gender does not work
      roomEntity.Gender.Type = myRoom.Gender;
      roomEntity.LeaseStart = myRoom.LeaseStart;
      roomEntity.LeaseEnd = myRoom.LeaseEnd;


      await _context.SaveChangesAsync();
    }

    //Deletes room by id
    public async Task DeleteRoom(Guid roomId)
    {
      var roomEntity = await _context.Room.FindAsync(roomId);
      _context.Remove(roomEntity);
    }

    public async Task<IEnumerable<Lib.Room>> GetFilteredRooms(
      Guid complexId,
      string roomNumber,
      int? numberOfBeds,
      string roomType,
      string gender,
      DateTime? endDate)
    {
      IEnumerable<Entities.Room> rooms = await _context.Room.Where(r => r.ComplexID == complexId).Include(r => r.Gender).Include(r => r.RoomType).ToListAsync();
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

    public Task ReadRoom(Lib.Room myRoom)
    {
      throw new NotImplementedException();
    }
  }
}
