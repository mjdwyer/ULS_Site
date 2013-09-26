<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
<div>Type</div>
<%= Html.DropDownList("ddlToolType", (IEnumerable<SelectListItem>)ViewData["ToolTypes"])%>
</td>
<td>
<div>Manufacturer</div>
<%= Html.DropDownList("ddlToolMfg", (IEnumerable<SelectListItem>)ViewData["ToolMfgs"])%>
</td>
</tr>
<tr>
<td>
<div>Description</div>
<%= Html.DropDownList("ddlToolDesc", (IEnumerable<SelectListItem>)ViewData["ToolDescrs"])%>
</td>
<td>
<div>Size</div>
<%= Html.DropDownList("ddlToolSize", (IEnumerable<SelectListItem>)ViewData["ToolSizes"])%>
</td>
</tr>
<tr>
<td>
<div>Location</div>
<%= Html.DropDownList("ddlToolLoc", (IEnumerable<SelectListItem>)ViewData["ToolLocs"])%>
</td>
<td>
<div>Registered By</div>
<%= Html.DropDownList("ddlToolRegBy", (IEnumerable<SelectListItem>)ViewData["ToolDivs"])%>
</td>
<td>
<div>Managed By</div>
<%= Html.DropDownList("ddlToolMngBy", (IEnumerable<SelectListItem>)ViewData["ToolDivs"])%>
</td>
</tr>
</table>
