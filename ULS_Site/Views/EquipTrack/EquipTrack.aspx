<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Register Assembly="CrystalDecisions.Web, Version=10.5.3700.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %> 

<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <link rel="stylesheet" type="text/css" media="screen" href="../../Content/superfish.css" />

	<%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
   { %>
    <script type="text/javascript" src="/Content/javascript/EquipTracker.js?64"></script>
    <%}%>
	<%else if (Convert.ToString(ViewData["default_division"]) == "ULS-PA-RO")
   { %>
    <script type="text/javascript" src="/Content/javascript/EquipTrackerRO2.js?59"></script>
    <%}%>
   <%else { %>7
    <script type="text/javascript" src="/Content/javascript/EquipTrackerRO.js?59"></script>
   <% }%>
    <script type="text/javascript" src="/Content/javascript/EquipTrackerFuncs.js?38"></script>
    <script type="text/javascript" src="/Content/javascript/hoverIntent.js"></script>
    <script type="text/javascript" src="/Content/javascript/superfish.js"></script>
    <script type="text/javascript" src="/Content/javascript/supersubs.js"></script>
    <script type="text/javascript" src="/Content/javascript/jquery.alphanumeric.js"></script> 
	<script type="text/javascript">

		    // initialise plugins - 
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


<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#equiptrak a {
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
			<%} else{ %>
			<li>
				<a href="#">Admin</a>
				<ul>
					<li>
						<a href="#" onclick="AdminAssignTo()">Assign To List</a>
					</li>
					<li>
						<a href="#" onclick="AdminLocations()">Equipment Locations</a>
					</li>
				</ul>
			</li>
			
			<%}  %>
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
			                    <%if (Convert.ToString(ViewData["default_division"]) == "ULS-PL")
                                { %>
    					            <li><a href="#" onclick="EquipInspectionsDueReportMngBy()">Inspections Due</a></li>
                                <%} %>
			                    <% else{ %>
    					            <li><a href="#" onclick="EquipInspectionsDueReportMngBy()">Inspections Due</a></li>
			                    <%}  %>
					            <li><a href="#" onclick="EquipInvByLocReport()">Inventory By Location</a></li>
					            <li><a href="#" onclick="EquipInvByTypeandLocReport()">Inventory By Type And Location</a></li>
					            <li><a href="#" onclick="EquipHUTReport()">HUT Sticker Inventory</a></li>
					            <li><a href="#" onclick="EquipApportionedReport()">Apportined Inventory</a></li>
					            <li><a href="#" onclick="EquipLojackReport()">Lojack Inventory</a></li>
					            <li><a href="#" onclick="EquipIFTAReport()">IFTA Sticker Inventory</a></li>
					            <li><a href="#" onclick="EquipGPSReport()">GPS Inventory</a></li>
					            <li><a href="#" onclick="EquipEZPASSReport()">EZPASS Inventory</a></li>
					            <li><a href="#" onclick="EquipFuelCardReport()">Fuel Card Inventory</a></li>
					            <li><a href="#" onclick="EquipFuelCardDivReport()">Inventory By Fuel Card Division</a></li>  
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

    <div id="equip_svc_edit_dlg" title="">
        <center><h2><span id="equip_svc_success" style="color:red">Save Successful!</span></h2></center>
        <form id="equip_svc_edit_form"  action="/EquipTrack/EditEquipSvc" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtEquipSvcID" name="txtEquipSvcID" />
        </td>
        <td>
        <div>Service Date</div>
        <input  class="datepicker" id="dtEquipSvcDt" name="dtEquipSvcDt" type="text" style="float:left" onchange="CheckEquipSvcForm()" />
        </td>
        <td>
        <div>Labor Cost</div>
        <input type="text" id="txtEquipSvcLabor" name="txtEquipSvcLabor" autocomplete="off" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Type</div>
        <div id="equip_svc_results"></div>
        </td>
        <td>
        <div>Mechanic</div>
        <input type="text" id="txtEquipSvcMechanic" name="txtEquipSvcMechanic" autocomplete="off"/>
        </td>
        <td>
        <div>Parts Cost</div>
        <input type="text" id="txtEquipSvcParts" name="txtEquipSvcParts" autocomplete="off"/>
        </td>
        </tr>  
        <tr>
        <td>
        <div>Current Mileage/Hours</div>
        <input type="text" id="txtEquipSvcMiles" name="txtEquipSvcMiles" autocomplete="off" />
        </td>
       <td>
 <!--        <div>Hours</div>
        <input type="text" id="txtEquipSvcHours" name="txtEquipSvcHours" autocomplete="off"/> -->
        </td>  
        <td>
