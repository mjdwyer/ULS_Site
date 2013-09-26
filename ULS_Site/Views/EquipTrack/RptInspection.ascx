<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<table>
<tr>
<td>
Month
</td>
<td>
Year
</td>
</tr>
<tr>
<td>
<%= Html.DropDownList("lstMonths", (IEnumerable<SelectListItem>)ViewData["MonthsList"], new { onchange = "CheckRptInspDueForm();" })%>
</td>
<td>
<%= Html.DropDownList("lstYears", (IEnumerable<SelectListItem>)ViewData["YearsList"], new { onchange = "CheckRptInspDueForm();" })%>
</td>
</tr>
</table>
<br /><br />

