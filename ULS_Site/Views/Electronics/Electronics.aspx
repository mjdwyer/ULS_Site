<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 

<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

	<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
   { %>
   
    <script type="text/javascript" src="/Content/javascript/ElectronicTracker.js?09"></script>
    <%}%>
	<%else if (Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
   { %>
    <script type="text/javascript" src="/Content/javascript/ElectronicTrackerRO.js?09"></script>
    <%}%>
   <%else { %>
    <script type="text/javascript" src="/Content/javascript/ElectronicTrackerRO.js?09"></script>
   <% }%>
    <script type="text/javascript" src="/Content/javascript/ElectronicTrackerFuncs.js?07"></script>
    <script type="text/javascript" src="/Content/javascript/hoverIntent.js"></script>
    <script type="text/javascript" src="/Content/javascript/superfish.js"></script>
    <script type="text/javascript" src="/Content/javascript/supersubs.js"></script>
    <script type="text/javascript" src="/Content/javascript/jquery.alphanumeric.js"></script> 
    <script type="text/javascript" src="/Content/javascript/jquery.maskedinput-1.2.2.js"></script>
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
                $("#txtElectronicsAirCardNum").mask("(999) 999-9999");
            });
            
	</script>
	

</asp:Content>


<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#electronictrak a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style>
<div id = "menu">
		<ul class="sf-menu">
			<li class="current">
				<a href="#a">Main</a>
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
    	            <li><a href="#" onclick="ElectronicsAssignedToReport()">Assigned To</a></li>
    	            <li><a href="#" onclick="ElectronicsInvByTypeReport()">Inventory</a></li>
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
        <input type="checkbox" id="chkElectronicsInRepair" name="chkElectronicsInRepair" onclick="CheckElectronicsInRepair()"/> 
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

    <div id="help_popup" style="background-color:#CCFFFF">
    <table>
    <tr>
    <td>
    <div id="help_results" style="color:#A20000"></div>
    </td>
    </tr>
    </table>
    </div>
    
    <table id="electronicsgrid" cellpadding="0" cellspacing="0"></table>
    <div id="electronicsgridp"  style="text-align:center"></div>
        <table id="electronics_asgn" cellpadding="0" cellspacing="0"></table>
    <div id="electronicsasgnp"  style="text-align:center"></div>

<input type="hidden" id="hdnDivision" value='<%= ViewData["division"] %>' />
<input type="hidden" id="hdnDefaultDiv" value='<%= ViewData["default_division"] %>' />


</asp:Content>
