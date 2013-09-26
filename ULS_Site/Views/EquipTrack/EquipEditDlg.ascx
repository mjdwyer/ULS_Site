<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Type</div>
<%= Html.DropDownList("ddlEquipType", (IEnumerable<SelectListItem>)ViewData["EquipTypes"])%>
</td>
<td>
<div>Make</div>
<%= Html.DropDownList("ddlEquipMake", (IEnumerable<SelectListItem>)ViewData["EquipMakes"])%>
</td>
<td>
<div>Model</div>
<%= Html.DropDownList("ddlEquipModel", (IEnumerable<SelectListItem>)ViewData["EquipModels"])%>
</td>
</tr>
<tr>
<td>
<div>Location</div>
<%= Html.DropDownList("ddlEquipLoc", (IEnumerable<SelectListItem>)ViewData["EquipLocs"])%>
</td>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlEquipRegBy", (IEnumerable<SelectListItem>)ViewData["EquipDivs"])%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlEquipMngBy", (IEnumerable<SelectListItem>)ViewData["EquipDivs"])%>
</td>
</tr>
</table>