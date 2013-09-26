<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Dates</div>
<%= Html.ListBox("lbEmpWarnRecogDates", (IEnumerable<SelectListItem>)ViewData["EmpWarnRecogDates"], new { style = "width:170px;height:300px", onchange = "SelectWRDate()" })%>
</td>
</tr>
</table>

