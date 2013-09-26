using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using ULS_Site.Models;
using System.Text.RegularExpressions;
using System.Net.Mail;
using System.Net;
using System.Configuration;

namespace ULS_Site.Controllers
{
    public class ServiceController : Controller
    {
        //
        // GET: /Service/

        public ActionResult Index()
        {
            uls_dbDataContext db = new uls_dbDataContext();
            svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);

            ViewData["ContactName"] = sc.contact_name;
            ViewData["ContactPhone"] = sc.contact_number;
            ViewData["ContactEmail"] = sc.contact_email;

            Session["SaveResultMsg"] = "";
            Session["SaveResultName"] = "";

            if (Session["emailVal"] == null)
            {
                ViewData["emailVal"] = "Yes";
            }
            else
            {
                ViewData["emailVal"] = Session["emailVal"];
            }

            return View();
        }

        public ActionResult ReSchedPhone()
        {
            ViewData["ReschedHomePhone"] = Session["ReschedHomePhone"];
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GoToAddSvcPage()
        {
            Session["emailVal"] = "No";
            return RedirectToAction("Index");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AddPastService()
        {
            Session["PastServiceDate"] = Request.Form["dtPastSvcDt"];
            return RedirectToAction("Index");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteService(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                svc_appointment svc = db.svc_appointments.Single(s => s.svc_id == Convert.ToInt32(id));

                svc_schedule_day svcd = db.svc_schedule_days.Single(d => d.svc_sched_dt == Convert.ToDateTime(svc.svc_date));

                svcd.cur_svcs_sched = svcd.cur_svcs_sched > 0 ? svcd.cur_svcs_sched - 1 : 0;

                db.svc_appointments.DeleteOnSubmit(svc);
                db.SubmitChanges();
                strRet = "Success";
            }
            catch (Exception ex)
            {

                strRet = "Failure: " + ex.Message;
            }

            return Content(strRet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GoToReschedSvcPage()
        {
            string strHomePhone = Request.Form["hdnPhone"];

            string strHomePhoneStripped = strHomePhone.Replace("-", "");

            string strHomePhoneFormatted = System.Text.RegularExpressions.Regex.Replace(strHomePhoneStripped, "\\D", "");

            Session["ReschedHomePhone"] = strHomePhoneFormatted;

            return RedirectToAction("ReSchedPhone");
        }


        public ActionResult ReSchedPhoneSave()
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strDay;
            string strDate;
            string strSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            List<string> availDts = new List<string>();

            string strHomePhone = System.Text.RegularExpressions.Regex.Replace(Request.Form["txtHomePhone"], "\\D", "");

            try
            {
                svc_appointment sa = db.svc_appointments.SingleOrDefault(a => a.home_phone == strHomePhone && a.svc_date > DateTime.Now);

                if (sa == null)
                {
                    svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);

                    string strName = sc.contact_name;
                    string strPhone = sc.contact_number;
                    string strEmail = sc.contact_email;


                    throw new Exception("The phone number supplied is not on record as having a scheduled service. If you feel this message " +
                                "is in error please call or email " + strName + " (" + strEmail + ")" + " at " + strPhone + ".");
                }


                Session["txtHomePhone"] = strHomePhone;
                Session["txtCity"] = sa.city;
                Session["txtEmail"] =sa.email;
                Session["FName"] = sa.first_name;
                Session["LName"] = sa.last_name;
                Session["txtHomePhone"] = sa.home_phone;
                Session["txtOtherPhone"] = sa.other_phone;
                Session["ddlState"] = sa.state;
                Session["txtAddress"] = sa.street_address;
                Session["txtZip"] = sa.zip;
                Session["txtNotes"] = sa.comments;

                IEnumerable<DateTime> availDates = db.GetAvailSvcDates();


                foreach (DateTime dt in availDates)
                {
                    if (dt > DateTime.Now.AddDays(3))
                    {
                        strDay = String.Format("{0:ddd}", dt).ToUpper();
                        strDate = String.Format("{0:MM/dd/yyyy}", dt);
                        availDts.Add(strDay + Server.HtmlDecode(strSpaces) + strDate);
                    }
                }

                Session["ReSchedule"] = "Yes";

                ViewData["AvailableDates"] = new SelectList(availDts);

                return RedirectToAction("SelectSvcDate");

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                Session["SaveResultMsg"] = msg;
                Session["SaveResultName"] = "Sorry!";

                Session["ShowReturnLink"] = "Yes";

                return RedirectToAction("SvcDateResult");
            }

        }

        public ActionResult SaveAddress()
        {
            Session["LName"] = Request.Form["txtLname"];
            Session["FName"] = Request.Form["txtFname"];
            Session["txtAddress"] = Request.Form["txtAddress"];
            Session["txtCity"] = Request.Form["txtCity"];
            Session["ddlState"] = Request.Form["ddlState"];
            Session["txtZip"] = Request.Form["txtZip"];
            Session["txtHomePhone"] = System.Text.RegularExpressions.Regex.Replace(Request.Form["txtHomePhone"], "\\D", "");
            Session["txtOtherPhone"] = System.Text.RegularExpressions.Regex.Replace(Request.Form["txtOtherPhone"], "\\D", "");
            Session["txtEmail"] = Request.Form["txtEmail"];
            Session["txtNotes"] = Request.Form["txtNotes"];

            Session["ReSchedule"] = "No";

            return RedirectToAction("SelectSvcDate");
        }

        public ActionResult SelectSvcDate()
        {
            string strPastDate = "";
            string strDay = "";
            string strDate = "";
            string strSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            List<string> availDts = new List<string>();

            uls_dbDataContext ulsdb_dc = new uls_dbDataContext();

            if (Session["PastServiceDate"] != null)
            {
                strPastDate = Convert.ToString(Session["PastServiceDate"]);
                DateTime pastDt = Convert.ToDateTime(strPastDate);
                strDay = String.Format("{0:ddd}", pastDt).ToUpper();
            }

            if (strPastDate.Length > 0)
            {
                availDts.Add(strDay + Server.HtmlDecode(strSpaces) + strPastDate);

            }
            else
            {
                IEnumerable<DateTime> availDates = ulsdb_dc.GetAvailSvcDates();

                foreach (DateTime dt in availDates)
                {
                    strDay = String.Format("{0:ddd}", dt).ToUpper();
                    strDate = String.Format("{0:MM/dd/yyyy}", dt);
                    availDts.Add(strDay + Server.HtmlDecode(strSpaces) + strDate);
                }
            }



            ViewData["AvailableDates"] = new SelectList(availDts);
            ViewData["SaveResultMsg"] = Session["SaveResultMsg"];

            svc_contact sc = ulsdb_dc.svc_contacts.Single(s => s.contact_id == 1);

            ViewData["ContactName"] = sc.contact_name;
            ViewData["ContactPhone"] = sc.contact_number;
            ViewData["ContactEmail"] = sc.contact_email;
            ViewData["NotifyEmail1"] = sc.notify1_email;
            ViewData["NotifyEmail2"] = sc.notify2_email;
            ViewData["NotifyEmail3"] = sc.notify3_email;

            return View();
        }

        [SessionExpireFilter]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveDate()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strDateForm = Request.Form["AvailableDates"];

            string strDate = strDateForm.Substring(4).Trim();

            string strDateFormatted = strDateForm.Substring(0, 3) + ", " + strDate;

            string resched = Convert.ToString(Session["ReSchedule"]);

            
            try
            {

                svc_schedule_day ssa = db.svc_schedule_days.SingleOrDefault(s => s.svc_sched_dt == Convert.ToDateTime(strDate));

                if (ssa.cur_svcs_sched >= ssa.tot_crews)
                {
                    Session["SaveResultName"] = "Sorry " + Session["FName"] + " " + Session["LName"] + "!";
                    throw new Exception(strDateFormatted + " is no longer available. Please select another date.");

                }

                svc_appointment sa2 = db.svc_appointments.SingleOrDefault(a => a.home_phone == Convert.ToString(Session["txtHomePhone"]) && a.svc_date > DateTime.Now);

                if (sa2 != null && resched == "No")
                {
                    svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);

                    string strName = sc.contact_name;
                    string strPhone = sc.contact_number;
                    string strEmail = sc.contact_email;

                    Session["SaveResultName"] = "Sorry " + Session["FName"] + " " + Session["LName"] + "!";
                    throw new Exception("You were already scheduled for service. Your service day is currently set for " + String.Format("{0:MM/dd/yyyy}", sa2.svc_date) +
                     ". + If you need to reschedule please call or email " + strName + " (" + strEmail + ")" + " at " + strPhone + " or return to the Save Contact Page and click the Reschedule link.");
                }


                if (resched == "Yes")
                {
                    svc_schedule_day ssa2 = db.svc_schedule_days.SingleOrDefault(s => s.svc_sched_dt == sa2.svc_date);
                    ssa2.cur_svcs_sched = ssa2.cur_svcs_sched - 1;
                }

                if (resched == "Yes")
                {
                    Session["SaveResultName"] = "Sorry " + Session["FName"] + " " + Session["LName"] + "!";
                    throw new Exception("To reschedule an appointment you must supply ahome telephone number when entering contact info.");
                }

                svc_appointment sa = new svc_appointment();

                IEnumerable<int> crewNums = db.GetCrewNums(Convert.ToDateTime(strDate));

                bool bHit = false;
                int ourCrew =0;

                for (int i = 1; i <= ssa.tot_crews; i++)
                {
                    foreach (int crew in crewNums)
                    {
                        if (i == crew)
                        {
                            bHit = true;
                        }
                    }

                    if (bHit == false)
                    {
                        ourCrew = i;
                        break;
                    }

                    bHit = false;
                }


                sa.city = Convert.ToString(Session["txtCity"]);
                sa.crew = ourCrew;
                sa.email = Convert.ToString(Session["txtEmail"]);
                sa.first_name = Convert.ToString(Session["FName"]);
                sa.last_name = Convert.ToString(Session["LName"]);
                sa.home_phone = Convert.ToString(Session["txtHomePhone"]);
                sa.other_phone = Convert.ToString(Session["txtOtherPhone"]);
                sa.state = Convert.ToString(Session["ddlState"]);
                sa.street_address = Convert.ToString(Session["txtAddress"]);
                sa.svc_date = Convert.ToDateTime(strDate);
                sa.zip = Convert.ToString(Session["txtZip"]);
                sa.comments = Convert.ToString(Session["txtNotes"]);

                int intForemanID = db.GetForemanID(ourCrew);

                sa.foreman_id = intForemanID;

                db.svc_appointments.InsertOnSubmit(sa);

                ssa.cur_svcs_sched = crewNums.Count() + 1;

                if (resched == "Yes")
                {
                    db.svc_appointments.DeleteOnSubmit(sa2);
                    sa.reschedule = true;
                }
                else
                {
                    sa.reschedule = false;
                }

                db.SubmitChanges();

                strRet = "Thanks " + Session["FName"] + " " + Session["LName"] + "!";

                Session["SaveResultName"] = strRet;

                Session["SaveResultMsg"] = "Your service renewal on " + strDateFormatted + " has been successfully scheduled. You will receive an email reminder the day before your service date.";

                Session["ShowReturnLink"] = "No";

                SendEmailNofication(strDate);

               return RedirectToAction("SvcDateResult");
            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                Session["SaveResultMsg"] = msg;

                if (msg.Contains("available"))
                {
                    return RedirectToAction("SelectSvcDate");
                }
                else
                {
                    Session["ShowReturnLink"] = "Yes";

                    return RedirectToAction("SvcDateResult");

                }

            }
            finally
            {
                db.Dispose();
            }

        }

