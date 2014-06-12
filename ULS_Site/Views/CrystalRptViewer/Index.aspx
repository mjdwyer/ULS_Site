<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 
    
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />


	<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
   { %>
    <script type="text/javascript" src="/Scripts/EquipTracker.js"></script>
    <%}%>
	<%else if (Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
   { %>
    <script type="text/javascript" src="/Scripts/EquipTrackerRO2.js"></script>
    <%}%>
   <%else { %>
    <script type="text/javascript" src="/Scripts/EquipTrackerRO.js"></script>
   <% }%>
    <script type="text/javascript" src="/Scripts/EquipTrackerFuncs.js"></script>
    <script type="text/javascript" src="/Scripts/superfish.js"></script>
    <script type="text/javascript" src="/Scripts/supersubs.js"></script>
    <script type="text/javascript" src="/Scripts/superfish-navbar.js"></script>
	<script type="text/javascript">

		    // initialise plugins
		    jQuery(function() {
                $("ul.sf-menu").supersubs({ 
                    minWidth:    12,   // minimum width of sub-menus in em units 
                    maxWidth:    27,   // maximum width of sub-menus in em units 
                    extraWidth:  1     // extra width can ensure lines don't sometimes turn over 
                                       // due to slight rounding differences and font-family
                }).superfish();  // call supersubs first, then superfish, so that subs are
              		    });

  		    $(function() {
  		        $('input').filter('.datepicker').datepicker({
  		            changeMonth: true,
  		            changeYear: true
  		        });
  		    });
	</script>
    
</asp:Content>
    
<script runat="server" >
    
        
        protected void Page_Init(object sender, EventArgs e)
        {
//            CrystalReportViewer1.ToolbarImagesFolderUrl = Server.MapPath("~/Reports/ReportImages");
//            CrystalReportViewer1.ToolbarImagesFolderUrl = "../../Reports/ReportImages";
            CrystalDecisions.Shared.ToolbarStyle toolbarStyle = new CrystalDecisions.Shared.ToolbarStyle();
            toolbarStyle.BackColor = System.Drawing.Color.LightGray;
            CrystalReportViewer1.ToolbarStyle = toolbarStyle;
            CrystalReportViewer1.HasCrystalLogo = false;
            
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
//                System.Data.SqlClient.SqlConnection sqlcon = new System.Data.SqlClient.SqlConnection("Data Source=sql394.mysite4now.com;Initial Catalog=ULS_db1;User ID=uls2008;Password=2008uls");
                System.Data.SqlClient.SqlConnection sqlcon = new System.Data.SqlClient.SqlConnection("Data Source=(local);Initial Catalog=ULS_db1;User ID=uls2008;Password=uls2008");
                System.Data.SqlClient.SqlCommand comand = new System.Data.SqlClient.SqlCommand();
                comand.Connection = sqlcon;
                comand.CommandText = strSP;
                comand.CommandType = System.Data.CommandType.StoredProcedure;

                switch (strRpt)
                {
                    case "EquipAssignedTo":
                        strReportPath = Server.MapPath("~/Reports/EquipAssinedTo.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;

                        break;

                    case "EquipAssignToHist":
                        strReportPath = Server.MapPath("~/Reports/EquipAssignToHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "EquipTotalInventory":
                        strReportPath = Server.MapPath("~/Reports/EquipTotalInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipTotalInvRegBy":
                        strReportPath = Server.MapPath("~/Reports/EquipTotalInvRegBy.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipBrokenHist":
                        strReportPath = Server.MapPath("~/Reports/EquipBrokeHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "EquipMngByHist":
                        strReportPath = Server.MapPath("~/Reports/EquipMngByHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@mngBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@mngBy"].Value = strParm2;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm3);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm4);

                        break;

                    case "EquipmentOnLoan":
                        strReportPath = Server.MapPath("~/Reports/EquipmentOnLoan.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@manageBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@manageBy"].Value = strParm2;

                        break;

                    case "EquipmentInvByType":
                        strReportPath = Server.MapPath("~/Reports/EquipmentInvByType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@type_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@type_id"].Value = Convert.ToInt32(strParm2);

                        break;

                    case "EquipInspectionDue":
                        strReportPath = Server.MapPath("~/Reports/EquipInspectionDue.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@startDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@startDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@endDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@endDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "EquipInspectionDueMngBy":
                        strReportPath = Server.MapPath("~/Reports/EquipInspectionDueMngBy.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@startDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@startDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@endDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@endDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "EquipInvByLoc":
                        strReportPath = Server.MapPath("~/Reports/EquipInvByLoc.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@workLoc", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@workLoc"].Value = strParm2;

                        break;

                    case "EquipHUTInv": 

                        strReportPath = Server.MapPath("~/Reports/EquipHUTInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipApportionedInv":

                        strReportPath = Server.MapPath("~/Reports/EquipApportionedInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipLojackInv": 

                        strReportPath = Server.MapPath("~/Reports/EquipLojackInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipToBeSoldInv": 

                        strReportPath = Server.MapPath("~/Reports/EquipToBeSold.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ToolsToBeSold": 

                        strReportPath = Server.MapPath("~/Reports/ToolToBeSold.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipUnknownInventory":

                        strReportPath = Server.MapPath("~/Reports/EquipUnknownInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipGPSInv":

                        strReportPath = Server.MapPath("~/Reports/EquipGPSInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipEZPASSInv":

                        strReportPath = Server.MapPath("~/Reports/EquipEZPASS.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipFuelCardInv":

                        strReportPath = Server.MapPath("~/Reports/EquipFuelCard.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipLeasedInv":

                        strReportPath = Server.MapPath("~/Reports/EquipLeasedInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "EquipIFTAInv":

                        strReportPath = Server.MapPath("~/Reports/EquipIFTAInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ToolsAssignedTo":
                        strReportPath = Server.MapPath("~/Reports/ToolsAssignedTo.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;

                        break;

                    case "ToolsAssignedToHist":
                        strReportPath = Server.MapPath("~/Reports/ToolsAssignedToHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "ToolsBrokenHist":
                        strReportPath = Server.MapPath("~/Reports/ToolsBrokenHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "ToolsOnLoan":
                        strReportPath = Server.MapPath("~/Reports/ToolsOnLoan.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@manageBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@manageBy"].Value = strParm2;

                        break;

                    case "ToolsInvByType":
                        strReportPath = Server.MapPath("~/Reports/ToolsInvByType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@type", System.Data.SqlDbType.Int));
                        comand.Parameters["@type"].Value = Convert.ToInt32(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@descr", System.Data.SqlDbType.Int));
                        comand.Parameters["@descr"].Value = Convert.ToInt32(strParm3);

                        break;

                    case "ToolsTotalInv":

                        strReportPath = Server.MapPath("~/Reports/ToolsTotalInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;
                        
                    case "ToolsTotalInvRegBy":

                        strReportPath = Server.MapPath("~/Reports/ToolsTotalInvRegBy.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ToolsLojackInv":

                        strReportPath = Server.MapPath("~/Reports/ToolLojackInventory.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ToolsUnknownInv":

                        strReportPath = Server.MapPath("~/Reports/ToolsUnknownInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

                        break;

                    case "ToolInvByLoc":
                        strReportPath = Server.MapPath("~/Reports/ToolInvByLoc.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regBy", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regBy"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@workLoc", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@workLoc"].Value = strParm2;
                        
                        break;

                    case "EquipOneReport":

                        strReportPath = Server.MapPath("~/Reports/EquipOneReport.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@equip_id"].Value = strParm1;
                        break;
                        
                    case "ToolOneReport":

                        strReportPath = Server.MapPath("~/Reports/ToolOneReport.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@tool_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@tool_id"].Value = strParm1;
                        break;

                    case "EquipInvByTypeAndLoc":
                        strReportPath = Server.MapPath("~/Reports/EquipInvByTypeAndLoc.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@workLoc", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@workLoc"].Value = strParm2;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@type_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@type_id"].Value = Convert.ToInt32(strParm1);

                        break;

                    case "SmallToolsAssignedTo":
                        strReportPath = Server.MapPath("~/Reports/SmallToolsAssignedTo.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@assignedTo", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@assignedTo"].Value = strParm1;

                        break;

                    case "EquipOneSvcReport":

                        strReportPath = Server.MapPath("~/Reports/EquipOneSvcReport.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@service_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@service_id"].Value = Convert.ToInt32(strParm1);
                        break;

                    case "ToolOneSvcReport":

                        strReportPath = Server.MapPath("~/Reports/ToolOneSvcReport.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@service_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@service_id"].Value = Convert.ToInt32(strParm1);
                        break;

                    case "EquipSvcCostHist":
                        strReportPath = Server.MapPath("~/Reports/EquipSvcCostHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@equip_id"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "ToolSvcCostHistReport":
                        strReportPath = Server.MapPath("~/Reports/ToolSvcCostHistReport.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@tool_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@tool_id"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "EquipSvcCostHistByType":
                        strReportPath = Server.MapPath("~/Reports/EquipSvcCostHistByType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_type", System.Data.SqlDbType.Int));
                        comand.Parameters["@equip_type"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm4;

                        break;

                    case "EquipSvcCostHistBySvcType":
                        strReportPath = Server.MapPath("~/Reports/EquipSvcCostHistBySvcType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@serv_perf_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@serv_perf_id"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm4;

                        break;

                    case "ToolSvcCostHistBySvcType":
                        strReportPath = Server.MapPath("~/Reports/ToolSvcCostHistReportBySvcType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@serv_perf_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@serv_perf_id"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm4;

                        break;

                    case "EquipSvcCostHistAll":
                        strReportPath = Server.MapPath("~/Reports/EquipSvcCostHistAll.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm1);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm3;

                        break;

                    case "ToolSvcCostHistByType":
                        strReportPath = Server.MapPath("~/Reports/ToolSvcCostHistByType.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@item_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@item_id"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm4;

                        break;

                    case "ToolSvcCostHistAll":
                        strReportPath = Server.MapPath("~/Reports/ToolSvcCostHistAll.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm1);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm3;

                        break;

                    case "EquipSvcCostHistAllTypesDivs":
                        strReportPath = Server.MapPath("~/Reports/EquipSvcCostHistAllTypesDivs.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_type", System.Data.SqlDbType.Int));
                        comand.Parameters["@equip_type"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@serv_perf_id", System.Data.SqlDbType.Int));
                        comand.Parameters["@serv_perf_id"].Value = strParm2;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm5);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm6);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regby"].Value = strParm3;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@mngby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@mngby"].Value = strParm4;

                        break;

                    case "EquipInvWithCost":
                        strReportPath = Server.MapPath("~/Reports/EquipInvWithCost.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_type", System.Data.SqlDbType.Int));
                        comand.Parameters["@equip_type"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regby"].Value = strParm2;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@mngby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@mngby"].Value = strParm3;

                        break;

                    case "EquipInvByGVW":
                        strReportPath = Server.MapPath("~/Reports/EquipInvByGVW.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@gvw_type", System.Data.SqlDbType.Int));
                        comand.Parameters["@gvw_type"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@regby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@regby"].Value = strParm2;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@mngby", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@mngby"].Value = strParm3;

                        break;

                    case "EquipChangeLogByID":

                        strReportPath = Server.MapPath("~/Reports/EquipChangeLogByID.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@equip_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@equip_id"].Value = strParm1;

                        break;

                    case "ToolsChangeLogByID":

                        strReportPath = Server.MapPath("~/Reports/ToolsChangeLogByID.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@tool_id", System.Data.SqlDbType.VarChar, 15));
                        comand.Parameters["@tool_id"].Value = strParm1;

                        break;

                    case "EquipChangeLogHist":
                        strReportPath = Server.MapPath("~/Reports/EquipChangeLogHst.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm1);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm2);

                        break;

                    case "ToolsChangeLogHist":
                        strReportPath = Server.MapPath("~/Reports/ToolsChangeLogHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm1);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm2);

                        break;

                    case "EquipFuelCardDivInv":
                        strReportPath = Server.MapPath("~/Reports/EquipFuelCardDivInv.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@div"].Value = strParm1;

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

    <div id="export_dlg" title="">
        <form id="expDlgForm"  action="/EquipTrack/ExportToExcel" method="post">         
        <br />
        <p style="padding-left:180px"><input type="submit" value="Start Export" id="btnExport" style="float:left" onclick="ShowExpFormWait()"/> 
        <input type="button" onclick="CloseExportDialog()" value="Close" id="Button4" /></p>
        <p></p> 
        <input type="hidden"  id="hdnExportType" name="hdnExportType" value=""/>
        <br />
        </form>         
    </div>

    <div id="rpt_dialog" title="">
        <form id="rptDlgForm"  action="/EquipTrack/ShowReport" method="post">         
        <center>
        <div id="rpt_dlg_results"></div>
        </center>
        <p style="padding-left:180px"><input type="submit" value="Show report" id="btnSubmit" style="float:left" onclick="ShowRptFormWait()"/> 
        <input type="button" onclick="CloseReportDialog()" value="Close" id="Button2" /></p>
        <p></p> 
        <input type="hidden"  id="hdnReportName" name="hdnReportName" value=""/>
        <input type="hidden"  id="hdnID" name="hdnID" value=""/>
        <br />
        <center><img id="rpt_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        <br />
        <img src="/Content/images/help3.gif" alt=" " width="32" height="32" onclick="ShowHelp()" style="padding-left:475px"/> 
        </form>         
    </div>

    <div id="rpt_dialog_hist" title="">
        <form id="rptDlgHistForm"  action="/EquipTrack/ShowReport" method="post">         
        <center>
        <div id="rpt_dlg_hist_results"></div>
        </center>
        <div style="float:left; padding-left:50px">From:</div>
        <input  class="datepicker" id="dtReportFrom" name="dtReportFrom" type="text" style="float:left" onchange="CheckRptHistForm()">
        <div style="float:left; padding:0 5px 0 15px">To:</div>
        <input class="datepicker" id="dtReportTo" name="dtReportTo"  type="text" style="float:left" onchange="CheckRptHistForm()">
        <br />
        <br />
        <p><input type="submit" value="Show report" id="btnShowHistRpt" style="float:left;padding-right:10px" disabled="disabled" onclick="ShowHistRptFormWait()"/> 
        <input type="button" onclick="CloseReportHistDialog()" value="Close" id="Button3" /></p>
        <p></p> 
        <input type="hidden"  id="hdnReportNameHist" name="hdnReportName" value=""/>
        <br />
        <center><img id="rpthist_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        <br />
        <img src="/Content/images/help3.gif" alt=" " width="32" height="32" onclick="ShowHelp()" style="padding-left:475px"/> 
        </form>         
    </div>

    <div id="img_dialog" title="Images for ">
        <form id="imageDlgForm"  action="/EquipTrack/Upload/EQUIP" method="post">         
        <p><input type="file" id="fileUpload" name="fileUpload" size="23" value="Select Image" onchange="CheckImgForm()"/> </p>
        <p><input type="submit" value="Upload Image" id="btnSave" style="float:left;padding-right:10px" onclick="ShowImageFormWait()"/> 
        <input type="button" onclick="CloseDialog()" value="Close" id="btnClose" /></p> 
        <p></p> 
        <center>
        <div id="img_results"></div>
        </center>
        <input type="hidden"  id="hdnEquipIDInit" name="hdnEntityIDInit" value=""/>
        <input type="hidden"  id="hdnImageType" name="hdnImageType" value=""/>
        <center><img id="img_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="img_dialog_assign" title="Assignment Images for ">
        <form id="imageAssgnBeforeDlgForm"  action="/EquipTrack/Upload/EQUIP_ASSIGN_B" method="post">
        <h2>Before Assignment</h2>         
        <p><input type="file" id="fileUploadAssignBefore" name="fileUpload" size="23" value="Select Image" onchange="CheckBeforeImgForm()"/> </p>
        <p><input type="submit" value="Upload Image" id="btnSaveBefore" style="float:left;padding-right:10px" onclick="ShowAssignImageFormWait()"/> 
        <input type="button" onclick="CloseAssignDialog()" value="Close" id="Button1" /></p> 
        <p></p> 
        <center>
        <div id="img_assign_before_results"></div>
        </center>
        <input type="hidden"  id="hdnEquipAssignBeforeIDInit" name="hdnEntityIDInit" value=""/>
        <input type="hidden"  id="hdnAssignBeforeImageType" name="hdnImageType" value=""/>
        </form>  
               
        <form id="imageAssgnAfterDlgForm"  action="/EquipTrack/Upload/EQUIP_ASSIGN_A" method="post">
        <h2>After Assignment</h2>         
        <p><input type="file" id="fileUploadAssignAfter" name="fileUpload" size="23" value="Select Image" onchange="CheckAfterImgForm()"/> </p>
        <p><input type="submit" value="Upload Image" id="btnSaveAfter" onclick="ShowAssignImageFormWait()"/> </p> 
        <center>
        <div id="img_assign_after_results"></div>
        </center>
        <input type="hidden"  id="hdnEquipAssignAfterIDInit" name="hdnEntityIDInit" value=""/>
        <input type="hidden"  id="hdnAssignAfterImageType" name="hdnImageType" value=""/>
        </form>         
        <center><img id="img_assign_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
    </div>

    <div id="admin_dialog" title="">
        <form id="adminDlgForm"  action="/EquipTrack/SaveAdmin" method="post">
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

    <div id="admin_users_dlg" title="">
        <form id="adminusersform"  action="/EquipTrack/SaveAdminUsers" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminusersgrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>User ID</div>
        <input type="text" id="txtUserID" name="txtUserID" onkeyup="CheckUserForm()"/>
        </td>
        </tr>
        <tr>
        <td>
        <div>Division</div>
        <div id="user_divs"></div>
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
        <input type="button" onclick="AddAdminUsersDialog()" value="Add" id="btnAddUser" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmUsersDelete()" value="Delete" id="btnDelUser" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnSaveUser" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminUsersDialog()" value="Close" id="btnCloseUsersDlg" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminUsersOper" name="hdnAdminUsersOper" value=""/>
        <input type="hidden"  id="hdnAdminUsersDiv" name="hdnAdminUsersDiv" value=""/>
        <input type="hidden"  id="hdnAdminUsersID" name="hdnAdminUsersID" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminUsersSuccess" style="color:green; padding-left:240px"></div>
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

    <div id="admin_svc_dlg" title="">
        <form id="adminsvcform"  action="/EquipTrack/SaveAdminSvc" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminsvcgrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtSvcDueID" name="txtSvcDueID" style="width:85px" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Description</div>
        <input type="text" id="txtSvcDueDesc" name="txtSvcDueDesc" style="width:185px"/>
        </td>
        </tr>        
        <tr>
        <td>
        <div>Service Due every miles/hrs</div>
        <input type="text" id="txtSvcDueAmt" name="txtSvcDueAmt" style="width:85px"/>
        </td>
        </tr>        
        <tr>
        <td>
        <div>Warning within miles/hrs</div>
        <input type="text" id="txtSvcDueWarn" name="txtSvcDueWarn" style="width:85px" />
        </td>
        </tr>        
        <tr>
        <td >
        <br />
        <br />
        <input type="submit" value="Save" id="btnSaveSvcDue" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminSvcDialog()" value="Close" id="btnCloseSvcDue" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminSvcID" name="hdnAdminSvcID" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminSvcSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>
	
    <div id="admin_id_dlg" title="">
        <form id="adminidform"  action="" method="post">
        <div style="float:left;padding-right:5px"> 
        <table id="adminidgrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:5px">
        <br />
        <table>
        <tr>
        <td>
            <input type="radio" name="itemType" value="Equipment" checked="checked" onclick="ClearIDGrid()"/>Equipment
            <input type="radio" name="itemType" value="Tools" onclick="ClearIDGrid()"/>Tools
        <br />
        <br />
        <br />

        </td>
        </tr>
        <tr>
        <td>
        <div>ID starts with:</div>
        <input type="text" id="txtIDSearch" name="txtIDSearch" style="width:85px" />
        <br />
        <br />
        <br />
        </td>
        </tr>
        <tr>
        <td>
       <input type="button" onclick="FindIDs()" value="Find" id="btnIDFind" style="float:left;padding-right:15px"/>   
       <input type="button" onclick="CloseAdminIDDialog()" value="Close" id="btnIDClose" style="float:left;padding-left:10px"/>   
        </td>
        </tr>        
        </table>
        </div>
        </form>
    </div>

    <div id="help_popup" style="background-color:#CCFFFF">
    <table>
    <tr>
    <td>
    <div id="help_results" style="color:#A20000"></div>
    </td>
    </tr>
    </table>
    </div>

<div id = "menu">
		<ul class="sf-menu">
			<li class="current">
				<%= Html.ActionLink("Main", "EquipTrack", "EquipTrack", new { div = "2" }, null)%>
			</li>
			<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
            { %>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li>
						<a href="#">Equipment</a>
						<ul>
							<li><a href="#" onclick="AdminEquipTypes()">Types</a></li>
							<li><a href="#" onclick="AdminMakeTypes()">Makes</a></li>
							<li><a href="#" onclick="AdminModelTypes()">Models</a></li>
						</ul>
					</li>
					<li>
						<a href="#">Tools</a>
						<ul>
							<li><a href="#" onclick="AdminToolTypes()">Item Types</a></li>
							<li><a href="#" onclick="AdminToolDesc()">Descriptions</a></li>
							<li><a href="#" onclick="AdminToolManfs()">Manufacturers</a></li>
							<li><a href="#" onclick="AdminToolSizes()">Sizes</a></li>
						</ul>
					</li>
					<li>
						<a href="#" onclick="AdminLocations()">Equipment Locations</a>
					</li>
					<li>
						<a href="#" onclick="AdminAssignTo()">Assign To List</a>
					</li>
					<li>
						<a href="#" onclick="AdminSvcDue()">Service Due Miles/Hours</a>
					</li>
					<li>
						<a href="#" onclick="AdminFindIds()">Find IDs - All Offices</a>
					</li>
					<li>
						<a href="#" onclick="AdminUsers()">User Administration</a>
					</li>
				</ul>
			</li>
			<%} %>
			<li>
				<a href="#">Reports</a>
				<ul>
					<li><a href="#">Equipment</a>
				        <ul>
                            <li><a href="#">Inventory</a>
				            <ul>
					            <li><a href="#" onclick="AssignedToReport()" >Currently Assigned To</a></li>
					            <li><a href="#" onclick="AssignedToHistReport()">Assigned To History</a></li>
					            <li><a href="#" onclick="EquipTotalInvReport()">Total Inventory</a></li>
					            <li><a href="#" onclick="EquipTotalInvReportRegBy()">Total Inventory - Registered To</a></li>
					            <li><a href="#" onclick="EquipTotalInvWithCost()">Total Inventory - With Cost / Value</a></li>
					            <li><a href="#" onclick="EquipBrokenHistReport()">Returned Broken History</a></li>
					            <li><a href="#" onclick="EquipOnLoanReport()">On Loan</a></li>
					            <li><a href="#" onclick="EquipInvByTypeReport()">Inventory By Type</a></li>
					            <li><a href="#" onclick="EquipInspectionsDueReport()">Inspections Due</a></li>
					            <li><a href="#" onclick="EquipInvByLocReport()">Inventory By Location</a></li>
					            <li><a href="#" onclick="EquipInvByTypeandLocReport()">Inventory By Type And Location</a></li>
					            <li><a href="#" onclick="EquipHUTReport()">HUT Sticker Inventory</a></li>
					            <li><a href="#" onclick="EquipApportionedReport()">Apportined Inventory</a></li>
					            <li><a href="#" onclick="EquipLojackReport()">Lojack Inventory</a></li>
					            <li><a href="#" onclick="EquipIFTAReport()">IFTA Sticker Inventory</a></li>
					            <li><a href="#" onclick="EquipGPSReport()">GPS Inventory</a></li>
					            <li><a href="#" onclick="EquipEZPASSReport()">EZPASS Inventory</a></li>
					            <li><a href="#" onclick="EquipFuelCardReport()">Fuel Card Inventory</a></li>
					            <li><a href="#" onclick="EquipUnknownReport()">Unknown Inventory</a></li>
					            <li><a href="#" onclick="EquipLeasedReport()">Leased Inventory</a></li>
					            <li><a href="#" onclick="EquipTotalInvByGVW()">Inventory By GVW</a></li>
					            <li><a href="#" onclick="EquipToBeSold()">To Be Sold</a></li>
                            </ul>
                            </li>
                            <li><a href="#">Service Cost</a>
				            <ul>
					            <li><a href="#" onclick="EquipSvcCostHistoryReport()">Total Service Cost History By ID</a></li>
					            <li><a href="#" onclick="EquipSvcCostHistoryByTypeReport()">Total Service Cost History By Type</a></li>
					            <li><a href="#" onclick="EquipSvcCostHistoryAllReport()">Total Service Cost History (All)</a></li>
					            <li><a href="#" onclick="EquipSvcCostHistoryByServiceType()">Total Service Cost History By Service Type</a></li>
			                    <%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA" || Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
                                { %>
    					            <li><a href="#" onclick="EquipSvcCostHistoryAllTypesDivs()">Total Service Cost History For All Types And Divisions</a></li>
                                <%} %>
                            </ul>
                            </li>
	                		<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA" || Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
                            { %>
                            <li><a href="#">Change Log</a>
				            <ul>
					            <li><a href="#" onclick="EquipChangeLogByID()">Change Log By ID</a></li>
					            <li><a href="#" onclick="EquipChangeLogHist()">Change Log History</a></li> 
                            </ul>
                            </li>
                            <li><a href="#">Manage By History</a>
				            <ul>
					            <li><a href="#" onclick="EquipMngByHist()">Manage By History</a></li>
                            </ul>
                            </li>
                            <%} %>
				        </ul>
					</li>
					<li><a href="#">Tools</a>
				        <ul>
                            <li><a href="#">Inventory</a>
				            <ul>
					            <li><a href="#" onclick="ToolAssignedToReport()">Currently Assigned To</a></li>
					            <li><a href="#" onclick="ToolsAssignedToHistReport()">Assigned To History</a></li>
					            <li><a href="#" onclick="ToolsBrokenHistReport()">Returned Broken History</a></li>
					            <li><a href="#" onclick="ToolsOnLoanReport()">On Loan</a></li>
					            <li><a href="#" onclick="ToolsInvByTypeReport()">Inventory By Type</a></li>
					            <li><a href="#" onclick="ToolsTotalInvReport()">Total Inventory</a></li>
					            <li><a href="#" onclick="ToolsTotalInvReportRegBy()">Total Inventory - Registered To</a></li>
					            <li><a href="#" onclick="ToolsLojackInvReport()">Lojack Inventory</a></li>
					            <li><a href="#" onclick="ToolsInvByLocReport()">Inventory By Location</a></li>
					            <li><a href="#" onclick="ToolsUnknownInvReport()">Unknown Inventory</a></li>
					            <li><a href="#" onclick="ToolsToBeSoldReport()">To Be Sold</a></li>
					        </ul>
                            </li>
                            <li><a href="#">Service Cost</a>
				            <ul>
					            <li><a href="#" onclick="ToolSvcCostHistoryReport()">Total Service Cost History By ID</a></li>
					            <li><a href="#" onclick="ToolSvcCostHistoryByTypeReport()">Total Service Cost History By Type</a></li>
					            <li><a href="#" onclick="ToolSvcCostHistoryAllReport()">Total Service Cost History (All)</a></li>
					            <li><a href="#" onclick="ToolSvcCostHistoryByServiceType()">Total Service Cost History By Service Type</a></li>
					        </ul>
                            </li>
	                		<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA" || Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
                            { %>
                            <li><a href="#">Change Log</a>
				            <ul>
					            <li><a href="#" onclick="ToolsChangeLogByID()">Change Log By ID</a></li>
					            <li><a href="#" onclick="ToolsChangeLogHist()">Change Log History</a></li> 
                            </ul>
                            </li>
                            <%} %>
				        </ul>
					</li>
					<li><a href="#">SmallTools</a>
				        <ul>
					        <li><a href="#" onclick="SmallToolAssignedToReport()">Currently Assigned To</a></li>
				        </ul>
					</li>
				</ul>
			</li>
			<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA" || Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
            { %>
			<li>
				<a href="#">Office</a>
				<ul>
					<li><%= Html.ActionLink("ULS-PA", "EquipTrack", "EquipTrack", new { div = "ULS-PA" }, null)%></li>
					<li><%= Html.ActionLink("GW", "EquipTrack", "EquipTrack", new { div = "GW" }, null)%></li>
					<li><%= Html.ActionLink("ULS-MD", "EquipTrack", "EquipTrack", new { div = "ULS-MD" }, null)%></li>
					<li><%= Html.ActionLink("ULS-NJ", "EquipTrack", "EquipTrack", new { div = "ULS-NJ" }, null)%></li>
					<li><%= Html.ActionLink("ULS-PL", "EquipTrack", "EquipTrack", new { div = "ULS-PL" }, null)%></li>
					<li><%= Html.ActionLink("ULS-VA", "EquipTrack", "EquipTrack", new { div = "ULS-VA" }, null)%></li>
				</ul>
			</li>
			<%
            } %>
			<li>
				<a href="#">Export</a>
				<ul>
					        <li><a href="#" onclick="ExportEquipGrid()">Equipment To Excel</a></li>
					        <li><a href="#" onclick="ExportToolsGrid()">Tools To Excel</a></li>
					        <li><a href="#" onclick="ExportSmallToolsGrid()">Small Tools To Excel</a></li>
				</ul>
			</li>
		</ul>
</div><br /><br /><br />


    <form id="Form1" runat="server">
     <div >
        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server"
            HasCrystalLogo="False" DisplayGroupTree="False"
            HasToggleGroupTreeButton="False" EnableDatabaseLogonPrompt="False" 
            ReuseParameterValuesOnRefresh="True"  PrintMode="ActiveX" />
    </div>
    </form>

</asp:Content>


