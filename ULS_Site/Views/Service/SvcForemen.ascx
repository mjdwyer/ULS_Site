<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<span>Foreman</span><br /><br />
<%= Html.DropDownList("ddlSvcFormen", (IEnumerable<SelectListItem>)ViewData["SvcForemen"])%>
<br /><br />
