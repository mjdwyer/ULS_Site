using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Dynamic;

namespace ULS_Site.Models
{
    public class Qualifications
    {
        uls_dbDataContext ulsDB = new uls_dbDataContext();

        public IQueryable<employee> GetGridEmployees(string sidx, string sord, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            try
            {
                if (searchOn == true)
                {
                    if (searchOper == "bw" || searchOper == "ew")
                    {
                        string strClause = "";
                        if (searchOper == "bw")
                        {
                            strClause = ".StartsWith(@0)";
                        }
                        else
                        {
                            strClause = ".EndsWith(@0)";
                        }

                        return
                            ulsDB.employees
                            .Where(searchField + strClause, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                    else
                    {
                        return
                            ulsDB.employees
                                .Where(searchField + " = @0", searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                }
                else
                {
                    return
                        ulsDB.employees
//                            .Where("(empStatus = 'A')")
                            .OrderBy(sidx + " " + sord);

                }
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<vw_QualificationsGrid> GetGridQualifications(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.vw_QualificationsGrids
                        .Where("employeeId = @0", Convert.ToInt32(id))
                        .OrderBy(sidx + " " + sord);
//                        .OrderBy(d => d.qualCompany).ThenBy(c => sidx);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public int GetQualCount(string strEmployeeID)
        {
            try
            {
                return
                    ulsDB.empQuals
                        .Where("employeeId = @0", Convert.ToInt32(strEmployeeID))
                            .Count();
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return 0;
            }
        }

        public List<SelectListItem> GetQualDescriptions(string strQualCompany)
        {
            try
            {
                var list = ulsDB.qualifications
                   .Where("qualCompany == @0", strQualCompany)
                   .OrderBy("qualDesc")
                   .Select(t => new SelectListItem
                   {
                       Text = t.qualDesc.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.qualID)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetEmployees()
        {
            try
            {
                var list = ulsDB.employees
                   .OrderBy("lname")
                   .Select(e => new SelectListItem
                   {
//                       Text = e.lname + ", " + e.fname + " " + e.mname + " " + e.suffix ,
                       Text = (e.lname == null ? "" : e.lname + ", ") + (e.fname == null ? "" : e.fname + " ") + (e.mname == null ? "" : e.mname + " ") + (e.suffix == null ? "" : e.suffix + " "),
                       Value = Convert.ToString(e.employeeID)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetJobClass()
        {
            try
            {
                var list = ulsDB.empJobClasses
                   .OrderBy("jobClassDesc")
                   .Select(e => new SelectListItem
                   {
                       //                       Text = e.lname + ", " + e.fname + " " + e.mname + " " + e.suffix ,
                       Text = e.jobClassDesc,
                       Value = e.jobClassId
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetQualCodes(string strQualCompany)
        {
            try
            {
                var list = ulsDB.qualifications
                   .Where("qualCompany == @0", strQualCompany)
                   .OrderBy("qualID")
                   .Select(t => new SelectListItem
                   {
                       Text = Convert.ToString(t.qualID),
                       Value = Convert.ToString(t.qualID)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }


        public List<SelectListItem> GetQualEmpWarnRecogs(string strEmpId, string strWRflg)
        {
            try
            {
                var list = ulsDB.empWarnRecognitions
                    .Where("employeeId = @0 && empWarnRecogFlg = @1", Convert.ToInt32(strEmpId), Convert.ToChar(strWRflg))
                   .OrderBy("empQualWarnRecogDate desc")
                   .Select(t => new SelectListItem
                   {
                       Text = String.Format("{0:MM/dd/yyyy}", t.empQualWarnRecogDate),
                       Value = ""
                   })
               .ToList();

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public string GetQualEmpWarnComment(string strEmpId, string strWRflg, string stdDate)
        {
            try
            {

                var comment = ulsDB.empWarnRecognitions
                    .Where("employeeId = @0 && empWarnRecogFlg = @1 && empQualWarnRecogDate = @2", Convert.ToInt32(strEmpId), Convert.ToChar(strWRflg), Convert.ToDateTime(stdDate))
                   .Select(t => t.comment).Single();

                return comment;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<vw_QualificationsAdmin> GetGridQualAdmin()
        {
            try
            {
                return
                    ulsDB.vw_QualificationsAdmins;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<qual_notification> GetGridAdminEmail()
        {
            try
            {
                return
                    ulsDB.qual_notifications;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }




    }
}
