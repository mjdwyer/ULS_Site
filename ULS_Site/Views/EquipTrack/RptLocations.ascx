<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Location</span><br /><br />
<%= Html.DropDownList("lstLocations", (IEnumerable<SelectListItem>)ViewData["LocationsList"], new { onchange = "CheckRptLocationForm();" })%>
<br /><br />
