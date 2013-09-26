<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlEquipRegBy", (IEnumerable<SelectListItem>)ViewData["RegByList"], new { onchange = "CheckRptWithCostForm();" })%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlEquipMngBy", (IEnumerable<SelectListItem>)ViewData["MngByList"], new { onchange = "CheckRptWithCostForm();" })%>
</td>
</tr>
<tr><td></td></tr>
</table>
<br />