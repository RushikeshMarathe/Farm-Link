using Microsoft.AspNetCore.Mvc;
using FarmLink_Logger;

namespace FarmLink_Logger.Controllers
{
    [ApiController]
    [Route("logger")]
    public class LoggerController : ControllerBase
    {
        [HttpPost]
        public IActionResult Log([FromBody] LogRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Log message is required");
            }

            FileLogger.CurrentLogger.Log(request.Message);
            return Ok("Logged successfully");
        }
    }

    // DTO for logging
    public class LogRequest
    {
        public string Message { get; set; }
    }
}
