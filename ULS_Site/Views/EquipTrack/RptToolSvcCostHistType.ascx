<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ULS_Site.Models"%>

<span>Tool Type</span><br /><br />
<%= Html.DropDownList("lstHistToolTypes", (IEnumerable<SelectListItem>)ViewData["ToolTypeList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />



