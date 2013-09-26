<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="Content2" ContentPlaceHolderID="EquipHeadContent" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

    <script type="text/javascript" src="/Content/javascript/SvcAdmin.js?4"></script>
    <script type="text/javascript" src="/Content/javascript/hoverIntent.js"></script>
    <script type="text/javascript" src="/Content/javascript/superfish.js"></script>
    <script type="text/javascript" src="/Content/javascript/supersubs.js"></script>
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
	
 <style>
.ui-jqgrid {font-size:1.0em}

</style>    
	
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div id="tabs">
	<ul>
		<li><a href="#tabs-1">Schedule Days</a></li>
		<li><a href="#tabs-2">Appointments</a></li>
		<li><a href="#tabs-3">Reports</a></li>
		<li><a href="#tabs-4">Contact / Notifications</a></li>
		<li><a href="#tabs-5">Crew/Foreman</a></li>
	</ul>
	<div id="tabs-1"> 
	<table style="height:75px; width:750px;  border:solid 2px black" cellpadding="20px">
	<tr>
	<td>
        <form id="addSvcDaysForm"  action="/Service/AddSvcDates" method="post">
        <div style="float:left; padding-left:0px">From:&nbsp;&nbsp;</div>
        <input  class="datepicker" id="dtDaysFrom" name="dtDaysFrom" type="text" style="float:left" onchange="CheckSvcAddDaysForm()">
        <div style="float:left; padding:0 5px 0 15px">To:&nbsp;&nbsp;</div>
        <input class="datepicker" id="dtDaysTo" name="dtDaysTo"  type="text" style="float:left" onchange="CheckSvcAddDaysForm()" >
        <div style="float:left; padding:0 5px 0 15px">Crews:&nbsp;&nbsp;</div>
        <select name="ddlCrews" id="ddlCrews" style="float:left" onchange="CheckSvcAddDaysForm()">
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
        <div style="float:left; padding:0 0px 0 45px">
       <input type="submit" value="Add Schedule Days" id="btnAddSchedDays" style="float:left; padding: 0 15px 0 15px" /> 
        </div>
        </form>
	</td>
	</tr>
	</table>
	<br />
        <table id="scheddaysgrid" cellpadding="0" cellspacing="0"></table>
    <br />
    <div style="padding-left:50px; float:left">
       <input type="button" value="Edit Schedule Date" id="btnEditDate" onclick="OpenEditDateDialog()" /> 
     </div>  
    <div style="padding-left:50px; float:left">
       <input type="button" value="Refresh Grid" id="btnRefresh" onclick="ReloadSchedDaysGrid()" /> 
     </div> 
    <div style="padding-left:50px; float:left">
       <input type="button" value="Show Past Days" id="btnShowPastDays" onclick="OpenPastSchedDaysDlg()" /> 
     </div> 
     <br /> 
  <center><h2><span id="add_svc_dt_success" style="color:green"></span></h2></center>
  </div> 
	<div id="tabs-2">
	<table style="height:75px; width:650px;  border:solid 2px black" cellpadding="20px">
	<tr>
	<td>
        <div style="float:left; padding-left:0px">From:&nbsp;&nbsp;</div>
        <input  class="datepicker" id="dtApptDaysFrom" name="dtApptDaysFrom" type="text" style="float:left" onchange="CheckSvcApptForm()">
        <div style="float:left; padding:0 5px 0 15px">To:&nbsp;&nbsp;</div>
        <input class="datepicker" id="dtApptDaysTo" name="dtApptDaysTo"  type="text" style="float:left" onchange="CheckSvcApptForm()" >
        <div style="float:left; padding:0 0px 0 45px">
       <input type="submit" value="Reload Grid" id="btnApptReload" style="float:left; padding: 0 15px 0 15px" onclick="ReloadApptGrid()" /> 
        </div>
	</td>
	</tr>
	</table>
	<br />
        <table id="schedapptgrid" cellpadding="0" cellspacing="0"></table>
    <br />
    <div style="padding-left:0px; float:left">
       <input type="button" value="Edit Comment" id="btnEditAppt" onclick="OpenEditApptDialog()" /> 
     </div>  
    <div style="padding-left:20px; float:left">
        <form id="formGoToAdd"  action="/Service/GoToAddSvcPage" method="post">
       <input type="submit" value="Schedule Service" id="btnScheduleOne" /> 
       </form>
     </div> 
     <div style="float:left;padding-left:20px">
    <input type="button" onclick="confirmServiceDelete()" value="Delete Service" id="btnDelSvc"  /> 
    </div>
    <div style="padding-left:20px; float:left">
        <form id="formGoToResced"  action="/Service/GoToReschedSvcPage" method="post">
       <input type="submit" value="Reschedule Service" id="btnReScheduleOne" /> 
        <input type="hidden"  id="hdnPhone" name="hdnPhone" value=""/>
       </form>
     </div> 
    <div style="padding-left:20px; float:left">
       <input type="button" value="Add Past Service" id="btnAddPastSvc" onclick="OpenPastSvcDlg()" /> 
     </div>  
     <br /> 
  <center><h2><span id="appt_success" style="color:green"></span></h2></center>
	</div>
	<div id="tabs-3"> 
    <div id="maincontent3" style="padding-left:0px">
    <div id = "menu">
		    <ul class="sf-menu">
			    <li class="current">
				    <a href="#" onclick="OpenAllCrewsRptDlg()">All Crews Schedule</a>
			    </li>
			    <li>
				    <a href="#" onclick="OpenByCrewRptDlg()">By Crew Schedule</a>
			    </li>
		    </ul>
    </div><br /><br /><br />

    </div>
    </div>
	<div id="tabs-4">
	<div style="height:420px">
	<form id="SvcContactForm"  action="/Service/SaveContact" method="post">
	<table>
	<tr>
	<td colspan="2" style="font-weight:bold">Contact info displayed to customers:</td>
	<td style="width:75px"></td>
	<td style="font-weight:bold">ULS email addresses to receive appointment scheduling notification:</td>
	</tr>
	<tr><td style="height:20px"></td></tr>
	<tr>
	<td>Name:</td>
	<td>    <input type="text" id="txtName" name="txtName"  autocomplete="off" style="width:150px" value="<%=ViewData["ContactName"]%>" onkeyup="CheckContactForm()" /> 
    </td>
    <td></td>
	<td>    <input type="text" id="txtEmailNotif1" name="txtEmailNotif1"  autocomplete="off" style="width:160px" value="<%=ViewData["NotifyEmail1"]%>" onkeyup="CheckContactForm()"/> 
    </td>
	</tr>
	<tr>
	<td>Phone Number:</td>
	<td>    <input type="text" id="txtPhone" name="txtPhone"  autocomplete="off" style="width:125px" value="<%=ViewData["ContactPhone"]%>" onkeyup="CheckContactForm()"/> 
    </td>
    <td></td>
	<td>    <input type="text" id="txtEmailNotif2" name="txtEmailNotif2"  autocomplete="off" style="width:160px" value="<%=ViewData["NotifyEmail2"]%>" onkeyup="CheckContactForm()"/> 
    </td>
	</tr>
	<tr>
	<td>Email:</td>
	<td>    <input type="text" id="txtEmail" name="txtEmail"  autocomplete="off" style="width:160px" value="<%=ViewData["ContactEmail"]%>" onkeyup="CheckContactForm()"/> 
    </td>
    <td></td>
	<td>    <input type="text" id="txtEmailNotif3" name="txtEmailNotif3"  autocomplete="off" style="width:160px" value="<%=ViewData["NotifyEmail3"]%>" onkeyup="CheckContactForm()"/> 
    </td>
	</tr>
	<tr>
	<td></td>
	<td></td>
	<td></td>
	<td>
	<br />
	<br />
	
	<input type="submit" id="btnSaveContact" value="Save" />
	</td>
	</tr>
	</table>
	  <center><h2><span id="svc_contact_success" style="color:green"></span></h2></center>
	</form>
	</div> 
    </div>
	<div id="tabs-5">
	<br />
        <table id="crewsgrid" cellpadding="0" cellspacing="0"></table>
    <br />
    <div style="padding-left:10px; float:left">
       <input type="button" value="Add Crew/Foreman Pairing" id="btnAddCrew" onclick="OpenAddCrewDialog()" /> 
       <input type="button" value="Edit Crew/Foreman Pairing" id="btnEditCrew" onclick="OpenEditCrewDialog()" /> 
       <input type="button" value="Add Foreman" id="btnAddForeMan" onclick="OpenAdminForemenDialog()" /> 
     </div>  
     <br /> 
  <center><h2><span id="edit_crew_success" style="color:green"></span></h2></center>
    </div> 
    	
