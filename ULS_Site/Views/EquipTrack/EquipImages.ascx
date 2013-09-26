<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ULS_Site.Models"%>

<%var alternating = false;%>
<table>
<% foreach (var item in ViewData.Model as IEnumerable<image>) 
{
    if (!alternating) 
    { %>
    <tr>
    <%}; %>
    
    <td>
        <a href="<%= item.image_path %>" target="_blank" >
        <img src="<%= item.image_path %>" alt=" "  width="100"  />
        </a>
    </td>
    <%if (Convert.ToString(ViewData["default_division"]) == "ULS-PA")
      {%>
        <td style="width:50; vertical-align:bottom"><input type="button" onclick="DeleteImage(<%=item.image_id %>)" value="Delete" style="width:45px; font-size:11px"  /></td>    
    <%} %>
    <%if (alternating) 
    { %>
    </tr>
    <%}; 
    alternating = !alternating;
 }%>
</table>



