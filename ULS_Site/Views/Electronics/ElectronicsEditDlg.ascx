<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Type</div>
<%= Html.DropDownList("ddlElectronicsType", (IEnumerable<SelectListItem>)ViewData["ElectronicsTypes"])%>
</td>
<td>
<div>Make</div>
<%= Html.DropDownList("ddlElectronicsMake", (IEnumerable<SelectListItem>)ViewData["ElectronicsMakes"])%>
</td>
<td>
<div>Model</div>
<%= Html.DropDownList("ddlElectronicsModel", (IEnumerable<SelectListItem>)ViewData["ElectronicsModels"])%>
</td>
</tr>
<tr>
<td>
<div>Location</div>
<%= Html.DropDownList("ddlElectronicsLoc", (IEnumerable<SelectListItem>)ViewData["ElectronicsLocs"])%>
</td>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlElectronicsRegBy", (IEnumerable<SelectListItem>)ViewData["ElectronicsDivs"])%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlElectronicsMngBy", (IEnumerable<SelectListItem>)ViewData["ElectronicsDivs"])%>
</td>
</tr>
</table>