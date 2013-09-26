<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%= Html.DropDownList("lstEquipSvcTypes", (IEnumerable<SelectListItem>)ViewData["TypesList"], new { onchange = "CheckEquipSvcForm();" })%>
<br /><br />

