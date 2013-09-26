<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Qualification</div>
<%= Html.DropDownList("ddlQualDescriptions", (IEnumerable<SelectListItem>)ViewData["QualDescr"], new { style = "width:370px;", onchange = "SelectQualCode()" })%>
</td>
<td>
<div>Code</div>
<%= Html.DropDownList("ddlQualCodes", (IEnumerable<SelectListItem>)ViewData["QualCodes"], new { style = "width:75px;", onchange = "SelectQualDesc()"})%>
</td>
</tr>
</table>
