<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Equipment ID</span><br /><br />
<%= Html.DropDownList("lstEquipID", (IEnumerable<SelectListItem>)ViewData["EquipIDList"], new { onchange = "CheckRptEquipChangeLog();" })%>
<br /><br />