</div> 

    <div id="edit_date_dialog" title="">
        <form id="edDtDlgForm"  action="/Service/SaveDateEdit" method="post">
        <div style="padding-right:10px">
        <table style="height:280px">
        <tr>
        <td align="center">
        <div id="divDate" style="font-weight:bold; font-size:14px; padding-left:95px"></div>
        </td>
        </tr>
        <tr>
        <td>
        <div style="font-weight:bold; padding-left:130px">Total Crews</div>
        <div style="padding-left:150px">
        <select name="ddlEditCrews" id="ddlEditCrews">
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
        </div>
        </td>
        </tr>        
        <tr>
        <td>
        <div style="font-weight:bold; padding-left:135px">Available</div>
        <div style="padding-left:155px">
        <input type="checkbox" id="chkAvail" name="chkAvail" />
        </div>
        <br />
        </td>
        </tr>
        <tr>
        <td >
        <div style="padding-left:115px">
        <input type="submit" value="Save" id="btnAdminSave" style="float:left" />
       <input type="button" onclick="CloseAdminDialog()" value="Close" id="btnAdminClose" style="float:left"/> 
       </div>  
        <input type="hidden"  id="hdnSvcDate" name="hdnSvcDate" value=""/>
        <input type="hidden"  id="hdnSvcsSched" name="hdnSvcsSched" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="adminSuccess" style="color:green; padding-left:120px"></div>
        </td>
        </tr>
        </table>
    </div>

    <div id="SvcApptCommentDlg" title="">
        <form id="SvcApptCommentForm"  action="/Service/SaveAppt" method="post">
        <div style="padding-right:10px">
        <table style="height:280px">
        <tr>
        <td align="center">
        <div id="divSvcDate" style="font-weight:bold; font-size:14px; padding-left:95px"></div>
        <br />
        </td>
        </tr>
        <tr>
        <td>
        <div id="divName" style="font-weight:bold; font-size:14px; padding-left:75px"></div>
        <div id="divAddress" style="font-weight:bold; font-size:14px; padding-left:75px"></div>
        <div id="divCityStZip" style="font-weight:bold; font-size:14px; padding-left:75px"></div>
        <div id="divHomePhone" style="font-weight:bold; font-size:14px; padding-left:75px"></div>
        <div id="divOtherPhone" style="font-weight:bold; font-size:14px; padding-left:75px"></div>
        </td>
        </tr>
        <tr><td>
        <br />
        </td></tr> 
        <tr>
        <td>
        <div style="font-weight:bold; font-size:14px; padding-left:75px; float:left">Rescheduled:</div>
        <div id="divRescheduled" style="font-weight:bold; font-size:14px; float:left;padding-left:15px"></div>
        <br />
        <br />
        <br />
        </td>
        </tr>       
        <tr>
        <td>
        <div style="font-weight:bold; padding-left:35px">Comments</div>
        <div style="padding-left:35px">
        <textarea id="txtComments" name="txtComments" rows="3" cols="53"></textarea>
        </div>
        <br />
        </td>
        </tr>
        <tr>
        <td >
        <div style="padding-left:35px">
        <input type="submit" value="Save" id="Submit1" style="float:left" />
       <input type="button" onclick="CloseAdminApptDialog()" value="Close" id="Button1" style="float:left"/> 
       </div>  
        <input type="hidden"  id="hdnSvcid" name="hdnSvcid" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="apptsuccess" style="color:green; padding-left:120px"></div>
        </td>
        </tr>
        </table>
    </div>

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

    <div id="past_svc_dlg" title="">
        <form id="past_svc_form"  action="/Service/AddPastService" method="post">         
        <div style="float:left; padding-left:50px">Past Service Date:</div>
        <input  class="datepicker" id="dtPastSvcDt" name="dtPastSvcDt" type="text" style="float:left" onchange="CheckPastSvcForm()">
        <br />
        <br />
        <br />
        <div style="padding-left:75px;float:left"></div>
        <p><input type="submit" value="Proceed" id="btnPastSvcDt" style="float:left" disabled="disabled" onclick="ShowAllHistRptFormWait()"/> 
        <input type="button" onclick="ClosePastSvcDlg()" value="Close" id="Button4" /></p>
        <br />
        <p></p> 
        </form>         
    </div>

     <div id="edit_crews_dialog" title="">
        <center><h2><span id="crew_dlg_success" style="color:red">Save Successful!</span></h2></center>
        <form id="crewsDlgForm"  action="/Service/SaveCrewEdit" method="post">
        <div style="padding-right:10px">
        <table style="height:230px">
        <tr>
        <td align="center">
        <div id="divCrewNum" style="font-weight:bold; font-size:14px; padding-left:100px"></div>
        </td>
        </tr>
        <tr>
        <td>
        <center>
        <div id="crew_dlg_results" style="padding-left:100px"></div>
        </center>
        </td>
        </tr>        
        <tr>
        <td >
        <div style="padding-left:110px">
        <input type="submit" value="Save" id="Submit2" style="float:left" />
       <input type="button" onclick="CloseCrewDialog()" value="Close" id="btnCrewDlgClose" style="float:left"/> 
       </div>  
        <input type="hidden"  id="hdnCrewNum" name="hdnCrewNum" value=""/>
        <input type="hidden"  id="hdnCrewOper" name="hdnCrewOper" value=""/>
        </td>
        </tr> 
        <tr><td></td></tr>       
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <div id="Div1" style="color:green; padding-left:120px"></div>
        </td>
        </tr>
        </table>
    </div>
    
    <div id="admin_foremen_dlg" title="">
        <center><h2><span id="foremen_dlg_success" style="color:red">Save Successful!</span></h2></center>
        <form id="adminforemenform"  action="/Service/SaveAdminForemen" method="post">
        <div style="float:left;padding-right:10px"> 
        <table id="adminformengrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:right;padding-right:10px">
        <table style="float:left">
        <tr>
        <td>
        <div>Name</div>
        <input type="text" id="txtForemanName" name="txtForemanName" onkeyup="CheckForemenForm()" style="width:155px"/>
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
        <br />
        <br />
        <br />
        <br />
        <input type="button" onclick="AddAdminFormenDialog()" value="Add" id="btnAddForeman" style="float:left;padding-right:10px"/> 
        <input type="submit" value="Save" id="btnSaveForeman" style="float:left;padding-right:10px" /> 
       <input type="button" onclick="CloseAdminFormenDialog()" value="Close" id="btnCloseFormenDlg" style="float:left;padding-right:10px"/>   
        <input type="hidden"  id="hdnAdminFormenOper" name="hdnAdminFormenOper" value=""/>
        <input type="hidden"  id="hdnAdminFormenID" name="hdnAdminFormenID" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <center><img id="formen_loading" src="/Content/images/ajax-loader.gif" alt="xxxxxxx"/></center>
        </td>
        </tr>
        </table>
    </div>

    <div id="sched_days_hist_dlg" title="">
        <div style="float:left; padding-left:50px">From:</div>
        <input  class="datepicker" id="dtSchedDaysFrom" name="dtSchedDaysFrom" type="text" style="float:left" onchange="CheckPastSchedDaysDlg()">
        <div style="float:left; padding:0 5px 0 15px">To:</div>
        <input class="datepicker" id="dtSchedDaysTo" name="dtSchedDaysTo"  type="text" style="float:left" onchange="CheckPastSchedDaysDlg()">
        <br />
        <br />
        <br />
        <div style="padding-left:175px">
        <p><input type="button" value="Reload Grid" id="btnReloadSchedDays" style="float:left;padding-right:10px" disabled="disabled" onclick="ReloadSchedDaysGrid()"/> 
        <input type="button" onclick="ClosePastSchedDaysDialog()" value="Close" id="btnCloseSchedDays" /></p>
        </div>
        <br />
    </div>


</asp:Content>