<!--        <div>Total Cost</div>
        <input type="text" id="txtEquipSvcTotal" name="txtEquipSvcTotal"autocomplete="off" />
-->        
        </td>
        </tr>       
        <tr>
        </tr>
        <tr>
        <td colspan="2">
        <div>Service Requested</div>
        <textarea id="txtEquipSvcReq" name="txtEquipSvcReq" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="2">
        <div>Service Performed</div>
        <textarea id="txtEquipSvcPerf" name="txtEquipSvcPerf" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="2">
        <div>Parts Required</div>
        <textarea id="txtEquipPartsReq" name="txtEquipPartsReq" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="2">
        <div>Comments</div>
        <textarea id="txtEquipSvcComments" name="txtEquipSvcComments" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr> 
        <tr>
        <td colspan="2">
        <p style="padding-left:180px"><input type="submit" value="Save" id="btnSaveEquipSvc" style="float:left" onclick="ShowEditSvcFormWait()"/> 
        <input type="button" onclick="CloseEquipSvcDialog()" value="Close" id="Button5" /></p>
        </td>
        <td>
        <div>Update Next Service Due</div>
        <input type="checkbox" id="chkEquipSvcDue" name="chkEquipSvcDue" checked="checked" />
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnSvcEditOper" name="hdnSvcEditOper" value=""/>
        <input type="hidden"  id="hdnSvcEditID" name="hdnSvcEditID" value=""/>
        <input type="hidden"  id="hdnSvcOldMileage" name="hdnSvcOldMileage" value=""/>
        <input type="hidden"  id="hdnSvcOldHours" name="hdnSvcOldHours" value=""/>
        <input type="hidden"  id="hdnSvcID" name="hdnSvcID" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="equip_svc_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="tool_svc_edit_dlg" title="">
        <center><h2><span id="tool_svc_success" style="color:red">Save Successful!</span></h2></center>
        <form id="tool_svc_edit_form"  action="/EquipTrack/EditToolSvcDlg" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtToolSvcID" name="txtToolSvcID" />
        </td>
        <td>
        <div>Service Date</div>
        <input  class="datepicker" id="dtToolSvcDt" name="dtToolSvcDt" type="text" style="float:left" onchange="CheckToolSvcForm()" />
        </td>
        <td>
        <div>Type</div>
        <div id="tool_svc_results"></div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Mechanic</div>
        <input type="text" id="txtToolSvcMechanic" name="txtToolSvcMechanic" autocomplete="off"/>
        </td>
        <td>
        <div>Parts Cost</div>
        <input type="text" id="txtToolSvcParts" name="txtToolSvcParts" autocomplete="off"/>
        </td>
        <td>
        <div>Labor Cost</div>
        <input type="text" id="txtToolSvcLabor" name="txtToolSvcLabor" autocomplete="off" />
        </td>
        </tr>  
        <tr>
        <td colspan="3">
        <div>Service Requested</div>
        <textarea id="txtToolSvcReq" name="txtToolSvcReq" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <div>Service Performed</div>
        <textarea id="txtToolSvcPerf" name="txtToolSvcPerf" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <div>Parts Required</div>
        <textarea id="txtToolPartsReq" name="txtToolPartsReq" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <div>Comments</div>
        <textarea id="txtToolSvcComments" name="txtToolSvcComments" rows="2" cols="53" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr> 
        <tr>
        <td colspan="2">
        <p style="padding-left:180px"><input type="submit" value="Save" id="btnSaveToolSvc" style="float:left" onclick="ShowToolSvcFormWait()"/> 
        <input type="button" onclick="CloseToolSvcDialog()" value="Close" id="Button7" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnToolSvcOper" name="hdnToolSvcOper" value=""/>
        <input type="hidden"  id="hdnToolSvcToolID" name="hdnToolSvcToolID" value=""/>
        <input type="hidden"  id="hdnToolSvcID" name="hdnToolSvcID" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="tool_svc_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="equip_asgn_edit_dlg" title="">
        <center><h2><span id="equip_asgn_success" style="color:red">Save Successful!</span></h2></center>
        <form id="equip_asgn_edit_form"  action="/EquipTrack/EditEquipAsgn" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtEquipAsgnID" name="txtEquipAsgnID" />
        </td>
        <td>
        <div>Assigned To</div>
        <div id="equip_asgn_results"></div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Assign Date</div>
        <input  class="datepicker" id="dtEquipAsgnDt" name="dtEquipAsgnDt" type="text" style="float:left" onchange="CheckEquipAssignForm()" />
        </td>
        <td>
        <div>Return Date</div>
        <input  class="datepicker" id="dtEquipRetDt" name="dtEquipRetDt" type="text" style="float:left" />
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
        <td>
        <div>Assign Miles</div>
        <input type="text" id="txtEquipAsgnMiles" name="txtEquipAsgnMiles" autocomplete="off" />
        </td>
        <td>
        <div>Return Miles</div>
        <input type="text" id="txtEquipRetMiles" name="txtEquipRetMiles" autocomplete="off"/>
        </td>
        </tr>       
        <tr>
        <td>
        <div>Assign Hours</div>
        <input type="text" id="txtEquipAsgnHours" name="txtEquipAsgnHours" autocomplete="off" />
        </td>
        <td>
        <div>Return Hours</div>
        <input type="text" id="txtEquipRetHours" name="txtEquipRetHours" autocomplete="off"/>
        </td>
        </tr>       
        <tr>
        <td colspan="2">
        <div>Comments</div>
        <textarea id="txtEquipAsgnComments" name="txtEquipAsgnComments" rows="3" cols="55" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr> 
        <tr>
        <td colspan="2">
        <p style="padding-left:180px"><input type="submit" value="Save" id="btnEquipAsgnSave" style="float:left" onclick="ShowEditAsgnFormWait()"/> 
        <input type="button" onclick="CloseEquipAsgnDialog()" value="Close" id="Button6" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnAsgnEditOper" name="hdnAsgnEditOper" value=""/>
        <input type="hidden"  id="hdnAsgnEditID" name="hdnAsgnEditID" value=""/>
        <input type="hidden"  id="hdnAsgnID" name="hdnAsgnID" value=""/>
        <input type="hidden"  id="hdnAsgnOldMileage" name="hdnAsgnOldMileage" value=""/>
        <input type="hidden"  id="hdnAsgnOldHours" name="hdnAsgnOldHours" value=""/>
        <input type="hidden"  id="hdnRetOldMileage" name="hdnRetOldMileage" value=""/>
        <input type="hidden"  id="hdnAsgnFail" name="hdnAsgnFail" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="equip_asgn_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="tool_asgn_edit_dlg" title="">
        <center><h2><span id="tool_asgn_success" style="color:red">Save Successful!</span></h2></center>
        <form id="tool_asgn_edit_form"  action="/EquipTrack/EditToolAsgnDlg" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtToolAsgnID" name="txtToolAsgnID" />
        </td>
        <td>
        <div>Assigned To</div>
        <div id="tool_asgn_results"></div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Assign Date</div>
        <input  class="datepicker" id="dtToolAsgnDt" name="dtToolAsgnDt" type="text" style="float:left" onchange="CheckToolAssignForm()">
        </td>
        <td>
        <div>Return Date</div>
        <input  class="datepicker" id="dtToolRetDt" name="dtToolRetDt" type="text" style="float:left">
        </td>
        </tr>  
        <tr>
        <td>
        <div>Assign Condition</div>
        <select name="ddlToolAsgnCond" id="ddlToolAsgnCond" >
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
        <select name="ddlToolRetCond" id="ddlToolRetCond" >
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
        <textarea id="txtToolAsgnComments" name="txtToolAsgnComments" rows="3" cols="55" autocomplete="off"></textarea>
        </td>
        <td></td>
        </tr> 
        <tr>
        <td colspan="2">
        <p style="padding-left:180px"><input type="submit" value="Save" id="btnSaveToolAssign" style="float:left" onclick="ShowToolAsgnFormWait()"/> 
        <input type="button" onclick="CloseToolAsgnDialog()" value="Close" id="Button8" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnToolAsgnOper" name="hdnToolAsgnOper" value=""/>
        <input type="hidden"  id="hdnToolAsgnToolID" name="hdnToolAsgnToolID" value=""/>
        <input type="hidden"  id="hdnToolAsgnID" name="hdnToolAsgnID" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="tool_asgn_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="equip_edit_dlg" title="">
        <center><h2><span id="equip_success" style="color:red">Save Successful!</span></h2></center>
        <form id="equip_edit_form"  action="/EquipTrack/EditEquip" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtEquipID" name="txtEquipID" autocomplete="off" />
        </td>
        <td></td><td></td><td></td>
        </tr>
        </table>
        <div id="equip_results"></div>
        <table>
        <tr>
        <td>
        <div>Year</div>
        <input type="text" id="txtEquipYear" name="txtEquipYear" autocomplete="off"  maxlength="4"/>
        </td>
        <td>
        <div>Inspection Due</div>
        <input  class="datepicker" id="dtEquipInspDue" name="dtEquipInspDue" type="text" style="float:left">
        </td>
        <td>
        <div>Manage By Date</div>
        <input  class="datepicker" id="dtEquipMngByDt" name="dtEquipMngByDt" type="text" style="float:left">
        </td>
        </tr>  
        <tr>
        <td>
        <div>Miles/Hours</div>
        <input type="text" id="txtEquipMilesHours" name="txtEquipMilesHours" autocomplete="off" />
        </td>
        <td>
        <div>Milage Date</div>
        <input  class="datepicker" id="dtEquipMilesDt" name="dtEquipMilesDt" type="text" style="float:left">
        </td>
        <td>
        <div>Service Due</div>
        <input type="text" id="txtEquipSvcDue" name="txtEquipSvcDue" autocomplete="off" />
        </td>
        <td>
        <div>Current Value</div>
        <input type="text" id="txtCurrentValue" name="txtCurrentValue" autocomplete="off" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Tag Expire</div>
        <input  class="datepicker" id="dtEquipTagExp" name="dtEquipTagExp" type="text" style="float:left">
        </td>
        <td>
        <div>VIN Num</div>
        <input type="text" id="txtEquipVIN" name="txtEquipVIN" autocomplete="off" />
        </td>
        <td>
        <div>Title Num</div>
        <input type="text" id="txtEquipTitleNum" name="txtEquipTitleNum" autocomplete="off" />
        </td>
        <td>
        <div>Tag Num</div>
        <input type="text" id="txtEquipTagNum" name="txtEquipTagNum" autocomplete="off" />
        </td>
        </tr>
        <tr>
        <td>
        <div>GVW</div>
        <input type="text" id="txtEquipGVW" name="txtEquipGVW" autocomplete="off" />
        </td>
        <td>
        <div>Unlaiden Weight</div>
        <input type="text" id="txtEquipUnlaidenWt" name="txtEquipUnlaidenWt" autocomplete="off" />
        </td>
        <td>
        <div>GCW</div>
        <input type="text" id="txtEquipGCW" name="txtEquipGCW" autocomplete="off" />
        </td>
        <td>
        <div>Insp Reminder(wks)</div>
        <select name="ddlInspRmndr" id="ddlInspRmndr" >
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
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        </select>
        </td>
        </tr>
        <tr>
        <td>
        <div>Tag State</div>
        <select name="ddlTagSt" id="ddlTagSt" >
        <option value=""></option>
        <option value="DE">DE</option>
        <option value="MD">MD</option>
        <option value="NJ">NJ</option>
        <option value="NY">NY</option>
        <option value="OH">OH</option>
        <option value="PA">PA</option>
        <option value="VA">VA</option>
        <option value="WV">WV</option>
        </select>
