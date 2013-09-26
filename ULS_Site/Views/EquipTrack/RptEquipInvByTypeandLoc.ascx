<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Type</span><br /><br />
<%= Html.DropDownList("lstTypes", (IEnumerable<SelectListItem>)ViewData["TypeList"], new { onchange = "CheckRptTypeLocForm();" })%>
<br /><br />
<span>Location</span><br /><br />
<%= Html.DropDownList("lstLocs", (IEnumerable<SelectListItem>)ViewData["LocList"], new { onchange = "CheckRptTypeLocForm();" })%>
<br /><br />
