using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ULS_Site
{
    public class GlobalApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("UploadImagesRt",
                "{controller}/Upload/{type}",
                new { controller = "EquipTrack", action = "Upload", type = "" }
            );

            routes.MapRoute("GetEquipImagesRt",
                "EquipTrack/GetEquipImages/{id}/{type}",
                new { controller = "EquipTrack", action = "GetEquipImages", id = "", type = "" }
            );

            routes.MapRoute("GetEmpWarnRecogDates",
                "Qualification/GetEmpWarnRecogDates/{id}/{type}",
                new { controller = "Qualification", action = "GetEmpWarnRecogDates", id = "", type = "" }
            );

            routes.MapRoute("GetEmpWRComment",
                "Qualification/GetEmpWRComment/{id}/{type}/{date}",
                new { controller = "Qualification", action = "GetEmpWRComment", id = "", type = "", date = "" }
            );

            routes.MapRoute("DeleteWR",
                "Qualification/DeleteWR/{id}/{type}/{date}",
                new { controller = "Qualification", action = "DeleteWR", id = "", type = "", date = "" }
            );

            routes.MapRoute(
                "Default",                                              // Route name
                "{controller}/{action}/{id}",                           // URL with parameters
                new { controller = "Home", action = "Index", id = "" }  // Parameter defaults
            );


        }

        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
        }
    }
}