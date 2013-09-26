<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Type</div>
<%= Html.DropDownList("ddlEquipType", (IEnumerable<SelectListItem>)ViewData["TypeList"], new { onchange = "CheckRptHistForm();" })%>
</td>
<td>
<div>Service Type</div>
<%= Html.DropDownList("ddlSvcTypes", (IEnumerable<SelectListItem>)ViewData["SvcTypeList"], new { onchange = "CheckRptHistForm();" })%>
<br />
</td>
</tr>
<tr>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlEquipRegBy", (IEnumerable<SelectListItem>)ViewData["RegByList"], new { onchange = "CheckRptHistForm();" })%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlEquipMngBy", (IEnumerable<SelectListItem>)ViewData["MngByList"], new { onchange = "CheckRptHistForm();" })%>
</td>
</tr>
<tr><td></td></tr>
</table>
<br />
