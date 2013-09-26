<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Job Class</div>
<%= Html.DropDownList("ddlJobClass", (IEnumerable<SelectListItem>)ViewData["JobClasses"], new { style = "width:137px;"})%>
</td>
<td>
<div>Operating Area</div>
<%= Html.DropDownList("ddlOpAreas", (IEnumerable<SelectListItem>)ViewData["OpAreas"], new { style = "width:137px;" })%>
</td>
</tr>
</table>

