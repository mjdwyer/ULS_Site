<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 
    
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

	<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
   { %>
   
    <script type="text/javascript" src="/Scripts/ElectronicTracker.js"></script>
    <%}%>
	<%else if (Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
   { %>
    <script type="text/javascript" src="/Scripts/ElectronicTrackerRO2.js"></script>
    <%}%>
   <%else { %>
    <script type="text/javascript" src="/Scripts/ElectronicTrackerRO.js"></script>
   <% }%>
    <script type="text/javascript" src="/Scripts/ElectronicTrackerFuncs.js"></script>
    <script type="text/javascript" src="/Scripts/hoverIntent.js"></script>
    <script type="text/javascript" src="/Scripts/superfish.js"></script>
    <script type="text/javascript" src="/Scripts/supersubs.js"></script>
    <script type="text/javascript" src="/Scripts/jquery.alphanumeric.js"></script> 
    <script type="text/javascript" src="/Scripts/jquery.maskedinput-1.2.2.js"></script>
	<script type="text/javascript">

	    // initialise plugins
	    jQuery(function() {
	        $("ul.sf-menu").supersubs({
	            minWidth: 12,   // minimum width of sub-menus in em units 
	            maxWidth: 27,   // maximum width of sub-menus in em units 
	            extraWidth: 1     // extra width can ensure lines don't sometimes turn over 
	            // due to slight rounding differences and font-family
	        }).superfish();  // call supersubs first, then superfish, so that subs are
	    });

	    $(function() {
	        $('input').filter('.datepicker').datepicker({
	            changeMonth: true,
	            changeYear: true
	        });
	    });


	    jQuery(function($) {
	        $("#txtElectronicsAirCardNum").mask("(999) 999-9999");
	    });
            
	</script>
</asp:Content>
    
<script runat="server" >
    
        
        protected void Page_Init(object sender, EventArgs e)
        {
            CrystalDecisions.Shared.ToolbarStyle toolbarStyle = new CrystalDecisions.Shared.ToolbarStyle();
            toolbarStyle.BackColor = System.Drawing.Color.LightGray;
            CrystalReportViewer1.ToolbarStyle = toolbarStyle;
            
            Print();
        }
    
        public void Print()
        {
            try
            {

                string strReportPath;
                string strParm1 = "";

                string strParm2 = "";

                string strParm3 = "";
                string strParm4 = "";
                string strParm5 = "";
                string strParm6 = "";

                string strValue1 = Request.QueryString["value1"];

                string[] parms = strValue1.Split(',');

                int intNumParms = parms.Count();
                
                string strRpt = parms[0];

                string strSP = parms[1];

                if (intNumParms >= 3)
                {
                    strParm1 = parms[2];
                }

                if (intNumParms >= 4)
                {
                     strParm2 = parms[3];
                }

                if (intNumParms >= 5)
                {
                    strParm3 = parms[4];
                }

                if (intNumParms >= 6)
                {
                    strParm4 = parms[5];
                }

                if (intNumParms >= 7)
                {
                    strParm5 = parms[6];
                }

                if (intNumParms >= 8)
                {
                    strParm6 = parms[7];
                }            
                

                System.Data.DataSet ds = new System.Data.DataSet();
                System.Data.SqlClient.SqlConnection sqlcon = new System.Data.SqlClient.SqlConnection("Data Source=(local);Initial Catalog=ULS_db1;User ID=uls2008;Password=uls2008");
                System.Data.SqlClient.SqlCommand comand = new System.Data.SqlClient.SqlCommand();
                comand.Connection = sqlcon;
                comand.CommandText = strSP;
                comand.CommandType = System.Data.CommandType.StoredProcedure;

                switch (strRpt)
                {
                    case "ElectronicsAssignedTo":
                        strReportPath = Server.MapPath("~/Reports/ElectronicsAssignTo.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;

                        break;

                    case "ElectronicsAssignToHist":
                        strReportPath = Server.MapPath("~/Reports/EquipAssignToHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "ElectronicsTotalInventory":
                        strReportPath = Server.MapPath("~/Reports/EquipTotalInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ElectronicsTotalInvRegBy":
                        strReportPath = Server.MapPath("~/Reports/EquipTotalInvRegBy.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ElectronicsInvByType":
                        strReportPath = Server.MapPath("~/Reports/ElectronicsInvByType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@type_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@type_id"].Value = Convert.ToInt32(strParm2);

                        break;

                    case "ElectronicsAirCardInv":
                        strReportPath = Server.MapPath("~/Reports/ElectronicsAirCardInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;

                        break;

                        
                    case "ElectronicsInvByLoc":
                        strReportPath = Server.MapPath("~/Reports/EquipInvByLoc.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@workLoc", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@workLoc"].Value = strParm2;

                        break;

                    default:
                        strReportPath = Server.MapPath("~/Reports/EquipAssinedTo.rpt");
                        break;
                }
                

                System.Data.SqlClient.SqlDataAdapter sqladp = new System.Data.SqlClient.SqlDataAdapter(comand);

                sqlcon.Open();
                sqladp.Fill(ds, "myDataSet");

                CrystalDecisions.CrystalReports.Engine.ReportDocument oRpt =  new CrystalDecisions.CrystalReports.Engine.ReportDocument();

                oRpt.Load(strReportPath);
                
                oRpt.SetDataSource(ds.Tables[0]);

                CrystalReportViewer1.ReportSource = oRpt;

                sqlcon.Close();

            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                Logit(msg);
            }    
        }

        public void Logit(string strMsg)
        {
            string logFilePath = "C:\\HostingSpaces\\admin\\ULSCorp.com\\applog\\";

            string strDay;
            strDay = "";

            switch (DateTime.Now.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    strDay = "Mon";
                    break;
                case DayOfWeek.Tuesday:
                    strDay = "Tue";
                    break;
                case DayOfWeek.Wednesday:
                    strDay = "Wed";
                    break;
                case DayOfWeek.Thursday:
                    strDay = "Thu";
                    break;
                case DayOfWeek.Friday:
                    strDay = "Fri";
                    break;
                case DayOfWeek.Saturday:
                    strDay = "Sat";
                    break;
                case DayOfWeek.Sunday:
                    strDay = "Sun";
                    break;
            }

            string logFileNamePath = logFilePath + strDay + "_" + "ulserror.log";


            System.IO.FileInfo fi = new System.IO.FileInfo(logFileNamePath);
            if (fi.Exists)
            {
                if ((fi.LastWriteTime.AddDays(5)) < DateTime.Now)
                {
                    fi.Delete();
                }
            }

            if (!fi.Exists)
            {
                System.IO.FileStream fs = new System.IO.FileStream(logFileNamePath, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite);
                System.IO.StreamWriter s = new System.IO.StreamWriter(fs);
                s.Close();
                fs.Close();
            }

            System.IO.FileStream fs1 = new System.IO.FileStream(logFileNamePath, System.IO.FileMode.Append, System.IO.FileAccess.Write);
            System.IO.StreamWriter s1 = new System.IO.StreamWriter(fs1);
            string strPtr;
            strPtr = " ==> ";

            s1.Write(DateTime.Now.ToString() + strPtr + ": " + strMsg + "\r\n");
            s1.Close();
            fs1.Close();
            
        }
    
</script>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
</style>
<div id = "menu">
		<ul class="sf-menu">
			<li class="current">
				<%= Html.ActionLink("Main", "Electronics", "Electronics", new { div = "2" }, null)%>
			</li>
			<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
            { %>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li><a href="#" onclick="AdminElectronicsTypes()">Types</a></li>
					<li><a href="#" onclick="AdminElectronicsMakes()">Makes</a></li>
					<li><a href="#" onclick="AdminElectronicsModels()">Models</a></li>
					<li>
						<a href="#" onclick="AdminLocations()">Locations</a>
					</li>
					<li>
						<a href="#" onclick="AdminAssignTo()">Assign To List</a>
					</li>
				</ul>
			</li>
			<%} else{ %>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li>
						<a href="#" onclick="AdminAssignTo()">Assign To List</a>
					</li>
				</ul>
			</li>
			
			<%}  %>
			<li>
				<a href="#">Reports</a>
				<ul>
    	            <li><a href="#" onclick="ElectronicsInvByTypeReport()">Inventory By Type</a></li>
    	            <li><a href="#" onclick="ElectronicsAirCardInvReport()">Air Cards</a></li>
				</ul>
			</li>
			<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA" || Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
            { %>
			<li>
				<a href="#">Office</a>
				<ul>
					<li><%= Html.ActionLink("ULS-PA", "Electronics", "Electronics", new { div = "ULS-PA" }, null)%></li>
					<li><%= Html.ActionLink("GW", "Electronics", "Electronics", new { div = "GW" }, null)%></li>
					<li><%= Html.ActionLink("ULS-MD", "Electronics", "Electronics", new { div = "ULS-MD" }, null)%></li>
					<li><%= Html.ActionLink("ULS-NJ", "Electronics", "Electronics", new { div = "ULS-NJ" }, null)%></li>
					<li><%= Html.ActionLink("ULS-PL", "Electronics", "Electronics", new { div = "ULS-PL" }, null)%></li>
					<li><%= Html.ActionLink("ULS-VA", "Electronics", "Electronics", new { div = "ULS-VA" }, null)%></li>
				</ul>
			</li>
			<%
            } %>
		</ul>
</div><br /><br /><br />
    <div id="electronics_asgn_edit_dlg" title="">
        <center><h2><span id="electronics_asgn_success" style="color:red">Save Successful!</span></h2></center>
        <form id="electronics_asgn_edit_form"  action="/Electronics/EditElectronicsAsgn" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtElectronicsAsgnID" name="txtElectronicsAsgnID" />
        </td>
        <td>
        <div>Assigned To</div>
        <div id="electronics_asgn_results"></div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Assign Date</div>
        <input  class="datepicker" id="dtElectronicsAsgnDt" name="dtElectronicsAsgnDt" type="text" style="float:left" onchange="CheckElectronicsAssignForm()" />
        </td>
        <td>
        <div>Return Date</div>
        <input  class="datepicker" id="dtElectronicsRetDt" name="dtElectronicsRetDt" type="text" style="float:left" />
        </td>
        </tr>  
        <tr>
        <td>
        <div>Assign Condition</div>
        <select name="ddlAsgnCond" id="ddlAsgnCond" >
        <option value=""></option>
        <option value="1">Totaled</option>
        <option value="2">Poor</option>
        <option value="3">Fair</option>
        <option value="4">Good</option>
        <option value="5">Excellent</option>
        <option value="6">New</option>
        <option value="7">Broken</option>
        <option value="8">Stolen</option>
        <option value="9">Repairs</option>
        <option value="10">Service</option>
        </select>
        </td>
        <td>
        <div>Return Condition</div>
        <select name="ddlRetCond" id="ddlRetCond" >
        <option value=""></option>
        <option value="1">Totaled</option>
        <option value="2">Poor</option>
        <option value="3">Fair</option>
        <option value="4">Good</option>
        <option value="5">Excellent</option>
        <option value="6">New</option>
        <option value="7">Broken</option>
        <option value="8">Stolen</option>
        <option value="9">Repairs</option>
        <option value="10">Service</option>
        </select>
        </td>
        </tr>       
        <tr>
        <td colspan="2">
        <div>Comments</div>
        <textarea id="txtElectronicsAsgnComments" name="txtElectronicsAsgnComments" rows="3" cols="55" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr> 
        <tr>
        <td colspan="2">
        <p style="padding-left:150px"><input type="submit" value="Save" id="btnElectronicsAsgnSave" style="float:left" onclick="ShowEditAsgnFormWait()"/> 
        <input type="button" onclick="CloseElectronicsAsgnDialog()" value="Close" id="Button6" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnAsgnEditOper" name="hdnAsgnEditOper" value=""/>
        <input type="hidden"  id="hdnAsgnEditID" name="hdnAsgnEditID" value=""/>
        <input type="hidden"  id="hdnAsgnID" name="hdnAsgnID" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="electronics_asgn_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="electronics_edit_dlg" title="">
        <center><h2><span id="electronics_success" style="color:red">Save Successful!</span></h2></center>
        <form id="electronics_edit_form"  action="/Electronics/EditElectronics" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtElectronicsID" name="txtElectronicsID" autocomplete="off" />
        </td>
        <td></td><td></td><td></td>
        </tr>
        </table>
        <div id="electronics_results"></div>
        <table>
        <tr>
        <td>
        <div>Year Purchased</div>
        <input type="text" id="txtElectronicsYear" name="txtElectronicsYear" autocomplete="off"  maxlength="4"/>
        </td>
        <td>
        <div>Serial Num</div>
        <input type="text" id="txtElectronicsSerialNum" name="txtElectronicsSerialNum" autocomplete="off" />
        </td>
        <td>
        <div>Manage By Date</div>
        <input  class="datepicker" id="dtElectronicsMngByDt" name="dtElectronicsMngByDt" type="text" style="float:left">
        </td>
        </tr>  
        <tr>
        <td>
        <div>Purchase Cost</div>
        <input type="text" id="txtElectronicsCost" name="txtElectronicsCost" autocomplete="off" />
        </td>
        <td>
        <div>Air Card Number</div>
        <input type="text" id="txtElectronicsAirCardNum" name="txtElectronicsAirCardNum" autocomplete="off" />
        </td>
        <td>
        </td>
        <td>
        </td>
        </tr>       
        <tr>
        <td>
        <div>In Repair</div>
        <input type="checkbox" id="chkElectronicsInRepair" name="chkElectronicsInRepair" onclick="CheckEquipInRepair()"/> 
        </td>
        <td>
        <div>Stolen</div>
        <input type="checkbox" id="chkElectronicsStolen" name="chkElectronicsStolen"  onclick="CheckElectronicsStolen()" />
        </td>
        <td>
        <div>Totaled</div>
        <input type="checkbox" id="chkElectronicsTotaled" name="chkElectronicsTotaled" onclick="CheckElectronicsTotaled()" />
        </td>
        <td>
        <div>Unknown</div>
        <input type="checkbox" id="chkElectronicsUnknown" name="chkElectronicsUnknown"  onclick="CheckElectronicsUnknown()" />
        </td>
        <tr>
        <td colspan="4">
        <div>Comments</div>
        <textarea id="txtElectronicsComment" name="txtElectronicsComment" rows="3" cols="90" autocomplete="off"></textarea>
        </td>
        <td></td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <p style="padding-left:250px"><input type="submit" value="Save" id="btnSaveElectronics" style="float:left" onclick="ShowEditFormWait()"/> 
        <input type="button" onclick="CloseElectronicsDialog()" value="Close" id="btnCloseElectronics" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnEditOper" name="hdnEditOper" value=""/>
        <input type="hidden"  id="hdnEditID" name="hdnEditID" value=""/>
        
        <input type="hidden"  id="hdnElectronicsInRepair" name="hdnElectronicsInRepair" value=""/>
        <input type="hidden"  id="hdnElectronicsTotaled" name="hdnElectronicsTotaled" value=""/>
        <input type="hidden"  id="hdnElectronicsStolen" name="hdnElectronicsStolen" value=""/>
        <input type="hidden"  id="hdnElectronicsUnknown" name="hdnElectronicsUnknown" value=""/>
        
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="electronics_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>
    
    <div id="admin_dialog" title="">
        <form id="adminDlgForm"  action="/Electronics/SaveAdmin" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="admingrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Id</div>
        <input type="text" id="txtID" name="txtID" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Description</div>
        <input type="text" id="txtDescription" name="txtDescription" style="width:200px" onkeyup="CheckAdminDesc(this.value)"/>
        </td>
        </tr>        
        <tr>
        <td >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="button" onclick="AddAdminDialog()" value="Add" id="btnAdminAdd" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmDelete()" value="Delete" id="btnAdminDel" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnAdminSave" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminDialog()" value="Close" id="btnAdminClose" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminType" name="hdnAdminType" value=""/>
        <input type="hidden"  id="hdnAdminOper" name="hdnAdminOper" value=""/>
        <input type="hidden"  id="hdnAdminID" name="hdnAdminID" value=""/>
       
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>
    <div id="admin_loc_dlg" title="">
        <form id="adminlocform"  action="/EquipTrack/SaveAdminLoc" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminlocgrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Location</div>
        <input type="text" id="txtLoc" name="txtLoc" onkeyup="CheckLocForm()"/>
        </td>
        </tr>
        <tr>
        <td>
        <div>Division</div>
        <div id="divisions"></div>
        </td>
        </tr>        
        <tr>
        <td >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="button" onclick="AddAdminLocDialog()" value="Add" id="btnAddLoc" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmLocDelete()" value="Delete" id="btnDelLoc" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnSaveLoc" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminLocDialog()" value="Close" id="btnCloseLoc" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminLocOper" name="hdnAdminLocOper" value=""/>
        <input type="hidden"  id="hdnAdminLocDiv" name="hdnAdminLocDiv" value=""/>
        <input type="hidden"  id="hdnAdminLocID" name="hdnAdminLocID" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminLocSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>

    <div id="admin_assignto_dlg" title="">
        <form id="adminassigntoform"  action="/EquipTrack/SaveAdminAssignTo" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminassigntogrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Name</div>
        <input type="text" id="txtName" name="txtName" onkeyup="CheckAssignToForm()"/>
        </td>
        </tr>
        <tr>
        <td>
        <div>Division</div>
        <div id="assign_divs"></div>
        </td>
        </tr>        
        <tr>
        <td>
        <div>Active</div>
        <input type="checkbox" id="chkActive" name="chkActive" />
        </td>
        </tr>        
        <tr>
        <td >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="button" onclick="AddAdminAssignToDialog()" value="Add" id="btnAddAssignTo" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmAssignToDelete()" value="Delete" id="btnDelAssignTo" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnSaveAssignTo" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminAssignToDialog()" value="Close" id="btnCloseAssignTo" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminAssignToOper" name="hdnAdminAssignToOper" value=""/>
        <input type="hidden"  id="hdnAdminAssignToDiv" name="hdnAdminAssignToDiv" value=""/>
        <input type="hidden"  id="hdnAdminAssignToID" name="hdnAdminAssignToID" value=""/>
        <input type="hidden"  id="hdnAdminAssignToStatus" name="hdnAdminAssignToStatus" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminAssignToSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>

    <div id="rpt_dialog" title="">
        <form id="rptDlgForm"  action="/Electronics/ShowReport" method="post">         
        <center>
        <div id="rpt_dlg_results"></div>
        </center>
        <p style="padding-left:180px"><input type="submit" value="Show report" id="btnSubmit" style="float:left" onclick="ShowRptFormWait()"/> 
        <input type="button" onclick="CloseReportDialog()" value="Close" id="Button2" />
         </p>
        <p></p> 
        <input type="hidden"  id="hdnReportName" name="hdnReportName" value=""/>
        <input type="hidden"  id="hdnID" name="hdnID" value=""/>
        <br />
        <center><img id="rpt_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        <br />
        <img src="/Content/images/help3.gif" alt=" " width="32" height="32" onclick="ShowHelp()" style="cursor:pointer; margin-left:475px" /> 
        </form>         
    </div>

    <form id="Form1" runat="server">
     <div >
        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server"
            HasCrystalLogo="False" DisplayGroupTree="False"
            HasToggleGroupTreeButton="False" EnableDatabaseLogonPrompt="False" 
            ReuseParameterValuesOnRefresh="True"  PrintMode="ActiveX" />
    </div>
    </form>

</asp:Content>


