<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Assigned To</span><br /><br />
<%= Html.DropDownList("lstHistAssigned", (IEnumerable<SelectListItem>)ViewData["AssignToList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />
