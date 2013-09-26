<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Assign To</div>
<%= Html.DropDownList("ddlSmallToolAsgnTo", (IEnumerable<SelectListItem>)ViewData["SmalllToolAssgnTo"])%>
</td>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlSmallToolRegBy", (IEnumerable<SelectListItem>)ViewData["SmalllToolDivs"])%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlSmallToolMngBy", (IEnumerable<SelectListItem>)ViewData["SmalllToolDivs"])%>
</td>
</tr>
</table>

