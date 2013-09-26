<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ULS_Site.Models"%>

<span>Equipment Type</span><br /><br />
<%= Html.DropDownList("lstHistTypes", (IEnumerable<SelectListItem>)ViewData["EquipTypeList"], new { onchange = "CheckRptHistForm();" })%>
<br /><br />