<!--        <input type="text" id="txtTagSt" name="txtTagSt" autocomplete="off" /> -->
        </td>
        <td>
        <div>Fuel</div>
        <select name="ddlFuel" id="ddlFuel" >
        <option value=""></option>
        <option value="1">Diesel</option>
        <option value="2">Gas</option>
        </select>
        </td>
        <td>
        <div>Purchase Cost</div>
        <input type="text" id="txtCost" name="txtCost" autocomplete="off" />
        </td>
        <td>
        <div>Tag Reminder (wks)</div>
        <select name="ddlTagRmndr" id="ddlTagRmndr" >
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
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        </select>
        </td>
        </tr>       
        <tr>
        <td>
        <div>Lojack</div>
        <input type="checkbox" id="chkEquipLojack" name="chkEquipLojack" onclick="CheckEquipLojack()" />
        </td>
        <td>
        <div>In Repair</div>
        <input type="checkbox" id="chkEquipInRepair" name="chkEquipInRepair" onclick="CheckEquipInRepair()"/> 
        </td>
        <td>
        <div>Apportioned</div>
        <input type="checkbox" id="chkEquipApportioned" name="chkEquipApportioned" onclick="CheckEquipApportioned()" />
        </td>
        <td>
        <div style="float:left">Fuel Card</div>
        <span id="divFuelCard" style="float:left;padding-left:40px">#</span>
        <div style="width:1px;height:20px"></div>
        <input type="checkbox" id="chkEquipFuelCard" name="chkEquipFuelCard"  onclick="CheckEquipFuelCard()" style="float:left" />
        <div style="float:left;padding-left:25px;width:70px"><input type="text" id="txtFuelCardNum" name="txtFuelCardNum" autocomplete="off" style="width:70px"/></div>
        <div style="float:left;padding-left:25px;width:60px"><select name="ddlFuelCardLoc" id="ddlFuelCardLoc" style="width:60px" >
        <option value=" "></option>
        <option value="ULS">ULS</option>
        <option value="GWS">GWS</option>
        </select></div>
        </td>
        </tr>
        <tr>
        <td>
        <div>Totaled</div>
        <input type="checkbox" id="chkEquipTotaled" name="chkEquipTotaled" onclick="CheckEquipTotaled()" />
        </td>
        <td>
        <div>HUT Sticker</div>
        <input type="checkbox" id="chkHUTSticker" name="chkHUTSticker" onclick="CheckHUTSticker()"/>
        </td>
        <td>
        <div>IFTA Sticker</div>
        <input type="checkbox" id="chkIFTASticker" name="chkIFTASticker"  onclick="CheckIFTASticker()"/>
        </td>
        <td>
        <div style="float:left">EZPASS</div>
        <span  id="divEZPASS" style="float:left;padding-left:20px">#</span>
        <div style="width:1px;height:20px"></div>
        <input type="checkbox" id="chkEquipEZPASS" name="chkEquipEZPASS"  onclick="CheckEquipEZPASS()" style="float:left" />
        <div style="float:left;padding-left:25px"><input type="text" id="txtEZPASSNum" name="txtEZPASSNum" autocomplete="off"  /></div>
        
        </td>
        </tr>
        <tr>
        <td>
        <div>Sold</div>
        <input type="checkbox" id="chkEquipSold" name="chkEquipSold" onclick="CheckEquipSold()" />
        </td>
        <td>
        <div>Unknown</div>
        <input type="checkbox" id="chkEquipUnknown" name="chkEquipUnknown"  onclick="CheckEquipUnknown()" />
        </td>
        <td>
        <div>Leased</div>
        <input type="checkbox" id="chkEquipLeased" name="chkEquipLeased"  onclick="CheckEquipLeased()" />
        </td>
        <td>
        <div style="float:left">GPS</div>
        <span id="divGPS" style="float:left;padding-left:40px">#</span>
        <div style="width:1px;height:20px"></div>
        <input type="checkbox" id="chkEquipGPS" name="chkEquipGPS"  onclick="CheckEquipGPS()" style="float:left" />
        <div style="float:left;padding-left:25px"><input type="text" id="txtGPSNum" name="txtGPSNum" autocomplete="off"  /></div>
        
        </td>
        </tr>
        <tr>
        <td>
        <div>Stolen</div>
        <input type="checkbox" id="chkEquipStolen" name="chkEquipStolen"  onclick="CheckEquipStolen()" />
        </td>
        <td>
        <div>To Be Sold</div>
        <input type="checkbox" id="chkEquipToBeSold" name="chkEquipToBeSold"  onclick="CheckEquipToBeSold()" />
        </td>
        </tr>
        <tr>
        <td colspan="4">
        <div>Comments</div>
        <textarea id="txtEquipComment" name="txtEquipComment" rows="3" cols="90" autocomplete="off"></textarea>
        </td>
        <td></td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <p style="padding-left:250px"><input type="submit" value="Save" id="btnSaveEquip" style="float:left" onclick="ShowEditFormWait()"/> 
        <input type="button" onclick="CloseEquipDialog()" value="Close" id="btnCloseEquip" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnEditOper" name="hdnEditOper" value=""/>
        <input type="hidden"  id="hdnEditID" name="hdnEditID" value=""/>
        
        <input type="hidden"  id="hdnEquipInRepair" name="hdnEquipInRepair" value=""/>
        <input type="hidden"  id="hdnEquipApportioned" name="hdnEquipApportioned" value=""/>
        <input type="hidden"  id="hdnEquipLojack" name="hdnEquipLojack" value=""/>
        <input type="hidden"  id="hdnEquipTotaled" name="hdnEquipTotaled" value=""/>
        <input type="hidden"  id="hdnHUTSticker" name="hdnHUTSticker" value=""/>
        <input type="hidden"  id="hdnIFTASticker" name="hdnIFTASticker" value=""/>
        <input type="hidden"  id="hdnEquipStolen" name="hdnEquipStolen" value=""/>
        <input type="hidden"  id="hdnEquipSold" name="hdnEquipSold" value=""/>
        <input type="hidden"  id="hdnEquipToBeSold" name="hdnEquipToBeSold" value=""/>
        <input type="hidden"  id="hdnEquipGPS" name="hdnEquipGPS" value=""/>
        <input type="hidden"  id="hdnEquipFuelCard" name="hdnEquipFuelCard" value=""/>
        <input type="hidden"  id="hdnEquipEZPASS" name="hdnEquipEZPASS" value=""/>
        <input type="hidden"  id="hdnEquipUnknown" name="hdnEquipUnknown" value=""/>
        <input type="hidden"  id="hdnEquipLeased" name="hdnEquipLeased" value=""/>
        <input type="hidden"  id="hdnEquipRegBy" name="hdnEquipRegBy" value=""/>
        
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="equip_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="tool_edit_dlg" title="">
        <center><h2><span id="tool_dlg_success" style="color:red">Save Successful!</span></h2></center>
        <form id="tool_edit_form"  action="/EquipTrack/EditToolDlg" method="post">
        <table>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtToolID" name="txtToolID" autocomplete="off" />
        </td>
        <td></td><td></td>
        </tr>
        </table>
        <div id="tool_dlg_results"></div>
        <table>
        <tr>
        <td>
        <div>Manage By Date</div>
        <input  class="datepicker" id="dtToolMngByDt" name="dtToolMngByDt" type="text" style="float:left">
        </td>
        <td>
        <div>Model #</div>
        <input type="text" id="txtToolModelNum" name="txtToolModelNum" autocomplete="off" />
        </td>
        <td>
        <div>Serial #</div>
        <input type="text" id="txtToolSerialNum" name="txtToolSerialNum" autocomplete="off" />
        </td>
        </tr>  
        <tr>
        <td>
        <div>Year Purchased</div>
        <input type="text" id="txtToolYearPur" name="txtToolYearPur" autocomplete="off"  maxlength="4"/>
        </td>
        <td>
        <div>Cost</div>
        <input type="text" id="txtToolCost" name="txtToolCost" autocomplete="off" />
        </td>
        <td>
        <div>Calibration Due</div>
        <input  class="datepicker" id="dtCalibrationDue" name="dtCalibrationDue" type="text" style="float:left" />
        </td>
        <td>
        <div>Cal Rmndr (wks)</div>
        <select name="ddlCalibrationRmndr" id="ddlCalibrationRmndr" >
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
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        </select>
        </td>
        </tr> 
        <tr>
        <td>
        <div>Sold</div>
        <input type="checkbox" id="chkToolSold" name="chkToolSold"   onclick="CheckToolSold()"/>
        </td>
        <td>
        <div>Electrical</div>
        <input type="checkbox" id="chkToolElectrical" name="chkToolElectrical"  onclick="CheckToolElectrical()" />
        </td>
        <td>
        <div>In Repair</div>
        <input type="checkbox" id="chkToolInRepair" name="chkToolInRepair"  onclick="CheckToolInRepair()" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Totaled</div>
        <input type="checkbox" id="chkToolTotaled" name="chkToolTotaled"  onclick="CheckToolTotaled()" />
        </td>
        <td>
        <div>Stolen</div>
        <input type="checkbox" id="chkToolStolen" name="chkToolStolen"  onclick="CheckToolStolen()" />
        </td>
        <td>
        <div>Lojack</div>
        <input type="checkbox" id="chkToolLojack" name="chkToolLojack"   onclick="CheckToolLojack()"/>
        </td>
        <td>
        <div>Unknown</div>
        <input type="checkbox" id="chkToolUnknown" name="chkToolUnknown"  onclick="CheckToolUnknown()" />
        </td>
        </tr>
        <tr>
        <td>
        <div>To Be Sold</div>
        <input type="checkbox" id="chkToolToBeSold" name="chkToolToBeSold"  onclick="CheckToolToBeSold()" />
        </td>
        </tr>
        <tr>
        <td colspan="3">
        <div>Comments</div>
        <textarea id="txtToolComment" name="txtToolComment" rows="3" cols="80" autocomplete="off"></textarea>
        </td>
        <td></td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <p style="padding-left:250px"><input type="submit" value="Save" id="btnSaveToolDlg" style="float:left" onclick="ShowEditToolFormWait()"/> 
        <input type="button" onclick="CloseToolDialog()" value="Close" id="btnCloseToolDlg" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnToolOper" name="hdnToolOper" value=""/>
        <input type="hidden"  id="hdnToolID" name="hdnToolID" value=""/>
        <br />

        <input type="hidden"  id="hdnToolSold" name="hdnToolSold" value=""/>
        <input type="hidden"  id="hdnToolElectrical" name="hdnToolElectrical" value=""/>
        <input type="hidden"  id="hdnToolInRepair" name="hdnToolInRepair" value=""/>
        <input type="hidden"  id="hdnToolTotaled" name="hdnToolTotaled" value=""/>
        <input type="hidden"  id="hdnToolStolen" name="hdnToolStolen" value=""/>
        <input type="hidden"  id="hdnToolLojack" name="hdnToolLojack" value=""/>
        <input type="hidden"  id="hdnToolUnknown" name="hdnToolUnknown" value=""/>
        <input type="hidden"  id="hdnToolToBeSold" name="hdnToolToBeSold" value=""/>

        </td> 
        </tr> 
        </table>
        <center><img id="tool_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="smalltool_edit_dlg" title="">
        <center><h2><span id="smalltool_dlg_success" style="color:red">Save Successful!</span></h2></center>
        <form id="smalltool_edit_form"  action="/EquipTrack/EditSmallToolDlg" method="post">
        <table>
        <tr>
        <td>
        <div>Item</div>
        <input type="text" id="txtSmallToolItem" name="txtSmallToolItem" autocomplete="off" />
        </td>
        <td>
        <div>Description</div>
        <input type="text" id="txtSmallToolDesc" name="txtSmallToolDesc" autocomplete="off" />
        </td>
        <td>
        <div>Size</div>
        <input type="text" id="txtSmallToolSize" name="txtSmallToolSize" autocomplete="off" />
        </td>
        </tr>
        <tr>
        <td>
        <div>Manufacturer</div>
        <input type="text" id="txtSmallToolMfg" name="txtSmallToolMfg" autocomplete="off" />
        </td>
        <td>
        <div>Model #</div>
        <input type="text" id="txtSmallToolModelNum" name="txtSmallToolModelNum" autocomplete="off" />
        </td>
        <td>
        <div>Serial #</div>
        <input type="text" id="txtSmallToolSerNum" name="txtSmallToolSerNum" autocomplete="off" />
        </td>
        </tr>
        <tr>
        <td>
        <div>ID</div>
        <input type="text" id="txtSmallToolID" name="txtSmallToolID" autocomplete="off" />
        </td>
        <td>
        <div>Condition</div>
        <select name="ddlSmallToolCond" id="ddlSmallToolCond" >
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
        <div>Shop</div>
        <select name="ddlSmallToolShop" id="ddlSmallToolShop" >
        <option value=""></option>
        <option value="IN">IN</option>
        <option value="OUT">OUT</option>
        </select>
        </td>
        </tr>
        </table>
        <div id="smalltool_dlg_results"></div>
        <table>
        <tr>
        <td>
        <div>Manage By Date</div>
        <input  class="datepicker" id="dtSmallToolMngByDt" name="dtSmallToolMngByDt" type="text" style="float:left">
        </td>
        <td>
        <div>Assign Date</div>
        <input  class="datepicker" id="dtSmallToolAsgnDt" name="dtSmallToolAsgnDt" type="text" style="float:left">
        </td>
        <td>
        <div>Return Date</div>
        <input  class="datepicker" id="dtSmallToolRetDt" name="dtSmallToolRetDt" type="text" style="float:left">
        </td>
        </tr>  
        <tr>
        <td colspan="3">
        <div>Comments</div>
        <textarea id="txtSmallToolComment" name="txtSmallToolComment" rows="3" cols="80" autocomplete="off"></textarea>
        </td>
        <td></td>
        <td></td>
        </tr>       
        <tr>
        <td colspan="3">
        <p style="padding-left:250px"><input type="submit" value="Save" id="btnSmallToolSave" style="float:left" onclick="ShowSmallToolFormWait()"/> 
        <input type="button" onclick="CloseSmallToolDialog()" value="Close" id="Button9" /></p>
        </td>
        </tr>
        <tr> 
        <td>  
        <input type="hidden"  id="hdnSmallToolOper" name="hdnSmallToolOper" value=""/>
        <input type="hidden"  id="hdnSmallToolID" name="hdnSmallToolID" value=""/>
        <br />
        </td> 
        </tr> 
        </table>
        <center><img id="smalltool_loading" src="/Content/images/ajax-loader.gif" alt=""/></center>
        </form>         
    </div>

    <div id="rpt_dialog_hist" title="">
        <form id="rptDlgHistForm"  action="/EquipTrack/ShowReport" method="post">         
        <center>
        <div id="rpt_dlg_hist_results"></div>
        </center>
        <div style="float:left; padding-left:65px">From:</div> 
        <input  class="datepicker" id="dtReportFrom" name="dtReportFrom" type="text" style="float:left" onchange="CheckRptHistForm()">
        <div style="float:left; padding:0 5px 0 45px">To:</div> 
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
        <img src="/Content/images/help3.gif" alt=" " width="32" height="32" onclick="ShowHelp()" style="cursor:pointer; margin-left:475px" /> 
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
       <br/><br/> 
        <img src="/Content/images/help3.gif" alt=" " width="32" height="32" onclick="ShowHelp()" style="cursor:pointer; margin-left:250px" /> 
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
    
 <div id="tabs">
	<ul>
		<li><a href="#tabs-1">Equipment</a></li>
		<li><a href="#tabs-2">Tools</a></li>
		<li><a href="#tabs-3">Small Tools</a></li>
	</ul>
	<div id="tabs-1"> 
        <table id="equipgrid" cellpadding="0" cellspacing="0"></table>
    <div id="equipgridp"  style="text-align:center"></div>
        <table id="equip_svc" cellpadding="0" cellspacing="0"></table>
    <div id="equipsvcp"  style="text-align:center"></div>
        <table id="equip_asgn" cellpadding="0" cellspacing="0"></table>
    <div id="equipasgnp"  style="text-align:center"></div>
  <center><h2><span id="success" style="color:green"></span></h2></center>
  </div> 
	<div id="tabs-2">
        <table id="toolgrid" cellpadding="0" cellspacing="0"></table>
    <div id="toolgridp"  style="text-align:center"></div>
        <table id="tool_svc" cellpadding="0" cellspacing="0"></table>
    <div id="toolsvcp"  style="text-align:center"></div>
        <table id="tool_asgn" cellpadding="0" cellspacing="0"></table>
    <div id="toolasgnp"  style="text-align:center"></div>
  <center><h2><span id="tool_success" style="color:green"></span></h2></center>
	</div>
	<div id="tabs-3">
        <table id="smalltoolgrid" cellpadding="0" cellspacing="0"></table>
    <div id="smalltoolgridp"  style="text-align:center"></div>
  <center><h2><span id="smalltool_success" style="color:green"></span></h2></center>
	</div> 
</div> 

<input type="hidden" id="hdnDivision" value='<%= ViewData["division"] %>' />
<input type="hidden" id="hdnDefaultDiv" value='<%= ViewData["default_division"] %>' />


</asp:Content>
