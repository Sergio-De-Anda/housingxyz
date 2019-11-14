using System.Collections.Generic;
using System.Threading.Tasks;
using Revature.Room.DataAccess.Entities;
using Revature.Room.Lib;

namespace Revature.Room.DataAccess
{
  public class DBMapper : IMapper
  {
    public async Task<Entities.Room> ParseRoom(Lib.Room Room)
    {
      return await Task.FromResult(new Entities.Room()
      {
        ComplexID = Room.ComplexID,
        Gender = Room.Gender,
        RoomNumber = Room.RoomNumber,
        RoomType = Room.RoomType,
        NumberOfBeds = Room.NumberOfBeds,
        LeaseStart = Room.LeaseStart,
        LeaseEnd = Room.LeaseEnd
      });
    }

    public async Task<Lib.Room> ParseRoom(Entities.Room Room)
    {
      return await Task.FromResult(new Lib.Room()
      {
        ComplexID = Room.ComplexID,
        Gender = Room.Gender,
        RoomNumber = Room.RoomNumber,
        RoomType = Room.RoomType,
        NumberOfBeds = Room.NumberOfBeds,
        LeaseStart = Room.LeaseStart,
        LeaseEnd = Room.LeaseEnd,
        RoomID = Room.RoomID
      });
    }

    public async Task<IEnumerable<Lib.Room>> ParseRooms(List<Entities.Room> roomsFromDB)
    {
      List<Lib.Room> roomsToReturn = new List<Lib.Room>();
      foreach (var item in roomsFromDB)
      {
        roomsToReturn.Add(await ParseRoom(item));
      }
      return await Task.FromResult(roomsToReturn);
    }
  }
}
