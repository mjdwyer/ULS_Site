<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Type</span><br /><br />
<%= Html.DropDownList("lstToolTypes", (IEnumerable<SelectListItem>)ViewData["ToolTypeList"], new { onchange = "CheckRptToolTypeForm();" })%>
<br />
<span>Description</span><br /><br />
<%= Html.DropDownList("lstToolDesc", (IEnumerable<SelectListItem>)ViewData["ToolDescList"])%>
<br /><br />

