using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ULS_Site.Models;

namespace ULS_Site.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewData["Title"] = "Utility Line Services Web Site";
//            ViewData["Message"] = "Welcome to ASP.NET MVC!";

            return RedirectToAction("Login", "Account");

//            return View();
        }

        public ActionResult About()
        {
            ViewData["Title"] = "About Page";

            return View();
        }

        public ActionResult Management()
        {
            ViewData["Title"] = "Management Team";

            return View();
        }

        public ActionResult MD_InterCountyConnector()
        {
            ViewData["Title"] = "Maryland Inter-County Connector";

            return View();
        }

        public ActionResult ProjHighlights()
        {
            ViewData["Title"] = "Project Highlights";

            return View();
        }

        public ActionResult Welcome()
        {
            ViewData["Title"] = "Welcome";

            return View();
        }

        public ActionResult Contacts()
        {
            ViewData["Title"] = "Contacts";

            return View();
        }

        public ActionResult UnderConstruction()
        {
            ViewData["Title"] = "Under Construction";

            return View();
        }

        public ActionResult Directions()
        {
            uls_dbDataContext ulsdb_dc = new uls_dbDataContext();

            ViewData["DefaultFroms"] = ulsdb_dc.GetDefaultFroms();
            
            ViewData["OfficeLocations"] = new SelectList(ulsdb_dc.GetOfficeLocations(), "location_address", "location_name");

//            ViewData["Title"] = "Directions";

            return View();
        }
    }
}
