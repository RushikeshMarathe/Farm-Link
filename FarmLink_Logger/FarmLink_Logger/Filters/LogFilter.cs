using Microsoft.AspNetCore.Mvc.Filters;
using FarmLink_Logger;

namespace MVCDemo.Filters
{
    public class LogFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            FileLogger.CurrentLogger.Log("Called "+ context.HttpContext.Request.Path);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            FileLogger.CurrentLogger.Log("Completed "+context.HttpContext.Request.Path);
        }
    }
}
