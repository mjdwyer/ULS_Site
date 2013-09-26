using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Dynamic;
using System.Web.Mvc;

namespace ULS_Site.Models
{
    public partial class uls_dbDataContext
    {
        public List<office_location> GetOfficeLocations()
        {
            return office_locations.ToList();
        }

        public IEnumerable<string> GetDefaultFroms()
        {

            IEnumerable<string> defaultFroms;

            defaultFroms = from ol in office_locations
                           select ol.default_from;

            return defaultFroms;

        }

        public IEnumerable<DateTime> GetAvailSvcDates()
        {

            IEnumerable<DateTime> availDates;

            availDates = from sd in svc_schedule_days
                         where sd.available == true &&  sd.cur_svcs_sched < sd.tot_crews && sd.svc_sched_dt >= DateTime.Now.AddDays(14)
                         select sd.svc_sched_dt;
            //                         select String.Format("{0:ddd   MM/dd/yyyy}", sd.svc_sched_dt);

            return availDates;

        }

        public IEnumerable<int>  GetCrewNums(DateTime dtSvcDt)
        {


            return from sa in svc_appointments
                   where sa.svc_date == dtSvcDt
                   select sa.crew;

        }

        public int GetForemanID(int crewnum)
        {


            return (from scf in svc_crews
                   where scf.crew_num == crewnum
                   select scf.svc_foreman_id).Single();

        }


        public IQueryable<svc_schedule_day> GetGridSvcDays(string sidx, string sord, string fromDate, string toDate)
        {

            try
            {
                if (toDate.Length == 0)
                {
                    return
                            svc_schedule_days
                            .Where("svc_sched_dt >= @0", DateTime.Now.AddDays(-1))
                            .OrderBy(sidx + " " + sord);
                }
                else
                {
                    return
                            svc_schedule_days
                            .Where("svc_sched_dt >= @0 && svc_sched_dt <= @1", Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate))
                            .OrderBy(sidx + " " + sord);
                }

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<svc_foreman> GetGridSvcForemen()
        {

            try
            {
                return
                        svc_foremans
                        .OrderBy("svc_foreman_nm");
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetSvcForeman()
        {
            try
            {
                var list = svc_foremans
                   .Where("active_flg == true")
                    .OrderBy("svc_foreman_nm")
                   .Select(sf => new SelectListItem 
                   {
                       Text = sf.svc_foreman_nm,
                       Value = Convert.ToString(sf.svc_foreman_id)
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



        public IQueryable<svc_crew> GetGridSvcCrews()
        {

            try
            {
                return
                        svc_crews
                        .OrderBy("crew_num");
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        

        public IQueryable<svc_appointment> GetGridSvcAppointments(string sidx, string sord, string fromDt, string toDate)
        {

            try
            {
                if (toDate.Length == 0)
                {
                    return
                            svc_appointments
                            .Where("svc_date >= @0", Convert.ToDateTime(fromDt))
                            .OrderBy(sidx + " " + sord);
                }
                else
                {
                    return
                            svc_appointments
                            .Where("svc_date >= @0 && svc_date <= @1", Convert.ToDateTime(fromDt), Convert.ToDateTime(toDate))
                            .OrderBy(sidx + " " + sord);
                }
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public int GetMaxCrewNum()
        {
            return
                (from s in  svc_crews
                 select s.crew_num
                 ).Max();
        }



    }
}
