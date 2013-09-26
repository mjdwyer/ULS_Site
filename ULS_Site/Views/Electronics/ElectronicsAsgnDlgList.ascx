<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%= Html.DropDownList("ddlAssignedTo", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "CheckElectronicsAssignForm();" })%>

