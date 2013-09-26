using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Dynamic;

namespace ULS_Site.Models
{
    public class SecAdmin
    {
        uls_dbDataContext ulsDB = new uls_dbDataContext();

        public IQueryable<aspnet_User> GetGridSecurityUsers()
        {

            try
            {
                return
                    ulsDB.aspnet_Users
                        .OrderBy("UserName");

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<userRolesCls> GetUsersRoles(string strUserID)
        {

            try
            {
                return

                    from r in ulsDB.aspnet_Roles
                    join ur in ulsDB.aspnet_UsersInRoles on r.RoleId equals ur.RoleId
                    join u in ulsDB.aspnet_Users on ur.UserId equals u.UserId
                    where u.UserName == strUserID
                    select new userRolesCls
                    {
                        role_name = r.RoleName
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }



    }
}
