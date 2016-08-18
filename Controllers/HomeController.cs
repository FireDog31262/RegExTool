using Microsoft.AspNetCore.Mvc;

namespace RegExTool.Controllers{

    [Route("/")]
    public class HomeController: Controller {
        [HttpGet]
        public IActionResult Index(){
            return View();
        }
    }
}