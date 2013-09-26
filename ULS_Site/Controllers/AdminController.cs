using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using ULS_Site.Models;
using System.Web.Security;


namespace ULS_Site.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult GetAllSecurityIds(string id, string sidx, string sord, int page, int rows)
        {

            SecAdmin sec = new SecAdmin();

//            var users = Membership.GetAllUsers();

            var users = sec.GetGridSecurityUsers();

            var dataJson = new
            {

                total =
                page = 1,
                records = 10000,
                rows = (from a in users
                        select new
                        {
                            id = a.UserName,
                            cell = new string[] {
                    a.UserName
                }
                        }).ToArray()
            };
            return Json(dataJson);
        }
        
        public ActionResult GetUserRoles(string id)
        {
            bool bSecRole = false;
            bool bShopRole = false;
            bool bFrmRole = false;
            bool bEQRole = false;

            SecAdmin sec = new SecAdmin();

            //            var users = Membership.GetAllUsers();

            IQueryable<userRolesCls> users = sec.GetUsersRoles(id);

            foreach (userRolesCls u in users)
            {
                if (u.role_name == "sec_admin")
                {
                    bSecRole = true;
                }
                if (u.role_name == "svc_foreman")
                {
                    bFrmRole = true;
                }
                if (u.role_name == "shop_mgr")
                {
                    bShopRole = true;
                }
                if (u.role_name == "emp_qual")
                {
                    bEQRole = true;
                }
            }

            var dataJson = new
            {
                secRole = bSecRole,
                shopRole = bShopRole,
                frmRole = bFrmRole,
                certRole = bEQRole
            };
            return Json(dataJson);
        }

        public ActionResult SecAdmin()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult AddUser()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strUser = Request.Form["txtUserID"];
            string strPwd = Request.Form["txtPassword"];

            try
            {
                Membership.CreateUser(strUser, strPwd, "chaas@ulscorp.com");

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
        public ActionResult ResetPassword()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strUser = Request.Form["hdnID"];
            string strPwd = Request.Form["txtPassword"];

            try
            {
                string strRandomPwd = Membership.Provider.ResetPassword(strUser, null);

                Membership.Provider.ChangePassword(strUser, strRandomPwd, strPwd);

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

        public ActionResult UnlockUser(string id)
        {
            string strRet;

            try
            {
                Membership.Provider.UnlockUser(id);

                strRet = "Success";

            }
            catch (Exception ex)
            {
                string msg = ex.Message;

                strRet = msg;
            }

            return Content(strRet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveUserRoles()
        {
            string strRet;
            uls_dbDataContext db = new uls_dbDataContext();

            string strUser = Request.Form["hdnUID"];
            bool bSecAdmin = Request.Form["chkSecAdmin"] == "on" ? true : false;
            bool bShopMgr = Request.Form["chkShpMgr"] == "on" ? true : false;
            bool bSvcForeman = Request.Form["chkSvcFrmn"] == "on" ? true : false;
            bool bEmpQual = Request.Form["chkEmpQual"] == "on" ? true : false;

            try
            {
                if(Roles.IsUserInRole(strUser,"sec_admin"))
                {
                    Roles.RemoveUserFromRole(strUser,"sec_admin");
                }

                if (Roles.IsUserInRole(strUser, "svc_foreman"))
                {
                    Roles.RemoveUserFromRole(strUser, "svc_foreman");
                }

                if (Roles.IsUserInRole(strUser, "shop_mgr"))
                {
                    Roles.RemoveUserFromRole(strUser, "shop_mgr");
                }

                if (Roles.IsUserInRole(strUser, "emp_qual"))
                {
                    Roles.RemoveUserFromRole(strUser, "emp_qual");
                }

                if (bSecAdmin == true)
                {
                    Roles.AddUserToRole(strUser, "sec_admin");
                }
                if (bShopMgr == true)
                {
                    Roles.AddUserToRole(strUser, "shop_mgr");
                }
                if (bSvcForeman == true)
                {
                    Roles.AddUserToRole(strUser, "svc_foreman");
                }

                if (bEmpQual == true)
                {
                    Roles.AddUserToRole(strUser, "emp_qual");
                }
                    

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
        public ActionResult DeleteUser(string id)
        {
            uls_dbDataContext db = new uls_dbDataContext();
            string strRet;

            try
            {
                Membership.DeleteUser(id);
                strRet = "Success";
            }
            catch (Exception ex)
            {
                string strEx = ex.Message;
                strRet = strEx;
            }

            return Content(strRet);
        }



    }
}
