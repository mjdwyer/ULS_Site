<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%= Html.DropDownList("ddlToolAssignedTo", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "CheckToolAssignForm();" })%>

