using Microsoft.AspNetCore.Mvc;
using FarmLink_Logger;

namespace FarmLink.Controllers
{
    [ApiController]
    [Route("logger")]
    public class LoggerController : ControllerBase
    {
        [HttpPost]
        public IActionResult Log([FromBody] string message)
        {
            FileLogger.CurrentLogger.Log(message);
            return Ok("Logged");
        }
    }
}
