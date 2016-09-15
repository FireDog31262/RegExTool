using System.Collections.Generic;
using System.Text.RegularExpressions;
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
            var returnMatches = new List<RegExMatch>();
            try {
                var regex = new Regex(model.Expression.Trim());
                var matches = regex.Matches(model.Text);
                foreach(Match match in matches) {
                    returnMatches.Add(
                        new RegExMatch{
                            start = match.Index,
                            end  = (match.Index + match.Length)
                        }
                    );
                }
            
                return this.Ok(
                    returnMatches.ToArray()
                );
            } catch {
                return this.Ok(new List<string>());
            }
        }
    }
}
