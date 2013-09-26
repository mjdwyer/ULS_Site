<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ULS_Site.Models"%>

<span>Division</span><br /><br />
<%= Html.DropDownList("lstOnLoanTo", (IEnumerable<SelectListItem>)ViewData["OnLoanToList"], new { onchange = "CheckRptOnLoanForm();" })%>
<br /><br />

