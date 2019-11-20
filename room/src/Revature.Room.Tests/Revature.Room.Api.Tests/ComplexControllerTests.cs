using Microsoft.AspNetCore.Mvc;
using Moq;
using Revature.Room.Api.Controllers;
using Revature.Room.Lib;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Serilog;

namespace Revature.Room.DataAccess.Tests
{
  public class ComplexControllerTests
  {
    [Fact]
    public async Task GetFilteredRoomsShouldFilterByComplexId()
    {
      //arrange
      var mockRepo = new Mock<IRepository>();
      var mockLogger = new Mock<ILogger>();
      mockRepo.Setup(r => r.GetFilteredRoomsAsync(
        It.IsAny<Guid>(),
        It.IsAny<string>(),
        It.IsAny<int>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<DateTime>(),
        It.IsAny<Guid>()))
        .Returns(Task.FromResult<IEnumerable<Lib.Room>>(
          new List<Lib.Room>()
          {
            new Lib.Room()
          }

        ));
      var controller = new ComplexController(mockRepo.Object, mockLogger.Object);
      //act
      var result = await controller.GetFilteredRoomsAsync(Guid.NewGuid(), "", 1, "", "", DateTime.Now, Guid.NewGuid());

      //assert
      Assert.IsAssignableFrom<OkObjectResult>(result);
    }
  }
}
