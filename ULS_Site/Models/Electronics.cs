using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Dynamic;

namespace ULS_Site.Models
{
    public class Electronics
    {
        uls_dbDataContext ulsDB = new uls_dbDataContext();

        public IQueryable<vw_ElectronicsGrid> GetGridElectronics(string sidx, string sord, string div, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            string strExclude = " && stolen = false && in_repair = false && totaled = false && unknown = false";
            try
            {
                if (searchOn == true)
                {
                    if (searchValue == "True" || searchValue == "False")
                    {
                        if (searchField == "sold" || searchField == "in_repair" || searchField == "totaled" || searchField == "stolen" || searchField == "unknown")
                        {
                            return
                                ulsDB.vw_ElectronicsGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1", div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord);
                        }
                        else
                        {

                            return
                                ulsDB.vw_ElectronicsGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord);
                        }

                    }
                    else if (searchOper == "bw" || searchOper == "ew")
                    {
                        string strClause = "";
                        if (searchOper == "bw")
                        {
                            strClause = ".StartsWith(@1)";
                        }
                        else
                        {
                            strClause = ".EndsWith(@1)";
                        }

                        return
                            ulsDB.vw_ElectronicsGrids
                            .Where("(registered_by = @0 || managed_by = @0) && " + searchField + strClause + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                    else
                    {
                        return
                            ulsDB.vw_ElectronicsGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                }
                else
                {
                    return
                        ulsDB.vw_ElectronicsGrids
                            .Where("(registered_by = @0 || managed_by = @0)" + strExclude, div)
                            .OrderBy(sidx + " " + sord);

                }


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public vw_ElectronicsGrid GetGridSearchAllElectronics(string searchField, string searchValue)
        {
            try
            {
                return
                    (ulsDB.vw_ElectronicsGrids
                            .Where(searchField + " = @0", searchValue)).First();



            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<vw_ElectronicsAssignGrid> GetGridElectronicsAssign(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.vw_ElectronicsAssignGrids
                        .Where("electronics_id = @0", id)
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetElectronicsTypes()
        {
            try
            {
                var list = ulsDB.electronics_type_avts
                    .OrderBy("type_desc")
                   .Select(t => new SelectListItem
                   {
                       Text = t.type_desc.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.type_id)
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

        public List<SelectListItem> GetElectronicsModels()
        {
            try
            {
                var list = ulsDB.electronics_model_avts
                    .OrderBy("model_desc")
                   .Select(m => new SelectListItem
                   {
                       Text = m.model_desc.TrimEnd().TrimStart(),
                       Value = Convert.ToString(m.model_id)
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

        public List<SelectListItem> GetElectronicsMakes()
        {
            try
            {
                var list = ulsDB.electronics_make_avts
                    .OrderBy("make_desc")
                   .Select(m => new SelectListItem
                   {
                       Text = m.make_desc.TrimEnd().TrimStart(),
                       Value = Convert.ToString(m.make_id)
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

        public IQueryable<electronics_type_avt> GetGridElectronicsTypes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.electronics_type_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<electronics_model_avt> GetGridElectronicsModels(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.electronics_model_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<electronics_make_avt> GetGridElectronicsMakes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.electronics_make_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public short GetMaxElectronicsTypeID()
        {
            return
                (from t in ulsDB.electronics_type_avts
                 select t.type_id
                 ).Max();

        }

        public short GetMaxMakeTypeID()
        {
            return
                (from mk in ulsDB.electronics_make_avts
                 select mk.make_id
                 ).Max();

        }

        public short GetMaxModelTypeID()
        {
            return
                (from md in ulsDB.electronics_model_avts
                 select md.model_id
                 ).Max();

        }

        public List<SelectListItem> GetTypesDlg()
        {
            try
            {
                var list = ulsDB.electronics_type_avts
                    .OrderBy("type_desc")
                   .Select(t => new SelectListItem
                   {
                       Text = t.type_desc.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.type_id)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "ALL", Value = "-1" });
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }



    }
}
