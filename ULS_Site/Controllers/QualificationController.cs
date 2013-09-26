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
    public class QualificationController : Controller
    {
        //
        // GET: /Qualification/

        public ActionResult Qualification()
        {
            return View();
        }

        public ActionResult InvalidUser()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult GridData(string sidx, string sord, int page, int rows, bool _search, string searchField, string searchOper, string searchString)
        {
            Qualifications qual = new Qualifications();

            int pageIndex = Convert.ToInt32(page) - 1;
            int limit = rows;

            var employees = qual.GetGridEmployees(sidx, sord, _search, searchField, searchString, searchOper);
            //            int recordCount = eqt.GetToolGridCount(Convert.ToString(Session["division"]));
            //            int totalPages;

            //            if (recordCount > 0)
            //                totalPages = (int)Math.Ceiling((float)recordCount / (float)limit);
            //            else
            //                totalPages = 0;

            string strSearchVal = "";

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

            }

            var dataJson = new
            {

                total = 10000,
                page = 1,
                records = 10000,
                //                total = totalPages,
                //                page = page,
                //                records = recordCount,
                rows = (from e in employees
                        select new
                        {
                            id = e.employeeID,
                            cell = new string[] {
                    e.lname.TrimEnd().TrimStart(),
                    e.fname != null ?  e.fname.TrimEnd().TrimStart() :  null,
                    e.mname != null ?  e.mname.TrimEnd().TrimStart() :  null,
                    e.suffix != null ?  e.suffix.TrimEnd().TrimStart() :  null,
                    e.empId,
                    Convert.ToString(e.empStatus),
                    e.oparea,
                    e.oqId,
                    e.comment,
                    e.ssn,
                    e.address1,
                    e.address2,
                    e.city,
                    e.state,
                    e.zip,
                    e.email,
		            Convert.ToString(e.employeeID),
                    e.homephone,
                    e.cellphone,
                    Convert.ToString(e.payRate),
                    e.jobClass,
                    e.oparea,
                    String.Format("{0:MM/dd/yyyy}",e.MVRcheckDt),
                    String.Format("{0:MM/dd/yyyy}",e.CBGcheckDt),
                    String.Format("{0:MM/dd/yyyy}",e.DandAcheckDt),
                    Convert.ToString(e.DandAresult),
                    String.Format("{0:MM/dd/yyyy}",e.birthDate),
                    e.DLnum,
                    e.DLstate,
                    Convert.ToString(e.DLclass),
                    String.Format("{0:MM/dd/yyyy}",e.DLexpDate),
                    String.Format("{0:MM/dd/yyyy}",e.medicalCardExpDt)
                    }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetQualificationGridData(string id, string sidx, string sord, int page, int rows)
        {
            Qualifications qual = new Qualifications();

            int pageIndex = Convert.ToInt32(page) - 1;
            int limit = rows;

            var quals = qual.GetGridQualifications(sidx, sord, id);

            var dataJson = new
            {

                total = 10000,
                page = 1,
                records = 10000,
                //                total = totalPages,
                //                page = page,
                //                records = recordCount,
                rows = (from q in quals
                        select new
                        {
                            id = q.rownum,
                            cell = new string[] {
                    q.qualId,
                    q.qualDesc,
                    q.qualCompany,
                    String.Format("{0:MM/dd/yyyy}",q.qualDate),
                    String.Format("{0:MM/dd/yyyy}",q.qualExpire),
                    q.evaluator,
                    q.expire_warn,
                    Convert.ToString(q.employeeId)
                    }
                        }).ToArray()
            };
            return Json(dataJson);
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
            Qualifications qual = new Qualifications();

            int intQualCnt = 0;

            try
            {
                string strOper = formValues.GetValues("oper")[0];
                string strEmployeeID = formValues.GetValues("intEmployeeID")[0];

                employee emp;

                if (strOper == "del")
                {
                    intQualCnt = qual.GetQualCount(strEmployeeID);

                    if (intQualCnt == 0)
                    {

                        emp = db.employees.Single(e => e.employeeID == Convert.ToInt32(strEmployeeID));

                        db.employees.DeleteOnSubmit(emp);

                        db.SubmitChanges();
                    }
                }

                if (intQualCnt == 0)
                {
                    return Content("Success");
                }
                else
                {
                    return Content("Failure to delete- make sure qualifications for this employee are deleted first!");
                }

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content(strErr);
            }
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditQual(Nullable<int> id, FormCollection formValues)
        {
            // this method used just for delete now
            uls_dbDataContext db = new uls_dbDataContext();
            Qualifications qual = new Qualifications();

            try
            {

                string strOper = formValues.GetValues("oper")[0];

//                string[] strParms = formValues.GetValues("strData")[0].Split('|');

//                string strEmployeeID = strParms[0];
//                string strQualID = strParms[1];

                string strEmployeeID = formValues.GetValues("intEmployeeID")[0];
                string strQualID = formValues.GetValues("strQualID")[0];

                empQual empQ;

                if (strOper == "del")
                {

                    string[] arrQualids;

                    arrQualids = strQualID.Split(',');

                    foreach (string strQid in arrQualids)
                    {
                        empQ = db.empQuals.Single(e => e.employeeId == Convert.ToInt32(strEmployeeID) && e.qualId == strQid);

                        db.empQuals.DeleteOnSubmit(empQ);

                    }

                    db.SubmitChanges();
                }

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
        public ActionResult EditEmp(Nullable<int> id, FormCollection formValues)
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strEmployeeID = Request.Form["hdnEditID"];
            string strOperation = Request.Form["hdnEditOper"];
            string strEmpID = Request.Form["txtEmpID"];
            string strSSN = Request.Form["txtSSN"];
            string strStatus = Request.Form["ddlStatus"];
            string strLName = Request.Form["txtLName"];
            string strMName = Request.Form["txtMName"];
            string strFName = Request.Form["txtFName"];
            string strSuffix = Request.Form["txtSuffix"];
            string strAddress1 = Request.Form["txtAddress1"];
            string strAddress2 = Request.Form["txtAddress2"];
            string strCity = Request.Form["txtCity"];
            string strState = Request.Form["ddlState"];
            string strZip = Request.Form["txtZip"];
            string strEmail = "";
            string strComments = Request.Form["txtEmpComment"];
            string strOQid = Request.Form["txtOqid"];
            string strHomePhone = Request.Form["txtHomePhone"];
            string strCellPhone = Request.Form["txtCellPhone"];
            string strPayRate = "";
            string strMVRcheckDt = Request.Form["dtMVRcheckDt"];
            string strCBGcheckDt = Request.Form["dtCBGcheckDt"];
            string strDandAcheckDt = Request.Form["dtDandAcheckDt"];
            string strJobClass = Request.Form["ddlJobClass"];
            string strOpArea = Request.Form["ddlOpAreas"];
            string strResult = Request.Form["ddlResult"];
            string strBirthDt = Request.Form["dtBirthDate"];
            string strMedCrdExpDt = Request.Form["dtMedCrdExpDt"];
            string strDLNum = Request.Form["txtDLNum"];
            string strDLState = Request.Form["ddlDLState"];
            string strDLClass = Request.Form["ddlDLClass"];
            string strDLExpDt = Request.Form["dtDLExpDt"];


            try
            {

                employee employee;

                if (strOperation == "Edit")
                {
                    int intEmployeeID = Convert.ToInt32(strEmployeeID);
                    employee = db.employees.Single(e => e.employeeID == intEmployeeID);
                }
                else   // add
                {
                    employee = new employee();
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {

                    employee.address1 = strAddress1;
                    employee.address2 = strAddress2;
                    employee.city = strCity;
                    employee.email = strEmail;
                    employee.empId = strEmpID;
                    employee.comment = strComments;
                    employee.empStatus = Convert.ToChar(strStatus);
                    employee.fname = strFName;
                    employee.mname = strMName;
                    employee.lname = strLName;
                    employee.oqId = strOQid;
                    employee.ssn= strSSN;
                    employee.state = strState;
                    employee.suffix = strSuffix;
                    employee.zip = strZip;
                    employee.homephone = strHomePhone;
                    employee.cellphone = strCellPhone;
                    employee.DLnum = strDLNum;
                    employee.DLstate = strDLState;

                    //Decimal decPayRate;

                    //if (Decimal.TryParse(strPayRate.Replace("$", ""), out decPayRate))
                    //{
                    //    employee.payRate = decPayRate;
                    //}

                    if (IsDate(strMVRcheckDt))
                    {
                        employee.MVRcheckDt = Convert.ToDateTime(strMVRcheckDt);
                    }

                    if (IsDate(strCBGcheckDt))
                    {
                        employee.CBGcheckDt = Convert.ToDateTime(strCBGcheckDt);
                    }

                    if (IsDate(strDandAcheckDt))
                    {
                        employee.DandAcheckDt = Convert.ToDateTime(strDandAcheckDt);
                    }

                    if (IsDate(strDLExpDt))
                    {
                        employee.DLexpDate = Convert.ToDateTime(strDLExpDt);
                    }

                    if (IsDate(strBirthDt))
                    {
                        employee.birthDate = Convert.ToDateTime(strBirthDt);
                    }

                    if (IsDate(strMedCrdExpDt))
                    {
                        employee.medicalCardExpDt = Convert.ToDateTime(strMedCrdExpDt);
                    }

                    employee.jobClass = strJobClass;
                    employee.oparea = strOpArea;
                    if (strResult != "")
                    {
                        employee.DandAresult = Convert.ToChar(strResult);
                    }

                    if (strDLClass != "")
                    {
                        employee.DLclass = Convert.ToChar(strDLClass);
                    }

                    if (strOperation == "Add")
                    {
                        db.employees.InsertOnSubmit(employee);
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
        public ActionResult GetAdminQualifications(string sidx, string sord, int page, int rows)
        {
            Qualifications qual = new Qualifications();

            var quals = qual.GetGridQualAdmin();

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from q in quals
                        select new
                        {
                            id = q.rownum,
                            cell = new string[] {
                    q.qualID,
                    q.qualDesc,
                    q.qualCompany
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        [SessionExpireFilter]
        public ActionResult GetAdminEmailNotification(string sidx, string sord, int page, int rows)
        {
            Qualifications qual = new Qualifications();

            var quals = qual.GetGridAdminEmail();

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from q in quals
                        select new
                        {
                            id = q.id,
                            cell = new string[] {
                    q.email,
                    Convert.ToString(q.id)
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }


        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditQualDlg(Nullable<int> id, FormCollection formValues)
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strEmployeeID = Request.Form["hdnEditQualEmpID"];
            string strOperation = Request.Form["hdnEditEmpQualOper"];
            string strQualIDs = Request.Form["hdnEditQualIDs"];

            string strTestDate = Request.Form["dtTestDt"];
            string strExpireDate = Request.Form["dtExpireDt"];

            string strEvaluator = Request.Form["txtEvaluator"];

            try
            {
                empQual empQ;

                int intEmployeeID = Convert.ToInt32(strEmployeeID);

                if (strOperation == "Edit")
                {

                    string[] arrQualids;

                    arrQualids = strQualIDs.Split(',');

                    foreach (string strQualid in arrQualids)
                    {
                        empQ = db.empQuals.Single(e => e.employeeId == intEmployeeID && e.qualId == strQualid);

                        if (IsDate(strTestDate))
                        {
                            empQ.qualDate = Convert.ToDateTime(strTestDate);
                        }
                        if (IsDate(strExpireDate))
                        {
                            empQ.qualExpire = Convert.ToDateTime(strExpireDate);
                        }

                        empQ.evaluator = strEvaluator;

                    }

                    db.SubmitChanges();

                }
                else   // add
                {
                    empQ = new empQual();
                    string strCompany = Request.Form["ddlCompany"];
                    empQ.qualCompany = strCompany;
                    string strQualCd = Request.Form["ddlQualCodes"];
                    empQ.qualId = strQualCd;
                    empQ.employeeId = Convert.ToInt32(strEmployeeID);
                    db.empQuals.InsertOnSubmit(empQ);
                    db.SubmitChanges();
                }

                return Content("Success");

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                if (msg.IndexOf("PRIMARY") > 0)
                {
                    strRet = "Cannot add record. This qualification for this employee already exists!";
                }
                else
                {
                    strRet = msg;
                }

                return Content(strRet);
            }
            finally
            {
                db.Dispose();
            }

        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult EditQualDlgX(int[]ids, FormCollection formValues)
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strEmployeeID = Request.Form["hdnEditQualEmpID"];
            string strOperation = Request.Form["hdnEditEmpQualOper"];
            string strQualID = Request.Form["hdnEditQualID"];

            string strTestDate = Request.Form["dtTestDt"];
            string strExpireDate = Request.Form["dtExpireDt"];

            string strEvaluator = Request.Form["txtEvaluator"];

            foreach (int id in ids)
            {
            }


            try
            {
                empQual empQ;

                if (strOperation == "Edit")
                {
                    int intEmployeeID = Convert.ToInt32(strEmployeeID);
                    empQ = db.empQuals.Single(e => e.employeeId == intEmployeeID && e.qualId == strQualID);
                }
                else   // add
                {
                    empQ = new empQual();
                    string strCompany = Request.Form["ddlCompany"];
                    empQ.qualCompany = strCompany;
                    string strQualCd = Request.Form["ddlQualCodes"];
                    empQ.qualId = strQualCd;
                    empQ.employeeId = Convert.ToInt32(strEmployeeID);
                }
                if (strOperation == "Edit" || strOperation == "Add")
                {

                    if (IsDate(strTestDate))
                    {
                        empQ.qualDate = Convert.ToDateTime(strTestDate);
                    }
                    if (IsDate(strExpireDate))
                    {
                        empQ.qualExpire = Convert.ToDateTime(strExpireDate);
                    }

                    empQ.evaluator = strEvaluator;

                    if (strOperation == "Add")
                    {
                        db.empQuals.InsertOnSubmit(empQ);
                    }

                }

                db.SubmitChanges();

                return Content("Success");

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                if (msg.IndexOf("PRIMARY") > 0)
                {
                    strRet = "Cannot add record. This qualification for this employee already exists!";
                }
                else
                {
                    strRet = msg;
                }

                return Content(strRet);
            }
            finally
            {
                db.Dispose();
            }

        }

        public ActionResult GetEmployeeEditDlg()
        {

            Qualifications q = new Qualifications();

            var jobClasses = q.GetJobClass();

            List<SelectListItem> opArea = new List<SelectListItem>(new[]{
                new SelectListItem{ Text="", Value="NONE"},
                new SelectListItem{ Text="GW", Value="GW"},
                new SelectListItem{ Text="Pipeline", Value="PL"},
                new SelectListItem{ Text="ULS", Value="ULS"},
                });


            ViewData["JobClasses"] = jobClasses;
            ViewData["OpAreas"] = opArea;

            return PartialView("EmployeeEditDlg", ViewData);

        }

        public ActionResult GetQualEditDlg(string strCompany)
        {

            Qualifications q = new Qualifications();

            var qualDesc = q.GetQualDescriptions(strCompany);
            var qualCodes = q.GetQualCodes(strCompany);

            ViewData["QualDescr"] = qualDesc;
            ViewData["QualCodes"] = qualCodes;

            return PartialView("QualEditDlg", ViewData);

        }

        public ActionResult GetEmpWarnRecogDates(string id, string type)
        {

            Qualifications q = new Qualifications();

            var qualWRDates = q.GetQualEmpWarnRecogs(id, type);

            ViewData["EmpWarnRecogDates"] = qualWRDates;

            return PartialView("QualEmpWarnRecogDates", ViewData);

        }

        public ActionResult GetEmpWRComment(string id, string type, string date)
        {

            Qualifications q = new Qualifications();

            var comment = q.GetQualEmpWarnComment(id, type, date);

            return Content(comment);

        }

        public ActionResult GetCertRptDlg()
        {

            Qualifications q = new Qualifications();

            var qualEmps = q.GetEmployees();

            ViewData["Employees"] = qualEmps;

            return PartialView("QualEmployees", ViewData);

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
                    case "EmployeeListByCertification":
                        strQueryString = "EmployeeListByCertification,GetEmployeeListByCertification," + Request.Form["ddlRptCompany"] + "," + Request.Form["ddlQualCodes"];
                        break;
                    case "EmployeeListByCompany":
                        strQueryString = "EmployeeListByCompany,GetEmployeeListByCompany," + Request.Form["ddlRptCompany"];
                        break;
                    case "CertListByEmployee":
                        strQueryString = "CertListByEmployee,GetCertListByEmployee," + Request.Form["ddlEmployees"];
                        break;
                    case "EmployeeListExpiredCerts":
                        strQueryString = "EmpListExpiredCerts,GetExpiredCertEmployeeList";
                        break;
                    case "EmployeeListDueToExpireCerts":
                        strQueryString = "EmpListDueToExpire90Days,Get90daysAndLessToExpireCertEmployeeList";
                        break;
                    default:
                        strQueryString = "";
                        break;
                }

                return RedirectToAction("QualificationRptViewer", "CrystalRptViewer", new { value1 = strQueryString });

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                return Content("Failure");
            }
        }
        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdmin()
        {
            string strRet;

            uls_dbDataContext db = new uls_dbDataContext();

            string adminType = Request.Form["hdnAdminType"];
            string strID;
            string strDescr = Request.Form["txtDescription"];
            string strCompany = Request.Form["ddlAdminCompany"];
            string strOperation = Request.Form["hdnAdminOper"];

            try
            {
                if (adminType == "AdminCertifications")
                {
                    qualification qual;

                    if (strOperation == "Add")
                    {
                        strID = Request.Form["txtID"];

                        qual = new qualification();
                        qual.qualID = strID;
                        qual.qualDesc = strDescr;
                        qual.qualCompany = strCompany;


                        db.qualifications.InsertOnSubmit(qual);

                    }
                    else
                    {
                        strID = Request.Form["hdnAdminID"];
                        qual = db.qualifications.Single(q => q.qualID == strID);
                        qual.qualDesc = strDescr;
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

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveEmailAdmin()
        {
            string strRet;

            uls_dbDataContext db = new uls_dbDataContext();

            string adminType = Request.Form["hdnEmailAdminType"];
            string strEmail = Request.Form["txtAdminEmail"];
            string strOperation = Request.Form["hdnEmailAdminOper"];

            try
            {
                if (adminType == "AdminEmailNotifications")
                {
                    qual_notification qual;

                    if (strOperation == "Add")
                    {
                        qual = new qual_notification();
                        qual.email = strEmail;

                        db.qual_notifications.InsertOnSubmit(qual);

                    }
                    else
                    {
                        string strId = Request.Form["hdnEmailAdminID"];
                        qual = db.qual_notifications.Single(q => q.id == Convert.ToInt32(strId));
                        qual.email = strEmail;
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

            return Content(strRet);
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveWRAdmin()
        {
            string strRet;

            uls_dbDataContext db = new uls_dbDataContext();

            string strWRComment = Request.Form["txtWarnComments"];
            string strOperation = Request.Form["hdnWROper"];
            string strType = Request.Form["hdnWRType"];
            string strDate = Request.Form["dtWarning"];
            string strEmpID = Request.Form["hdnWREmpID"];

            try
            {
                empWarnRecognition eWR;

                if (strOperation == "Add")
                {
                    eWR = new empWarnRecognition();
                    eWR.empQualWarnRecogDate = Convert.ToDateTime(strDate);
                    eWR.comment = strWRComment;
                    eWR.employeeID = Convert.ToInt32(strEmpID);
                    eWR.empWarnRecogFlg = Convert.ToChar(strType);


                    db.empWarnRecognitions.InsertOnSubmit(eWR);

                }
                else
                {
                    string strId = Request.Form["hdnEmailAdminID"];

                    eWR = db.empWarnRecognitions.Single(w => w.employeeID == Convert.ToInt32(strEmpID) && w.empQualWarnRecogDate == Convert.ToDateTime(strDate) && w.empWarnRecogFlg == Convert.ToChar(strType));

                    eWR.comment = strWRComment;

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
        public ActionResult DeleteAdminQual(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                qualification qual = db.qualifications.Single(q => q.qualID == id);
                db.qualifications.DeleteOnSubmit(qual);
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
        public ActionResult DeleteAdminEmail(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                qual_notification qual = db.qual_notifications.Single(q => q.id == Convert.ToInt32(id));
                db.qual_notifications.DeleteOnSubmit(qual);
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
        public ActionResult DeleteWR(string id, string type, string date)
        {

            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                empWarnRecognition eWR = db.empWarnRecognitions.Single(w => w.employeeID == Convert.ToInt32(id) && w.empQualWarnRecogDate == Convert.ToDateTime(date) && w.empWarnRecogFlg == Convert.ToChar(type));

                db.empWarnRecognitions.DeleteOnSubmit(eWR);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEX = ex.Message;

                strRet = "Failure";
            }

            return Content(strRet);
        }

    }
}
