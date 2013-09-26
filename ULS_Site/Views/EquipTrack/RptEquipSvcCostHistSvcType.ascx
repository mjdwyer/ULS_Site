<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<span>Service Type</span><br /><br />
<%= Html.DropDownList("lstSvcTypes", (IEnumerable<SelectListItem>)ViewData["EquipSvcTypeList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />

