<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 


<asp:Content ID="Content2" ContentPlaceHolderID="EquipHeadContent" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

    <script type="text/javascript" src="/Scripts/Qualificatons2.js?14"></script> 
    <script type="text/javascript" src="/Scripts/hoverIntent.js"></script>
    <script type="text/javascript" src="/Scripts/superfish.js"></script>
    <script type="text/javascript" src="/Scripts/supersubs.js"></script>
    <script type="text/javascript" src="/Scripts/jquery.alphanumeric.js"></script> 
    <script type="text/javascript" src="/Scripts/jquery.maskedinput.min.js"></script>
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


            jQuery(function($) {
                $("#txtSSN").mask("999-99-9999");
            });
            
            jQuery(function($) {
                $("#txtHomePhone").mask("(999) 999-9999");
            });
            jQuery(function($) {
                $("#txtCellPhone").mask("(999) 999-9999");
            });
            
	</script>
	
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#qualifications a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style>
	
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<div id = "menu">
		<ul class="sf-menu">
			<li class="current">
				<a href="#a">Main</a>
			</li>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li><a href="#" onclick="AdminCertifications()">Certifications</a></li>
					<li><a href="#" onclick="AdminEmailNotifications()">Email Notifications</a></li>
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
    <table id="empgrid" cellpadding="0" cellspacing="0"></table>
    <div id="empgridp"  style="text-align:center"></div>
    <table id="empqualsgrid" cellpadding="0" cellspacing="0"></table>
    <div id="empqualsgridp"  style="text-align:center"></div> 
  <center><h2><span id="success" style="color:green"></span></h2></center>


    <div id="employee_edit_dlg" title="">
        <center><h2><span id="employee_success" style="color:red">Save Successful!</span></h2></center>
        <form id="employee_edit_form"  action="/Qualification/EditEmp" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtEmpID" name="txtEmpID" autocomplete="off" />
        </td>
        <td>
        <div>SSN</div>
        <input type="text" id="txtSSN" name="txtSSN" autocomplete="off" />
        </td>
        <td>
        <div>Status</div>
        <select id ="ddlStatus" name="ddlStatus"  >
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>         
        </td><td></td>
        </tr>
        <tr>
        <td>
        <div>First Name</div>
        <input type="text" id="txtFName" name="txtFName" autocomplete="off" />
        </td>
        <td>
        <div>Middle Name</div>
        <input type="text" id="txtMName" name="txtMName" autocomplete="off" />
        </td>
        <td>
        <div>Last Name</div>
        <input type="text" id="txtLName" name="txtLName" autocomplete="off" />
        </td>
        <td>
        <div>Suffix</div>
        <input type="text" id="txtSuffix" name="txtSuffix" autocomplete="off" style="width:60px" />
        </td>
        </tr>  
        <tr>
        <td>
        <div>Address 1</div>
        <input type="text" id="txtAddress1" name="txtAddress1" autocomplete="off" />
        </td>
        <td>
        <div>Address 2</div>
        <input type="text" id="txtAddress2" name="txtAddress2" autocomplete="off" />
        </td>
        </tr>       
        <tr>
        <td>
        <div>City</div>
        <input type="text" id="txtCity" name="txtCity" autocomplete="off" />
        </td>
        <td>
        <div>State</div>
<!--        <input type="text" id="txtState" name="txtState" autocomplete="off" /> -->
        <select name="ddlState" id="ddlState">
            <option value=""></option>
	        <option value="AL">AL</option>
	        <option value="AK">AK</option>
	        <option value="AZ">AZ</option>
	        <option value="AR">AR</option>
	        <option value="CA">CA</option>
	        <option value="CO">CO</option>
	        <option value="CT">CT</option>
	        <option value="DE">DE</option>
	        <option value="DC">DC</option>
	        <option value="FL">FL</option>
	        <option value="GA">GA</option>
	        <option value="HI">HI</option>
	        <option value="ID">ID</option>
	        <option value="IL">IL</option>
	        <option value="IN">IN</option>
	        <option value="IA">IA</option>
	        <option value="KS">KS</option>
	        <option value="KY">KY</option>
	        <option value="LA">LA</option>
	        <option value="ME">ME</option>
	        <option value="MD">MD</option>
	        <option value="MA">MA</option>
	        <option value="MI">MI</option>
	        <option value="MN">MN</option>
	        <option value="MS">MS</option>
	        <option value="MO">MO</option>
	        <option value="MT">MT</option>
	        <option value="NE">NE</option>
	        <option value="NV">NV</option>
	        <option value="NH">NH</option>
	        <option value="NJ">NJ</option>
	        <option value="NM">NM</option>
	        <option value="NY">NY</option>
	        <option value="NC">NC</option>
	        <option value="ND">ND</option>
	        <option value="OH">OH</option>
	        <option value="OK">OK</option>
	        <option value="OR">OR</option>
	        <option value="PA">PA</option>
	        <option value="RI">RI</option>
	        <option value="SC">SC</option>
	        <option value="SD">SD</option>
	        <option value="TN">TN</option>
	        <option value="TX">TX</option>
	        <option value="UT">UT</option>
	        <option value="VT">VT</option>
	        <option value="VA">VA</option>
	        <option value="WA">WA</option>
	        <option value="WV">WV</option>
	        <option value="WI">WI</option>
	        <option value="WY">WY</option>
        </select>
        </td>
        <td>
        <div>ZIP</div>
        <input type="text" id="txtZip" name="txtZip" autocomplete="off" />
        </td>
        </tr>       
        <tr>
        <td>
        <div>Home Phone</div>
        <input type="text" id="txtHomePhone" name="txtHomePhone" autocomplete="off" />
        </td>
        <td>
        <div>Cell Phone</div>
        <input type="text" id="txtCellPhone" name="txtCellPhone" autocomplete="off" />
        </td>
        <td>
        <div>OQid</div>
        <input type="text" id="txtOqid" name="txtOqid" autocomplete="off" />
        </td>
        </tr>
        </table>
        <div id="employee_edit_results"></div>
        <table>
        <tr>
        <td>
        <div>Birth Date</div>
        <input  class="datepicker" id="dtBirthDate" name="dtBirthDate" type="text" style="float:left" />
        </td>
        <td>
        <div>Medical Card Expiration Date</div>
        <input  class="datepicker" id="dtMedCrdExpDt" name="dtMedCrdExpDt" type="text" style="float:left" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Drivers License #</div>
        <input type="text" id="txtDLNum" name="txtDLNum" autocomplete="off" />
        </td>
        <td>
        <div>Issuing State</div>
<!--        <input type="text" id="txtState" name="txtState" autocomplete="off" /> -->
        <select name="ddlDLState" id="ddlDLState">
	        <option value=""></option>
	        <option value="AL">AL</option>
	        <option value="AK">AK</option>
	        <option value="AZ">AZ</option>
	        <option value="AR">AR</option>
	        <option value="CA">CA</option>
	        <option value="CO">CO</option>
	        <option value="CT">CT</option>
	        <option value="DE">DE</option>
	        <option value="DC">DC</option>
	        <option value="FL">FL</option>
	        <option value="GA">GA</option>
	        <option value="HI">HI</option>
	        <option value="ID">ID</option>
	        <option value="IL">IL</option>
	        <option value="IN">IN</option>
	        <option value="IA">IA</option>
	        <option value="KS">KS</option>
	        <option value="KY">KY</option>
	        <option value="LA">LA</option>
	        <option value="ME">ME</option>
	        <option value="MD">MD</option>
	        <option value="MA">MA</option>
	        <option value="MI">MI</option>
	        <option value="MN">MN</option>
	        <option value="MS">MS</option>
	        <option value="MO">MO</option>
	        <option value="MT">MT</option>
	        <option value="NE">NE</option>
	        <option value="NV">NV</option>
	        <option value="NH">NH</option>
	        <option value="NJ">NJ</option>
	        <option value="NM">NM</option>
	        <option value="NY">NY</option>
	        <option value="NC">NC</option>
	        <option value="ND">ND</option>
	        <option value="OH">OH</option>
	        <option value="OK">OK</option>
	        <option value="OR">OR</option>
	        <option value="PA">PA</option>
	        <option value="RI">RI</option>
	        <option value="SC">SC</option>
	        <option value="SD">SD</option>
	        <option value="TN">TN</option>
	        <option value="TX">TX</option>
	        <option value="UT">UT</option>
	        <option value="VT">VT</option>
	        <option value="VA">VA</option>
	        <option value="WA">WA</option>
	        <option value="WV">WV</option>
	        <option value="WI">WI</option>
	        <option value="WY">WY</option>
        </select>
        </td>
        </tr>
        <tr>
        <td>
        <div>DL Class</div>
