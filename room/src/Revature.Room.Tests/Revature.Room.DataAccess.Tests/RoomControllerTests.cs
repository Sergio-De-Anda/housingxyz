using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Moq;
using Revature.Room.Lib;
using System.Threading.Tasks;
using Revature.Room.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using ServiceBusMessaging;

namespace Revature.Room.DataAccess.Tests
{
  public class RoomControllerTests
  {
    [Fact]
    public async Task GetFilteredRoomsShouldFilterByComplexId()
    {
      //arrange
      var mockRepo = new Mock<IRepository>();
      var mockBus = new Mock<IServiceBusSender>();

      mockRepo.Setup<Task<IEnumerable<Lib.Room>>>(r => r.GetFilteredRooms(
        It.IsAny<Guid>(),
        It.IsAny<string>(),
        It.IsAny<int>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<DateTime>()))
        .Returns(Task.FromResult<IEnumerable<Lib.Room>>(
          new List<Lib.Room>()
          {
            new Lib.Room()
      
          }
        
        ));
      var controller = new RoomsController(mockRepo.Object, mockBus.Object );
      //act
      var result = await controller.GetFilteredRooms(Guid.NewGuid(), "", 1, "", "", DateTime.Now);

      //assert
      Assert.IsAssignableFrom<OkObjectResult>(result);
    }
  }
}
