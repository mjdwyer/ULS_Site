<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
Division
</td>
</tr>
<tr>
<td>
<%= Html.DropDownList("ddlFCDivs", (IEnumerable<SelectListItem>)ViewData["FCD"])%>
</td>
</tr>
</table>
<br /><br />
