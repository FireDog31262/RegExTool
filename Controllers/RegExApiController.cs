using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RegExTool.Models;

namespace RegExTool.Controllers
{
    [Route("api/[controller]")]
    public class RegExApiController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody]RegexModel model)
        {
            try {
                var regex = new Regex(model.Expression.Trim());
                var matches = regex.Matches(model.Text);
            
                return this.Ok(
                    matches.Cast<Match>().Select(m => m.Value).ToList()
                );
            } catch {
                return this.Ok(new List<string>());
            }
        }
    }
}
