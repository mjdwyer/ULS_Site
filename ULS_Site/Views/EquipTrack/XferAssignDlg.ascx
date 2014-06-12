<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<span>From</span><br />
<%= Html.DropDownList("lstFromAssign", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "OnChangeAssignFrom();" })%>
</td>
<td style="padding-left:100px">
<span>To</span><br />
<%= Html.DropDownList("lstToAssign", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "OnChangeAssignTo();" })%>
</td>
</tr>
</table>
