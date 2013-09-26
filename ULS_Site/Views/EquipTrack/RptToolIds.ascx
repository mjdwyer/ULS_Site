<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Tool ID</span><br /><br />
<%= Html.DropDownList("lstToolID", (IEnumerable<SelectListItem>)ViewData["ToolIDList"], new { onchange = "CheckRptToolChangeLog();" })%>
<br /><br />