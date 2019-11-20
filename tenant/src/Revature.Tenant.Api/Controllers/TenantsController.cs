using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Revature.Tenant.Lib.Interface;
using Revature.Tenant.Api.Models;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Revature.Tenant.Api.ServiceBus;

namespace Revature.Tenant.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TenantController : ControllerBase
  {
    private readonly IServiceBusSender _serviceBusSender;
    private readonly ITenantRepository _tenantRepository;

    public TenantController(ITenantRepository tenantRepository)
    {
      _tenantRepository = tenantRepository ?? throw new ArgumentNullException(nameof(tenantRepository), "Tenant Cannot be null");
    }

    /// <summary>
    /// Get all tenants
    /// </summary>
    /// <returns></returns>
        // GET: api/Tenant
    [HttpGet(Name = "GetAllAsync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<ApiTenant>>> GetAllAsync()
    {
      var tenant = await _tenantRepository.GetAllAsync();

      return tenant.Select(t => new ApiTenant
      {
        Id = t.Id,
        Email = t.Email,
        Gender = t.Gender,
        FirstName = t.FirstName,
        LastName = t.LastName,
        AddressId = t.AddressId,
        RoomId = t.RoomId,
        CarId = t.CarId,
        BatchId = t.BatchId,
        TrainingCenter = t.TrainingCenter
      }).ToList();
    }

    /// <summary>
    /// Get Tenant by Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    // GET: api/Tenant/5
    //api/[controller]
    [HttpGet("{id}", Name = "GetByIdAsync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiTenant>> GetByIdAsync([FromRoute] Guid id)
    {
      try
      {
        var tenant = await _tenantRepository.GetByIdAsync(id);
        var apiTenant = new ApiTenant
        {
          Id = tenant.Id,
          Email = tenant.Email,
          Gender = tenant.Gender,
          FirstName = tenant.FirstName,
          LastName = tenant.LastName,
          AddressId = tenant.AddressId,
          RoomId = tenant.RoomId,
          CarId = tenant.CarId,
          BatchId = tenant.BatchId,
          TrainingCenter = tenant.TrainingCenter
        };

        return Ok(apiTenant);
      }
      catch (ArgumentException)
      {
        return NotFound();
      }
      catch (Exception e)
      {
        return StatusCode(500, e.Message);
      }
    }

    /// <summary>
    /// Posts Tenant to Db
    /// </summary>
    /// <param name="value"></param>
    // POST: api/Tenant
    [HttpPost("RegisterTenant", Name = "RegisterTenant")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiTenant>> PostAsync([FromBody] ApiTenant tenant)
    {
      try
      {
        var newTenant = new Lib.Models.Tenant
        {
          Id = tenant.Id,
          Email = tenant.Email,
          Gender = tenant.Gender,
          FirstName = tenant.FirstName,
          LastName = tenant.LastName,
          AddressId = tenant.AddressId,
          RoomId = tenant.RoomId,
          CarId = tenant.CarId,
          BatchId = tenant.BatchId,
          TrainingCenter = tenant.TrainingCenter
        };

        await _tenantRepository.AddAsync(newTenant);

        ICollection<Lib.Models.Tenant> tenents = await _tenantRepository.GetAllAsync();
        newTenant = tenents.First(t => t.Email == newTenant.Email);

        ApiTenant apiTenant = new ApiTenant
        {
          Id = tenant.Id,
          Email = tenant.Email,
          Gender = tenant.Gender,
          FirstName = tenant.FirstName,
          LastName = tenant.LastName,
          AddressId = tenant.AddressId,
          RoomId = tenant.RoomId,
          CarId = tenant.CarId,
          BatchId = tenant.BatchId,
          TrainingCenter = tenant.TrainingCenter
        };

        return Created($"api/Tenant/{apiTenant.Id}", apiTenant);
      }
      catch (ArgumentException)
      {
        return NotFound();
      }
      catch (InvalidOperationException e)
      {
        return Conflict(e.Message);
      }
      catch (Exception e)
      {
        return StatusCode(500, e.Message);
      }
    }

    /// <summary>
    /// Updates Tenant within Db
    /// </summary>
    /// <param name="value"></param>
    // POST: api/Tenant
    [HttpPut("UpdateTenant", Name = "UpdateTenant")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiTenant>> UpdateAsync([FromBody] ApiTenant tenant)
    {
      try
      {
        var newTenant = new Lib.Models.Tenant
        {
          Id = tenant.Id,
          Email = tenant.Email,
          Gender = tenant.Gender,
          FirstName = tenant.FirstName,
          LastName = tenant.LastName,
          AddressId = tenant.AddressId,
          RoomId = tenant.RoomId,
          CarId = tenant.CarId,
          BatchId = tenant.BatchId,
          TrainingCenter = tenant.TrainingCenter 
         
        };

        await _tenantRepository.AddAsync(newTenant);

        ICollection<Lib.Models.Tenant> tenants = await _tenantRepository.GetAllAsync();
        newTenant = tenants.First(t => t.Email == newTenant.Email);

        ApiTenant apiTenant = new ApiTenant
        {
          Id = tenant.Id,
          Email = tenant.Email,
          Gender = tenant.Gender,
          FirstName = tenant.FirstName,
          LastName = tenant.LastName,
          AddressId = tenant.AddressId,
          RoomId = tenant.RoomId,
          CarId = tenant.CarId,
          BatchId = tenant.BatchId,
          TrainingCenter = tenant.TrainingCenter
        };

        return StatusCode(204);
      }
      catch (ArgumentException)
      {
        return NotFound();
      }
      catch (InvalidOperationException e)
      {
        return Conflict(e.Message);
      }
      catch (Exception e)
      {
        return StatusCode(500, e.Message);
      }
    }
  }
}
