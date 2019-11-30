using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Revature.Address.Api.Models;
using Revature.Address.Lib.BusinessLogic;
using Revature.Address.Lib.Interfaces;

namespace Revature.Address.Api.Controllers
{
  /// <summary>
  /// This controller handles http requests sent to the
  /// address service
  /// </summary>
  [Route("api/[controller]")]
  [ApiController]
  public class AddressController : ControllerBase
  {

    private readonly IDataAccess db;
    private readonly ILogger _logger;
    private readonly IAddressLogic _addressLogic;

    public AddressController(IDataAccess dataAccess, IAddressLogic addressLogic, ILogger<AddressController> logger = null)
    {
      db = dataAccess;
      _addressLogic = addressLogic;
      _logger = logger;
    }

    /// <summary>
    /// This method returns an address matching the given addressId
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    // GET: api/address/5
    [HttpGet("{id}")]
    public async Task<ActionResult<AddressModel>> GetAddressById(Guid id)
    {

      Lib.Address address = (await db.GetAddressAsync(id: id)).FirstOrDefault();

      if (address == null)
      {
        _logger.LogError("Address at {id} could not be found", id);
        return NotFound();
      }

      _logger.LogInformation("Got Address");
      return Ok(new AddressModel
      {
        Id = address.Id,
        Street = address.Street,
        City = address.City,
        State = address.State,
        Country = address.Country,
        ZipCode = address.ZipCode
      });
    }

    /// <summary>
    /// This method takes in two addressses from a url
    /// query string and returns true if they are within
    /// 20 miles of each other using Google's Distance MAtrix API
    /// and returns false if they are not.
    /// </summary>
    /// <param name="addresses"></param>
    /// <param name="addressLogic"></param>
    /// <returns></returns>
    // GET: api/address/getdistance
    [HttpGet("getdistance")]
    public async Task<ActionResult<bool>> IsInRange([FromQuery] List<AddressModel> addresses)
    {
      List<Lib.Address> checkAddresses = new List<Lib.Address>();
      foreach (AddressModel address in addresses)
      {
        Lib.Address newAddress = new Lib.Address
        {
          Id = address.Id,
          Street = address.Street,
          City = address.City,
          State = address.State,
          Country = address.Country,
          ZipCode = address.ZipCode
        };
        checkAddresses.Add(newAddress);
      }
      if (await _addressLogic.IsInRangeAsync(checkAddresses[0], checkAddresses[1], 20))
      {
        _logger.LogInformation("These addresses are within range of each other");
        return true;
      }
      else
      {
        _logger.LogError("These addresses are not in range of each other");
        return false;
      }
    }

    /// <summary>
    /// This method checks if an address already exists in the database,
    /// and if it does, it returns its addressId. If it doesn't exist it checks if the address
    /// exists with Google's Geocode API and if it does it's added to the database and
    /// its addressId is returned, otherwise a bad request message is returned.
    /// </summary>
    /// <param name="address"></param>
    /// <param name="addressLogic"></param>
    /// <returns></returns>
    // POST: api/address
    [HttpPost]
    public async Task<ActionResult<Guid>> PostTenantAddress([FromBody] AddressModel address)
    {
      Lib.Address newAddress = new Lib.Address
      {
        Id = address.Id,
        Street = address.Street,
        City = address.City,
        State = address.State,
        Country = address.Country,
        ZipCode = address.ZipCode
      };
      Lib.Address checkAddress = (await db.GetAddressAsync(address: newAddress)).FirstOrDefault();

      if (checkAddress == null)
      {
        _logger.LogInformation("Address does not exist in the database");
        newAddress.Id = new Guid();
        if (await _addressLogic.IsValidAddress(newAddress))
        {
          try
          {
            var newModel = new AddressModel
            {
              Id = newAddress.Id,
              Street = newAddress.Street,
              City = newAddress.City,
              State = newAddress.State,
              Country = newAddress.Country,
              ZipCode = newAddress.ZipCode
            };

            await db.AddAddressAsync(newAddress);
            await db.SaveAsync();
            _logger.LogInformation("Address successfully created");
            return newAddress.Id;
          }
          catch (Exception ex)
          {
            _logger.LogError("{0}", ex);
            return BadRequest($"Address entry failed");
          }
        }
        else
        {
          _logger.LogError("Address does not exist");
          return BadRequest("Address does not exist");
        }
      }
      else
      {

        _logger.LogError("Address already exists in the database");
        return checkAddress.Id;
      }
    }




    /// <summary>
    /// This method deletes the address matching the
    /// given addressId
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    // DELETE: api/address
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
      var item = await db.GetAddressAsync(id);
      if (item is null)
      {
        _logger.LogError("No address found matching given id");
        return NotFound();
      }

      await db.DeleteAddressAsync(id);
      _logger.LogInformation("Address successfully deleted");
      return NoContent();
    }
  }
}
