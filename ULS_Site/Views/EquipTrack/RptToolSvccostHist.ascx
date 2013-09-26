<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Tool ID</span><br /><br />
<%= Html.DropDownList("lstHistToolIds", (IEnumerable<SelectListItem>)ViewData["ToolIDList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />

