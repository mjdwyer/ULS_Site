<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Assigned To</span><br /><br />
<%= Html.DropDownList("lstAssigned", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "CheckRptAssignForm();" })%>
<br /><br />