        public ActionResult SvcDateResult()
        {
            ViewData["ShowReturnLink"] = Session["ShowReturnLink"];

            ViewData["SaveResultMsg"] = Session["SaveResultMsg"];
            ViewData["SaveResultName"] = Session["SaveResultName"];
            return View();
        }

        public ActionResult SvcAdmin()
        {

            uls_dbDataContext db = new uls_dbDataContext();
            svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);

            ViewData["ContactName"] = sc.contact_name;
            ViewData["ContactPhone"] = sc.contact_number;
            ViewData["ContactEmail"] = sc.contact_email;
            ViewData["NotifyEmail1"] = sc.notify1_email;
            ViewData["NotifyEmail2"] = sc.notify2_email;
            ViewData["NotifyEmail3"] = sc.notify3_email;


            return View();
        }

        public ActionResult SvcAppointmentsGridData(string sidx, string sord, int page, int rows)
        {

            string fromDate = Request.QueryString["fromDate"];
            string todate = Request.QueryString["toDate"];

            uls_dbDataContext ulsdb_dc = new uls_dbDataContext();
            var svc_days = ulsdb_dc.GetGridSvcAppointments(sidx, sord, fromDate, todate);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from s in svc_days
                        select new
                        {
                            id = Convert.ToString(s.svc_id),
                            cell = new string[] {
                            String.Format("{0:MM/dd/yyyy}",s.svc_date),
                            String.Format("{0:dddd}",s.svc_date),
                            Convert.ToString(s.street_address),
                            Convert.ToString(s.last_name),
//                            String.Format("{0:(###) ###-####}", s.home_phone),
                            Regex.Replace(s.home_phone, @"(\d{3})(\d{3})(\d{4})", "$1-$2-$3"),
                            Convert.ToString(s.crew),
                            Convert.ToString(s.svc_id),
                            s.first_name,
                            s.city,
                            s.state,
                            s.zip,
//                            String.Format("{0:(###) ###-####}", s.other_phone),
                            Regex.Replace(s.other_phone, @"(\d{3})(\d{3})(\d{4})", "$1-$2-$3"),
                            s.email,
                            Convert.ToString(s.reschedule),
                            s.comments
                            }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        public ActionResult SvcDaysGridData(string sidx, string sord, int page, int rows)
        {

            string fromDate = Request.QueryString["fromDate"];
            string todate = Request.QueryString["toDate"];

            uls_dbDataContext ulsdb_dc = new uls_dbDataContext();
            var svc_days = ulsdb_dc.GetGridSvcDays(sidx, sord, fromDate, todate);

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from s in svc_days
                        select new
                        {
                            id = String.Format("{0:MMddyyyy}",s.svc_sched_dt),
                            cell = new string[] {
                            String.Format("{0:MM/dd/yyyy}",s.svc_sched_dt),
                            String.Format("{0:dddd}",s.svc_sched_dt),
                            Convert.ToString(s.tot_crews),
                            Convert.ToString(s.cur_svcs_sched),
                            Convert.ToString(s.available)
                            }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        public ActionResult CrewsGridData(string sidx, string sord, int page, int rows)
        {

            uls_dbDataContext ulsdb_dc = new uls_dbDataContext();
            var svc_crews = ulsdb_dc.GetGridSvcCrews();

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from s in svc_crews
                        select new
                        {
                            id = s.crew_num,
                            cell = new string[] {
                            Convert.ToString(s.crew_num),
                            s.svc_foreman.svc_foreman_nm,
                            Convert.ToString(s.svc_foreman_id)
                            }
                        }).ToArray()
            };
            return Json(dataJson);
        }

        public ActionResult GetSvcForemen()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            var list = db.GetSvcForeman();

            ViewData["SvcForemen"] = list;

            return PartialView("SvcForemen", ViewData);
        }

        public ActionResult GetAdminForemen(string sidx, string sord, int page, int rows)
        {
            uls_dbDataContext db = new uls_dbDataContext();

            var forem = db.GetGridSvcForemen();

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from f in forem
                        select new
                        {
                            id = f.svc_foreman_id,
                            cell = new string[] {
                    f.svc_foreman_nm
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }



        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveDateEdit()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strDt = Request.Form["hdnSvcDate"];
            string strTotCrews = Request.Form["ddlEditCrews"];
            string strSvcsSched = Request.Form["hdnSvcsSched"];
            bool blnAvail = Request.Form["chkAvail"] == "on" ? true : false;

            try
            {
                svc_schedule_day ssd;

                ssd = db.svc_schedule_days.Single(s => s.svc_sched_dt == Convert.ToDateTime(strDt));
                ssd.available = blnAvail;
                ssd.tot_crews = Convert.ToInt32(strTotCrews);

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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAppt()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strID = Request.Form["hdnSvcid"];
            string strComment = Request.Form["txtComments"];

            try
            {
                svc_appointment sa;

                sa = db.svc_appointments.Single(s => s.svc_id == Convert.ToInt32(strID));
                sa.comments = strComment;

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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveAdminForemen()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            string strName = Request.Form["txtForemanName"];

            try
            {

                svc_foreman svcf;

                svcf = new svc_foreman();
                svcf.active_flg = true;
                svcf.svc_foreman_nm = strName;
                db.svc_foremans.InsertOnSubmit(svcf);

                db.SubmitChanges();

                int intNewID = svcf.svc_foreman_id;

                return Content("Success" + "," + Convert.ToString(intNewID));

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure");
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveCrewEdit()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            string strOper = Request.Form["hdnCrewOper"];
            string strCrewNum = Request.Form["hdnCrewNum"];
            string strForemanID = Request.Form["ddlSvcFormen"];

            try
            {
                svc_crew svcc;

                if (strOper == "Add")
                {
                    svcc = new svc_crew();
                    svcc.crew_num = Convert.ToInt32(strCrewNum);
                    db.svc_crews.InsertOnSubmit(svcc);
                }
                else
                {
                    svcc = db.svc_crews.Single(c => c.crew_num == Convert.ToInt32(strCrewNum));
                }

                
                svcc.svc_foreman_id = Convert.ToInt32(strForemanID);

                db.SubmitChanges();

                return Content("Success");

            }
            catch (Exception ex)
            {

                string strErr = ex.Message;
                return Content("Failure: " + strErr);
            }
        }

        public ActionResult GetNewCrewNum()
        {

            uls_dbDataContext db = new uls_dbDataContext();

            int intMax = db.GetMaxCrewNum();

            return Content((intMax + 1).ToString());
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveContact()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strName = Request.Form["txtName"];
            string strPhone = Request.Form["txtPhone"];
            string strEmail = Request.Form["txtEmail"];
            string strEmailNotify1 = Request.Form["txtEmailNotif1"];
            string strEmailNotify2 = Request.Form["txtEmailNotif2"];
            string strEmailNotify3 = Request.Form["txtEmailNotif3"];

            try
            {

                svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);

                sc.contact_name = strName;
                sc.contact_number = strPhone;
                sc.contact_email = strEmail;
                sc.notify1_email = strEmailNotify1;
                sc.notify2_email = strEmailNotify2;
                sc.notify3_email = strEmailNotify3;

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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AddSvcDates()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strDtFrom = Request.Form["dtDaysFrom"];
            string strDtTo = Request.Form["dtDaysTo"];
            string strTotCrews = Request.Form["ddlCrews"];

            int intDaysToAdd = Convert.ToDateTime(strDtTo).Subtract(Convert.ToDateTime(strDtFrom)).Days;

            try
            {
                svc_schedule_day ssd;
                svc_schedule_day ssd2;

                int count;

                for (count = 0; count < intDaysToAdd; count = count + 1)
                {
                    ssd2 = db.svc_schedule_days.SingleOrDefault(s => s.svc_sched_dt == Convert.ToDateTime(strDtFrom).AddDays(count));
                    if (ssd2 != null)
                    {
                        continue;
                    }
                    ssd = new svc_schedule_day();
                    ssd.svc_sched_dt = Convert.ToDateTime(strDtFrom).AddDays(count);
                    ssd.tot_crews = Convert.ToInt32(strTotCrews);
                    ssd.available = String.Format("{0:ddd}", ssd.svc_sched_dt) == "Sat" || String.Format("{0:ddd}", ssd.svc_sched_dt) == "Sun" ? false : true;
                    ssd.cur_svcs_sched = 0;
                    db.svc_schedule_days.InsertOnSubmit(ssd);
                                                                    
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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult ShowReport()
        {
            string strQueryString;
            string rptName;

            rptName = Request.Form["hdnReportNameHist"];

            //reportname,storedProcName,parm1,parm2,parm3
            try
            {

                switch (rptName)
                {
                    case "SvcSchedByCrewHist":
                        strQueryString = "SvcSchedByCrewHist,GetSvcByCrewHistReport," + Request.Form["ddlRptCrews"] + "," + Request.Form["dtReportFrom"] + "," + Request.Form["dtReportTo"];
                        break;
                    case "SvcSchedAllCrewsHist":
                        strQueryString = "SvcSchedAllCrewsHist,GetSvcAllCrewHistReport," + Request.Form["dtReportAllFrom"] + "," + Request.Form["dtReportAllTo"];
                        break;
                    default:
                        strQueryString = "";
                        break;
                }

                return RedirectToAction("SvcRptViewer", "CrystalRptViewer", new { value1 = strQueryString });
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

        private void SendEmailNofication(string strSvcDate)
        {

            string strSMTPServer = ConfigurationManager.AppSettings["SMTPServer"];
            string strSMTPUID = ConfigurationManager.AppSettings["SMTPUserID"];
            string strSMTPPWD = ConfigurationManager.AppSettings["SMTPUserPWD"];
            string strSMTPFrom = ConfigurationManager.AppSettings["SMTPUserFromAddress"];

            SmtpClient smtpClient = new SmtpClient();
            MailMessage message = new MailMessage();
            MailAddress fromAddress = new MailAddress(strSMTPFrom, "ULS Service Notification");

            uls_dbDataContext db = new uls_dbDataContext();

            svc_contact sc = db.svc_contacts.Single(s => s.contact_id == 1);
            
            string strEmail1 = sc.notify1_email;
            string strEmail2 = sc.notify2_email;
            string strEmail3 = sc.notify3_email;

            // You can specify the host name or ipaddress of your server
            smtpClient.Host = strSMTPServer; //you can also specify mail server IP address here

            //Default port will be 25
            smtpClient.Port = 25;

            NetworkCredential info = new NetworkCredential(strSMTPUID, strSMTPPWD);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = info;

            //From address will be given as a MailAddress Object
            message.From = fromAddress;

            // To address collection of MailAddress

            if (strEmail1.Length > 0)
            {
                message.To.Add(strEmail1);
            }
            if (strEmail2.Length > 0)
            {
                message.To.Add(strEmail2);
            }
            if (strEmail3.Length > 0)
            {
                message.To.Add(strEmail3);
            }

            message.Subject = "A new service appointment has been scheduled";

            message.IsBodyHtml = false;
            
            // Message body content
            string ss_body = "A service appointment has been scheduled for:\r\n\r\n" +
                               Convert.ToString(Session["LName"]) + "\r\n" +
                               Convert.ToString(Session["txtAddress"]) + "\r\n" +
                               Convert.ToString(Session["txtCity"]) + ", " + Convert.ToString(Session["ddlState"]) + ", " + Convert.ToString(Session["txtZip"]) + "\r\n" +
                               "Phone: " + Convert.ToString(Session["txtHomePhone"]) + "\r\n\r\n" +
                               "on " + strSvcDate;
 


            message.Body = ss_body;

            // Send SMTP mail
            smtpClient.Send(message);
        }

    }
}
