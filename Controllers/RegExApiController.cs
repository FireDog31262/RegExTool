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
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Json(new { id = id, value = "value"});;
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]RegexModel model)
        {
            var regex = new Regex(model.Expression.Trim());
            var matches = regex.Matches(model.Text);
        
            return this.Ok(
                matches.Cast<Match>().Select(m => m.Value).ToList()
            );
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
