<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%= Html.DropDownList("lstToolSvcTypes", (IEnumerable<SelectListItem>)ViewData["TypesList"], new { onchange = "CheckToolSvcForm();" })%>

