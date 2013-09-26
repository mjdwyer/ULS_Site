<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 
    
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

    <script type="text/javascript" src="/Content/javascript/Qualificatons2.js?01"></script> 
    <script type="text/javascript" src="/Content/javascript/superfish.js"></script>
    <script type="text/javascript" src="/Content/javascript/supersubs.js"></script>
    <script type="text/javascript" src="/Content/javascript/superfish-navbar.js"></script>
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

                    case "EmployeeListByCertification":
                        strReportPath = Server.MapPath("~/Reports/QualEmpListByCert.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@companyId", System.Data.SqlDbType.VarChar, 25));
                        comand.Parameters["@companyId"].Value = strParm1;
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@qualId", System.Data.SqlDbType.VarChar, 25));
                        comand.Parameters["@qualId"].Value = strParm2;
                        break;

                    case "EmployeeListByCompany":
                        strReportPath = Server.MapPath("~/Reports/QualEmpListByCompany.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@companyId", System.Data.SqlDbType.VarChar, 25));
                        comand.Parameters["@companyId"].Value = strParm1;
                        break;
                    case "CertListByEmployee": 
                        strReportPath = Server.MapPath("~/Reports/CertListByEmployee.rpt");
                        comand.Parameters.Add(new System.Data.SqlClient.SqlParameter("@employeeId", System.Data.SqlDbType.Int));
                        comand.Parameters["@employeeId"].Value = strParm1;
                        break;

                    case "EmpListExpiredCerts":
                        strReportPath = Server.MapPath("~/Reports/EmployeeListExpiredCerts.rpt");
                        break;

                    case "EmpListDueToExpire90Days":
                        strReportPath = Server.MapPath("~/Reports/EmployeeListDueToExpireCerts.rpt");
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

    <div id="rpt_dialog" title="">
        <form id="rptDlgForm"  action="/Qualification/ShowReport" method="post"> 
        
        <center><div id="div1">Company</div></center>
        <center><select id ="ddlRptCompany" name="ddlRptCompany" onchange="LoadRptQualDDLs()"  >
	      <option value="NONE">  </option>
          <option value="MEA">MEA</option>
          <option value="SJG">SJG</option>
          <option value="UGI">UGI</option>
          <option value="WG">WG</option>
          <option value="PECO">PECO</option>
        </select></center>         
                
        <center>
        <div id="rpt_dlg_results"></div>
        </center>
        <br />
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
                <%= Html.ActionLink("Main", "Qualification", "Qualification", null, null)%>
			</li>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li><a href="#" onclick="AdminCertifications()">Certifications</a></li>
				</ul>
			</li>
			
			<li>
				<a href="#">Reports</a>
				<ul>
    	            <li><a href="#" onclick="EmployeeListByCertification()">Qualified Employee List by Certification</a></li>
    	            <li><a href="#" onclick="EmployeeListByCompany()">Qualified Employee List by Company</a></li>
    	            <li><a href="#" onclick="EmployeeListOfExpiredCerts()">Employee List With Expired Certifications</a></li>
    	            <li><a href="#" onclick="EmployeeListDueToExpireCerts()">Employee List With Certications Due To Expire(within 90 days)</a></li>
    	            <li><a href="#" onclick="CertListByEmployee()">Certifications For Selected Employee</a></li>
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
