<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="maincontent3" style="padding: 100px 0 0 85px; height: 250px; ">
    <table style="height:200px; width:615px;  border:solid 2px black" cellpadding="20px">
    <tr>
    <td style="text-align:center" >
    <h2><%=ViewData["SaveResultName"]%></h2>
    </td>
    </tr>
    <tr>
    <td style="text-align:center">

    <h2><%=ViewData["SaveResultMsg"]%></h2>
    </td>
    </tr>
    <tr><td>
    </td>
    </tr>
    </table>
    <%if (ViewData["ShowReturnLink"] == "Yes")
      { %>
      
      <br />
      <div style="padding-left:200px">
          <%= Html.ActionLink("Return to Enter Contact Info Page", "Index", "Service", null, null)%>
      </div>
    <%} %>
   
    </div>

</asp:Content>

