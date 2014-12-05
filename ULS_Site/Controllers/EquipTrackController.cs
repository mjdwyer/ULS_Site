using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.IO;
using ULS_Site.Models;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace ULS_Site.Controllers
{
    public class EquipTrackController : Controller
    {
        //
        // GET: /EquipTrack/

//        private static string m_strDiv;

        public ActionResult InvalidUser()
        {
            return View();
        }

        public ActionResult EquipTest()
        {
            return View();
        }


        [SessionExpireFilter]
        public ActionResult EquipTrack(string div)
        {
            if (div != null)
            {
                uls_dbDataContext ulsdb = new uls_dbDataContext();

                if (div == "1")
                {
                    default_div dd = ulsdb.default_divs.Single(e => e.user_id == User.Identity.Name);
                    if (dd.div == "ULS-PA2" || dd.div == "ULS-PA-RO")
                    {
                        Session["division"] = "ULS-PA";
                    }
                    else
                    {
                        Session["division"] = dd.div;
                    }

                    dd.lst_log_on = DateTime.Now;
                    ulsdb.SubmitChanges();

//                    Session["division"] = (from dd in ulsdb.default_divs
//                                where dd.user_id == User.Identity.Name
//                                select dd.div).SingleOrDefault<System.String>();

//                    Session["default_division"] = Session["division"];
                    Session["default_division"] = dd.div;

                }
                else if (div == "2") // coming from report viewer page
                {
//                    m_strDiv = Convert.ToString(Session["division"]);
                }
                else
                {
                    Session["division"] = div;
                }

//                Session["division"] = m_strDiv;
                ViewData["division"] = Session["division"];
                ViewData["default_division"] = Session["default_division"];

            }

            if (Convert.ToString(Session["default_division"]) == "" || Session["default_division"] == null)
            {
                 return RedirectToAction("InvalidUser", "EquipTrack");
            }
            else
            {
                return View();
            }
            
            
        }

        [SessionExpireFilter]
        public ActionResult GetAdminToolTypes(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "tools_type_id";
            }
            else
            {
                sidx = "tools_type_descr";
            }

            var types = eqt.GetGridToolTypes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.tools_type_id,
                            cell = new string[] {
                    Convert.ToString(t.tools_type_id),
                    t.tools_type_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminToolDescs(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "tools_descr_id";
            }
            else
            {
                sidx = "tools_descr_descr";
            }

            var types = eqt.GetGridToolDescs(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.tools_descr_id,
                            cell = new string[] {
                    Convert.ToString(t.tools_descr_id),
                    t.tools_descr_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminToolManfs(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "tool_mfg_id";
            }
            else
            {
                sidx = "tool_mfg_descr";
            }

            var types = eqt.GetGridToolManfs(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.tool_mfg_id,
                            cell = new string[] {
                    Convert.ToString(t.tool_mfg_id),
                    t.tool_mfg_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminToolSizes(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "size_id";
            }
            else
            {
                sidx = "size_descr";
            }

            var types = eqt.GetGridToolSizes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.size_id,
                            cell = new string[] {
                    Convert.ToString(t.size_id),
                    t.size_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminEquipTypes(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "type_id";
            }
            else
            {
                sidx = "type_desc";
            }

            var types = eqt.GetGridEquipmentTypes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.type_id,
                            cell = new string[] {
                    Convert.ToString(t.type_id),
                    t.type_desc
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminSvcDueParms(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "type_desc")
            {
                sidx = "equip_type_avt.type_desc";
            }

            var parms  = eqt.GetGridSvcDue(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from p in parms
                        select new
                        {
                            id = p.type_id,
                            cell = new string[] {
                    Convert.ToString(p.type_id),
                    p.equip_type_avt.type_desc,
                    Convert.ToString(p.service_every),
                    Convert.ToString(p.warning_within)
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminEquipLocs(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetGridEquipLoc(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.loc_id,
                            cell = new string[] {
                    Convert.ToString(t.equip_loc),
                    t.division
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminUsers(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetGridUsers(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.user_id,
                            cell = new string[] {
                    t.user_id,
                    t.div,
                    String.Format("{0:MM/dd/yyyy}",t.lst_log_on),
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminEquipAssignTo(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetGridAssignTo(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.assign_to_id,
                            cell = new string[] {
                    t.assign_to1,
                    Convert.ToString(t.active_status) == "True" ? "ACTIVE" : "INACTIVE",
                    t.work_loc
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminMakeTypes(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "make_id";
            }
            else
            {
                sidx = "make_descr";
            }

            var types = eqt.GetGridMakeTypes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.make_id,
                            cell = new string[] {
                    Convert.ToString(t.make_id),
                    t.make_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminModelTypes(string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            if (sidx == "id")
            {
                sidx = "model_id";
            }
            else
            {
                sidx = "model_descr";
            }

            var types = eqt.GetGridModelTypes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from t in types
                        select new
                        {
                            id = t.model_id,
                            cell = new string[] {
                    Convert.ToString(t.model_id),
                    t.model_descr
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetServiceGridData(string id, string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            var services = eqt.GetGridEquipmentSvc(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from s in services
                        select new
                        {
                            id = Convert.ToString(s.service_id),
                            cell = new string[] {
                    Convert.ToString(s.service_id),
                    s.equip_id,
                    String.Format("{0:MM/dd/yyyy}",s.service_dt),
//                    Convert.ToString(s.service_dt),
                    s.services_avt.serv_descr,
                    s.mechanic,
                    Convert.ToString(s.mileage),
                    Convert.ToString(s.hours),
                    Convert.ToString(s.labor_cost),
                    Convert.ToString(s.parts_cost),
                    Convert.ToString(s.labor_cost + s.parts_cost),
//                    Convert.ToString(s.total_cost),
                    "True",
                    s.serv_reqstd,
                    s.serv_perf_descr,
                    s.parts_reqrd,
                    s.comments
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetToolServiceGridData(string id, string sidx, string sord, int page, int rows)
        {
            EquipTrak eqt = new EquipTrak();

            var services = eqt.GetGridToolSvc(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from s in services
                        select new
                        {
                            id = Convert.ToString(s.service_id),
                            cell = new string[] {
                    Convert.ToString(s.service_id),
                    s.tool_id,
                    String.Format("{0:MM/dd/yyyy}",s.service_dt),
                    s.tools_serv_avt.too_serv_descr,
                    s.mechanic,
                    Convert.ToString(s.labor_cost),
                    Convert.ToString(s.parts_cost),
                    Convert.ToString(s.labor_cost + s.parts_cost),
                    s.serv_reqstd,
                    s.serv_perf_descr,
                    s.parts_reqrd,
                    s.comments
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAssignGridData(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            var assigns = eqt.GetGridEquipmentAssign(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in assigns
                        select new
                        {
                            id = a.assign_id,
                            cell = new string[] {
                    a.equip_id,
                    a.assigned_to,
                    String.Format("{0:MM/dd/yyyy}",a.assigned_dt),
                    String.Format("{0:MM/dd/yyyy}",a.return_dt),
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    a.ret_cond_descr != null ?  a.ret_cond_descr.TrimEnd().TrimStart() :  null,
                    Convert.ToString(a.asgn_miles),
                    Convert.ToString(a.ret_miles),
                    Convert.ToString(a.asgn_hours),
                    Convert.ToString(a.ret_hours),
                    a.comment_txt,
                    Convert.ToString(a.assign_id),
                    a.img_cnt > 0 ?  "HAS_PHOTOS" :  "NO_PHOTOS"
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAssignFromGridData(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            var assigns = eqt.GetGridEquipmentAssignFrom(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in assigns
                        select new
                        {
                            id = a.assign_id,
                            cell = new string[] {
                    a.equip_id,
                    a.type_desc,
                    a.make_descr,
                    a.model_descr,
                    a.equip_year,
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
//                    a.ret_cond_descr != null ?  a.ret_cond_descr.TrimEnd().TrimStart() :  null,
                    Convert.ToString(a.asgn_miles),
                    Convert.ToString(a.ret_miles),
                    Convert.ToString(a.asgn_hours),
                    Convert.ToString(a.ret_hours),
                    Convert.ToString(a.assign_id)
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetToolAssignGridData(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            var assigns = eqt.GetGridToolAssign(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in assigns
                        select new
                        {
                            id = a.assign_id,
                            cell = new string[] {
                    a.tool_id,
                    a.assigned_to,
                    String.Format("{0:MM/dd/yyyy}",a.assigned_dt),
                    String.Format("{0:MM/dd/yyyy}",a.return_dt),
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    a.ret_cond_descr != null ?  a.ret_cond_descr.TrimEnd().TrimStart() :  null,
                    a.comment_txt,
                    Convert.ToString(a.assign_id),
                    a.img_cnt > 0 ?  "HAS_PHOTOS" :  "NO_PHOTOS"
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetToolAssignXferGridData(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            var assigns = eqt.GetGridToolAssignXfer(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in assigns
                        select new
                        {
                            id = a.assign_id,
                            cell = new string[] {
                    a.tool_id,
                    a.tools_type_descr,
                    a.tools_descr_descr,
                    a.tool_mfg_descr,
                    a.size_descr,
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    Convert.ToString(a.assign_id)
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetSmallToolAssignXferGridData(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            var assigns = eqt.GetGridSmallToolAssignXfer(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in assigns
                        select new
                        {
                            id = a.stID,
                            cell = new string[] {
                    Convert.ToString(a.stID),
                    a.item,
                    a.description,
                    a.size,
                    a.MFG,
                    a.Model,
                    a.SerNum,
                    a.ID,
                    a.condition_descr != null ?  a.condition_descr.TrimEnd().TrimStart() :  null
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAllEquipIds(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            if (sidx == "item_id")
            {
                sidx = "equip_id";
            }

            var allids = eqt.GetGridAllEquipIds(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in allids
                        select new
                        {
                            id = a.equip_id,
                            cell = new string[] {
                    a.equip_id,
                    a.registered_by,
                    a.managed_by
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAllToolIds(string id, string sidx, string sord, int page, int rows)
        {

            EquipTrak eqt = new EquipTrak();

            if (sidx == "item_id")
            {
                sidx = "tool_id";
            }

            var allids = eqt.GetGridAllToolIds(sidx, sord, id);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in allids
                        select new
                        {
                            id = a.tool_id,
                            cell = new string[] {
                    a.tool_id,
                    a.registered_by,
                    a.managed_by
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GridData(string sidx, string sord, int page, int rows, bool _search, string searchField, string searchOper, string searchString)
        {
            EquipTrak eqt = new EquipTrak();


            var equipment = eqt.GetGridEquipment(sidx, sord, Convert.ToString(Session["division"]), _search, searchField, searchString, searchOper);

            string strSearchVal = "";
            string strSearchLojack = "";
            string strSearchStolen = "";
            string strSearchSold = "";
            string strSearchUnknown = "";
            string strSearchLeased = "";
            string strSearchInRepair = "";
            string strSearchTotaled = "";
            string strSearchRegBy = "";
            string strSearchId = "";
            string strSearchToBeSold = "";
            string strSearchOtherAntiTheft = "";

            if (_search == true)
            {
                if (searchString == "True" || searchString == "False")
                {
                    strSearchVal = searchField;
                }
                else
                {
                    strSearchVal = searchString;
                }

                if (searchOper == "bw")
                {
                    strSearchVal = strSearchVal + "*";
                }
                else if (searchOper == "ew")
                {
                    strSearchVal = "*" + strSearchVal;

                }

                if (searchOper == "eq" && (searchField == "equip_id" || searchField == "vin_num" || searchField == "title_num" || searchField == "tag_num") && equipment.Count() == 0)
                {
                    vw_EquipGrid equipSearchAll = eqt.GetGridSearchAllEquipment(searchField, searchString);
                    if (equipSearchAll != null)
                    {
                        strSearchLojack = Convert.ToString(equipSearchAll.lojack);
                        strSearchStolen = Convert.ToString(equipSearchAll.stolen);
                        strSearchUnknown = Convert.ToString(equipSearchAll.unknown);
                        strSearchLeased = Convert.ToString(equipSearchAll.leased);
                        strSearchSold = Convert.ToString(equipSearchAll.sold);
                        strSearchInRepair = Convert.ToString(equipSearchAll.in_repair);
                        strSearchTotaled = Convert.ToString(equipSearchAll.totaled);
                        strSearchRegBy = equipSearchAll.registered_by;
                        strSearchId = equipSearchAll.equip_id;
                        strSearchToBeSold = Convert.ToString(equipSearchAll.to_be_sold);
                        strSearchOtherAntiTheft = Convert.ToString(equipSearchAll.other_antitheft);
                    }
                }
            }

            var dataJson = new
            {

                total = 10000,
                page = 1,
                records = 10000,
                userdata = new { searchVal = strSearchVal, searchLojack = strSearchLojack, searchStolen = strSearchStolen, searchUnknown = strSearchUnknown, searchSold = strSearchSold, searchInRepair = strSearchInRepair, searchTotaled = strSearchTotaled, searchRegBy = strSearchRegBy, searchId = strSearchId, searchLeased = strSearchLeased, searchToBeSold = strSearchToBeSold, searchOtherAntiTheft =  strSearchOtherAntiTheft },
                rows = (from e in equipment
                        select new
                        {
                            id = e.rownum,
                            cell = new string[] {
                    e.equip_id.TrimEnd().TrimStart(),
                    e.type_desc != null ?  e.type_desc.TrimEnd().TrimStart() :  null,
                    e.make_descr != null ?  e.make_descr.TrimEnd().TrimStart() :  null,
                    e.model_descr != null ?  e.model_descr.TrimEnd().TrimStart() :  null,
                    e.equip_year,
                    e.work_loc,
                    String.Format("{0:MM/dd/yyyy}",e.insp_due_dt),
                    Convert.ToString(e.service_due_num),
                    Convert.ToString(e.miles_hours),
                    String.Format("{0:MM/dd/yyyy}",e.miles_dt),
                    e.registered_by,
                    e.managed_by,
                    String.Format("{0:MM/dd/yyyy}",e.managed_by_dt),
                    String.Format("{0:MM/dd/yyyy}",e.tag_expire_dt),
                    e.inspection_warn,
                    e.service_warn,
                    e.tag_warn,
                    e.equip_loan_color == "SET_PURPLE"  ? (e.registered_by != Convert.ToString(Session["division"])? e.equip_assign_color: "SET_PURPLE" ): e.equip_assign_color,
		            e.vin_num,
		            e.title_num,
		            Convert.ToString(e.gross_v_wt),
		            Convert.ToString(e.unlaiden_wt),
		            e.tag_num,
		            e.tag_state,
		            e.fuel_descr,
		            Convert.ToString(e.cost),
		            Convert.ToString(e.insp_rmdr_wks),
		            Convert.ToString(e.tag_expire_rmdr_wks),
		            Convert.ToString(e.stolen),
		            Convert.ToString(e.sold),
		            Convert.ToString(e.lojack),
		            Convert.ToString(e.in_repair),
		            Convert.ToString(e.totaled),
		            Convert.ToString(e.hut_sticker),
		            Convert.ToString(e.apportioned),
		            Convert.ToString(e.ifta_sticker), 
		            Convert.ToString(e.gps), 
		            e.comment,
                    e.equip_assign_color,
                    Convert.ToString(e.unknown),
                    Convert.ToString(e.current_value),
                    e.img_cnt > 0 ?  "HAS_PHOTOS" :  "NO_PHOTOS",
                    Convert.ToString(e.leased),
		            Convert.ToString(e.gross_c_wt),
                    e.gps_num,
                    Convert.ToString(e.ezpass),
                    e.ezpass_num,
                    Convert.ToString(e.fuelcard),
                    e.fuelcard_num,
                    Convert.ToString(e.to_be_sold),
                    e.fuel_card_loc,
                    Convert.ToString(e.other_antitheft),
                    e.other_antitheft_type
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult ToolGridData(string sidx, string sord, int page, int rows, bool _search, string searchField, string searchOper, string searchString)
        {
            EquipTrak eqt = new EquipTrak();

            int pageIndex = Convert.ToInt32(page) - 1;
            int limit = rows;

            var tools = eqt.GetToolGridEquipment(sidx, sord, pageIndex, limit, Convert.ToString(Session["division"]), _search, searchField, searchString, searchOper);
//            int recordCount = eqt.GetToolGridCount(Convert.ToString(Session["division"]));
//            int totalPages;

//            if (recordCount > 0)
//                totalPages = (int)Math.Ceiling((float)recordCount / (float)limit);
//            else
//                totalPages = 0;

            string strSearchVal = "";
            string strSearchElectrical = "";
            string strSearchStolen = "";
            string strSearchUnknown = "";
            string strSearchSold = "";
            string strSearchInRepair = "";
            string strSearchTotaled = "";
            string strSearchRegBy = "";
            string strSearchId = "";
            string strSearchToBeSold = "";

            if (_search == true)
            {
                if (searchString == "True" || searchString == "False")
                {
                    strSearchVal = searchField;
                }
                else
                {
                    strSearchVal = searchString;
                }
                if (searchOper == "bw")
                {
                    strSearchVal = strSearchVal + "*";
                }
                else if (searchOper == "ew")
                {
                    strSearchVal = "*" + strSearchVal;
                }

                if (searchOper == "eq" && (searchField == "tool_id" || searchField == "serial_num") && tools.Count() == 0)
                {
                    vw_ToolsGrid toolSearchAll = eqt.GetGridSearchAllTools(searchField, searchString);
                    if (toolSearchAll != null)
                    {
                        strSearchElectrical = Convert.ToString(toolSearchAll.electrical);
                        strSearchStolen = Convert.ToString(toolSearchAll.stolen);
                        strSearchUnknown = Convert.ToString(toolSearchAll.unknown);
                        strSearchSold = Convert.ToString(toolSearchAll.sold);
                        strSearchInRepair = Convert.ToString(toolSearchAll.in_repair);
                        strSearchTotaled = Convert.ToString(toolSearchAll.totaled);
                        strSearchRegBy = toolSearchAll.registered_by;
                        strSearchId = toolSearchAll.tool_id;
                        strSearchToBeSold = Convert.ToString(toolSearchAll.to_be_sold);
                    }
                }
            }

            var dataJson = new
            {

                total = 10000,
                page = 1,
                records = 10000,
//                total = totalPages,
//                page = page,
//                records = recordCount,
                userdata = new { searchVal = strSearchVal, searchElectrical = strSearchElectrical, searchStolen = strSearchStolen, searchUnknown = strSearchUnknown, searchSold = strSearchSold, searchInRepair = strSearchInRepair, searchTotaled = strSearchTotaled, searchRegBy = strSearchRegBy, searchId = strSearchId, searchToBeSold = strSearchToBeSold },
                rows = (from t in tools
                        select new
                        {
                            id = t.rownum,
                            cell = new string[] {
                    t.tool_id.TrimEnd().TrimStart(),
                    t.tools_type_descr != null ?  t.tools_type_descr.TrimEnd().TrimStart() :  null,
                    t.tools_descr_descr != null ?  t.tools_descr_descr.TrimEnd().TrimStart() :  null,
                    t.tool_mfg_descr != null ?  t.tool_mfg_descr.TrimEnd().TrimStart() :  null,
                    t.size_descr != null ?  t.size_descr.TrimEnd().TrimStart() :  null,
                    t.work_loc,
                    t.registered_by,
                    t.managed_by,
                    String.Format("{0:MM/dd/yyyy}",t.calibration_due_dt),
                    t.calibration_due_warn,
                    Convert.ToString(t.calibration_rmdr_wks),
                    String.Format("{0:MM/dd/yyyy}",t.managed_by_dt),
		            t.model_num,
		            t.serial_num,
                    t.year_pur,
		            Convert.ToString(t.cost),
		            Convert.ToString(t.stolen),
		            Convert.ToString(t.sold),
		            Convert.ToString(t.electrical),
		            Convert.ToString(t.lojack),
		            Convert.ToString(t.in_repair),
		            Convert.ToString(t.totaled),
		            t.comment,
                    t.tool_loan_color == "SET_PURPLE"  ? (t.registered_by != Convert.ToString(Session["division"])? t.tool_assign_color: "SET_PURPLE" ): t.tool_assign_color,
                    t.tool_assign_color,
                    Convert.ToString(t.unknown),
                    t.img_cnt > 0 ?  "HAS_PHOTOS" :  "NO_PHOTOS",
                    Convert.ToString(t.to_be_sold)
                    }
                        }).ToArray()
            };
            return Json(dataJson);
        }


        [SessionExpireFilter]
        public ActionResult SmallToolGridData(string sidx, string sord, int page, int rows, bool _search, string searchField, string searchOper, string searchString)
        {
            EquipTrak eqt = new EquipTrak();

            int pageIndex = Convert.ToInt32(page) - 1;
            int limit = rows;

            var tools = eqt.GetSmallToolGridEquipment(sidx, sord, pageIndex, limit, Convert.ToString(Session["division"]), _search, searchField, searchString, searchOper);
            int recordCount = eqt.GetSmallToolGridCount(Convert.ToString(Session["division"]));
            int totalPages;

            if (recordCount > 0)
                totalPages = (int)Math.Ceiling((float)recordCount / (float)limit);
            else
                totalPages = 0;

            string strSearchVal = "";

            if (_search == true)
            {
                strSearchVal = searchString;
                if (searchOper == "bw")
                {
                    strSearchVal = strSearchVal + "*";
                }
                else if (searchOper == "ew")
                {
                    strSearchVal = "*" + strSearchVal;
                }
            }

            var dataJson = new
            {

                total = 10000,
                page = 1,
                records = 10000,
//                total = totalPages,
//                page = page,
//                records = recordCount,
                userdata = new { searchVal = strSearchVal },
                rows = (from t in tools
                        select new
                        {
                            id = t.stID,
                            cell = new string[] {
                    Convert.ToString(t.stID),
                    t.item.TrimEnd().TrimStart(),
                    t.description,
                    t.size,
                    t.MFG,
                    t.Model,
                    t.SerNum,
                    t.ID,
                    t.condition_descr != null ?  t.condition_descr.TrimEnd().TrimStart() :  null,
		            t.Reg_by,
		            t.Managed_by,
//                    t.managed_by_dt,
                    String.Format("{0:MM/dd/yyyy}",t.managed_by_dt),
		            t.Assigned_to,
                    String.Format("{0:MM/dd/yyyy}",t.Assigned_dt),
//                    t.Assigned_dt,
                    String.Format("{0:MM/dd/yyyy}",t.returned_dt),
//                    t.return_dt,
//                    t.inoutshop,
                    t.inoutshop != null ?  t.inoutshop.TrimEnd().TrimStart() :  null,
		            t.comment,
                    t.small_tool_loan_color == "SET_PURPLE"  ? (t.Reg_by != Convert.ToString(Session["division"])? t.small_tool_assign_color: "SET_PURPLE" ): t.small_tool_assign_color,

                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        void grd_RowDataBound(Object sender, GridViewRowEventArgs e)
        {

            if (e.Row.RowType == DataControlRowType.DataRow)
            {

                e.Row.Cells[27].Attributes.Add("class", "text");
                e.Row.Cells[28].Attributes.Add("class", "text");
                e.Row.Cells[29].Attributes.Add("class", "text");


            }

        }

        [SessionExpireFilter]
        public ActionResult ExportToExcel()
        {
            EquipTrak eqt = new EquipTrak();

            string exportType = Request.Form["hdnExportType"];

            var grid = new GridView();


            string outFileName = "";

            if (exportType == "EquipExport")
            {

                grid.RowDataBound += new GridViewRowEventHandler(grd_RowDataBound);

                outFileName = "Equipment.xls";

                var equips = eqt.GetGridEquipExport(Convert.ToString(Session["division"]));

                grid.DataSource = from e in equips
                                  select new
                                  {
                                      EquipID = e.equip_id.TrimEnd().TrimStart(),
                                      Year = e.equip_year,
                                      Type = e.type_desc == null ? "" : e.type_desc.TrimEnd().TrimStart(),
                                      Make = e.make_descr == null ? "" : e.make_descr.TrimEnd().TrimStart(),
                                      Model = e.model_descr == null ? "" : e.model_descr.TrimEnd().TrimStart(),
                                      VIN = e.vin_num,
                                      WorkLoc = e.work_loc,
                                      RegBy = e.registered_by,
                                      MngBy = e.managed_by,
                                      MngByDt = e.managed_by_dt,
                                      TagNum = e.tag_num,
                                      TagState = e.tag_state,
                                      TagExpire = e.tag_expire_dt,
                                      Title = e.title_num,
                                      Fuel = e.fuel_descr,
                                      IsApportioned = Convert.ToString(e.apportioned),
                                      IsIFTAsticker = Convert.ToString(e.ifta_sticker),
                                      IsHUTsticker = Convert.ToString(e.hut_sticker),
                                      IsInRepair = Convert.ToString(e.in_repair),
                                      IsLeased = Convert.ToString(e.leased),
                                      IsUnknown = Convert.ToString(e.unknown),
                                      IsToBeSold = Convert.ToString(e.to_be_sold),
                                      IsStolen = Convert.ToString(e.stolen),
                                      IsTotaled = Convert.ToString(e.totaled),
                                      IsSold = Convert.ToString(e.sold),
                                      IsLoJack = Convert.ToString(e.lojack),
                                      IsGPS = Convert.ToString(e.gps),
                                      GPSNum = e.gps_num == null ? "" : Convert.ToString(e.gps_num),
//                                      GPSNum = Convert.ToString(e.gps_num),
                                      IsEzPass = Convert.ToString(e.ezpass),
                                      EzPassNum = e.ezpass_num,
                                      IsFuelCard = Convert.ToString(e.fuelcard),
                                      FuelCardNum = e.fuelcard_num,
                                      InpectionDue = e.insp_due_dt,
                                      Cost = Convert.ToString(e.cost),
                                      CurrentValue = Convert.ToString(e.current_value),
                                      UnLaidenWt = Convert.ToString(e.unlaiden_wt),
                                      GVW = Convert.ToString(e.gross_v_wt),
                                      GCW = Convert.ToString(e.gross_c_wt),
                                      MilesHours = Convert.ToString(e.miles_hours),
                                      MileageDt = e.miles_dt,
//                                      ServiceNum = Convert.ToString(e.service_due_num),
//                                      InspectionRmndrWks = Convert.ToString(e.insp_rmdr_wks),
//                                      TagRmndrWks = Convert.ToString(e.tag_expire_rmdr_wks),
                                      Comment = e.comment,
                                      AssignedTo = e.assigned_to
                                  };
            }
            else if (exportType == "ToolsExport")
            {
                outFileName = "Tools.xls";

                var tools = eqt.GetGridToolsExport(Convert.ToString(Session["division"]));

                grid.DataSource = from t in tools
                                  select new
                                  {
                                      ToolID = t.tool_id == null ? "" : t.tool_id.TrimEnd().TrimStart(),
                                      Item = t.tools_type_descr == null ? "" : t.tools_type_descr.TrimEnd().TrimStart(),
                                      Description = t.tools_descr_descr == null ? "" : t.tools_descr_descr.TrimEnd().TrimStart(),
                                      Manufacturer = t.tool_mfg_descr == null ? "" : t.tool_mfg_descr.TrimEnd().TrimStart(),
                                      Size = t.size_descr == null ? "" : t.size_descr.TrimEnd().TrimStart(),
                                      WorkLoc = t.work_loc,
                                      RegBy = t.registered_by,
                                      MngBy = t.managed_by,
                                      MngByDt = t.managed_by_dt,
                                      Model = t.model_num,
                                      SerialNum = t.serial_num,
                                      YearPurchased = t.year_pur,
                                      Cost = t.cost,
                                      CalibratonDueDt = t.calibration_due_dt,
                                      CalibratonRmndrWks = Convert.ToString(t.calibration_rmdr_wks),
                                      IsStolen = Convert.ToString(t.stolen),
                                      IsSold = Convert.ToString(t.sold),
                                      IsElectrical = Convert.ToString(t.electrical),
                                      IsInRepair = Convert.ToString(t.in_repair),
                                      IsTotaled = Convert.ToString(t.totaled),
                                      IsToBeSold = Convert.ToString(t.to_be_sold),
                                      IsUnknown = Convert.ToString(t.unknown),
                                      Comment = t.comment,
                                      AssignedTo = t.assigned_to
                                  };
            }
            else if (exportType == "SmallToolsExport")
            {
                outFileName = "SmallTools.xls";

                var tools = eqt.GetGridSmallToolsExport(Convert.ToString(Session["division"]));

                grid.DataSource = from t in tools
                                  select new
                                  {
                                      InternalToolID = t.stID,
                                      Item = t.item,
                                      Description = t.description,
                                      Size = t.size,
                                      Manufacturer = t.MFG,
                                      Model = t.Model,
                                      SerialNum = t.SerNum,
                                      ID = t.ID,
                                      Condition = t.condition_descr,
                                      RegBy = t.Reg_by,
                                      MngBy = t.Managed_by,
                                      MngByDt = t.managed_by_dt,
                                      AssignedTo = t.Assigned_to,
                                      AssignedDt = t.Assigned_dt,
                                      ReturnedDt = t.returned_dt,
                                      Shop = t.inoutshop,
                                      Comment = t.comment
                                  };
            }


            grid.DataBind();

            Response.ClearContent();
            Response.AddHeader("content-disposition", "attachment; filename=" + outFileName);

            Response.ContentType = "application/excel";

            StringWriter sw = new StringWriter();

            HtmlTextWriter htw = new HtmlTextWriter(sw);

            grid.RenderControl(htw);

            if (exportType == "EquipExport")
            {

                string style = @"<style> .text { mso-number-format:\@; } </style> ";
                Response.Write(style);
            }

            Response.Write(sw.ToString());

            Response.End();

            return View();
        }

        [SessionExpireFilter]
        public string GetToolTypes()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolTypes();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolTypesSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolTypesSearch();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetHelpMsg(string id)
        {
            EquipTrak eqt = new EquipTrak();

            var strRet = eqt.GetHelpMsg(id);


            return strRet;
        }


        [SessionExpireFilter]
        public string GetToolDescs()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolDescs();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolDescsSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolDescsSearch();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolMfgs()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolMfgs();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolMfgsSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolMfgsSearch();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolSizes()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolSizes();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetToolSizesSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetToolSizesSearch();

            string strRet = FormatDropdownData(types);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetTypes()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetTypes();

            string strRet = FormatDropdownData(types);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetTypesSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetTypesSearch();

            string strRet = FormatDropdownData(types);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetMakes()
        {
            EquipTrak eqt = new EquipTrak();

            var makes = eqt.GetMakes();

            string strRet = FormatDropdownData(makes);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetMakesSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var makes = eqt.GetMakesSearch();

            string strRet = FormatDropdownData(makes);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetFuels()
        {
            EquipTrak eqt = new EquipTrak();

            var fuels = eqt.GetFuels();

            string strRet = FormatDropdownData(fuels);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetModels()
        {
            EquipTrak eqt = new EquipTrak();

            var models = eqt.GetModels();

            string strRet = FormatDropdownData(models);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetModelsSearch()
        {
            EquipTrak eqt = new EquipTrak();

            var models = eqt.GetModelsSearch();

            string strRet = FormatDropdownData(models);

            return strRet;
        }

        [SessionExpireFilter]
        public string GetDivisions()
        {
            EquipTrak eqt = new EquipTrak();

            var divs = eqt.GetDivisions();

            string strRet = FormatDropdownData(divs, true, "lstDivisions", "CheckLocForm()");

            return strRet;

        }

        [SessionExpireFilter]
        public string GetAssignToDivisions()
        {
            EquipTrak eqt = new EquipTrak();

            var divs = eqt.GetDivisions();

            string strRet = FormatDropdownData(divs, true, "lstAssignToDivs", "CheckAssignToForm()");

            return strRet;

        }

        [SessionExpireFilter]
        public string GetUsersDivisions()
        {
            EquipTrak eqt = new EquipTrak();

            var divs = eqt.GetDivisions2();

            string strRet = FormatDropdownData(divs, true, "lstUsersDivs", "CheckUsersForm()");

            return strRet;

        }

        [SessionExpireFilter]
        public string GetServiceTypes()
        {
            EquipTrak eqt = new EquipTrak();

            var svcs = eqt.GetServiceTypes();

            string strRet = FormatDropdownData(svcs);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetToolServiceTypes()
        {
            EquipTrak eqt = new EquipTrak();

            var svcs = eqt.GetToolServiceTypes();

            string strRet = FormatDropdownData(svcs);

            return strRet;

        }


        [SessionExpireFilter]
        public string GetLocations()
        {
            EquipTrak eqt = new EquipTrak();

            var locs = eqt.GetLocations();

            string strRet = FormatDropdownData(locs);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetConditions()
        {
            EquipTrak eqt = new EquipTrak();

            var locs = eqt.GetConditions();

            string strRet = FormatDropdownData(locs);

            return strRet;

        }

        [SessionExpireFilter]
        public string GetAssignTo()
        {
            EquipTrak eqt = new EquipTrak();

            var locs = eqt.GetAssignTo();

            string strRet = FormatDropdownData(locs);

            return strRet;

        }


        private string FormatDropdownData(IQueryable<DropDownData> inputIQ, bool bID, string strLstName, string strOnchangeFunc)
        {
            string strRet = "";

            foreach (DropDownData t in inputIQ)
            {
                strRet = strRet + "<option value='" + t.ID + "'>" + t.Description + "</option>";
            }

            if (bID == true)
            {
                return "<select id='" + strLstName + "' onChange='" + strOnchangeFunc + "'><option value=''></option>" + strRet + "</select>";
            }
            else
            {
                return "<select><option value='0'></option>" + strRet + "</select>";
            }
        }


        private string FormatDropdownData(IQueryable<DropDownData> inputIQ)
        {
            string strRet = "";

            foreach (DropDownData t in inputIQ)
            {
                strRet = strRet + "<option value='" + t.ID + "'>" + t.Description + "</option>";
            }

            return "<select><option value='0'></option>" + strRet + "</select>";
        }

        public string TrueFalseDropdownData()
        {
            return "<select><option value='True'>True</option><option value='False'>False</option></select>";
        }

        public bool IsDate(string sdate)
        {
            DateTime dt;
            bool isDate = true;
            try
           {
                dt = DateTime.Parse(sdate);
           }
            catch
            {
                isDate = false;
            }

            return isDate;

        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Edit(Nullable<int> id, FormCollection formValues)
        {
            // this method used just for delete now
            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strOper = formValues.GetValues("oper")[0];
                string strEquipID = formValues.GetValues("EquipID")[0];

                equipment equip;
//                string strID;

                if (strOper == "del")
                {
//                    strID = formValues.GetValues("id")[0];
                    equip = db.equipments.Single(e => e.equip_id == strEquipID);

                    db.equipments.DeleteOnSubmit(equip);
                }

                db.SubmitChanges();


                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditTool(Nullable<int> id, FormCollection formValues)
        {

            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strOper = formValues.GetValues("oper")[0];
                string strToolID = formValues.GetValues("ToolID")[0];

                tool tool;

                string strId = Convert.ToString(id);

                if (strOper == "del")
                {
                    string strID = formValues.GetValues("id")[0];
                    tool = db.tools.Single(t => t.tool_id == strId);

                    db.tools.DeleteOnSubmit(tool);
                }

                db.SubmitChanges();


                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteTool()
        {
            string  strToolID = Request.Form["hdnTID"];


            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
//                string strOper = formValues.GetValues("oper")[0];
//                string strToolID = formValues.GetValues("ToolID")[0];

                tool tool;

                tool = db.tools.Single(t => t.tool_id == strToolID);

                db.tools.DeleteOnSubmit(tool);

                db.SubmitChanges();


                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteEquip()
        {
            string strEquipID = Request.Form["hdnEID"];


            uls_dbDataContext db = new uls_dbDataContext();

            try
            {

                equipment equip;

                equip = db.equipments.Single(e => e.equip_id == strEquipID);

                db.equipments.DeleteOnSubmit(equip);

                db.SubmitChanges();


                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteSmallTool()
        {
            string strSmallToolID = Request.Form["hdnSTID"];


            uls_dbDataContext db = new uls_dbDataContext();

            try
            {

                smalltool smtool;

                int iSTID = Convert.ToInt32(strSmallToolID);

                smtool = db.smalltools.Single(t => t.stID == iSTID);

                db.smalltools.DeleteOnSubmit(smtool);

                db.SubmitChanges();


                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditToolDlg()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strOperation = Request.Form["hdnToolOper"];
                string strToolID;

                if (strOperation == "Edit")
                {
                    strToolID = Request.Form["hdnToolID"];
                }
                else
                {
                    strToolID = Request.Form["txtToolID"];
                }

                string strYearPur = Request.Form["txtToolYearPur"];
                string strMfg = Request.Form["ddlToolMfg"];
                string strType = Request.Form["ddlToolType"];
                string strDesc = Request.Form["ddlToolDesc"];
                string strSize = Request.Form["ddlToolSize"];
                string strRegBy = Request.Form["ddlToolRegBy"];
                string strMngBy = Request.Form["ddlToolMngBy"];
                string strLoc = Request.Form["ddlToolLoc"];
                string strMngByDt = Request.Form["dtToolMngByDt"];
                string strCost = Request.Form["txtToolCost"];
                string strSerNum = Request.Form["txtToolSerialNum"];
                string strModelNum = Request.Form["txtToolModelNum"];
                string strComment = Request.Form["txtToolComment"];
//                string strSold = Request.Form["chkToolSold"] == null ? "off" : Request.Form["chkToolSold"];
                string strSold = Request.Form["hdnToolSold"];
                string strToBeSold = Request.Form["hdnToolToBeSold"];
                //                string strElectrical = Request.Form["chkToolElectrical"] == null ? "off" : Request.Form["chkToolElectrical"];
                string strElectrical = Request.Form["hdnToolElectrical"];
//                string strLojack = Request.Form["chkToolLojack"] == null ? "off" : Request.Form["chkToolLojack"];
                string strLojack = Request.Form["hdnToolLojack"];
//                string strInRepair = Request.Form["chkToolInRepair"] == null ? "off" : Request.Form["chkToolInRepair"];
                string strInRepair = Request.Form["hdnToolInRepair"];
//                string strStolen = Request.Form["chkToolStolen"] == null ? "off" : Request.Form["chkToolStolen"];
                string strStolen = Request.Form["hdnToolStolen"];
//                string strTotaled = Request.Form["chkToolTotaled"] == null ? "off" : Request.Form["chkToolTotaled"];
                string strTotaled = Request.Form["hdnToolTotaled"];
//                string strUnknown = Request.Form["chkToolUnknown"] == null ? "off" : Request.Form["chkToolUnknown"];
                string strUnknown = Request.Form["hdnToolUnknown"];
                string strCalDueDt = Request.Form["dtCalibrationDue"];
                string strCalWarnWks = Request.Form["ddlCalibrationRmndr"];

                string strLogEntry = "";

                tool tool;
                tool toolCheck;
                tool_edit_log logentry = new tool_edit_log();

                logentry.user_id = User.Identity.Name;
                logentry.edit_dt = DateTime.Today;
                logentry.tool_id = strToolID;

                if (strOperation == "Edit")
                {
                    string strID = strToolID;
                    tool = db.tools.Single(t => t.tool_id == strID);

                }
                else  //add
                {
                    if (strToolID.Length <= 0)
                    {
                        throw new Exception("Invalid ID specified.");
                    }

                    if (strRegBy.Length <= 0)
                    {
                        throw new Exception("No Division specified in Registered By field.");
                    }

                    tool = new tool();
                    tool.tool_id = strToolID;
                    tool.assigned = false;
                    toolCheck = db.tools.SingleOrDefault(t => t.tool_id == tool.tool_id);
                    if (toolCheck != null)
                    {
                        throw new Exception("This ID already exists.");
                    }
                }

                if (strOperation == "Edit" || strOperation == "Add")
                {
                    if (strComment != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Comment", tool.comment == null ? "" : tool.comment.ToString(), strComment, strLogEntry);
                        }

                        tool.comment = strComment;
                    }

                    Single sngCost;
                    if (strCost != null)
                    {
                        if (Single.TryParse(strCost.Replace("$", ""), out sngCost))
                        {
                            if (strOperation == "Edit")
                            {
                                strLogEntry = CheckEditField("Cost", tool.cost == null ? "0" : tool.cost.ToString(), strCost.Replace("$", ""), strLogEntry);
                            }
                            tool.cost = sngCost;
                        }
                    }
                    Int16 intDescr;
                    if (Int16.TryParse(strDesc, out intDescr))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Description ID", tool.descr_id == null ? "0" : tool.descr_id.ToString(), strDesc, strLogEntry);
                        }
                        tool.descr_id = intDescr;
                    }

                    if (strElectrical != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Electrical", tool.electrical == true ? "on" : "off", strElectrical, strLogEntry);
                        }
                        tool.electrical = strElectrical == "on" ? true : false;
                    }

                    if (strLojack != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Lojack", tool.lojack == true ? "on" : "off", strLojack, strLogEntry);
                        }
                        tool.lojack = strLojack == "on" ? true : false;
                    }

                    if (strInRepair != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("In Repair", tool.in_repair == true ? "on" : "off", strInRepair, strLogEntry);
                        }
                        tool.in_repair = strInRepair == "on" ? true : false;
                    }

                    Int16 intItem;
                    if (Int16.TryParse(strType, out intItem))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Item ID", tool.item_id == null ? "0" : tool.item_id.ToString(), strType, strLogEntry);
                        }
                        tool.item_id = intItem;
                    }

                    if (strMngBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By", tool.managed_by == null ? "" : tool.managed_by.ToString(), strMngBy, strLogEntry);
                        }
                        tool.managed_by = strMngBy;
                    }


                    if (IsDate(strMngByDt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By Date", tool.managed_by_dt != null ? String.Format("{0:MM/dd/yyyy}", tool.managed_by_dt) : "X", strMngByDt, strLogEntry);
                        }
                        tool.managed_by_dt = Convert.ToDateTime(strMngByDt);
                    }

                    Int16 intMfg;
                    if (Int16.TryParse(strMfg, out intMfg))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Mfg ID", tool.mfg_id == null ? "0" : tool.mfg_id.ToString(), strMfg, strLogEntry);
                        }
                        tool.mfg_id = intMfg;
                    }

                    if (strModelNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Model Num", tool.model_num == null ? "0" : tool.model_num.ToString(), strModelNum, strLogEntry);
                        }
                        tool.model_num = strModelNum;
                    }


                    if (strRegBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Registered By", tool.registered_by == null ? "" : tool.registered_by.ToString(), strRegBy, strLogEntry);
                        }
                        tool.registered_by = strRegBy;
                    }

                    if (tool.registered_by == null || tool.registered_by.Length <= 0)
                    {
                        throw new Exception("Registered By must be specified.");
                    }

                    if (strSerNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Serial Num", tool.serial_num == null ? "" : tool.serial_num.ToString(), strSerNum, strLogEntry);
                        }
                        tool.serial_num = strSerNum;
                    }

                    if (tool.serial_num != null && tool.serial_num.Length > 0)
                    {
                        toolCheck = db.tools.SingleOrDefault(e => e.serial_num == tool.serial_num);
                        if (toolCheck != null)
                        {
                            if (toolCheck.tool_id != tool.tool_id)
                            {
                                throw new Exception("Serial Number already exists for: " + toolCheck.tool_id);
                            }
                        }
                    }

                    Int16 intSize;
                    if (Int16.TryParse(strSize, out intSize))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Size ID", tool.size_id == null ? "0" : tool.size_id.ToString(), strSize, strLogEntry);
                        }
                        tool.size_id = intSize;
                    }

                    if (strSold != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Sold", tool.sold == true ? "on" : "off", strSold, strLogEntry);
                        }
                        tool.sold = strSold == "on" ? true : false;
                    }

                    if (strToBeSold != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("To Be Sold", tool.to_be_sold == true ? "on" : "off", strToBeSold, strLogEntry);
                        }
                        tool.to_be_sold = strToBeSold == "on" ? true : false;
                    }

                    if (strStolen != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Stolen", tool.stolen == true ? "on" : "off", strStolen, strLogEntry);
                        }
                        tool.stolen = strStolen == "on" ? true : false;
                    }

                    if (strTotaled != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Totaled", tool.totaled == true ? "on" : "off", strTotaled, strLogEntry);
                        }
                        tool.totaled = strTotaled == "on" ? true : false;
                    }

                    if (strUnknown != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Unknown", tool.unknown == true ? "on" : "off", strUnknown, strLogEntry);
                        }
                        tool.unknown = strUnknown == "on" ? true : false;
                    }

                    if (strLoc != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Location", tool.work_loc == null ? "" : tool.work_loc.ToString(), strLoc, strLogEntry);
                        }
                        tool.work_loc = strLoc;
                    }

                    if (strYearPur != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Year Purchased", tool.year_pur == null ? "" : tool.year_pur.ToString(), strYearPur, strLogEntry);
                        }
                        tool.year_pur = strYearPur;
                    }


                    if (strOperation == "Add")
                    {
                        strLogEntry = "Record Added.";
                        db.tools.InsertOnSubmit(tool);
                    }

                    if (IsDate(strCalDueDt))
                    {
                        tool.calibration_due_dt = Convert.ToDateTime(strCalDueDt);
                    }
                    else
                    {
                        tool.calibration_due_dt = null;
                    }

                    Int16 intCalRmndrWks;
                    if (Int16.TryParse(strCalWarnWks, out intCalRmndrWks))
                    {
                        tool.calibration_rmdr_wks = intCalRmndrWks;
                    }

                }

                if (strLogEntry != "")
                {
                    if (strOperation == "Edit")
                    {
                        logentry.edit_change = "Modified: " + strLogEntry;
                    }
                    else
                    {
                        logentry.edit_change = strLogEntry;
                    }
                    db.tool_edit_logs.InsertOnSubmit(logentry);
                }

                db.SubmitChanges();

                return Content("Success" + "," + Session["division"]);

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;

                return Content(strRet + "," + "");
            }
            finally
            {
                db.Dispose();
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditSmallTool(Nullable<int> id, FormCollection formValues)
        {

            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strOper = formValues.GetValues("oper")[0];

                smalltool smtool;

                int intID = Convert.ToInt32(formValues.GetValues("id")[0]);
                smtool = db.smalltools.Single(t => t.stID == intID);

                db.smalltools.DeleteOnSubmit(smtool);

                db.SubmitChanges();

                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditSmallToolDlg()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            string strOperation = Request.Form["hdnSmallToolOper"];
            string strToolID;

            if (strOperation == "Edit")
            {
                strToolID = Request.Form["hdnSmallToolID"];
            }
            else
            {
                strToolID = "";
            }

            string strItem = Request.Form["txtSmallToolItem"];
            string strDesc = Request.Form["txtSmallToolDesc"];
            string strSize = Request.Form["txtSmallToolSize"];
            string strRegBy = Request.Form["ddlSmallToolRegBy"];
            string strMngBy = Request.Form["ddlSmallToolMngBy"];
            string strMfg = Request.Form["txtSmallToolMfg"];
            string strSerNum = Request.Form["txtSmallToolSerNum"];
            string strModelNum = Request.Form["txtSmallToolModelNum"];
            string strComment = Request.Form["txtSmallToolComment"];
            string strID = Request.Form["txtSmallToolID"];
            string strCond = Request.Form["ddlSmallToolCond"];
            string strShop = Request.Form["ddlSmallToolShop"];
            string strAsgnTo = Request.Form["ddlSmallToolAsgnTo"];
            string strMngByDt = Request.Form["dtSmallToolMngByDt"];
            string strAsgnDt = Request.Form["dtSmallToolAsgnDt"];
            string strRetDt = Request.Form["dtSmallToolRetDt"];

            try
            {

                smalltool smtool;

                if (strOperation == "Edit")
                {
                    int intID = Convert.ToInt32(strToolID);
                    smtool = db.smalltools.Single(t => t.stID == intID);
                    smtool.inoutshop = strShop;

                }
                else  //add
                {
                    smtool = new smalltool();
                    smtool.inoutshop = "IN";
                }

                if (strOperation == "Edit" || strOperation == "Add")
                {
                    smtool.item = strItem;
                    smtool.description = strDesc;
                    smtool.size = strSize;
                    smtool.MFG = strMfg;
                    smtool.Model = strModelNum;
                    smtool.SerNum = strSerNum;
                    smtool.ID = strID;
                    Int16 intCond;
                    if (Int16.TryParse(strCond, out intCond))
                    {
                        smtool.ConditionId = intCond;
                    }

                    smtool.Reg_by = strRegBy;

                    if (smtool.Reg_by == null || smtool.Reg_by.Length <= 0)
                    {
                        throw new Exception("Registered By must be specified.");
                    }

                    smtool.Managed_by = strMngBy;
                    if (IsDate(strMngByDt))
                    {
                        smtool.managed_by_dt = Convert.ToDateTime(strMngByDt);
                    }

                    smtool.Assigned_to = strAsgnTo;

                    if (IsDate(strAsgnDt))
                    {
                        smtool.Assigned_dt = Convert.ToDateTime(strAsgnDt);
                    }

                    if (IsDate(strRetDt))
                    {
                        smtool.returned_dt = Convert.ToDateTime(strRetDt);
                    }

                    smtool.inoutshop = strShop;


                    smtool.comment = strComment;

                }

                if (strOperation == "Add")
                {
                    db.smalltools.InsertOnSubmit(smtool);
                }

                db.SubmitChanges();

                int intNewID = smtool.stID;

                return Content("Success" + "," + Session["division"] + "," + Convert.ToString(intNewID));

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditAssign(Nullable<int> id, FormCollection formValues)
        {

            //this method now used for delete only

            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strUnAssignFlag = "N";
                assignment assign;


                int  intID = Convert.ToInt32(formValues.GetValues("id")[0]);
                assign = db.assignments.Single(a => a.assign_id == intID);

                if (assign.return_dt == null)
                {

                    equipment equip = db.equipments.Single(a => a.equip_id == assign.equip_id);

                    equip.assigned = false;

                    strUnAssignFlag = "Y";

                }

                db.assignments.DeleteOnSubmit(assign);

                db.SubmitChanges();


                return Content("Success" + "," + strUnAssignFlag);

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }


        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditToolAssign(Nullable<int> id, FormCollection formValues)
        {

            uls_dbDataContext db = new uls_dbDataContext();

            try
            {
                string strOper = formValues.GetValues("oper")[0];

                string strUnAssignFlag = "Y";

                tools_assign assign;

                int intID = Convert.ToInt32(formValues.GetValues("id")[0]);
                assign = db.tools_assigns.Single(a => a.assign_id == intID);

                if (assign.return_dt == null)
                {
                    tool toool;

                    toool = db.tools.Single(a => a.tool_id == assign.tool_id);

                    toool.assigned = false;
                }

                db.tools_assigns.DeleteOnSubmit(assign);

                db.SubmitChanges();


                return Content("Success" + "," + strUnAssignFlag);

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditToolAsgnDlg()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            string strToolID = Request.Form["hdnToolAsgnToolID"];
            string strOperation = Request.Form["hdnToolAsgnOper"];
            string strAsgnDt = Request.Form["dtToolAsgnDt"];
            string strRetDt = Request.Form["dtToolRetDt"];
            string strAsgnCond = Request.Form["ddlToolAsgnCond"];
            string strRetCond = Request.Form["ddlToolRetCond"];
            string strAsgndTo = Request.Form["ddlToolAssignedTo"];
            string strComments = Request.Form["txtToolAsgnComments"];
            string strAsgnID = Request.Form["hdnToolAsgnID"];

            try
            {

                tools_assign assign;
                tool toool;

                toool = db.tools.Single(a => a.tool_id == strToolID);

                if (strOperation == "Edit")
                {
                    int intID = Convert.ToInt32(strAsgnID);
                    assign = db.tools_assigns.Single(a => a.assign_id == intID);
                }
                else  //add
                {
                    assign = new tools_assign();
                    assign.tool_id = strToolID;
                }

                assign.assigned_to = strAsgndTo;

                if (IsDate(strAsgnDt))
                {
                    assign.assigned_dt = Convert.ToDateTime(strAsgnDt);
                    toool.assigned = true;
                }
                if (IsDate(strRetDt))
                {
                    assign.return_dt = Convert.ToDateTime(strRetDt);
                    toool.assigned = false;
                }
                Int16 intAsignCond;
                if (Int16.TryParse(strAsgnCond, out intAsignCond))
                {
                    assign.asgn_condition_id = intAsignCond;
                }
                Int16 intRetCond;
                if (Int16.TryParse(strRetCond, out intRetCond))
                {
                    assign.ret_condition_id = intRetCond;
                }

                assign.lst_upd_dt = DateTime.Now;
                assign.comment_txt = strComments;

                if (strOperation == "Add")
                {
                    db.tools_assigns.InsertOnSubmit(assign);
                }

                db.SubmitChanges();

                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditService(Nullable<int> id, FormCollection formValues)
        {

            try
            {
                //this method now used for delete only

                uls_dbDataContext db = new uls_dbDataContext();

                service svc;

                int intServID = Convert.ToInt32(formValues.GetValues("id")[0]);
                svc = db.services.Single(s => s.service_id == intServID);

                db.services.DeleteOnSubmit(svc);

                db.SubmitChanges();

                return Content("Success" + "," + "" + "," + "" + "," + "");
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return Content(strErr + "," + "" + "," + "" + "," + "");
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditToolService(Nullable<int> id, FormCollection formValues)
        {
            try
            {
                uls_dbDataContext db = new uls_dbDataContext();

                int intServID = Convert.ToInt32(formValues.GetValues("id")[0]);
                tools_serv svc = db.tools_servs.Single(s => s.service_id == intServID);

                db.tools_servs.DeleteOnSubmit(svc);

                db.SubmitChanges();

                return Content("Success");
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditToolSvcDlg()
        {
            try
            {
                uls_dbDataContext db = new uls_dbDataContext();

                string strToolID = Request.Form["hdnToolSvcToolID"];
                string strOperation = Request.Form["hdnToolSvcOper"];
                string strSvcDt = Request.Form["dtToolSvcDt"];
                string strLabor = Request.Form["txtToolSvcLabor"];
                string strParts = Request.Form["txtToolSvcParts"];
                string strMechanic = Request.Form["txtToolSvcMechanic"];
                string strType = Request.Form["lstToolSvcTypes"];
                string strSvcReq = Request.Form["txtToolSvcReq"];
                string strSvcPerf = Request.Form["txtToolSvcPerf"];
                string strPartsReq = Request.Form["txtToolPartsReq"];
                string strComment = Request.Form["txtToolSvcComments"];
                string strSvcID = Request.Form["hdnToolSvcID"];


                tools_serv svc;

                if (strOperation == "Edit")
                {
                    int intServID = Convert.ToInt32(strSvcID);
                    svc = db.tools_servs.Single(s => s.service_id == intServID);

                }
                else   // add
                {
                    svc = new tools_serv();
                    svc.tool_id = strToolID;
                    svc.service_dt = Convert.ToDateTime(strSvcDt);
                }

                svc.service_dt = Convert.ToDateTime(strSvcDt);
                Int16 intSvcType;
                if (Int16.TryParse(strType, out intSvcType))
                {
                    svc.serv_perf_id = intSvcType;
                }

                svc.mechanic = strMechanic;
                Decimal decLaborCost;
                if (Decimal.TryParse(strLabor.Replace("$", ""), out decLaborCost))
                {
                    svc.labor_cost = decLaborCost;
                }
                Decimal decPartsCost;
                if (Decimal.TryParse(strParts.Replace("$", ""), out decPartsCost))
                {
                    svc.parts_cost = decPartsCost;
                }
                svc.serv_reqstd = strSvcReq;
                svc.serv_perf_descr = strSvcPerf;
                svc.parts_reqrd = strPartsReq;
                svc.comments = strComment;

                if (strOperation == "Add")
                {
                    db.tools_servs.InsertOnSubmit(svc);
                }

                db.SubmitChanges();

                return Content("Success");
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        //        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetEquipImages(string id, string type)
        {
            string strPartialName = "";

            EquipTrak eqt = new EquipTrak();

            var model = eqt.GetEquipImages(id, type);

            if (type == "EQUIP" || type == "TOOL")
            {
                strPartialName = "EquipImages";
            }
            else if (type == "EQUIP_ASSIGN_B" || type == "TOOL_ASSIGN_B")
            {
                strPartialName = "EquipBeforeAssignImages";
            }
            else if (type == "EQUIP_ASSIGN_A" || type == "TOOL_ASSIGN_A")
            {
                strPartialName = "EquipAfterAssignImages";
            }

            ViewData["default_division"] = Session["default_division"];

            return PartialView(strPartialName, model);
        }

        public ActionResult GetRptDlgAssignTo()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetAssignToRptDlg();

            ViewData["AssignToList"] = list;

            return PartialView("RptAssignTo", ViewData);
        }

        public ActionResult GetXferAssignLsts()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetAssignToRptDlg();

            ViewData["AssignToList"] = list;

            return PartialView("XferAssignDlg", ViewData);
        }

        public ActionResult GetRptDlgEquipInvByTypeAndLoc()
        {

            EquipTrak eqt = new EquipTrak();

            var locs = eqt.GetEquipLocs();
            var types = eqt.GetEquipTypes();

            ViewData["LocList"] = locs;
            ViewData["TypeList"] = types;

            return PartialView("RptEquipInvByTypeandLoc", ViewData);
        }

        public ActionResult GetRptDlgEquipInvTotalByGVW()
        {

            EquipTrak eqt = new EquipTrak();

            List<SelectListItem> gvw = new List<SelectListItem>(new[]{
                new SelectListItem{ Text="0-10,000", Value="1"},
                new SelectListItem{ Text="10,001 - 26,000", Value="2"},
                new SelectListItem{ Text="26,001 - 80,000", Value="3"},
                });

            var divs = eqt.GetDivs();

            ViewData["MngByList"] = divs;
            ViewData["RegByList"] = divs;

            ViewData["GVW"] = gvw;

            return PartialView("RptEquipTotalInvByGVW", ViewData);
        }

        public ActionResult GetRptDlgFuelDivs()
        {

            List<SelectListItem> fcd = new List<SelectListItem>(new[]{
                new SelectListItem{ Text="ULS", Value="ULS"},
                new SelectListItem{ Text="GWS", Value="GWS"}
                });

            ViewData["FCD"] = fcd;

            return PartialView("RptFuelCrdDiv", ViewData);
        }

        public ActionResult GetRptDlgEquipInvTotalWithCost()
        {

            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetEquipTypes2();
            var divs = eqt.GetDivs();

            ViewData["MngByList"] = divs;
            ViewData["RegByList"] = divs;

            ViewData["TypeList"] = types;

            return PartialView("RptEquipTotalInvWithCost", ViewData);
        }

        public ActionResult GetRptDlgEquipMngByHist()
        {

            EquipTrak eqt = new EquipTrak();

            var divs = eqt.GetDivs();
            var divs2 = eqt.GetEquipDivs();

            ViewData["MngByList"] = divs2;
            ViewData["RegByList"] = divs;


            return PartialView("RptEquipMngByHist", ViewData);
        }


        public ActionResult GetRptDlgEquipSvcCostAllTypesDivs()
        {

            EquipTrak eqt = new EquipTrak();

            var divs = eqt.GetDivs();
            var types = eqt.GetEquipTypes2();
            var svcTypes = eqt.GetEquipSvcDlgTypes2();

            ViewData["RegByList"] = divs;
            ViewData["MngByList"] = divs;
            ViewData["TypeList"] = types;
            ViewData["SvcTypeList"] = svcTypes;

            return PartialView("RptEquipSvcCostAllTypesDivs", ViewData);
        }



        public ActionResult GetRptDlgOnLoanTo()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetOnLoanDlg();

            ViewData["OnLoanToList"] = list;

            return PartialView("RptOnLoanTo", ViewData);
        }

        public ActionResult GetRptInspectionDates()
        {
            int curYear = DateTime.Now.Year;

            List<SelectListItem> sl = new List<SelectListItem>(new[]{
                new SelectListItem{ Text="January", Value="1"},
                new SelectListItem{ Text="February", Value="2"},
                new SelectListItem{ Text="March", Value="3"},
                new SelectListItem{ Text="April", Value="4"},
                new SelectListItem{ Text="May", Value="5"},
                new SelectListItem{ Text="June", Value="6"},
                new SelectListItem{ Text="July", Value="7"},
                new SelectListItem{ Text="August", Value="8"},
                new SelectListItem{ Text="September", Value="9"},
                new SelectListItem{ Text="October", Value="10"},
                new SelectListItem{ Text="November", Value="11"},
                new SelectListItem{ Text="December", Value="12"}
                });

            sl.Insert(0, new SelectListItem { Text = "", Value = "" });

            List<SelectListItem> sly = new List<SelectListItem>(new[]{
                new SelectListItem{ Text=Convert.ToString((curYear - 1)), Value=Convert.ToString((curYear - 1))},
                new SelectListItem{ Text=Convert.ToString((curYear)), Value=Convert.ToString((curYear))},
                new SelectListItem{ Text=Convert.ToString((curYear + 1)), Value=Convert.ToString((curYear + 1))}
                });

            sly.Insert(0, new SelectListItem { Text = "", Value = "" });

            ViewData["MonthsList"] = sl;
            ViewData["YearsList"] = sly;

            return PartialView("RptInspection", ViewData);
        }

        public ActionResult GetRptDlgTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetTypesDlg();

            ViewData["TypesList"] = list;

            return PartialView("RptTypes", ViewData);
        }

        public ActionResult GetEquipSvcEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipSvcDlgTypes();


            ViewData["TypesList"] = list;

            return PartialView("EquipSvcDlgTypes", ViewData);
        }

        public ActionResult GetToolSvcEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolSvcDlgTypes();


            ViewData["TypesList"] = list;

            return PartialView("ToolSvcDlgTypes", ViewData);
        }

        public ActionResult GetEquipAsgnEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipAsgnDlgTypes();

            ViewData["AssignToList"] = list;

            return PartialView("EquipAsgnDlgList", ViewData);
        }

        public ActionResult GetToolAsgnEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipAsgnDlgTypes();

            ViewData["AssignToList"] = list;

            return PartialView("ToolAsgnDlgList", ViewData);
        }

        public ActionResult GetEquipEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var types = eqt.GetEquipTypes();
            var makes = eqt.GetEquipMakes();
            var models = eqt.GetEquipModels();
            var locs = eqt.GetEquipLocs();
            var divs = eqt.GetEquipDivs();

            ViewData["EquipTypes"] = types;
            ViewData["EquipMakes"] = makes;
            ViewData["EquipModels"] = models;
            ViewData["EquipLocs"] = locs;
            ViewData["EquipDivs"] = divs;

            return PartialView("EquipEditDlg", ViewData);

        }

        public ActionResult GetToolEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var descrs = eqt.GetToolDescrsDlg();
            var mfgs = eqt.GetToolDlgMfgs();
            var types = eqt.GetToolDlgTypes();
            var sizes = eqt.GetToolDlgSizes();
            var locs = eqt.GetEquipLocs();
            var divs = eqt.GetEquipDivs();

            ViewData["ToolDescrs"] = descrs;
            ViewData["ToolMfgs"] = mfgs;
            ViewData["ToolTypes"] = types;
            ViewData["ToolSizes"] = sizes;
            ViewData["ToolLocs"] = locs;
            ViewData["ToolDivs"] = divs;

            return PartialView("ToolEditDlg", ViewData);

        }

        public ActionResult GetSmallToolEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipAsgnDlgTypes();
            var divs = eqt.GetEquipDivs();

            ViewData["SmalllToolAssgnTo"] = list;
            ViewData["SmalllToolDivs"] = divs;

            return PartialView("SmallToolEditDlg", ViewData);

        }

        public ActionResult GetRptDlgToolTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolTypesDlg();

            ViewData["ToolTypeList"] = list;

            var list2 = eqt.GetToolDescrsDlg();

            ViewData["ToolDescList"] = list2;

            return PartialView("RptToolsByType", ViewData);
        }

        public ActionResult GetRptDlgEquipIds()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipIdsDlg();

            ViewData["EquipIDList"] = list;

            return PartialView("RptEquipIds", ViewData);
        }

        public ActionResult GetRptDlgToolIds()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolIdsDlg();

            ViewData["ToolIDList"] = list;

            return PartialView("RptToolIds", ViewData);
        }

        public ActionResult GetRptDlgLocs()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetLocationsDlg();

            ViewData["LocationsList"] = list;

            return PartialView("RptLocations", ViewData);
        }

        public ActionResult GetRptDlgEquipSvcCostHist()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipIdsRptDlg(Convert.ToString(Session["division"]));

            ViewData["EquipIDList"] = list;

            return PartialView("RptEquipSvcCostHist", ViewData);
        }

        public ActionResult GetRptDlgEquipSvcCostHistTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetTypesDlg();

            ViewData["EquipTypeList"] = list;

            return PartialView("RptEquipSvcCostHistType", ViewData);
        }

        public ActionResult GetRptDlgToolSvcCostHistSvcTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolSvcDlgTypes();

            ViewData["ToolSvcTypeList"] = list;

            return PartialView("RptToolSvcCostHistSvcType", ViewData);
        }

        public ActionResult GetRptDlgEquipSvcCostHistSvcTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipSvcDlgTypes();

            ViewData["EquipSvcTypeList"] = list;

            return PartialView("RptEquipSvcCostHistSvcType", ViewData);
        }

        public ActionResult GetRptDlgToolSvcCostHistTypes()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolTypesDlg();

            ViewData["ToolTypeList"] = list;

            return PartialView("RptToolSvcCostHistType", ViewData);
        }


        public ActionResult GetRptDlgToolSvcCostHist()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetToolIdsRptDlg(Convert.ToString(Session["division"]));

            ViewData["ToolIDList"] = list;

            return PartialView("RptToolSvcCostHist", ViewData);
        }

        public ActionResult GetRptDlgAssignToHist()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetAssignToRptDlg();

            ViewData["AssignToList"] = list;

            return PartialView("RptAssignToHist", ViewData);
        }


        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Upload(string type)
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string imgType = Request.Form["hdnImageType"];

            if (imgType == "TOOL")
            {
                type = type.Replace("EQUIP", "TOOL");
            }

            try
            {
                foreach (string inputTagName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[inputTagName];
                    if (file.ContentLength > 0)
                    {
                        string filePath = Path.Combine(HttpContext.Server.MapPath("../../Content/equipImages")
                        , Path.GetFileName(file.FileName));
                        file.SaveAs(filePath);
                        
                        image img = new image();

                        img.entity_id = Request.Form["hdnEntityIDInit"];
                        img.image_type = type;
                        img.image_path = "/Content/equipImages/" + file.FileName;
                        db.images.InsertOnSubmit(img);
                        img = null;
                    }
                }
                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ShowReport()
        {
            string strQueryString;
            string rptName;

           rptName = Request.Form["hdnReportName"];

            //reportname,storedProcName,parm1,parm2,parm3
            try
            {
                switch (rptName)
                {
                    case "EquipAssignedTo":
                        strQueryString = "EquipAssignedTo,GetAssignedToReport," + Request.Form["lstAssigned"];
                        break;
                    case "EquipAssignedToHist":
                        strQueryString = "EquipAssignToHist,GetAssignedToHistReport," + Request.Form["lstHistAssigned"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipTotalInv":
                        strQueryString = "EquipTotalInventory,GetTotalEquipInventory," + Session["division"];
                        break;
                    case "EquipTotalInvRegBy":
                        strQueryString = "EquipTotalInvRegBy,GetTotalEquipInventoryRegBy," + Session["division"];
                        break;
                    case "EquipBrokenHist":
                        strQueryString = "EquipBrokenHist,GetBrokenEquipHistReport," + Request.Form["lstHistAssigned"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipOnLoan":
                        strQueryString = "EquipmentOnLoan,GetEquipOnLoanReport," + Session["division"] + "," + Request.Form["lstOnLoanTo"];
                        break;
                    case "EquipInvByType":
                        strQueryString = "EquipmentInvByType,GetInvByTypeReport," + Session["division"] + "," + Request.Form["lstTypes"];
                        break;
                    case "EquipInspectionDue":
                        string month = Request.Form["lstMonths"];
                        string year = Request.Form["lstYears"];

                        string startDt = month + "/1/" + year;

                        string strendDt = Convert.ToDateTime(startDt).AddMonths(1).ToString("MM/dd/yyyy");

                        strQueryString = "EquipInspectionDue,GetInspectionsDueReport," + Session["division"] + "," + startDt + "," + strendDt;
                        break;
                    case "EquipInspectionDueMngBy":
                        string month2 = Request.Form["lstMonths"];
                        string year2 = Request.Form["lstYears"];

                        string startDt2 = month2 + "/1/" + year2;

                        string strendDt2 = Convert.ToDateTime(startDt2).AddMonths(1).ToString("MM/dd/yyyy");

                        strQueryString = "EquipInspectionDueMngBy,GetInspectionsDueReportMngBy," + Session["division"] + "," + startDt2 + "," + strendDt2;
                        break;
                    case "EquipInvByLoc":
                        strQueryString = "EquipInvByLoc,GetInvByLocReport," + Session["division"] + "," + Request.Form["lstLocations"];
                        break;
                    case "EquipHUTInv":
                        strQueryString = "EquipHUTInv,GetHUTInventory," + Session["division"];
                        break;
                    case "EquipApportionedInv":
                        strQueryString = "EquipApportionedInv,GetApportionedInventory," + Session["division"];
                        break;
                    case "EquipToBeSoldInv":
                        strQueryString = "EquipToBeSoldInv,GetEquipToBeSoldInventory," + Session["division"];
                        break;
                    case "EquipUnknownInv":
                        strQueryString = "EquipUnknownInventory,GetUnknownEquipInventory," + Session["division"];
                        break;
                    case "EquipGPSInv":
                        strQueryString = "EquipGPSInv,GetGPSInventory," + Session["division"];
                        break;
                    case "EquipEZPASSInv":
                        strQueryString = "EquipEZPASSInv,GetEZPASSInventory," + Session["division"];
                        break;
                    case "EquipFuelCardInv":
                        strQueryString = "EquipFuelCardInv,GetFuelCardInventory," + Session["division"];
                        break;
                    case "EquipLeasedInv":
                        strQueryString = "EquipLeasedInv,GetLeasedInventory," + Session["division"];
                        break;
                    case "EquipIFTAInv":
                        strQueryString = "EquipIFTAInv,GetIFTAInventory," + Session["division"];
                        break;
                    case "ToolsAssignedTo":
                        strQueryString = "ToolsAssignedTo,GetToolsAssignedToReport," + Request.Form["lstAssigned"];
                        break;
                    case "ToolsAssignedToHist":
                        strQueryString = "ToolsAssignedToHist,GetToolsAssignedToHistReport," + Request.Form["lstHistAssigned"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "ToolsBrokenHist":
                        strQueryString = "ToolsBrokenHist,GetToolsBrokenHistReport," + Request.Form["lstHistAssigned"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "ToolsOnLoan":
                        strQueryString = "ToolsOnLoan,GetToolsOnLoanReport," + Session["division"] + "," + Request.Form["lstOnLoanTo"];
                        break;
                    case "ToolsInvByType":
                        strQueryString = "ToolsInvByType,GetToolsByTypeReport," + Session["division"] + "," + Request.Form["lstToolTypes"] + "," + Request.Form["lstToolDesc"];
                        break;
                    case "ToolsTotalInv":
                        strQueryString = "ToolsTotalInv,GetTotalToolsInvReport," + Session["division"];
                        break;
                    case "ToolsTotalInvRegBy":
                        strQueryString = "ToolsTotalInvRegBy,GetTotalToolsInvReportRegBy," + Session["division"];
                        break;
                    case "ToolsLojackInv":
                        strQueryString = "ToolsLojackInv,GetToolsInvLojackReport," + Session["division"];
                        break;
                    case "EquipLojackInv":
                        strQueryString = "EquipLojackInv,GetLojackInventory," + Session["division"];
                        break;
                    case "EquipOtherAntiTheftInv":
                        strQueryString = "EquipOtherAntiTheftInv,GetOtherAntiTheftInventory," + Session["division"];
                        break;
                    case "ToolsToBeSold":
                        strQueryString = "ToolsToBeSold,GetToolsToBeSoldInventory," + Session["division"];
                        break;
                    case "ToolsUnknownInv":
                        strQueryString = "ToolsUnknownInv,GetUnknownToolsInv," + Session["division"];
                        break;
                    case "ToolsInvByLoc":
                        strQueryString = "ToolInvByLoc,GetToolInvByLocReport," + Session["division"] + "," + Request.Form["lstLocations"];
                        break;
                    case "EquipOneRpt":
                        string ID = rptName = Request.Form["hdnID"];
                        strQueryString = "EquipOneReport,GetOneEquipReportReport," + ID;
                        break;
                    case "ToolOneRpt":
                        string tID = rptName = Request.Form["hdnID"];
                        strQueryString = "ToolOneReport,GetOneToolReport," + tID;
                        break;
                    case "EquipInvByTypeAndLoc":
                        strQueryString = "EquipInvByTypeAndLoc,GetInvByTypeandLocReport," + Request.Form["lstTypes"] + "," + Request.Form["lstLocs"];
                        break;
                    case "SmallToolsAssignedTo":
                        strQueryString = "SmallToolsAssignedTo,GetSmallToolsAssignedToReport," + Request.Form["lstAssigned"];
                        break;
                    case "EquipOneSvcRpt":
                        string IDsvc = rptName = Request.Form["hdnID"];
                        strQueryString = "EquipOneSvcReport,GetOneEquipSvcReport," + IDsvc;
                        break;
                    case "ToolOneSvcRpt":
                        string IDTsvc = rptName = Request.Form["hdnID"];
                        strQueryString = "ToolOneSvcReport,GetOneToolSvcReport," + IDTsvc;
                        break;
                    case "EquipSvcCostHist": 
                        strQueryString = "EquipSvcCostHist,GetEquipSvcCostHistReport," + Request.Form["lstHistEquipIds"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipSvcCostHistByType":
                        strQueryString = "EquipSvcCostHistByType,GetEquipSvcCostHistReportByType2," + Request.Form["lstHistTypes"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "EquipSvcCostHistBySvcType":
                        strQueryString = "EquipSvcCostHistBySvcType,GetEquipSvcCostHistReportBySvcType2," + Request.Form["lstSvcTypes"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "ToolSvcCostHistBySvcType":
                        strQueryString = "ToolSvcCostHistBySvcType,GetToolSvcCostHistReportBySvcType2," + Request.Form["lstToolSvcTypes"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "EquipSvcCostHistAll":
                        strQueryString = "EquipSvcCostHistAll,GetEquipSvcCostHistReportAll2," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "ToolSvcCostHistByType":
                        strQueryString = "ToolSvcCostHistByType,GetToolSvcCostHistReportByType2," + Request.Form["lstHistToolTypes"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "ToolSvcCostHistAll":
                        strQueryString = "ToolSvcCostHistAll,GetToolSvcCostHistReportAll2," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"] + "," + Session["division"];
                        break;
                    case "ToolSvcCostHist":
                        strQueryString = "ToolSvcCostHistReport,GetToolSvcCostHistReport," + Request.Form["lstHistToolIds"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipSvcCostAllTypesDivs": 
                        strQueryString = "EquipSvcCostHistAllTypesDivs,GetEquipSvcCostHistULSPAReport," + Request.Form["ddlEquipType"] + "," + Request.Form["ddlSvcTypes"] + "," + Request.Form["ddlEquipRegBy"] + "," + Request.Form["ddlEquipMngBy"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipInvWithCost":
                        strQueryString = "EquipInvWithCost,GetEquipTotalInvCost," + Request.Form["ddlEquipType"] + "," + Request.Form["ddlEquipRegBy"] + "," + Request.Form["ddlEquipMngBy"];
                        break;
                    case "EquipInvByGVW":
                        strQueryString = "EquipInvByGVW,GetEquipTotalByGVW," + Request.Form["ddlGVW"] + "," + Request.Form["ddlEquipRegBy"] + "," + Request.Form["ddlEquipMngBy"];
                        break;
                    case "EquipChangeLogByID":
                        strQueryString = "EquipChangeLogByID,GetEquipChangeLogByID," + Request.Form["lstEquipID"];
                        break;
                    case "ToolsChangeLogByID":
                        strQueryString = "ToolsChangeLogByID,GetToolChangeLogByID," + Request.Form["lstToolID"];
                        break;
                    case "EquipChangeLogHist": 
                        strQueryString = "EquipChangeLogHist,GetEquipChangeLogHist," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipMngByHist":
                        strQueryString = "EquipMngByHist,GetEquipMngByHistReport," + Request.Form["ddlEquipRegBy"] + "," + Request.Form["ddlEquipMngBy"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "ToolsChangeLogHist":
                        strQueryString = "ToolsChangeLogHist,GetToolChangeLogHist," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "EquipFuelCardDivInv":
                        strQueryString = "EquipFuelCardDivInv,GetEquipFuelCardDivInv," + Request.Form["ddlFCDivs"];
                        break;
                    default: 
                        strQueryString = "";
                        break;
                }

                return RedirectToAction("Index", "CrystalRptViewer", new { value1 = strQueryString });
                //Server.Transfer("~/ReportViewerPage.aspx");
//                Response.Redirect("ReportViewerPage.aspx");

//                Redirect("/CrystalRptViewerController/Index");

//                return Content("Success");

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

//                strRet = "Failure";

                return Content("Failure");
            }

            
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [SessionExpireFilter]
        public ActionResult DeleteImage(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;
            string strPath;

            try
            {
                image img = db.images.Single(i => i.image_id == Convert.ToInt32(id));
                strPath = img.image_path;
                string[] strParts = strPath.Split('/');

                string strFile = strParts[strParts.Count() -1];

                db.images.DeleteOnSubmit(img);
                db.SubmitChanges();

                string filePath = Path.Combine(HttpContext.Server.MapPath("../../Content/equipImages"),strFile);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                strRet = "Success";
            }
            catch (Exception)
            {

                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteEquipType(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                equip_type_avt type = db.equip_type_avts.Single(et => et.type_id == Convert.ToInt32(id));
                db.equip_type_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception)
            {

                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteMakeType(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                make_avt type = db.make_avts.Single(et => et.make_id == Convert.ToInt32(id));
                db.make_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception)
            {

                strRet = "Failure";
            }

            return Content(strRet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteModelType(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                model_avt type = db.model_avts.Single(et => et.model_id == Convert.ToInt32(id));
                db.model_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteToolType(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                tools_item_avt type = db.tools_item_avts.Single(et => et.tools_type_id == Convert.ToInt32(id));
                db.tools_item_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteToolDesc(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                tools_descr_avt type = db.tools_descr_avts.Single(et => et.tools_descr_id == Convert.ToInt32(id));
                db.tools_descr_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteToolManf(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                tool_mfgs_avt type = db.tool_mfgs_avts.Single(et => et.tool_mfg_id == Convert.ToInt32(id));
                db.tool_mfgs_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteLocation(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                equip_loc_avt type = db.equip_loc_avts.Single(et => et.loc_id == Convert.ToInt32(id));
                db.equip_loc_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteUser(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                default_div type = db.default_divs.Single(et => et.user_id == id);
                db.default_divs.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteAssignTo(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                assign_to type = db.assign_tos.Single(at => at.assign_to_id == Convert.ToInt32(id));
                db.assign_tos.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteToolSize(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                tool_size_avt type = db.tool_size_avts.Single(et => et.size_id == Convert.ToInt32(id));
                db.tool_size_avts.DeleteOnSubmit(type);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = "Failure";
            }

            return Content(strRet);
        }

        public ActionResult GetNextEquipTypeId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxEquipTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextMakeTypeId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxMakeTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextModelTypeId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxModelTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextToolTypeId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxToolTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextToolDescId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxToolDescID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextToolManfId()
        {
            EquipTrak eqt = new EquipTrak();

            short shtMax = eqt.GetMaxToolManfID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextToolSizeId()
        {
            EquipTrak eqt = new EquipTrak();

            int intMax = eqt.GetMaxToolSizeID();

            return Content((intMax + 1).ToString());
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdmin()
        {
            string strRet;
            string strAddType;

            strAddType = "NoAddType";

            uls_dbDataContext db = new uls_dbDataContext();

            string adminType = Request.Form["hdnAdminType"];
            string strID = Request.Form["hdnAdminID"];
            string strDescr = Request.Form["txtDescription"];
            string strOperation = Request.Form["hdnAdminOper"];

            try
            {
                if (adminType == "AdminEquipTypes")
                {
                    equip_type_avt eta;

                    if (strOperation == "Add")
                    {
                        service_due_parm sdp = new service_due_parm();

                        eta = new equip_type_avt();
                        eta.type_id = Convert.ToInt16(strID);
                        eta.type_desc = strDescr;

                        sdp.type_id = eta.type_id;
                        sdp.service_every = 0;
                        sdp.warning_within = 0;
                                                
                        db.equip_type_avts.InsertOnSubmit(eta);
                        db.service_due_parms.InsertOnSubmit(sdp);

                        strAddType = "YesAddType";

                    }
                    else
                    {
                        eta = db.equip_type_avts.Single(e => e.type_id == Convert.ToInt16(strID));
                        eta.type_desc = strDescr;
                    }

                }
                else if (adminType == "AdminMakeTypes")
                {
                    make_avt mka;

                    if (strOperation == "Add")
                    {
                        mka = new make_avt();
                        mka.make_id = Convert.ToInt16(strID);
                        mka.make_descr = strDescr;
                        db.make_avts.InsertOnSubmit(mka);
                    }
                    else
                    {
                        mka = db.make_avts.Single(e => e.make_id == Convert.ToInt16(strID));
                        mka.make_descr = strDescr;
                    }
                }
                else if (adminType == "AdminModelTypes")
                {
                    model_avt mda;

                    if (strOperation == "Add")
                    {
                        mda = new model_avt();
                        mda.model_id = Convert.ToInt16(strID);
                        mda.model_descr = strDescr;
                        db.model_avts.InsertOnSubmit(mda);
                    }
                    else
                    {
                        mda = db.model_avts.Single(e => e.model_id == Convert.ToInt16(strID));
                        mda.model_descr = strDescr;
                    }
                }
                else if (adminType == "AdminToolTypes")
                {
                    tools_item_avt tia;

                    if (strOperation == "Add")
                    {
                        tia = new tools_item_avt();
                        tia.tools_type_id = Convert.ToInt16(strID);
                        tia.tools_type_descr = strDescr;
                        db.tools_item_avts.InsertOnSubmit(tia);
                    }
                    else
                    {
                        tia = db.tools_item_avts.Single(e => e.tools_type_id == Convert.ToInt16(strID));
                        tia.tools_type_descr = strDescr;
                    }
                }
                else if (adminType == "AdminToolDescs")
                {
                    tools_descr_avt tda;

                    if (strOperation == "Add")
                    {
                        tda = new tools_descr_avt();
                        tda.tools_descr_id = Convert.ToInt16(strID);
                        tda.tools_descr_descr = strDescr;
                        db.tools_descr_avts.InsertOnSubmit(tda);
                    }
                    else
                    {
                        tda = db.tools_descr_avts.Single(e => e.tools_descr_id == Convert.ToInt16(strID));
                        tda.tools_descr_descr = strDescr;
                    }
                }
                else if (adminType == "AdminToolManfs")
                {
                    tool_mfgs_avt tma;

                    if (strOperation == "Add")
                    {
                        tma = new tool_mfgs_avt();
                        tma.tool_mfg_id = Convert.ToInt16(strID);
                        tma.tool_mfg_descr = strDescr;
                        db.tool_mfgs_avts.InsertOnSubmit(tma);
                    }
                    else
                    {
                        tma = db.tool_mfgs_avts.Single(e => e.tool_mfg_id == Convert.ToInt16(strID));
                        tma.tool_mfg_descr = strDescr;
                    }
                }
                else if (adminType == "AdminToolSizes")
                {
                    tool_size_avt tsa;

                    if (strOperation == "Add")
                    {
                        tsa = new tool_size_avt();
                        tsa.size_id = Convert.ToInt16(strID);
                        tsa.size_descr = strDescr;
                        db.tool_size_avts.InsertOnSubmit(tsa);
                    }
                    else
                    {
                        tsa = db.tool_size_avts.Single(e => e.size_id == Convert.ToInt16(strID));
                        tsa.size_descr = strDescr;
                    }
                }

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet + "," + strAddType);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminLoc()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strLoc = Request.Form["txtLoc"];

            if (strLoc.IndexOf(",") > 0)
            {
                strLoc = strLoc.Replace(",", "");
            }

            string strDiv = Request.Form["hdnAdminLocDiv"];
            string strOperation = Request.Form["hdnAdminLocOper"];
            string strID = Request.Form["hdnAdminLocID"];

            try
            {
                equip_loc_avt ela;

                if (strOperation == "Add")
                {
                    ela = new equip_loc_avt();
                    ela.equip_loc = strLoc;
                    ela.division = strDiv;
                    db.equip_loc_avts.InsertOnSubmit(ela);
                }
                else
                {
                    ela = db.equip_loc_avts.Single(e => e.loc_id == Convert.ToInt32(strID));
                    ela.division = strDiv;
                }

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminUsers()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strUserID = Request.Form["txtUserID"];
            string strDiv = Request.Form["hdnAdminUsersDiv"];
            string strOperation = Request.Form["hdnAdminUsersOper"];
            string strID = Request.Form["hdnAdminUsersID"];

            try
            {
                default_div dd;

                if (strOperation == "Add")
                {
                    dd = new default_div();
                    dd.user_id = strUserID;
                    dd.div = strDiv;
                    db.default_divs.InsertOnSubmit(dd);
                }
                else
                {
                    dd = db.default_divs.Single(e => e.user_id == strID);
                    dd.div = strDiv;
                }

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditEquipSvc()
        {
            bool bMilesChanged = false;
//            bool bHoursChanged = false;

            string str_miles_hours = "";
            string str_miles_dt = "";
            string str_service_due_num = "";

            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            EquipTrak eqt = new EquipTrak();

            string strEquipID = Request.Form["hdnSvcEditID"];
            string strOperation = Request.Form["hdnSvcEditOper"];
            string strSvcDt = Request.Form["dtEquipSvcDt"];
            string strLabor = Request.Form["txtEquipSvcLabor"];
            string strParts = Request.Form["txtEquipSvcParts"];
//            string strTotal = Request.Form["txtEquipSvcTotal"];
            string strMechanic = Request.Form["txtEquipSvcMechanic"];
            string strType = Request.Form["lstEquipSvcTypes"];
            string strSvcReq = Request.Form["txtEquipSvcReq"];
            string strSvcPerf = Request.Form["txtEquipSvcPerf"];
            string strPartsReq = Request.Form["txtEquipPartsReq"];
            string strComment = Request.Form["txtEquipSvcComments"];
            string strCalcSvcDt = Request.Form["chkEquipSvcDue"];
            string strMiles = Request.Form["txtEquipSvcMiles"];
//            string strHours = Request.Form["txtEquipSvcHours"];
            string strOldMiles = Request.Form["hdnSvcOldMileage"];
//            string strOldHours = Request.Form["hdnSvcOldHours"];
            string strSvcID =  Request.Form["hdnSvcID"];

            try
            {
                if (strMiles == "")
                {
                    throw new Exception("ERROR Saving - Current Mileage/Hours cannot be blank!");

                }

                service svc;

                if (strOperation == "Edit")
                {
                    int intServID = Convert.ToInt32(strSvcID);
                    svc = db.services.Single(s => s.service_id == intServID);

                }
                else   // add
                {
                    svc = new service();
                    svc.equip_id = strEquipID;
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {
                    svc.service_dt = Convert.ToDateTime(strSvcDt);

                    Int16 intSvcType;
                    if (Int16.TryParse(strType, out intSvcType))
                    {
                        svc.serv_perf_id = intSvcType;
                    }

                    svc.mechanic = strMechanic;
                    Single sngMile;
                    if (Single.TryParse(strMiles, out sngMile))
                    {
                        svc.mileage = sngMile;

                        Single sngOldMilage;

                        if (!(Single.TryParse(strOldMiles, out sngOldMilage)))
                        {
                            sngOldMilage = 0;
                        }
                        if (sngMile != sngOldMilage)
                        {
                            bMilesChanged = true;
                        }

                    }
//                    Single sngHours;
//                    if (Single.TryParse(strHours, out sngHours))
//                    {
//                        svc.hours = sngHours;
//                        Single sngOldHours;
//
//                        if (!(Single.TryParse(strOldHours, out sngOldHours)))
//                        {
//                            sngOldHours = 0;
//                        }
//                        if (sngHours != sngOldHours)
//                        {
//                            bHoursChanged = true;
//                        }
//                    }
                    Decimal decLaborCost;
                    if (Decimal.TryParse(strLabor.Replace("$", ""), out decLaborCost))
                    {
                        svc.labor_cost = decLaborCost;
                    }
                    Decimal decPartsCost;
                    if (Decimal.TryParse(strParts.Replace("$", ""), out decPartsCost))
                    {
                        svc.parts_cost = decPartsCost;
                    }
//                    Decimal decTotalCost;
//                    if (Decimal.TryParse(strTotal.Replace("$", ""), out decTotalCost))
//                    {
//                        svc.total_cost = decTotalCost;
//                    }
                    svc.serv_reqstd = strSvcReq;
                    svc.serv_perf_descr = strSvcPerf;
                    svc.parts_reqrd = strPartsReq;
                    svc.comments = strComment;

                    uls_dbDataContext db2 = new uls_dbDataContext();

                    equipment equip = db.equipments.Single(e => e.equip_id == svc.equip_id);

//                    if (bHoursChanged == true)
//                    {
//                        equip.miles_hours = svc.hours;
//                        equip.miles_dt = DateTime.Now;
//                    }

                    if (bMilesChanged == true && equip.miles_hours < svc.mileage)
                    {
                        equip.miles_hours = svc.mileage;
                        equip.miles_dt = DateTime.Now;
                    }

                    if (strCalcSvcDt == "on")
                    {
                        float? svcIncrement = eqt.GetServiceDueNum(svc.equip_id);

                        float? curSevrNum = equip.miles_hours == null ? 0 : equip.miles_hours;

                        equip.service_due_num = curSevrNum + svcIncrement;

                    }

                    str_miles_hours = equip.miles_hours == null ? "0" : Convert.ToString(equip.miles_hours);
                    str_miles_dt = equip.miles_dt == null ? "" : String.Format("{0:MM/dd/yyyy}", equip.miles_dt);
                    str_service_due_num = equip.service_due_num == null ? "0" : Convert.ToString(equip.service_due_num);


                    db2.SubmitChanges();


                    if (strOperation == "Add")
                    {
                        db.services.InsertOnSubmit(svc);
                    }

                }

                db.SubmitChanges();

                return Content("Success" + "," + str_miles_hours + "," + str_miles_dt + "," + str_service_due_num);

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditEquipAsgn()
        {
            bool bAsgnMilesChanged = false;
            bool bAsgnHoursChanged = false;
            bool bRetMilesChanged = false;
            bool bRetHoursChanged = false;

            string str_miles_hours = "";
            string str_miles_dt = "";

            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strEquipID = Request.Form["hdnAsgnEditID"];
            string strOperation = Request.Form["hdnAsgnEditOper"];
            string strAsgnDt = Request.Form["dtEquipAsgnDt"];
            string strRetDt = Request.Form["dtEquipRetDt"];
            string strAsgnCond = Request.Form["ddlAsgnCond"];
            string strRetCond = Request.Form["ddlRetCond"];
            string strAsgndTo = Request.Form["ddlAssignedTo"];
            string strAsgnMiles = Request.Form["txtEquipAsgnMiles"];
            string strAsgnHours = Request.Form["txtEquipAsgnHours"];
            string strRetMiles = Request.Form["txtEquipRetMiles"];
            string strRetHours = Request.Form["txtEquipRetHours"];
            string strComments = Request.Form["txtEquipAsgnComments"];
            string strAsgnID = Request.Form["hdnAsgnID"];
            string strAsgnOldMiles = Request.Form["hdnAsgnOldMileage"];
            string strAsgnOldHours = Request.Form["hdnAsgnOldHours"];
            string strRetOldMiles = Request.Form["hdnRetOldMileage"];
            string strRetOldHours = Request.Form["hdnRetOldHours"];

            try
            {
                string strValidateFail = Request.Form["hdnAsgnFail"];

                if (strValidateFail == "Yes")
                {
                    throw new Exception("");

                }

                assignment assign;

                equipment equip = db.equipments.Single(a => a.equip_id == strEquipID);

                if (strOperation == "Edit")
                {
                    int intAsgnID = Convert.ToInt32(strAsgnID);
                    assign = db.assignments.Single(a => a.assign_id == intAsgnID);

                }
                else   // add
                {
                    assign = new assignment();
                    assign.equip_id = strEquipID;
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {
                    assign.assigned_to = strAsgndTo;

                    if (IsDate(strAsgnDt))
                    {
                        assign.assigned_dt = Convert.ToDateTime(strAsgnDt);
                        equip.assigned = true;
                    }
                    if (IsDate(strRetDt))
                    {
                        assign.return_dt = Convert.ToDateTime(strRetDt);
                        equip.assigned = false;
                    }
                    Int16 intAsignCond;
                    if (Int16.TryParse(strAsgnCond, out intAsignCond))
                    {
                        assign.asgn_condition_id = intAsignCond;
                    }
                    Int16 intRetCond;
                    if (Int16.TryParse(strRetCond, out intRetCond))
                    {
                        assign.ret_condition_id = intRetCond;
                    }

                    assign.lst_upd_dt = DateTime.Now;
                    assign.comment_txt = strComments;

                    Int32 intMiles;
                    if (Int32.TryParse(strAsgnMiles, out intMiles))
                    {
                        assign.asgn_miles = intMiles;

                        int intAsgnOldMilage;

                        if (!(int.TryParse(strAsgnOldMiles, out intAsgnOldMilage)))
                        {
                            intAsgnOldMilage = 0;
                        }
                        if (intMiles != intAsgnOldMilage)
                        {
                            bAsgnMilesChanged = true;
                        }
                    }

                    Int32 intHours;
                    if (Int32.TryParse(strAsgnHours, out intHours))
                    {
                        assign.asgn_hours = intHours;
                        int intAsgnOldHours;

                        if (!(int.TryParse(strAsgnOldHours, out intAsgnOldHours)))
                        {
                            intAsgnOldHours = 0;
                        }
                        if (intHours != intAsgnOldHours)
                        {
                            bAsgnHoursChanged = true;
                        }
                    }

                    Int32 intRetMiles;
                    if (Int32.TryParse(strRetMiles, out intRetMiles))
                    {
                        assign.ret_miles = intRetMiles;
                        int intRetOldMilage;

                        if (!(int.TryParse(strRetOldMiles, out intRetOldMilage)))
                        {
                            intRetOldMilage = 0;
                        }
                        if (intRetMiles != intRetOldMilage)
                        {
                            bRetMilesChanged = true;
                        }
                    }

                    Int32 intRetHours;
                    if (Int32.TryParse(strRetHours, out intRetHours))
                    {
                        assign.ret_hours = intRetHours;
                        int intRetOldHours;

                        if (!(int.TryParse(strRetOldMiles, out intRetOldHours)))
                        {
                            intRetOldHours = 0;
                        }
                        if (intRetHours != intRetOldHours)
                        {
                            bRetHoursChanged = true;
                        }
                    }

                    if (bAsgnHoursChanged == true && equip.miles_hours < assign.asgn_hours)
                    {
                        equip.miles_hours = assign.asgn_hours;
                        equip.miles_dt = DateTime.Now;
                    }

                    if (bRetHoursChanged == true && equip.miles_hours < assign.ret_hours)
                    {
                        equip.miles_hours = assign.ret_hours;
                        equip.miles_dt = DateTime.Now;
                    }

                    if (bAsgnMilesChanged == true && equip.miles_hours < assign.asgn_miles)
                    {
                        equip.miles_hours = assign.asgn_miles;
                        equip.miles_dt = DateTime.Now;
                    }

                    if (bRetMilesChanged == true && equip.miles_hours < assign.ret_miles)
                    {
                        equip.miles_hours = assign.ret_miles;
                        equip.miles_dt = DateTime.Now;
                    }

                    str_miles_hours = equip.miles_hours == null ? "0" : Convert.ToString(equip.miles_hours);
                    str_miles_dt = equip.miles_dt == null ? "" : String.Format("{0:MM/dd/yyyy}", equip.miles_dt);

                    if (strOperation == "Add")
                    {
                        db.assignments.InsertOnSubmit(assign);
                    }

                }

                db.SubmitChanges();

                return Content("Success" + "," + str_miles_hours + "," + str_miles_dt);

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }


        private string CheckEditField(string strField, string strPrevVal, string strNowVal, string strLogEntry)
        {

            if (strPrevVal != strNowVal)
            {
                if (strField != "Comment")
                {
                    if (strLogEntry == "")
                    {
                        strLogEntry = strField + " = " + strNowVal;
                    }
                    else
                    {
                        strLogEntry = strLogEntry + "; " + strField + " = " + strNowVal;
                    }
                }
                else
                {
                    if (strLogEntry == "")
                    {
                        strLogEntry = strField + " = changed";
                    }
                    else
                    {
                        strLogEntry = strLogEntry + "; " + strField + " = changed";
                    }

                }
            }

            return strLogEntry;
        }



        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditEquip()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strOperation = Request.Form["hdnEditOper"];
            string strEquipID;
            string strRegBy;

            if (strOperation == "Edit")
            {
                strEquipID = Request.Form["hdnEditID"];
            }
            else
            {
                strEquipID = Request.Form["txtEquipID"];
            }

            strRegBy = Request.Form["ddlEquipRegBy"];

            if (strRegBy == null)
            {
                strRegBy = Request.Form["hdnEquipRegBy"];
            }

            string strYear = Request.Form["txtEquipYear"];
            string strType = Request.Form["ddlEquipType"];
            string strMake = Request.Form["ddlEquipMake"];
            string strModel = Request.Form["ddlEquipModel"];
            string strLoc = Request.Form["ddlEquipLoc"];
            string strInspDue = Request.Form["dtEquipInspDue"];
            string strMilesHours = Request.Form["txtEquipMilesHours"];
            string strSvcDueNum = Request.Form["txtEquipSvcDue"];
            string strMilesDt = Request.Form["dtEquipMilesDt"];
            string strTagExpDt = Request.Form["dtEquipTagExp"];
            string strMngBy = Request.Form["ddlEquipMngBy"];
            string strMngByDt = Request.Form["dtEquipMngByDt"];
            string strVIN = Request.Form["txtEquipVIN"];
            string strTitleNum = Request.Form["txtEquipTitleNum"];
            string strGVW = Request.Form["txtEquipGVW"];
            string strGCW = Request.Form["txtEquipGCW"];
            string strUnldnWt = Request.Form["txtEquipUnlaidenWt"];
            string strTagNum = Request.Form["txtEquipTagNum"];
            string strTagSt = Request.Form["ddlTagSt"];
            string strFuel = Request.Form["ddlFuel"];
            string strCost = Request.Form["txtCost"];
            string strCurrentValue = Request.Form["txtCurrentValue"];
            string strInspRmdrWks = Request.Form["ddlInspRmndr"];
            string strTagRmndrWks = Request.Form["ddlTagRmndr"];
//            string strStolen = Request.Form["chkEquipStolen"] == null ? "off" : Request.Form["chkEquipStolen"];
            string strStolen = Request.Form["hdnEquipStolen"];
//            string strSold = Request.Form["chkEquipSold"] == null ? "off" : Request.Form["chkEquipSold"];
            string strSold = Request.Form["hdnEquipSold"];
            string strToBeSold = Request.Form["hdnEquipToBeSold"];
            //            string strLojack = Request.Form["chkEquipLojack"] == null ? "off" : Request.Form["chkEquipLojack"];
            string strLojack = Request.Form["hdnEquipLojack"];
//            string strInRepair = Request.Form["chkEquipInRepair"] == null ? "off" : Request.Form["chkEquipInRepair"];
            string strInRepair = Request.Form["hdnEquipInRepair"];
//            string strTotaled = Request.Form["chkEquipTotaled"] == null ? "off" : Request.Form["chkEquipTotaled"];
            string strTotaled = Request.Form["hdnEquipTotaled"];
//            string strHUTsticker = Request.Form["chkHUTSticker"] == null ? "off" : Request.Form["chkHUTSticker"];
            string strHUTsticker = Request.Form["hdnHUTSticker"];
            //            string strApportioned = Request.Form["chkEquipApportioned"] == null ? "off" : Request.Form["chkEquipApportioned"];
            string strApportioned = Request.Form["hdnEquipApportioned"];
//            string strIFTAsticker = Request.Form["chkIFTASticker"] == null ? "off" : Request.Form["chkIFTASticker"];
            string strIFTAsticker = Request.Form["hdnIFTASticker"];
//            string strGPS = Request.Form["chkEquipGPS"] == null ? "off" : Request.Form["chkEquipGPS"];
            string strGPS = Request.Form["hdnEquipGPS"];
            string strGPSNum = Request.Form["txtGPSNum"];
            string strEZPass = Request.Form["hdnEquipEZPASS"];
            string strEZPASSNum = Request.Form["txtEZPASSNum"];
            string strFuelCard = Request.Form["hdnEquipFuelCard"];
            string strFuelCardNum = Request.Form["txtFuelCardNum"];
            string strFuelCardLoc = Request.Form["ddlFuelCardLoc"];
            string strUnknown = Request.Form["hdnEquipUnknown"];
            string strLeased = Request.Form["hdnEquipLeased"];
            string strComment = Request.Form["txtEquipComment"];
            string strOtherAntiTheft = Request.Form["hdnOtherAntiTheft"];
            string strOtherAntiTheftType = Request.Form["ddlOtherAntiTheftTypes"];

            string strLogEntry = "";

            bool blnObsolete = false;

            try
            {
                equipment equip;
                equipment equipCheck;
                equip_edit_log logentry = new equip_edit_log();
                service_due_parm svcdue = new service_due_parm();

                logentry.user_id = User.Identity.Name;
                logentry.edit_dt = DateTime.Today;
                logentry.equip_id = strEquipID;

                
                if (strOperation == "Edit")
                {
                    equip = db.equipments.Single(e => e.equip_id == strEquipID);

                }
                else   // add
                {
                    if (strEquipID.Length <= 0)
                    {
                        throw new Exception("Invalid ID specified.");
                    }

                    if (strRegBy.Length <= 0)
                    {
                        throw new Exception("No Division specified in Registered By field.");
                    }

                    equip = new equipment();
                    equip.equip_id = strEquipID;
                    equip.assigned = false;


                    equipCheck = db.equipments.SingleOrDefault(e => e.equip_id == equip.equip_id);
                    if (equipCheck != null)
                    {
                        throw new Exception("This ID already exists.");
                    }
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {
                    if (strMilesHours.IndexOf(".") > 0)
                    {
                        throw new Exception("Only whole numbers allowed for Hours/Miles.");
                    }

                    if (strApportioned != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Apportioned", equip.apportioned == true ? "on" : "off", strApportioned, strLogEntry);
                        }
                        equip.apportioned = strApportioned == "on" ? true : false;
                    }

                    if (strComment != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Comment", equip.comment == null ? "" : equip.comment.ToString(), strComment, strLogEntry);
                        }

                        equip.comment = strComment;
                    }

                    Single sngCost;
                    if (strCost != null)
                    {
                        if (Single.TryParse(strCost.Replace("$", ""), out sngCost))
                        {
                            if (strOperation == "Edit")
                            {
                                strLogEntry = CheckEditField("Cost", equip.cost == null ? "0" : equip.cost.ToString(), strCost.Replace("$", ""), strLogEntry);
                            }
                            equip.cost = sngCost;
                        }
                    }

                    Single sngCurrentValue;
                    if (strCurrentValue != null)
                    {
                        if (Single.TryParse(strCurrentValue.Replace("$", ""), out sngCurrentValue))
                        {
                            if (equip.current_value != sngCurrentValue)
                            {
                                equip.current_value_dt = DateTime.Today;
                            }
                            if (strOperation == "Edit")
                            {
                                strLogEntry = CheckEditField("Current Value", equip.current_value.ToString(), strCurrentValue.Replace("$", ""), strLogEntry);
                            }
                            equip.current_value = sngCurrentValue;
                        }
                    }

                    if (strYear != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Year", equip.equip_year == null ? "0" : equip.equip_year.ToString(), strYear, strLogEntry);
                        }
                        equip.equip_year = strYear;
                    }

                    Int16 intFuel;
                    if (Int16.TryParse(strFuel, out intFuel))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Fuel", equip.fuel == null ? "0" : equip.fuel.ToString(), strFuel, strLogEntry);
                        }
                        equip.fuel = intFuel;
                    }

                    Single sngGVW;
                    if (Single.TryParse(strGVW, out sngGVW))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("GVW", equip.gross_v_wt == null ? "0" : equip.gross_v_wt.ToString(), strGVW, strLogEntry);
                        }
                        equip.gross_v_wt = sngGVW;
                    }

                    Single sngGCW;
                    if (Single.TryParse(strGCW, out sngGCW))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("GCW", equip.gross_c_wt == null ? "0" : equip.gross_c_wt.ToString(), strGCW, strLogEntry);
                        }
                        equip.gross_c_wt = sngGCW;
                    }


                    if (strHUTsticker != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("HUT Sticker", equip.hut_sticker == true ? "on" : "off", strHUTsticker, strLogEntry);
                        }
                        equip.hut_sticker = strHUTsticker == "on" ? true : false;
                    }

                    if (strIFTAsticker != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("IFTA Sticker", equip.ifta_sticker == true ? "on" : "off", strIFTAsticker, strLogEntry);
                        }
                        equip.ifta_sticker = strIFTAsticker == "on" ? true : false;
                    }

                    if (strGPS != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("GPS", equip.gps == true ? "on" : "off", strGPS, strLogEntry);
                        }
                        equip.gps = strGPS == "on" ? true : false;
                        if (equip.gps == false)
                        {
                            equip.gps_num = "";
                        }
                    }

                    if (strEZPass != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("EZPASS", equip.ezpass == true ? "on" : "off", strEZPass, strLogEntry);
                        }
                        equip.ezpass = strEZPass == "on" ? true : false;
                        if (equip.ezpass == false)
                        {
                            equip.ezpass_num = "";
                        }
                    }

                    if (strFuelCard != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Fuel Card", equip.fuelcard == true ? "on" : "off", strFuelCard, strLogEntry);
                        }
                        equip.fuelcard = strFuelCard == "on" ? true : false;
                        if(equip.fuelcard == false)
                        {
                            equip.fuelcard_num = "";
                            equip.fuel_card_loc = "";
                        }
                    }

                    if (strGPSNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("GPS Number", equip.gps_num == null ? "" : equip.gps_num.ToString(), strGPSNum, strLogEntry);
                        }
                        equip.gps_num = strGPSNum;
                    }

                    if (strEZPASSNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("EZPASS Number", equip.ezpass_num == null ? "" : equip.ezpass_num.ToString(), strEZPASSNum, strLogEntry);
                        }
                        equip.ezpass_num = strEZPASSNum;
                    }

                    if (strFuelCardNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Fuel Card Number", equip.fuelcard_num == null ? "" : equip.fuelcard_num.ToString(), strFuelCardNum, strLogEntry);
                        }
                        equip.fuelcard_num = strFuelCardNum;
                    }

                    if (strFuelCardLoc != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Fuel Card Location", equip.fuel_card_loc == null ? "" : equip.fuel_card_loc.ToString(), strFuelCardLoc, strLogEntry);
                        }
                        equip.fuel_card_loc = strFuelCardLoc;
                    }

                    if (strUnknown != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Unknown", equip.unknown == true ? "on" : "off", strUnknown, strLogEntry);
                        }
                        equip.unknown = strUnknown == "on" ? true : false;
                    }

                    if (strLeased != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Leased", equip.leased == true ? "on" : "off", strLeased, strLogEntry);
                        }
                        equip.leased = strLeased == "on" ? true : false;
                    }

                    if (strInRepair != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("In Repair", equip.in_repair == true ? "on" : "off", strInRepair, strLogEntry);
                        }
                        equip.in_repair = strInRepair == "on" ? true : false;
                    }

                    if (IsDate(strInspDue))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Inspection Due Dt", equip.insp_due_dt != null ? String.Format("{0:MM/dd/yyyy}", equip.insp_due_dt) : "X", strInspDue, strLogEntry);
                        }
                        equip.insp_due_dt = Convert.ToDateTime(strInspDue);
                    }
                    Int16 intInspRmndr;
                    if (Int16.TryParse(strInspRmdrWks, out intInspRmndr))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Inspection Rmndr Wks", equip.insp_rmdr_wks == null ? "0" : equip.insp_rmdr_wks.ToString(), strInspRmdrWks, strLogEntry);
                        }
                        equip.insp_rmdr_wks = intInspRmndr;
                    }
                    else
                    {
                        //default the value to 4 weeks if not selected and insp date specified
                        if (equip.insp_due_dt != null)
                        {
                            equip.insp_rmdr_wks = 4;
                        }
                    }

                    if (strLojack != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Lojack", equip.lojack == true ? "on" : "off", strLojack, strLogEntry);
                        }
                        equip.lojack = strLojack == "on" ? true : false;
                    }

                    equip.lst_upd_dt = DateTime.Now;

                    Int16 intMake;
                    if (Int16.TryParse(strMake, out intMake))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Make ID", equip.make_id == null ? "0" : equip.make_id.ToString(), strMake, strLogEntry);
                        }
                        equip.make_id = intMake;
                    }

                    if (strMngBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By", equip.managed_by == null ? "" : equip.managed_by.ToString(), strMngBy, strLogEntry);
                        }
                        if (strMngBy != equip.managed_by)
                        {
                            bool blnAddNew = false;

                            manage_by_history mbh;
                            mbh = db.manage_by_histories.OrderByDescending(md => md.mng_by_dt).FirstOrDefault(m => m.epuip_id == strEquipID);
                            if (mbh != null)
                            {
                                if (mbh.mng_by_dt_end == null)
                                {
                                    //in case user forgets to set mng by date
                                    if (Convert.ToDateTime(strMngByDt) == mbh.mng_by_dt)
                                    {
                                        DateTime dt = DateTime.Now;
                                        DateTime dtMN = dt.Date;
                                        mbh.mng_by_dt_end = dtMN;
                                    }
                                    else
                                    {
                                        mbh.mng_by_dt_end = Convert.ToDateTime(strMngByDt);
                                    }

                                    if (strRegBy != strMngBy)
                                    {
                                        blnAddNew = true;
                                    }
                                }
                                else
                                {
                                    blnAddNew = true;
                                }
                            }
                            else
                            {
                                blnAddNew = true;
                            }

                            if (blnAddNew == true)
                            {

                                manage_by_history mbh2 = new manage_by_history();
                                mbh2.epuip_id = equip.equip_id;
                                Single sngMileHrs;
                                if (Single.TryParse(strMilesHours, out sngMileHrs))
                                {
                                    mbh2.miles_hrs = Convert.ToInt32(strMilesHours);
                                }
                                //set start of new to end of old if it exists
                                if (mbh != null)
                                {
                                    mbh2.mng_by_dt = mbh.mng_by_dt_end;
                                }
                                else if (IsDate(strMngByDt))
                                {
                                    mbh2.mng_by_dt = Convert.ToDateTime(strMngByDt);
                                }
                                mbh2.mng_by = strMngBy;
                                mbh2.reg_by = strRegBy;
                                db.manage_by_histories.InsertOnSubmit(mbh2);
                            }

                        }

                        equip.managed_by = strMngBy;
                    }

                    if (IsDate(strMngByDt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By Date", equip.managed_by_dt != null ? String.Format("{0:MM/dd/yyyy}", equip.managed_by_dt) : "X", strMngByDt, strLogEntry);
                        }
                        equip.managed_by_dt = Convert.ToDateTime(strMngByDt);
                    }
                    if (IsDate(strMilesDt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Milage Date", equip.miles_dt != null ? String.Format("{0:MM/dd/yyyy}", equip.miles_dt) : "X", strMilesDt, strLogEntry);
                        }
                        equip.miles_dt = Convert.ToDateTime(strMilesDt);
                    }
                    Single sngMilesHrs;
                    if (Single.TryParse(strMilesHours, out sngMilesHrs))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Miles/Hrs", equip.miles_hours == null ? "0" : equip.miles_hours.ToString(), strMilesHours, strLogEntry);
                        }
                        equip.miles_hours = sngMilesHrs;
                    }

                    Int16 intModel;
                    if (Int16.TryParse(strModel, out intModel))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Model ID", equip.model_id == null ? "0" : equip.model_id.ToString(), strModel, strLogEntry);
                        }
                        equip.model_id = intModel;
                    }

                    if (strRegBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Registered By", equip.registered_by == null ? "" : equip.registered_by.ToString(), strRegBy, strLogEntry);
                        }
                        equip.registered_by = strRegBy;
                    }

                    if (equip.registered_by == null || equip.registered_by.Length <= 0)
                    {
                        throw new Exception("Registered By must be specified.");
                    }

                    Single sngServiceDueNum;
                    if (Single.TryParse(strSvcDueNum, out sngServiceDueNum))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Service Due Num", equip.service_due_num == null ? "0" : equip.service_due_num.ToString(), strSvcDueNum, strLogEntry);
                        }
                        equip.service_due_num = sngServiceDueNum;
                    }
                    else
                    {
                        equip.service_due_num = null;
                    }

                    if (strSold != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Sold", equip.sold == true ? "on" : "off", strSold, strLogEntry);
                            if (equip.sold == false && strSold == "on")
                            {
                                blnObsolete = true;
                            }

                        }
                        equip.sold = strSold == "on" ? true : false;
                    }

                    if (strToBeSold != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("To Be Sold", equip.to_be_sold == true ? "on" : "off", strToBeSold, strLogEntry);

                        }
                        equip.to_be_sold = strToBeSold == "on" ? true : false;
                    }


                    if (strStolen != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Stolen", equip.stolen == true ? "on" : "off", strStolen, strLogEntry);
                            if (equip.stolen == false && strStolen == "on")
                            {
                                blnObsolete = true;
                            }
                        }
                        equip.stolen = strStolen == "on" ? true : false;
                    }

                    if (IsDate(strTagExpDt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Tag Expire Date", equip.tag_expire_dt != null ? String.Format("{0:MM/dd/yyyy}", equip.tag_expire_dt) : "X", strTagExpDt, strLogEntry);
                        }
                        equip.tag_expire_dt = Convert.ToDateTime(strTagExpDt);
                    }

                    Int16 intTagRmndrWks;
                    if (Int16.TryParse(strTagRmndrWks, out intTagRmndrWks))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Tag expire weeks", equip.tag_expire_rmdr_wks == null ? "0" : equip.tag_expire_rmdr_wks.ToString(), strTagRmndrWks, strLogEntry);
                        }
                        equip.tag_expire_rmdr_wks = intTagRmndrWks;
                    }
                    else
                    {
                        //default the value to 4 weeks if not selected and tag expire date specified
                        if (equip.tag_expire_dt != null)
                        {
                            equip.tag_expire_rmdr_wks = 4;
                        }
                    }

                    if (strTagNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Tag Number", equip.tag_num == null ? "" : equip.tag_num.ToString(), strTagNum, strLogEntry);
                        }
                        equip.tag_num = strTagNum;
                    }

                    if (strTagSt != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Tag State", equip.tag_state == null ? "" : equip.tag_state.ToString(), strTagSt, strLogEntry);
                        }
                        equip.tag_state = strTagSt;
                    }

                    if (strTitleNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Title Num", equip.title_num == null ? "" : equip.title_num.ToString(), strTitleNum, strLogEntry);
                        }
                        equip.title_num = strTitleNum;
                    }

                    if (equip.title_num != null && equip.title_num.Length > 0)
                    {
                        equipCheck = db.equipments.SingleOrDefault(e => e.title_num == equip.title_num);
                        if (equipCheck != null)
                        {
                            if (equipCheck.equip_id != equip.equip_id)
                            {
                                throw new Exception("Title already exists for: " + equipCheck.equip_id);
                            }
                        }
                    }

                    if (strTotaled != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Totaled", equip.totaled == true ? "on" : "off", strTotaled, strLogEntry);
                            if (equip.totaled == false && strTotaled == "on")
                            {
                                blnObsolete = true;
                            }
                        }
                        equip.totaled = strTotaled == "on" ? true : false;
                    }

                    Int16 intType;
                    if (Int16.TryParse(strType, out intType))
                    {
                        // good place to get service due warn field
                        svcdue = db.service_due_parms.Single(s => s.type_id == Convert.ToInt32(strType));
                        if (svcdue != null)
                        {
                            if (svcdue.warning_within != null)
                            {
                                equip.service_rmdr_wks = (short)svcdue.warning_within;
                            }
                            else
                            {
                                equip.service_rmdr_wks = 0;
                            }
                        }

                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Type ID", equip.type_id == null ? "" : equip.type_id.ToString(), strType, strLogEntry);
                        }
                        equip.type_id = intType;
                    }

                    Single sngUnlaidenWt;
                    if (Single.TryParse(strUnldnWt, out sngUnlaidenWt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Unlaiden Weight", equip.unlaiden_wt == null ? "0" : equip.unlaiden_wt.ToString(), strUnldnWt, strLogEntry);
                        }
                        equip.unlaiden_wt = sngUnlaidenWt;
                    }

                    if (strOtherAntiTheft != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("OtherAntiTheft", equip.other_antitheft == true ? "on" : "off", strOtherAntiTheft, strLogEntry);
                        }
                        equip.other_antitheft = strOtherAntiTheft == "on" ? true : false;
                    }

                    if (strOtherAntiTheftType != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("OtherAntiTheftType", equip.other_antitheft_type == null ? "" : equip.tag_num.ToString(), strOtherAntiTheftType, strLogEntry);
                        }
                        equip.other_antitheft_type = strOtherAntiTheftType;
                    }

                    if (strVIN != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("VIN", equip.vin_num == null ? "" : equip.vin_num.ToString(), strVIN, strLogEntry);
                        }
                        equip.vin_num = strVIN;
                    }

                    if (equip.vin_num != null && equip.vin_num.Length > 0)
                    {
                        equipCheck = db.equipments.SingleOrDefault(e => e.vin_num == equip.vin_num);
                        if (equipCheck != null)
                        {
                            if (equipCheck.equip_id != equip.equip_id)
                            {
                                throw new Exception("VIN already exists for: " + equipCheck.equip_id);
                            }
                        }
                    }

                    if (strLoc != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Location", equip.work_loc == null ? "" : equip.work_loc.ToString(), strLoc, strLogEntry);
                        }
                        equip.work_loc = strLoc;
                    }

                    if (strOperation == "Add")
                    {
                        strLogEntry = "Record Added.";
                        db.equipments.InsertOnSubmit(equip);
                    }
                }

                if (strLogEntry != "")
                {
                    if (strOperation == "Edit")
                    {
                        logentry.edit_change = "Modified: " + strLogEntry;
                    }
                    else
                    {
                        logentry.edit_change = strLogEntry;
                    }
                    db.equip_edit_logs.InsertOnSubmit(logentry);
                }

                db.SubmitChanges();

                if (blnObsolete == true && Convert.ToString(Session["division"]) == "ULS-PA")
                {
                    db.UpdateObsoleteId(strEquipID);
                }

                return Content("Success" + "," + Session["division"]);

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;

                return Content(strRet + "," + "");
            }
            finally
            {
                db.Dispose();
            }

        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminAssignTo()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strName = Request.Form["txtName"];
            string strDiv = Request.Form["hdnAdminAssignToDiv"];
            string strOperation = Request.Form["hdnAdminAssignToOper"];
            string strID = Request.Form["hdnAdminAssignToID"];
            bool blnActive = Request.Form["chkActive"] == "on" ? true : false;

            try
            {
                assign_to at;

                if (strOperation == "Add")
                {
                    at = new assign_to();
                    at.assign_to1 = strName;
                    at.work_loc = strDiv;
                    at.active_status = blnActive;
                    db.assign_tos.InsertOnSubmit(at);
                }
                else
                {
                    at = db.assign_tos.Single(e => e.assign_to_id == Convert.ToInt32(strID));
                    at.work_loc = strDiv;
                    at.active_status = blnActive;
                }

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminSvc()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strSvcDueAmt = Request.Form["txtSvcDueAmt"];
            string strID = Request.Form["hdnAdminSvcID"];
            string strWarnWithin = Request.Form["txtSvcDueWarn"];

            try
            {
                service_due_parm sdp;

                sdp = db.service_due_parms.Single(e => e.type_id == Convert.ToInt16(strID));
                sdp.service_every = Convert.ToSingle(strSvcDueAmt);
                sdp.warning_within = Convert.ToSingle(strWarnWithin);

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminXferAssignments()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strIDs = Request.Form["hdnEquipXferAssignIds"];
            string strEquipIDs = Request.Form["hdnEquipXferIds"];
            string strRetConds = Request.Form["hdnEquipXferRetCond"];
            string strRetMiles = Request.Form["hdnEquipXferRetMiles"];
            string strRetHours = Request.Form["hdnEquipXferRetHours"];
            string strType = Request.Form["lstFromAssign"];
            string strToAssign = Request.Form["lstToAssign"];
            bool bHasHours = false;
            bool bHasMiles = false;
            float f_miles_hours = 0;

            string strToolAssignIDs = Request.Form["hdnToolXferAssignIds"];
            string strToolIDs = Request.Form["hdnToolXferIds"];
            string strToolRetConds = Request.Form["hdnToolXferRetConds"];

            string strSmallToolIDs = Request.Form["hdnSmallToolXferIds"];
            string strSmallToolRetConds = Request.Form["hdnSmallToolConds"];

            try
            {
                assignment asgn;
                tools_assign toolassgn;
                smalltool smalltool;

                string[] arrAssignIds = {};
                string[] arrEquipIds = {};
                string[] arrRetConds = {};
                string[] arrRetHours = {};
                string[] arrRetMiles = {};

                string[] arrToolAssignIds = {};
                string[] arrToolIds = {};
                string[] arrToolRetConds = {};

                string[] arrSmallToolIds = {};
                string[] arrSmallToolRetConds = {};

                
                if (strToolAssignIDs.Length > 0)
                {
                    arrToolAssignIds = strToolAssignIDs.Split(',');
                }
                if (strToolIDs.Length > 0)
                {
                    arrToolIds = strToolIDs.Split(',');
                }
                if (strToolRetConds.Length > 0)
                {
                    arrToolRetConds = strToolRetConds.Split(',');
                }
                if (strEquipIDs.Length > 0)
                {
                    arrEquipIds = strEquipIDs.Split(',');
                }
                if (strRetConds.Length > 0)
                {
                    arrRetConds = strRetConds.Split(',');
                }
                if (strIDs.Length > 0)
                {
                    arrAssignIds = strIDs.Split(',');
                }
                arrRetHours = strRetHours.Split(',');
                arrRetMiles = strRetMiles.Split(',');

                if (strSmallToolIDs.Length > 0)
                {
                    arrSmallToolIds = strSmallToolIDs.Split(',');
                }
                if (strSmallToolRetConds.Length > 0)
                {
                    arrSmallToolRetConds = strSmallToolRetConds.Split(',');
                }
                int i = 0;
                //equipment
                foreach (string strAssignId in arrAssignIds)
                {
                    asgn = db.assignments.Single(a => a.assign_id == Convert.ToInt32(strAssignId));

                    equipment equip = db.equipments.Single(a => a.equip_id == asgn.equip_id);

                    asgn.return_dt = DateTime.Now;
                    double v;
                    if (Double.TryParse(arrRetHours[i].Trim(), out v))
                    {
                        asgn.ret_hours = (float)Convert.ToDouble(arrRetHours[i]);

                        bHasHours = true;
                    }

                    if (Double.TryParse(arrRetMiles[i].Trim(), out v))
                    {
                        asgn.ret_miles = (float)Convert.ToDouble(arrRetMiles[i]);

                        bHasMiles = true;
                    }

                    asgn.ret_condition_id = Convert.ToInt16(arrRetConds[i]);

                    if (bHasHours && bHasMiles)
                    {
                        if (asgn.ret_hours > asgn.ret_miles)
                        {
                            f_miles_hours = (float)asgn.ret_hours;
                        }
                        else
                        {
                            f_miles_hours = (float)asgn.ret_miles;
                        }
                    }
                    else if (bHasHours)
                    {
                        f_miles_hours = (float)asgn.ret_hours;
                    }
                    else if (bHasMiles)
                    {
                        f_miles_hours = (float)asgn.ret_miles;
                    }

                    if (f_miles_hours > equip.miles_hours)
                    {
                        equip.miles_hours = f_miles_hours;
                        equip.miles_dt = asgn.return_dt;
                    }

                    if (strToAssign != "UNASSIGNED")
                    {
                        assignment newAssignment = new assignment();

                        newAssignment.equip_id = arrEquipIds[i];
                        newAssignment.assigned_dt = DateTime.Now;
                        newAssignment.assigned_to = strToAssign;
                        newAssignment.asgn_condition_id = asgn.ret_condition_id;
                        newAssignment.asgn_hours = asgn.ret_hours;
                        newAssignment.asgn_miles = asgn.ret_miles;

                        db.assignments.InsertOnSubmit(newAssignment);

                        equip.assigned = true;
                    }
                    else
                    {
                        equip.assigned = false;
                    }

                    i++;

                }

                int j = 0;
                //tool
                foreach (string strToolAssignId in arrToolAssignIds)
                {
                    toolassgn = db.tools_assigns.Single(a => a.assign_id == Convert.ToInt32(strToolAssignId));
                    tool toool = db.tools.Single(a => a.tool_id == toolassgn.tool_id);
                   
                    toolassgn.return_dt = DateTime.Now;
                    toolassgn.ret_condition_id = Convert.ToInt16(arrToolRetConds[j]);

                    tools_assign newta = new tools_assign();

                    if (strToAssign != "UNASSIGNED")
                    {
                        newta.tool_id = arrToolIds[j];
                        newta.assigned_dt = DateTime.Now;
                        newta.assigned_to = strToAssign;
                        newta.asgn_condition_id = toolassgn.ret_condition_id;

                        db.tools_assigns.InsertOnSubmit(newta);

                        toool.assigned = true;
                    }
                    else
                    {
                        toool.assigned = false;
                    }

                    j++;
                }

                int k = 0;
                //smalltool
                foreach (string strSmallToolId in arrSmallToolIds)
                {
                    smalltool = db.smalltools.Single(a => a.stID == Convert.ToInt32(strSmallToolId));
                    if (strToAssign == "UNASSIGNED")
                    {
                        smalltool.returned_dt = DateTime.Now;
                    }
                    else
                    {
                        smalltool.Assigned_to = strToAssign;
                        smalltool.Assigned_dt = DateTime.Now;
                        smalltool.returned_dt = null;
                    }

                    smalltool.ConditionId = Convert.ToInt16(arrSmallToolRetConds[k]);

                    k++;
                }

                db.SubmitChanges();

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }
            finally
            {
                db.Dispose();
            }

            return Content(strRet);

        }
    }
}
