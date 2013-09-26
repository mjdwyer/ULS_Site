using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using ULS_Site.Models;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace ULS_Site.Controllers
{
    public class ElectronicsController : Controller
    {
        //
        // GET: /Electronics/

        public ActionResult InvalidUser()
        {
            return View();
        }


        [SessionExpireFilter]
        public ActionResult Electronics(string div)
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
        public ActionResult GridData(string sidx, string sord, int page, int rows, bool _search, string searchField, string searchOper, string searchString)
        {
            Electronics elc = new Electronics();

            int pageIndex = Convert.ToInt32(page) - 1;
            int limit = rows;

            var electronics = elc.GetGridElectronics(sidx, sord, Convert.ToString(Session["division"]), _search, searchField, searchString, searchOper);
            //            int recordCount = eqt.GetToolGridCount(Convert.ToString(Session["division"]));
            //            int totalPages;

            //            if (recordCount > 0)
            //                totalPages = (int)Math.Ceiling((float)recordCount / (float)limit);
            //            else
            //                totalPages = 0;

            string strSearchVal = "";
            string strSearchStolen = "";
            string strSearchUnknown = "";
            string strSearchInRepair = "";
            string strSearchTotaled = "";
            string strSearchRegBy = "";
            string strSearchId = "";

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

                if (searchOper == "eq" && (searchField == "electronics_id" || searchField == "serial_num") && electronics.Count() == 0)
                {
                    vw_ElectronicsGrid elecSearchAll = elc.GetGridSearchAllElectronics(searchField, searchString);
                    if (elecSearchAll != null)
                    {
                        strSearchStolen = Convert.ToString(elecSearchAll.stolen);
                        strSearchUnknown = Convert.ToString(elecSearchAll.unknown);
                        strSearchInRepair = Convert.ToString(elecSearchAll.in_repair);
                        strSearchTotaled = Convert.ToString(elecSearchAll.totaled);
                        strSearchRegBy = elecSearchAll.registered_by;
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
                userdata = new { searchVal = strSearchVal, searchStolen = strSearchStolen, searchUnknown = strSearchUnknown, searchInRepair = strSearchInRepair, searchTotaled = strSearchTotaled, searchRegBy = strSearchRegBy, searchId = strSearchId },
                rows = (from e in electronics
                        select new
                        {
                            id = e.rownum,
                            cell = new string[] {
                    e.electronics_id.TrimEnd().TrimStart(),
                    e.type_desc != null ?  e.type_desc.TrimEnd().TrimStart() :  null,
                    e.make_desc != null ?  e.make_desc.TrimEnd().TrimStart() :  null,
                    e.model_desc != null ?  e.model_desc.TrimEnd().TrimStart() :  null,
                    e.year_pur,
                    e.location,
                    e.registered_by,
                    e.managed_by,
                    String.Format("{0:MM/dd/yyyy}",e.managed_by_dt),
                    e.serial_num,
                    e.air_card_num,
		            Convert.ToString(e.cost),
		            Convert.ToString(e.stolen),
		            Convert.ToString(e.in_repair),
		            Convert.ToString(e.totaled),
                    Convert.ToString(e.unknown),
		            e.comment,
                    e.electronics_loan_color == "SET_PURPLE"  ? (e.registered_by != Convert.ToString(Session["division"])? e.electronics_assign_color: "SET_PURPLE" ): e.electronics_assign_color,
                    e.electronics_assign_color
                    }
                        }).ToArray()
            };
            return Json(dataJson);
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
                string strElectrinicsID = formValues.GetValues("intElectronicsID")[0];

                electronic equip;

                if (strOper == "del")
                {
                    equip = db.electronics.Single(e => e.electronics_id == strElectrinicsID);

                    db.electronics.DeleteOnSubmit(equip);
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



        [SessionExpireFilter]
        public ActionResult GetAssignGridData(string id, string sidx, string sord, int page, int rows)
        {

            Electronics elc = new Electronics();

            var assigns = elc.GetGridElectronicsAssign(sidx, sord, id);

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
                    a.electronics_id,
                    a.assigned_to,
                    String.Format("{0:MM/dd/yyyy}",a.assigned_dt),
                    String.Format("{0:MM/dd/yyyy}",a.return_dt),
                    a.asgn_cond_descr != null ?  a.asgn_cond_descr.TrimEnd().TrimStart() :  null,
                    a.ret_cond_descr != null ?  a.ret_cond_descr.TrimEnd().TrimStart() :  null,
                    a.comment_txt,
                    Convert.ToString(a.assign_id)
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditElectronics()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strOperation = Request.Form["hdnEditOper"];
            string strElectronicsID;

            if (strOperation == "Edit")
            {
                strElectronicsID = Request.Form["hdnEditID"];
            }
            else
            {
                strElectronicsID = Request.Form["txtElectronicsID"];
            }

            string strYear = Request.Form["txtElectronicsYear"];
            string strType = Request.Form["ddlElectronicsType"];
            string strMake = Request.Form["ddlElectronicsMake"];
            string strModel = Request.Form["ddlElectronicsModel"];
            string strLoc = Request.Form["ddlElectronicsLoc"];
            string strMngBy = Request.Form["ddlElectronicsMngBy"];
            string strRegBy = Request.Form["ddlElectronicsRegBy"];
            string strMngByDt = Request.Form["dtElectronicsMngByDt"];
            string strSerialNum = Request.Form["txtElectronicsSerialNum"];
            string strAirCardNum = Request.Form["txtElectronicsAirCardNum"];
            string strCost = Request.Form["txtElectronicsCost"];
            string strStolen = Request.Form["hdnElectronicsStolen"];
            string strInRepair = Request.Form["hdnElectronicsInRepair"];
            string strTotaled = Request.Form["hdnElectronicsTotaled"];
            string strUnknown = Request.Form["hdnElectronicsUnknown"];
            string strComment = Request.Form["txtElectronicsComment"];

            string strLogEntry = "";

            bool blnObsolete = false;

            try
            {
                electronic eltrnc;
                electronic eltrncCheck;
                electronics_edit_log logentry = new electronics_edit_log();

                logentry.user_id = User.Identity.Name;
                logentry.edit_dt = DateTime.Today;
                logentry.electronics_id = strElectronicsID;

                if (strOperation == "Edit")
                {
                    eltrnc = db.electronics.Single(e => e.electronics_id == strElectronicsID);

                }
                else   // add
                {
                    if (strElectronicsID.Length <= 0)
                    {
                        throw new Exception("Invalid ID specified.");
                    }

                    if (strRegBy.Length <= 0)
                    {
                        throw new Exception("No Division specified in Registered By field.");
                    }

                    eltrnc = new electronic();
                    eltrnc.electronics_id = strElectronicsID;
                    eltrnc.assigned = false;


                    eltrncCheck = db.electronics.SingleOrDefault(e => e.electronics_id == eltrnc.electronics_id);
                    if (eltrncCheck != null)
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
                            strLogEntry = CheckEditField("Comment", eltrnc.comment == null ? "" : eltrnc.comment.ToString(), strComment, strLogEntry);
                        }

                        eltrnc.comment = strComment;
                    }

                    Single sngCost;
                    if (strCost != null)
                    {
                        if (Single.TryParse(strCost.Replace("$", ""), out sngCost))
                        {
                            if (strOperation == "Edit")
                            {
                                strLogEntry = CheckEditField("Cost", eltrnc.cost == null ? "0" : eltrnc.cost.ToString(), strCost.Replace("$", ""), strLogEntry);
                            }
                            eltrnc.cost = sngCost;
                        }
                    }

                    if (strYear != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Purchase Year", eltrnc.year_pur == null ? "0" : eltrnc.year_pur.ToString(), strYear, strLogEntry);
                        }
                        eltrnc.year_pur = strYear;
                    }

                    if (strUnknown != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Unknown", eltrnc.unknown == true ? "on" : "off", strUnknown, strLogEntry);
                        }
                        eltrnc.unknown = strUnknown == "on" ? true : false;
                    }

                    if (strInRepair != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("In Repair", eltrnc.in_repair == true ? "on" : "off", strInRepair, strLogEntry);
                        }
                        eltrnc.in_repair = strInRepair == "on" ? true : false;
                    }

                    Int16 intMake;
                    if (Int16.TryParse(strMake, out intMake))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Make ID", eltrnc.make_id == null ? "0" : eltrnc.make_id.ToString(), strMake, strLogEntry);
                        }
                        eltrnc.make_id = intMake;
                    }

                    if (strMngBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By", eltrnc.managed_by == null ? "" : eltrnc.managed_by.ToString(), strMngBy, strLogEntry);
                        }
                        eltrnc.managed_by = strMngBy;
                    }

                    if (IsDate(strMngByDt))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Managed By Date", eltrnc.managed_by_dt != null ? String.Format("{0:MM/dd/yyyy}", eltrnc.managed_by_dt) : "X", strMngByDt, strLogEntry);
                        }
                        eltrnc.managed_by_dt = Convert.ToDateTime(strMngByDt);
                    }

                    Int16 intModel;
                    if (Int16.TryParse(strModel, out intModel))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Model ID", eltrnc.model_id == null ? "0" : eltrnc.model_id.ToString(), strModel, strLogEntry);
                        }
                        eltrnc.model_id = intModel;
                    }

                    if (strRegBy != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Registered By", eltrnc.registered_by == null ? "" : eltrnc.registered_by.ToString(), strRegBy, strLogEntry);
                        }
                        eltrnc.registered_by = strRegBy;
                    }

                    if (eltrnc.registered_by == null || eltrnc.registered_by.Length <= 0)
                    {
                        throw new Exception("Registered By must be specified.");
                    }

                    if (strStolen != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Stolen", eltrnc.stolen == true ? "on" : "off", strStolen, strLogEntry);
                            if (eltrnc.stolen == false && strStolen == "on")
                            {
                                blnObsolete = true;
                            }
                        }
                        eltrnc.stolen = strStolen == "on" ? true : false;
                    }

                    if (strTotaled != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Totaled", eltrnc.totaled == true ? "on" : "off", strTotaled, strLogEntry);
                            if (eltrnc.totaled == false && strTotaled == "on")
                            {
                                blnObsolete = true;
                            }
                        }
                        eltrnc.totaled = strTotaled == "on" ? true : false;
                    }

                    Int16 intType;
                    if (Int16.TryParse(strType, out intType))
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Type ID", eltrnc.type_id == null ? "" : eltrnc.type_id.ToString(), strType, strLogEntry);
                        }
                        eltrnc.type_id = intType;
                    }

                    if (strSerialNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Serial Num", eltrnc.serial_num == null ? "" : eltrnc.serial_num.ToString(), strSerialNum, strLogEntry);
                        }
                        eltrnc.serial_num = strSerialNum;
                    }

                    if (strAirCardNum != null)
                    {
                        if (strOperation == "Edit")
                        {
                            string strNumStripped = System.Text.RegularExpressions.Regex.Replace(strAirCardNum, "\\D", "");
                            strLogEntry = CheckEditField("Air Card Num", eltrnc.air_card_num == null ? "" : eltrnc.air_card_num.ToString(), strAirCardNum, strLogEntry);
                        }
                        eltrnc.air_card_num = strAirCardNum;
                    }

                    if (eltrnc.serial_num != null && eltrnc.serial_num.Length > 0)
                    {
                        eltrncCheck = db.electronics.SingleOrDefault(e => e.serial_num == eltrnc.serial_num);
                        if (eltrncCheck != null)
                        {
                            if (eltrnc.electronics_id != eltrncCheck.electronics_id)
                            {
                                throw new Exception("Serial Number already exists for: " + eltrncCheck.electronics_id);
                            }
                        }
                    }

                    if (strLoc != null)
                    {
                        if (strOperation == "Edit")
                        {
                            strLogEntry = CheckEditField("Location", eltrnc.location == null ? "" : eltrnc.location.ToString(), strLoc, strLogEntry);
                        }
                        eltrnc.location = strLoc;
                    }

                    if (strOperation == "Add")
                    {
                        strLogEntry = "Record Added.";
                        db.electronics.InsertOnSubmit(eltrnc);
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
                    db.electronics_edit_logs.InsertOnSubmit(logentry);
                }

                db.SubmitChanges();

                if (blnObsolete == true && Convert.ToString(Session["division"]) == "ULS-PA")
                {
                    db.UpdateObsoleteId(strElectronicsID);
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

        public ActionResult GetElectronicsEditDlg()
        {

            EquipTrak eqt = new EquipTrak();
            Electronics elctrncs = new Electronics();

            var types = elctrncs.GetElectronicsTypes();
            var makes = elctrncs.GetElectronicsMakes();
            var models = elctrncs.GetElectronicsModels();
            var locs = eqt.GetEquipLocs();
            var divs = eqt.GetEquipDivs();

            ViewData["ElectronicsTypes"] = types;
            ViewData["ElectronicsMakes"] = makes;
            ViewData["ElectronicsModels"] = models;
            ViewData["ElectronicsLocs"] = locs;
            ViewData["ElectronicsDivs"] = divs;

            return PartialView("ElectronicsEditDlg", ViewData);

        }

        public ActionResult GetElectronicsAsgnEditDlg()
        {

            EquipTrak eqt = new EquipTrak();

            var list = eqt.GetEquipAsgnDlgTypes();

            ViewData["AssignToList"] = list;

            return PartialView("ElectronicsAsgnDlgList", ViewData);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditElectronicsAsgn()
        {

            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strElectronicsID = Request.Form["hdnAsgnEditID"];
            string strOperation = Request.Form["hdnAsgnEditOper"];
            string strAsgnDt = Request.Form["dtElectronicsAsgnDt"];
            string strRetDt = Request.Form["dtElectronicsRetDt"];
            string strAsgnCond = Request.Form["ddlAsgnCond"];
            string strRetCond = Request.Form["ddlRetCond"];
            string strAsgndTo = Request.Form["ddlAssignedTo"];
            string strComments = Request.Form["txtElectronicsAsgnComments"];
            string strAsgnID = Request.Form["hdnAsgnID"];

            try
            {
                electronics_assgn electonics_assign;

                electronic elctrnc = db.electronics.Single(a => a.electronics_id == strElectronicsID);

                if (strOperation == "Edit")
                {
                    int intAsgnID = Convert.ToInt32(strAsgnID);
                    electonics_assign = db.electronics_assgns.Single(a => a.assign_id == intAsgnID);
                }
                else   // add
                {
                    electonics_assign = new electronics_assgn();
                    electonics_assign.electronics_id = strElectronicsID;
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {
                    electonics_assign.assigned_to = strAsgndTo;

                    if (IsDate(strAsgnDt))
                    {
                        electonics_assign.assigned_dt = Convert.ToDateTime(strAsgnDt);
                        elctrnc.assigned = true;
                    }
                    if (IsDate(strRetDt))
                    {
                        electonics_assign.return_dt = Convert.ToDateTime(strRetDt);
                        elctrnc.assigned = false;
                    }
                    Int16 intAsignCond;
                    if (Int16.TryParse(strAsgnCond, out intAsignCond))
                    {
                        electonics_assign.asgn_condition_id = intAsignCond;
                    }
                    Int16 intRetCond;
                    if (Int16.TryParse(strRetCond, out intRetCond))
                    {
                        electonics_assign.ret_condition_id = intRetCond;
                    }

                    electonics_assign.comment_txt = strComments;


                    if (strOperation == "Add")
                    {
                        db.electronics_assgns.InsertOnSubmit(electonics_assign);
                    }

                }

                db.SubmitChanges();

                return Content("Success");

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
        public ActionResult GetAdminElectronicsTypes(string sidx, string sord, int page, int rows)
        {
            Electronics elctrncs = new Electronics();

            if (sidx == "id")
            {
                sidx = "type_id";
            }
            else
            {
                sidx = "type_desc";
            }

            var types = elctrncs.GetGridElectronicsTypes(sidx, sord);

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
        public ActionResult GetAdminElectronicsMakes(string sidx, string sord, int page, int rows)
        {
            Electronics elctrncs = new Electronics();

            if (sidx == "id")
            {
                sidx = "make_id";
            }
            else
            {
                sidx = "make_desc";
            }

            var makes = elctrncs.GetGridElectronicsMakes(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from mk in makes
                        select new
                        {
                            id = mk.make_id,
                            cell = new string[] {
                    Convert.ToString(mk.make_id),
                    mk.make_desc
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminElectronicsModels(string sidx, string sord, int page, int rows)
        {
            Electronics elctrncs = new Electronics();

            if (sidx == "id")
            {
                sidx = "model_id";
            }
            else
            {
                sidx = "model_desc";
            }

            var models = elctrncs.GetGridElectronicsModels(sidx, sord);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from md in models
                        select new
                        {
                            id = md.model_id,
                            cell = new string[] {
                    Convert.ToString(md.model_id),
                    md.model_desc
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        public ActionResult GetNextElectronicsTypeId()
        {
            Electronics elctrncs = new Electronics();

            short shtMax = elctrncs.GetMaxElectronicsTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextMakeTypeId()
        {
            Electronics elctrncs = new Electronics();

            short shtMax = elctrncs.GetMaxMakeTypeID();

            return Content((shtMax + 1).ToString());
        }

        public ActionResult GetNextModelTypeId()
        {
            Electronics elctrncs = new Electronics();

            short shtMax = elctrncs.GetMaxModelTypeID();

            return Content((shtMax + 1).ToString());
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
                if (adminType == "AdminElectronicsTypes")
                {
                    electronics_type_avt eta;

                    if (strOperation == "Add")
                    {

                        eta = new electronics_type_avt();
                        eta.type_id = Convert.ToInt16(strID);
                        eta.type_desc = strDescr;


                        db.electronics_type_avts.InsertOnSubmit(eta);

                        strAddType = "YesAddType";

                    }
                    else
                    {
                        eta = db.electronics_type_avts.Single(e => e.type_id == Convert.ToInt16(strID));
                        eta.type_desc = strDescr;
                    }

                }
                else if (adminType == "AdminElectronicsMakes")
                {
                    electronics_make_avt mka;

                    if (strOperation == "Add")
                    {
                        mka = new electronics_make_avt();
                        mka.make_id = Convert.ToInt16(strID);
                        mka.make_desc = strDescr;
                        db.electronics_make_avts.InsertOnSubmit(mka);
                    }
                    else
                    {
                        mka = db.electronics_make_avts.Single(e => e.make_id == Convert.ToInt16(strID));
                        mka.make_desc = strDescr;
                    }
                }
                else if (adminType == "AdminElectronicsModels")
                {
                    electronics_model_avt mda;

                    if (strOperation == "Add")
                    {
                        mda = new electronics_model_avt();
                        mda.model_id = Convert.ToInt16(strID);
                        mda.model_desc = strDescr;
                        db.electronics_model_avts.InsertOnSubmit(mda);
                    }
                    else
                    {
                        mda = db.electronics_model_avts.Single(e => e.model_id == Convert.ToInt16(strID));
                        mda.model_desc = strDescr;
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
        public ActionResult DeleteElectronicsType(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                electronics_type_avt type = db.electronics_type_avts.Single(et => et.type_id == Convert.ToInt32(id));
                db.electronics_type_avts.DeleteOnSubmit(type);
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
        public ActionResult DeleteElectronicsMake(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                electronics_make_avt make = db.electronics_make_avts.Single(et => et.make_id == Convert.ToInt32(id));
                db.electronics_make_avts.DeleteOnSubmit(make);
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
        public ActionResult DeleteElectronicsModel(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                electronics_model_avt models = db.electronics_model_avts.Single(et => et.model_id == Convert.ToInt32(id));
                db.electronics_model_avts.DeleteOnSubmit(models);
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
                    case "ElectronicsAssignedTo":
                        strQueryString = "ElectronicsAssignedTo,GetElectronicsAssignedToReport," + Request.Form["lstAssigned"];
                        break;
                    case "ElectronicsInvByType":
                        strQueryString = "ElectronicsInvByType,GetElectronicsInvByTypeReport," + Session["division"] + "," + Request.Form["lstTypes"];
                        break;
                    case "ElectronicsAirCardInv":
                        strQueryString = "ElectronicsAirCardInv,GetAirCardInvByTypeReport," + Session["division"];
                        break;
                    default:
                        strQueryString = "";
                        break;
                }

                return RedirectToAction("ElectronicsRptViewer", "CrystalRptViewer", new { value1 = strQueryString });

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                //                strRet = "Failure";

                return Content("Failure");
            }


        }

        public ActionResult GetRptDlgTypes()
        {

            Electronics elc = new Electronics();

            var list = elc.GetTypesDlg();

            ViewData["TypesList"] = list;

            return PartialView("RptElectronicsTypes", ViewData);
        }



    }
}
