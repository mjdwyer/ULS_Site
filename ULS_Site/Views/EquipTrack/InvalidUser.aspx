<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div class="pageboxsplash" style="border-style:none">
 
    <table>
    <tr style="height:465px">
    <td style="width:990px; text-align:center; font-size:16px">
        <span><%= Html.Encode(Page.User.Identity.Name)%> has not been set up to use Equipment Tracker! </span>
        <br /><br />
        Please contact Guy Germano if you wish to do so.
    </td>    
    </tr>
    </table>
</div>

</asp:Content>

