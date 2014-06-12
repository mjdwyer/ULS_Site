<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script type="text/javascript">

    $(document).ready(function() {
//    if ($.browser.mozilla != true)
//        alert('Warning: The ULS Web Portal is best viewed using FireFox. You will experience problems using other browsers such as Internet Explorer. Please logout. Then open this site and logon using Firefox.');
    });

</script>
 <div class="pageboxsplash" style="border-style:none">
 
    <table>
    <tr style="height:465px">
    <td style="width:990px; text-align:center; font-size:16px">
        <span>Welcome <%= Html.Encode(Page.User.Identity.Name)%>! </span>
        <br /><br />
        You are now logged into the ULS web portal.
    </td>    
    </tr>
    </table>
</div>
</asp:Content>

