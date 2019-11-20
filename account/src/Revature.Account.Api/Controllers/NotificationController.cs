using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Revature.Account.Lib.Interface;
using Revature.Account.Lib.Model;
using System;
using System.Threading.Tasks;

namespace Revature.Account.Api.Controllers
{
  [Route("api/notifications")]
  [ApiController]
  public class NotificationController : ControllerBase
  {
    private readonly IGenericRepository _repo;

    public NotificationController(IGenericRepository repo)
    {
      _repo = repo ?? throw new ArgumentNullException(nameof(repo));
    }

    // GET: api/notifications/5
    [HttpGet("{coordinatorId}", Name = "GetNotificationsByCoordinatorId")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetNotificationByCoordinatorIdAsync(Guid coordinatorId)
    {
      var nofi = await _repo.GetNotificationsByCoordinatorIdAsync(coordinatorId);
      if (nofi == null)
        return NotFound();

      return Ok(nofi);
    }

    // POST: api/notifications
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Post([FromBody, Bind("ProviderId, CoordinatorId")] Notification notification)
    {
      try
      {
        Lib.Model.Notification mappedNotification = new Lib.Model.Notification()
        {
          ProviderId = notification.ProviderId,
          CoordinatorId = notification.CoordinatorId,
          Status = "Pending",
          AccountExpiresAt = DateTime.Now.AddDays(7)
        };
        _repo.AddNotification(mappedNotification);
        await _repo.SaveAsync();
        return CreatedAtRoute("GetNotificationsByCoordinatorId", new { id = mappedNotification.NotificationId }, mappedNotification);
      }
      catch
      {
        return BadRequest();
      }
    }

    // PATCH: api/notifications/5
    [HttpPatch("{coordinatorId}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> Patch(Guid coordinatorId, [FromBody] Notification notification)
    {
      var existingNotification = await _repo.GetNotificationByIdAsync(coordinatorId);
      if (existingNotification != null)
      {
        existingNotification.Status = notification.Status;
        if (existingNotification.Status == "Under Review")
        {
          existingNotification.AccountExpiresAt = DateTime.Now.AddDays(30);
        }
        if (existingNotification.Status == "Rejected")
        {
          existingNotification = null;
        }
        await _repo.UpdateNotificationAsync(existingNotification);
        await _repo.SaveAsync();
        return NoContent();
      }
      return NotFound();
    }

    // DELETE: api/notifications/5
    [HttpDelete("{notificationId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(Guid notificationId)
    {
      var existingNotification = await _repo.GetProviderAccountByIdAsync(notificationId);
      if (existingNotification != null)
      {
        await _repo.DeleteNotificationByIdAsync(notificationId);
        await _repo.SaveAsync();
        return NoContent();
      }
      return NotFound();
    }
  }
}
