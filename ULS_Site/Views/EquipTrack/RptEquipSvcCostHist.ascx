<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Equipment ID</span><br /><br />
<%= Html.DropDownList("lstHistEquipIds", (IEnumerable<SelectListItem>)ViewData["EquipIDList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />
