<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<span>Service Type</span><br /><br />
<%= Html.DropDownList("lstToolSvcTypes", (IEnumerable<SelectListItem>)ViewData["ToolSvcTypeList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />
