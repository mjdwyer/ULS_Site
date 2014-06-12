<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 
    
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

    <script type="text/javascript" src="/Scripts/SvcAdmin.js"></script>
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
                

                System.Data.DataSet ds = new System.Data.DataSet();
//                System.Data.SqlClient.SqlConnection sqlcon = new System.Data.SqlClient.SqlConnection("Data Source=sql394.mysite4now.com;Initial Catalog=ULS_db1;User ID=uls2008;Password=2008uls");
                System.Data.SqlClient.SqlConnection sqlcon = new System.Data.SqlClient.SqlConnection("Data Source=(local);Initial Catalog=ULS_db1;User ID=uls2008;Password=uls2008");
                System.Data.SqlClient.SqlCommand comand = new System.Data.SqlClient.SqlCommand();
                comand.Connection = sqlcon;
                comand.CommandText = strSP;
                comand.CommandType = System.Data.CommandType.StoredProcedure;

                switch (strRpt)
                {

                    case "SvcSchedByCrewHist":
                        strReportPath = Server.MapPath("~/Reports/SvcSchedByCrewHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@crew", System.Data.SqlDbType.VarChar, 50));
                        comand.Parameters["@crew"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm2);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm3);

                        break;

                    case "SvcSchedAllCrewsHist":
                        strReportPath = Server.MapPath("~/Reports/SvcSchedAllCrewsHist.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@fromDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@fromDt"].Value = Convert.ToDateTime(strParm1);
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@toDt", System.Data.SqlDbType.DateTime));
                        comand.Parameters["@toDt"].Value = Convert.ToDateTime(strParm2);

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
            }    
        }
    
</script>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div id="rpt_svc_crew_hist" title="">
        <form id="rptDlgCrewHistForm"  action="/Service/ShowReport" method="post">         
        <center>
        <div>Crew</div>
        <select name="ddlRptCrews" id="ddlRptCrews" onchange="CheckSvcCrewHistForm()">()>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        </select>
        </center>
        <br />
        <br />
        <div style="float:left; padding-left:50px">From:</div>
        <input  class="datepicker" id="dtReportFrom" name="dtReportFrom" type="text" style="float:left" onchange="CheckSvcCrewHistForm()">
        <div style="float:left; padding:0 5px 0 15px">To:</div>
        <input class="datepicker" id="dtReportTo" name="dtReportTo"  type="text" style="float:left" onchange="CheckSvcCrewHistForm()">
        <br />
        <br />
        <p><input type="submit" value="Show report" id="btnShowHistRpt" style="float:left;padding-right:10px" disabled="disabled" onclick="ShowHistRptFormWait()"/> 
        <input type="button" onclick="CloseReportCrewHistDialog()" value="Close" id="Button3" /></p>
        <p></p> 
        <input type="hidden"  id="hdnReportNameHist" name="hdnReportNameHist" value=""/>
        <br />
        <center><img id="rpthist_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="rpt_svc_all_hist" title="">
        <form id="rptDlgAllHistForm"  action="/Service/ShowReport" method="post">         
        <div style="float:left; padding-left:50px">From:</div>
        <input  class="datepicker" id="dtReportAllFrom" name="dtReportAllFrom" type="text" style="float:left" onchange="CheckSvcAllHistForm()">
        <div style="float:left; padding:0 5px 0 15px">To:</div>
        <input class="datepicker" id="dtReportAllTo" name="dtReportAllTo"  type="text" style="float:left" onchange="CheckSvcAllHistForm()">
        <br />
        <br />
        <p><input type="submit" value="Show report" id="btnShowAllHistRpt" style="float:left;padding-right:10px" disabled="disabled" onclick="ShowAllHistRptFormWait()"/> 
        <input type="button" onclick="CloseReportAllHistDialog()" value="Close" id="Button2" /></p>
        <p></p> 
        <input type="hidden"  id="hdnAllRptName" name="hdnReportNameHist" value=""/>
        <br />
        <center><img id="rptallhist_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>



<div style="padding:10px  10px 0 0px; float:right">
<%= Html.ActionLink("Return to Service Scheduling", "SvcAdmin", "Service", null, null)%>
</div>
<div id = "menu" style="float:left">
		    <ul class="sf-menu">
			    <li class="current">
				    <a href="#" onclick="OpenAllCrewsRptDlg()">All Crews Schedule</a>
			    </li>
			    <li>
				    <a href="#" onclick="OpenByCrewRptDlg()">By Crew Schedule</a>
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


