<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<center><div>Employee</div>
<%= Html.DropDownList("ddlEmployees", (IEnumerable<SelectListItem>)ViewData["Employees"], new { style = "width:170px;" })%>
</center>
</td>
</tr>
</table>

