using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Dynamic;
using System.Data;
//test
namespace ULS_Site.Models
{
    public class DropDownData
    {
        public String ID { get; set; }
        public String Description { get; set; }
    }

    public class EquipTrak
    {

        uls_dbDataContext ulsDB = new uls_dbDataContext();

        public void GetEquipment(string equipID, ref equipment equip)
        {
            equip = ulsDB.equipments.Single(e => e.equip_id == equipID);

//            return equip;
        }


        public IQueryable<equipmentCls> GetGridEquipmentX(string sidx, string sord)
        {
            try
            {
                return

                    from e in ulsDB.equipments.OrderBy(sidx + " " + sord)
                    join m in ulsDB.make_avts on e.make_id equals m.make_id
                    join t in ulsDB.equip_type_avts on e.type_id equals t.type_id
                    select new equipmentCls
                    {
                        equip_id = e.equip_id,
                        equipType = t.type_desc,
                        makeType = m.make_descr,
                        serv_due_dt = Convert.ToDateTime(e.service_due_dt)
                    };
 
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

 /*       public IQueryable<servDueCls> GetServDueGrid(string sidx, string sord)
        {
            try
            {
                return

                    from s in ulsDB.s.OrderBy(sidx + " " + sord)
                    join m in ulsDB.make_avts on e.make_id equals m.make_id
                    join t in ulsDB.equip_type_avts on e.type_id equals t.type_id
                    select new equipmentCls
                    {
                        equip_id = e.equip_id,
                        equipType = t.type_desc,
                        makeType = m.make_descr,
                        serv_due_dt = Convert.ToDateTime(e.service_due_dt)
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }
*/
        public IEnumerable<image> GetEquipImages(string strEquipID, string strType)
        {
            try
            {
                return

                    ulsDB.images
                    .Where("entity_id = @0 && image_type = @1", strEquipID, strType);

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public List<vw_EquipGrid> GetGridEquipExport(string div)
        {
            return (from e in ulsDB.vw_EquipGrids
                            .Where("registered_by = @0 || managed_by = @0", div)
                            .OrderBy("equip_id")
                    select e).ToList();
        }

/*        public List<???> GetGridEquipExport(string div)
        {
            return (from e in ulsDB.vw_EquipGrids
                    from a in ulsDB.assignments.Where(a => a.equip_id == e.equip_id && a.return_dt == null).DefaultIfEmpty()
                            .Where("registered_by = @0 || managed_by = @0", div)
                            .OrderBy("equip_id")
                    select new 
                    {
                        e,
                        a.assigned_to,
                    }).ToList();
        }
*/
        public List<vw_ToolsGrid> GetGridToolsExport(string div)
        {
            return (from e in ulsDB.vw_ToolsGrids
                            .Where("registered_by = @0 || managed_by = @0", div)
                            .OrderBy("tool_id")
                    select e).ToList();
        }

        public List<vw_SmallToolsGrid> GetGridSmallToolsExport(string div)
        {
            return (from e in ulsDB.vw_SmallToolsGrids
                            .Where("Reg_by = @0 || managed_by = @0", div)
                            .OrderBy("item")
                    select e).ToList();
        }


        public IQueryable<vw_EquipGrid> GetGridEquipment(string sidx, string sord, string div, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            string strExclude = " && stolen = false && in_repair = false && totaled = false && sold = false && unknown = false && to_be_sold = false ";
            try
            {
                if (searchOn == true)
                {
                    if (searchValue == "True" || searchValue == "False")
                    {
                        if (searchField == "sold" || searchField == "in_repair" || searchField == "totaled" || searchField == "stolen" || searchField == "unknown" || searchField == "to_be_sold")
                        {
                            return
                                ulsDB.vw_EquipGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1", div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord);
                        }
                        else
                        {

                            return
                                ulsDB.vw_EquipGrids
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
                            ulsDB.vw_EquipGrids
                            .Where("(registered_by = @0 || managed_by = @0) && " + searchField + strClause + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                    else
                    {
                        return
                            ulsDB.vw_EquipGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                }
                else
                {
                    return
                        ulsDB.vw_EquipGrids
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


        public vw_EquipGrid GetGridSearchAllEquipment(string searchField, string searchValue)
        {
            try
            {
                return
                    (ulsDB.vw_EquipGrids
                            .Where(searchField + " = @0", searchValue)).First();



            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public vw_ToolsGrid GetGridSearchAllTools(string searchField, string searchValue)
        {
            try
            {
                return
                    (ulsDB.vw_ToolsGrids
                            .Where(searchField + " = @0", searchValue)).First();



            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<vw_ToolsGrid> GetToolGridEquipment(string sidx, string sord, int page, int rows, string div, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            string strExclude = " && stolen = false && in_repair = false && totaled = false && sold = false && unknown = false && to_be_sold = false";
            try
            {
                if (searchOn == true)
                {
                    if (searchValue == "True" || searchValue == "False")
                    {
                        if (searchField == "sold" || searchField == "in_repair" || searchField == "totaled" || searchField == "stolen" || searchField == "unknown" || searchField == "to_be_sold")
                        {
                            return
                                ulsDB.vw_ToolsGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1", div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord);
                        }
                        else
                        {
                            return
                                ulsDB.vw_ToolsGrids
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
                            ulsDB.vw_ToolsGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + strClause + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                    else
                    {
                        return
                            ulsDB.vw_ToolsGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord);
                    }
                }
                else
                {
                    return
                        ulsDB.vw_ToolsGrids
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

        public IQueryable<vw_ToolsGrid> GetToolGridEquipmentOld(string sidx, string sord, int page, int rows, string div, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            string strExclude = " && stolen = false && in_repair = false && totaled = false && sold = false";
            try
            {
                if (searchOn == true)
                {
                    if (searchValue == "True" || searchValue == "False")
                    {
                        if (searchField == "sold" || searchField == "in_repair" || searchField == "totaled" || searchField == "stolen")
                        {
                            return
                                ulsDB.vw_ToolsGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1", div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord)
                                    .Skip(page * rows)
                                    .Take(rows);
                        }
                        else
                        {
                            return
                                ulsDB.vw_ToolsGrids
                                    .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, Convert.ToBoolean(searchValue))
                                    .OrderBy(sidx + " " + sord)
                                    .Skip(page * rows)
                                    .Take(rows);
                        }

                    }
                    else if (searchOper == "bw")
                    {
                        return
                            ulsDB.vw_ToolsGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + ".StartsWith(@1)" + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);
                    }
                    else
                    {
                        return
                            ulsDB.vw_ToolsGrids
                                .Where("(registered_by = @0 || managed_by = @0) && " + searchField + " = @1" + strExclude, div, searchValue)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);
                    }
                }
                else
                {
                    return
                        ulsDB.vw_ToolsGrids
                            .Where("(registered_by = @0 || managed_by = @0)" + strExclude, div)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);

                }


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<vw_SmallToolsGrid> GetSmallToolGridEquipment(string sidx, string sord, int page, int rows, string div, bool searchOn, string searchField, string searchValue, string searchOper)
        {
            try
            {
                if (searchOn == true)
                {
                    if (searchValue == "True" || searchValue == "False")
                    {
                        return
                            ulsDB.vw_SmallToolsGrids
                                .Where("(Reg_by = @0 || Managed_by = @0) && " + searchField + " = @1", div, Convert.ToBoolean(searchValue))
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);

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
                            ulsDB.vw_SmallToolsGrids
                                .Where("(Reg_by = @0 || Managed_by = @0) && " + searchField + strClause, div, searchValue)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);
                    }
                    else
                    {
                        return
                            ulsDB.vw_SmallToolsGrids
                                .Where("(Reg_by = @0 || Managed_by = @0) && " + searchField + " = @1", div, searchValue)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);
                    }
                }
                else
                {
                    return
                        ulsDB.vw_SmallToolsGrids
                            .Where("Reg_by = @0 || Managed_by = @0", div)
                                .OrderBy(sidx + " " + sord)
                                .Skip(page * rows)
                                .Take(rows);
                }
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public int GetToolGridCount(string div)
        {
            try
            {
                return
                    ulsDB.vw_ToolsGrids
                        .Where("registered_by = @0 || managed_by = @0", div)
                            .Count();
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return 0;
            }
        }

        public int GetSmallToolGridCount(string div)
        {
            try
            {
                return
                    ulsDB.vw_SmallToolsGrids
                        .Where("Reg_by = @0 || Managed_by = @0", div)
                            .Count();
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return 0;
            }
        }

        public IQueryable<service_due_parm> GetGridSvcDue(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.service_due_parms
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<service> GetGridEquipmentSvc(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.services
                        .Where("equip_id = @0", id)
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<tools_serv> GetGridToolSvc(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.tools_servs
                        .Where("tool_id = @0", id)
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<equipment> GetGridAllEquipIds(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.equipments
                        .Where(c => c.equip_id.StartsWith(id))
                        .OrderBy(sidx + " " + sord);

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<tool> GetGridAllToolIds(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.tools
                        .Where(c => c.tool_id.StartsWith(id))
                        .OrderBy(sidx + " " + sord);

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<equip_type_avt> GetGridEquipmentTypes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.equip_type_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<tools_item_avt> GetGridToolTypes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.tools_item_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<tools_descr_avt> GetGridToolDescs(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.tools_descr_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<tool_mfgs_avt> GetGridToolManfs(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.tool_mfgs_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<tool_size_avt> GetGridToolSizes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.tool_size_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<equip_loc_avt> GetGridEquipLoc(string sidx, string sord)
        {

            try
            {
                return
                    ulsDB.equip_loc_avts
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<default_div> GetGridUsers(string sidx, string sord)
        {

            try
            {
                return
                    ulsDB.default_divs
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<make_avt> GetGridMakeTypes(string sidx, string sord)
        {

            try
            {
                return
                    ulsDB.make_avts
                        .OrderBy(sidx + " " + sord);


            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<model_avt> GetGridModelTypes(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.model_avts
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<vw_EquipAssignGrid> GetGridEquipmentAssign(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.vw_EquipAssignGrids
                        .Where("equip_id = @0", id)
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<vw_ToolsAssignGrid> GetGridToolAssign(string sidx, string sord, string id)
        {

            try
            {
                return
                    ulsDB.vw_ToolsAssignGrids
                        .Where("tool_id = @0", id)
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }


        public IQueryable<DropDownData> GetToolTypes()
        {
            try
            {
                return

                    from t in ulsDB.tools_item_avts
                    orderby t.tools_type_descr
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.tools_type_id),
                        Description = t.tools_type_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetToolTypesSearch()
        {
            try
            {
                return

                    from t in ulsDB.tools_item_avts
                    orderby t.tools_type_descr
                    select new DropDownData
                    {
                        ID = t.tools_type_descr.TrimEnd().TrimStart(),
                        Description = t.tools_type_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetToolDescs()
        {
            try
            {
                return

                    from t in ulsDB.tools_descr_avts
                    orderby t.tools_descr_descr
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.tools_descr_id),
                        Description = t.tools_descr_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetToolDescsSearch()
        {
            try
            {
                return

                    from t in ulsDB.tools_descr_avts
                    orderby t.tools_descr_descr
                    select new DropDownData
                    {
                        ID = t.tools_descr_descr.TrimEnd().TrimStart(),
                        Description = t.tools_descr_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetToolMfgs()
        {
            try
            {
                return

                    from t in ulsDB.tool_mfgs_avts
                    orderby t.tool_mfg_descr
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.tool_mfg_id),
                        Description = t.tool_mfg_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetToolMfgsSearch()
        {
            try
            {
                return

                    from t in ulsDB.tool_mfgs_avts
                    orderby t.tool_mfg_descr
                    select new DropDownData
                    {
                        ID = t.tool_mfg_descr.TrimEnd().TrimStart(),
                        Description = t.tool_mfg_descr.TrimEnd().TrimStart(),
                    };
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetToolSizes()
        {
            try
            {
                return

                    from t in ulsDB.tool_size_avts
                    orderby t.size_descr
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.size_id),
                        Description = t.size_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetToolSizesSearch()
        {
            try
            {
                return

                    from t in ulsDB.tool_size_avts
                    orderby t.size_descr
                    select new DropDownData
                    {
                        ID = t.size_descr.TrimEnd().TrimStart(),
                        Description = t.size_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetTypes()
        {
            try
            {
                return

                    from t in ulsDB.equip_type_avts
                    orderby t.type_desc
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.type_id),
                        Description = t.type_desc.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetTypesSearch()
        {
            try
            {
                return

                    from t in ulsDB.equip_type_avts
                    orderby t.type_desc
                    select new DropDownData
                    {
                        ID = Convert.ToString(t.type_desc.TrimEnd().TrimStart()),
                        Description = t.type_desc.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public IQueryable<DropDownData> GetMakes()
        {
            try
            {
                return

                    from m in ulsDB.make_avts
                    orderby m.make_descr
                    select new DropDownData
                    {
                        ID = m.make_id.ToString(),
                        Description = m.make_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetMakesSearch()
        {
            try
            {
                return

                    from m in ulsDB.make_avts
                    orderby m.make_descr
                    select new DropDownData
                    {
                        ID = m.make_descr.TrimEnd().TrimStart(),
                        Description = m.make_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetServiceTypes()
        {
            try
            {
                return

                    from t in ulsDB.services_avts
                    orderby t.serv_descr
                    select new DropDownData
                    {
                        ID = t.serv_id.ToString(),
                        Description = t.serv_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetToolServiceTypes()
        {
            try
            {
                return

                    from t in ulsDB.tools_serv_avts
                    orderby t.too_serv_descr
                    select new DropDownData
                    {
                        ID = t.tool_serv_id.ToString(),
                        Description = t.too_serv_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetFuels()
        {
            try
            {
                return

                    from f in ulsDB.fuel_avts
                    orderby f.fuel_descr
                    select new DropDownData
                    {
                        ID = f.fuel_id.ToString(),
                        Description = f.fuel_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetModels()
        {
            try
            {
                return

                    from m in ulsDB.model_avts
                    orderby m.model_descr
                    select new DropDownData
                    {
                        ID = m.model_id.ToString(),
                        Description = m.model_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public string GetHelpMsg(string id)
        {

            try
            {

                return (from m in ulsDB.help_msgs
                        where m.help_id == id
                        select m.help_msg1).Single();
//                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        public IQueryable<DropDownData> GetModelsSearch()
        {
            try
            {
                return

                    from m in ulsDB.model_avts
                    orderby m.model_descr
                    select new DropDownData
                    {
                        ID = m.model_descr.TrimEnd().TrimStart(),
                        Description = m.model_descr.TrimEnd().TrimStart(),
                    };

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetDivisions()
        {
            try
            {
                return

                    (from d in ulsDB.division_avts
                     where d.div_name != "ULS-PA2" && d.div_name != "ULS-PA-RO"
                     orderby d.div_name
                     select new DropDownData
                     {
                         ID = d.div_name,
                         Description = d.div_name,
                     });

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetDivisions2()
        {
            try
            {
                return

                    (from d in ulsDB.division_avts
                     orderby d.div_name
                     select new DropDownData
                     {
                         ID = d.div_name,
                         Description = d.div_name,
                     });

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetAssignTo()
        {
            try
            {
                return

                    (from a in ulsDB.assign_tos
                     where a.active_status == true
                     orderby a.assign_to1
                     select new DropDownData
                     {
                         ID = a.assign_to1,
                         Description = a.assign_to1,
                     });

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<assign_to> GetGridAssignTo(string sidx, string sord)
        {
            try
            {
                return
                    ulsDB.assign_tos
                        .OrderBy(sidx + " " + sord);
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<assign_to> GetAssignToRptDlgX()
        {
            try
            {
                return

                    ulsDB.assign_tos
                    .Where("active_status == true")
                    .OrderBy("assign_to1");

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public List<SelectListItem> GetOnLoanDlg()
        {
            try
            {
                string strULSPA2 = "ULS-PA2";
                string strULSPARO = "ULS-PA-RO";
                var list = ulsDB.division_avts
                   .Where("div_name != @0 && div_name != @1", strULSPA2, strULSPARO)
                   .Select(d => new SelectListItem
                   {
                       Text = d.div_name,
                       Value = d.div_name
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

        public List<SelectListItem> GetDivs()
        {
            try
            {
                string strULSPA2 = "ULS-PA2";
                string strULSPARO = "ULS-PA-RO";
                var list = ulsDB.division_avts
                   .Where("div_name != @0 && div_name != @1", strULSPA2, strULSPARO)
                   .Select(d => new SelectListItem
                   {
                       Text = d.div_name,
                       Value = d.div_name
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "ALL", Value = "ALL" });
                list.Insert(0, new SelectListItem { Text = "", Value = "" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetTypesDlg()
        {
            try
            {
                var list = ulsDB.equip_type_avts
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

        public List<SelectListItem> GetEquipSvcDlgTypes()
        {
            try
            {
                var list = ulsDB.services_avts
                    .OrderBy("serv_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.serv_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.serv_id)
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

        public List<SelectListItem> GetEquipSvcDlgTypes2()
        {
            try
            {
                var list = ulsDB.services_avts
                    .OrderBy("serv_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.serv_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.serv_id)
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

        public List<SelectListItem> GetToolSvcDlgTypes()
        {
            try
            {
                var list = ulsDB.tools_serv_avts
                    .OrderBy("too_serv_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.too_serv_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.tool_serv_id)
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

        public List<SelectListItem> GetEquipAsgnDlgTypes()
        {
            try
            {
                var list = ulsDB.assign_tos
                   .Where("active_status == true")
                    .OrderBy("assign_to1")
                   .Select(a => new SelectListItem
                   {
                       Text = a.assign_to1.TrimEnd().TrimStart(),
                       Value = a.assign_to1.TrimEnd().TrimStart()
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

        public List<SelectListItem> GetEquipMakes()
        {
            try
            {
                var list = ulsDB.make_avts
                    .OrderBy("make_descr")
                   .Select(m => new SelectListItem
                   {
                       Text = m.make_descr.TrimEnd().TrimStart(),
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

        public List<SelectListItem> GetEquipModels()
        {
            try
            {
                var list = ulsDB.model_avts
                    .OrderBy("model_descr")
                   .Select(m => new SelectListItem
                   {
                       Text = m.model_descr.TrimEnd().TrimStart(),
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

        public List<SelectListItem> GetToolDlgMfgs()
        {
            try
            {
                var list = ulsDB.tool_mfgs_avts
                    .OrderBy("tool_mfg_descr")
                   .Select(m => new SelectListItem
                   {
                       Text = m.tool_mfg_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(m.tool_mfg_id)
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

        public List<SelectListItem> GetToolDlgDescs()
        {
            try
            {
                var list = ulsDB.tools_descr_avts
                    .OrderBy("tools_descr_descr")
                   .Select(d => new SelectListItem
                   {
                       Text = d.tools_descr_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(d.tools_descr_id)
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

        public List<SelectListItem> GetToolDlgTypes()
        {
            try
            {
                var list = ulsDB.tools_item_avts
                    .OrderBy("tools_type_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.tools_type_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.tools_type_id)
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

        public List<SelectListItem> GetToolDlgSizes()
        {
            try
            {
                var list = ulsDB.tool_size_avts
                    .OrderBy("size_descr")
                   .Select(s => new SelectListItem
                   {
                       Text = s.size_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(s.size_id)
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

        public List<SelectListItem> GetEquipTypes()
        {
            try
            {
                var list = ulsDB.equip_type_avts
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

        public List<SelectListItem> GetEquipTypes2()
        {
            try
            {
                var list = ulsDB.equip_type_avts
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

        public List<SelectListItem> GetEquipLocs()
        {
            try
            {
                var list = ulsDB.equip_loc_avts
                    .OrderBy("equip_loc")
                   .Select(l => new SelectListItem
                   {
                       Text = l.equip_loc.TrimEnd().TrimStart(),
                       Value = l.equip_loc.TrimEnd().TrimStart()
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

        public List<SelectListItem> GetEquipDivs()
        {
            try
            {

                string strULSPA2 = "ULS-PA2";
                string strULSPARO = "ULS-PA-RO";
                var list = ulsDB.division_avts
                   .Where("div_name != @0 && div_name != @1", strULSPA2, strULSPARO)
                   .OrderBy("div_name")
                   .Select(d => new SelectListItem
                   {
                       Text = d.div_name.TrimEnd().TrimStart(),
                       Value = d.div_name.TrimEnd().TrimStart()
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

        public List<SelectListItem> GetToolTypesDlg()
        {
            try
            {
                var list = ulsDB.tools_item_avts
                    .OrderBy("tools_type_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.tools_type_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.tools_type_id)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "0" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetEquipIdsDlg()
        {
            try
            {
                var list = ulsDB.equipments
                    .OrderBy("equip_id")
                   .Select(e => new SelectListItem
                   {
                       Text = e.equip_id,
                       Value = e.equip_id
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "0" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetToolIdsDlg()
        {
            try
            {
                var list = ulsDB.tools
                    .OrderBy("tool_id")
                   .Select(t => new SelectListItem
                   {
                       Text = t.tool_id,
                       Value = t.tool_id
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "0" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }


        public List<SelectListItem> GetToolDescrsDlg()
        {
            try
            {
                var list = ulsDB.tools_descr_avts
                    .OrderBy("tools_descr_descr")
                   .Select(t => new SelectListItem
                   {
                       Text = t.tools_descr_descr.TrimEnd().TrimStart(),
                       Value = Convert.ToString(t.tools_descr_id)
                   })
               .ToList();
                list.Insert(0, new SelectListItem { Text = "", Value = "0" });

                return list;
            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }
        }

        public List<SelectListItem> GetLocationsDlg()
        {
            try
            {
                var list = ulsDB.equip_loc_avts
                   .Select(l => new SelectListItem
                   {
                       Text = l.equip_loc,
                       Value = l.equip_loc
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


        public List<SelectListItem> GetAssignToRptDlg()
        {
            try
            {
                var list = ulsDB.assign_tos
                   .Select(a => new SelectListItem
                   {
                       Text = a.assign_to1,
                       Value = a.assign_to1
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

        public List<SelectListItem> GetEquipIdsRptDlg(string div)
        {
            try
            {
                var list = ulsDB.equipments
                    .Where("registered_by = @0 || managed_by = @0", div)
                    .OrderBy("equip_id")
                   .Select(e => new SelectListItem
                   {
                       Text = e.equip_id,
                       Value = e.equip_id
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

        public List<SelectListItem> GetToolIdsRptDlg(string div)
        {
            try
            {
                var list = ulsDB.tools
                    .Where("registered_by = @0 || managed_by = @0", div)
                    .OrderBy("tool_id")
                   .Select(t => new SelectListItem
                   {
                       Text = t.tool_id,
                       Value = t.tool_id
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


        public IQueryable<DropDownData> GetLocations()
        {
            try
            {
                return

                    (from l in ulsDB.equip_loc_avts
                     orderby l.equip_loc
                     select new DropDownData
                     {
                         ID = l.equip_loc,
                         Description = l.equip_loc,
                     });

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public IQueryable<DropDownData> GetConditions()
        {
            try
            {
                return

                    (from c in ulsDB.condition_avts
                     orderby c.condition_descr
                     select new DropDownData
                     {
                         ID = c.condition_id.ToString(),
                         Description = c.condition_descr,
                     });

            }
            catch (Exception ex)
            {
                string strErr = ex.Message;
                return null;
            }

        }

        public service GetService(int svcID)
        {
            return ulsDB.services.SingleOrDefault(s => s.service_id == svcID);
        }

        // Save changes to database
        public void Save()
        {
            ulsDB.SubmitChanges();
        }

        public float? GetServiceDueNum(string  equipID)
        {
            return
                //                Convert.ToDouble((from sd in ulsDB.service_due_parms
                //                                  join e in ulsDB.equipments on sd.type_id equals e.type_id
                //                                  select sd.service_every
                //                 ).Where("equip_id = @0", equipID));
            (from e in ulsDB.equipments
             join sd in ulsDB.service_due_parms on e.type_id equals sd.type_id
             where e.equip_id == equipID
             select sd.service_every).First();
             ;

        }

        public short GetMaxEquipTypeID()
        {
            return
                (from t in ulsDB.equip_type_avts
                 select t.type_id
                 ).Max();

        }

        public short GetMaxMakeTypeID()
        {
            return
                (from t in ulsDB.make_avts
                 select t.make_id
                 ).Max();

        }

        public short GetMaxModelTypeID()
        {
            return
                (from t in ulsDB.model_avts
                 select t.model_id
                 ).Max();
        }

        public short GetMaxToolTypeID()
        {
            return
                (from t in ulsDB.tools_item_avts
                 select t.tools_type_id
                 ).Max();
        }

        public short GetMaxToolDescID()
        {
            return
                (from t in ulsDB.tools_descr_avts
                 select t.tools_descr_id
                 ).Max();
        }

        public short GetMaxToolManfID()
        {
            return
                (from t in ulsDB.tool_mfgs_avts
                 select t.tool_mfg_id
                 ).Max();
        }

        public int GetMaxToolSizeID()
        {
            return
                (from t in ulsDB.tool_size_avts
                 select t.size_id
                 ).Max();
        }


    }
}
