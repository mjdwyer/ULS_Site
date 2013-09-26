using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

namespace ULS_Site.Controllers
{
    public class CrystalRptViewerController : Controller
    {
        //
        // GET: /CrystalRptViewer/

        public ActionResult Index()
        {

            ViewData["default_division"] = Session["default_division"];

            return View();
        }

        public ActionResult SvcRptViewer()
        {


            return View();
        }

        public ActionResult QualificationRptViewer()
        {
            return View();
        }

        public ActionResult ElectronicsRptViewer()
        {

            ViewData["default_division"] = Session["default_division"];

            return View();
        }

    }
}