<!--        <input type="text" id="txtState" name="txtState" autocomplete="off" /> -->
        <select name="ddlDLClass" id ="ddlDLClass">
	        <option value=""></option>
	        <option value="A">A</option>
	        <option value="B">B</option>
	        <option value="C">C</option>
        </select>
        </td>
        <td>
        <div>DL Expiration Date</div>
        <input  class="datepicker" id="dtDLExpDt" name="dtDLExpDt" type="text" style="float:left" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Last MVR Check</div>
        <input  class="datepicker" id="dtMVRcheckDt" name="dtMVRcheckDt" type="text" style="float:left" />
        </td>
        <td>
        <div>Last Criminal Background Check</div>
        <input  class="datepicker" id="dtCBGcheckDt" name="dtCBGcheckDt" type="text" style="float:left" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Last Drug and Alcohol Check</div>
        <input  class="datepicker" id="dtDandAcheckDt" name="dtDandAcheckDt" type="text" style="float:left" />
        </td>
        <td>
        <div>Result</div>
        <select id ="ddlResult" name="ddlResult"  >
	        <option value=""></option>
          <option value="P">Positive</option>
          <option value="N">Negative</option>
        </select>         
        </td>
        </tr> 
        <tr> 
        <td colspan="4">
        <div>Comments</div>
        <textarea id="txtEmpComment" name="txtEmpComment" rows="3" autocomplete="off" style="width:450px"></textarea>
        </td>
        <td></td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <p style="padding-left:210px"><input type="submit" value="Save" id="btnSaveEmployee" style="float:left" onclick="ShowEditFormWait()"/> 
        <input type="button" onclick="CloseEmployeeDialog()" value="Close" id="btnCloseEmployee" /></p>
        </td>
        <td>
        <a onclick="OpenEmpWRDlg('W')" href="#">Warnings</a>
        <div style="padding-top:10px">
        <a onclick="OpenEmpWRDlg('R')" href="#">Recognitions</a>
        </div>
        </td>
        </tr>
               
        </table>
        <center><img id="employee_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>

        <input type="hidden"  id="hdnEditOper" name="hdnEditOper" value=""/>
        <input type="hidden"  id="hdnEditID" name="hdnEditID" value=""/>

        </form>         
    </div>
    
    <div id="empqual_edit_dlg" title="">
        <center><h2><span id="empqual_success" style="color:red">Save Successful!</span></h2></center>
        <form id="empqual_edit_form"  action="/Qualification/EditQualDlg" method="post">
        <table>
        <tr>
        <td>
        <div id="divCompLbl">Company</div>
        <div id = "divCompText">
        <input type="text" id="txtCompany" name="txtCompany" autocomplete="off" />
        </div>
        <div id = "divCompDDL">
        <select id ="ddlCompany" name="ddlCompany" onchange="LoadQualDDLs()"  >
	      <option value=""></option>
          <option value="MEA">MEA</option>
          <option value="OSHA">OSHA</option>
          <option value="SJG">SJG</option>
          <option value="UGI">UGI</option>
          <option value="WG">WG</option>
          <option value="PECO">PECO</option>
          <option value="VER">VER</option>
        </select>         
        </div>
        </td>
        </tr>       
        <tr>
        <td colspan="2">
        <div id="divQualLbl">Qualification</div>
        <div id = "divQualification">
        <input type="text" id="txtQualification" name="txtQualification" autocomplete="off"  style="width:375px" />
        </div>
        <div id="empqual_results"></div>
        </td>
        <td>
        <div  id="divCodeLbl">Code</div>
        <div id = "divQualCode">
        <input type="text" id="txtQualCode" name="txtQualCode" autocomplete="off" style="width:80px"  />
        </div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Test Date</div>
        <input  class="datepicker" id="dtTestDt" name="dtTestDt" type="text" style="float:left" />
        </td>
        <td>
        <div>Expire Date</div>
        <input  class="datepicker" id="dtExpireDt" name="dtExpireDt" type="text" style="float:left" />
        </td>
        </tr>  
        <tr>
        <td>
        <div>Evaluator</div>
        <input type="text" id="txtEvaluator" name="txtEvaluator" autocomplete="off" />
        </td>
        </tr>
        <tr>       
        <td colspan="3">
        <p style="padding-left:210px"><input type="submit" value="Save" id="btnSaveEmpQual" style="float:left"  onclick="ShowEmpQualFormWait()"/> 
        <input type="button" onclick="CloseEmpQualDialog()" value="Close" id="btnCloseEmpQual" /></p>
        </td>
        </tr>
               
        </table>
        <center><img id="empqual_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>

        <input type="hidden"  id="hdnEditEmpQualOper" name="hdnEditEmpQualOper" value=""/>
        <input type="hidden"  id="hdnEditQualIDs" name="hdnEditQualIDs" value=""/>
        <input type="hidden"  id="hdnEditQualEmpID" name="hdnEditQualEmpID" value=""/>

        </form>         
    </div>

    <div id="rpt_dialog" title="">
        <form id="rptDlgForm"  action="/Qualification/ShowReport" method="post"> 
        
        <center><div id="divCompRptLbl">Company</div></center>
        <center><select id ="ddlRptCompany" name="ddlRptCompany" onchange="LoadRptQualDDLs()"  >
	      <option value=""></option>
          <option value="MEA">MEA</option>
          <option value="OSHA">OSHA</option>
          <option value="SJG">SJG</option>
          <option value="UGI">UGI</option>
          <option value="WG">WG</option>
          <option value="PECO">PECO</option>
          <option value="VER">VER</option>
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
    
    <div id="admin_dialog" title="">
        <form id="adminDlgForm"  action="/Qualification/SaveAdmin" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="admingrid" cellpadding="0" cellspacing="0"></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Type</div>
        <select id ="ddlAdminCompany" name="ddlAdminCompany" onclick="AdminCompanyClick()" >
	      <option value=""></option>
          <option value="MEA">MEA</option>
          <option value="OSHA">OSHA</option>
          <option value="SJG">SJG</option>
          <option value="UGI">UGI</option>
          <option value="WG">WG</option>
          <option value="PECO">PECO</option>
          <option value="VER">VER</option>
          </select>        
        </td>
        </tr>
        <tr>
        <td>
        <div>Id</div>
        <input type="text" id="txtID" name="txtID"  autocomplete="off"/>
        </td>
        </tr>
        <tr>
        <td>
        <div>Description</div>
        <input type="text" id="txtDescription" name="txtDescription" style="width:400px" onkeyup="CheckAdminDesc(this.value)"  autocomplete="off"/>
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
        <input type="hidden"  id="hdnCompany" name="hdnCompany" value=""/>
       
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

    <div id="admin_email_dialog" title="">
        <form id="adminEmailDlgForm"  action="/Qualification/SaveEmailAdmin" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminemailgrid" cellpadding="0" cellspacing="0"></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Email</div>
        <input type="text" id="txtAdminEmail" name="txtAdminEmail"  autocomplete="off" style="width:185px"/>
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
        <input type="button" onclick="AddEmailAdminDialog()" value="Add" id="btnAddEmail" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmEmailDelete()" value="Delete" id="btnDeleteEmail" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnEmailAdminSave" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseEmailAdminDialog()" value="Close" id="btnCloseEmailAdmin" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnEmailAdminType" name="hdnEmailAdminType" value=""/>
        <input type="hidden"  id="hdnEmailAdminOper" name="hdnEmailAdminOper" value=""/>
        <input type="hidden"  id="hdnEmailAdminID" name="hdnEmailAdminID" value=""/>
      
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminEmailSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>

    <div id="empWarnRecognition_dialog" title="">
        <form id="empWarnRecognitionForm"  action="/Qualification/SaveWRAdmin" method="post">
        <table style="float:left">
        <tr>
        <td>
        <div id="empwarnrecog_results"></div>
        </td>
        <td>
        <table>
        <tr>
        <td>
        <div>Date</div>
        <input  class="datepicker" id="dtWarning" name="dtWarning" type="text" style="float:left" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Comments</div>
        <textarea id="txtWarnComments" name="txtWarnComments" rows="7" autocomplete="off" style="width:350px"></textarea>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td  colspan="2">
        <br />
        <br />
        <br />
        <input type="button" onclick="AddWRDialog()" value="Add" id="btnAddWRDate" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="confirmWRDelete()" value="Delete" id="btnDeleteWRDate" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save" id="btnSaveWRDate" style="float:left;padding-right:10px"  onclick="return CheckValidWRForm()" /> 
        <input type="button" onclick="CloseWRDialog()" value="Close" id="btnCloseWRDialog" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnWRType" name="hdnWRType" value=""/>
        <input type="hidden"  id="hdnWROper" name="hdnWROper" value=""/>
        <input type="hidden"  id="hdnWREmpID" name="hdnWREmpID" value=""/>
      
        </td>
        </tr>        
        </table>
        </form>
        <table>
        <tr>
        <td>
        <div id="warnRecognitionSuccess" style="color:green; padding-left:240px"></div>
        </td>
        </tr>
        </table>
    </div>


</asp:Content>
