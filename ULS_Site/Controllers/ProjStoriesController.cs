using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

namespace ULS_Site.Controllers
{
    public class ProjStoriesController : Controller
    {
        //
        // GET: /ProjStories/

        public ActionResult DranesvilleVA()
        {
            ViewData["Title"] = "Dranesville Gate Station – Dranesville, VA (Washington Gas)";

            return View();
        }

        public ActionResult MD_InterCountyConnector()
        {
            ViewData["Title"] = "Maryland Inter-County Connector";

            return View();
        }

        public ActionResult MontcoFredMD()
        {
            ViewData["Title"] = "Montgomery and Frederick County, MD";

            return View();
        }

        public ActionResult PrinceGeorgeCoMD()
        {
            ViewData["Title"] = "Prince Georges County, Maryland";

            return View();
        }

    }
}
