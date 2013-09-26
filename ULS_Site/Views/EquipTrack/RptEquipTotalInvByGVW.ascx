<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<table>
<tr>
<td>
<div>Type</div>
<%= Html.DropDownList("ddlGVW", (IEnumerable<SelectListItem>)ViewData["GVW"], new { onchange = "CheckRptByGVWForm();" })%>
</td>
</tr>
<tr>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlEquipRegBy", (IEnumerable<SelectListItem>)ViewData["RegByList"], new { onchange = "CheckRptByGVWForm();" })%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlEquipMngBy", (IEnumerable<SelectListItem>)ViewData["MngByList"], new { onchange = "CheckRptByGVWForm();" })%>
</td>
</tr>
<tr><td></td></tr>
</table>
<br />