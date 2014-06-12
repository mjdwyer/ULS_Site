<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">
    <script type="text/javascript" src="/Scripts/jquery.maskedinput-1.2.2.js"></script>
    <script type="text/javascript" src="/Scripts/jquery.validate.js"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<script type="text/javascript">
    jQuery(function($) {
        $("#txtHomePhone").mask("(999) 999-9999");
    });

    $(document).ready(function() {
    
        $("#txtHomePhone").focus();

        $("#SvcReschedForm").validate();
        //    }

        //        $("#btnSave").attr("disabled", "disabled");
        //        $('#txtHomePhone').bind('keyup', function() {
        //            var selPhone = $("#txtHomePhone").val();
        //            var selPhone2 = selPhone.replace(/\_$/, "");
        //            alert(selPhone2);
        //            alert($("#SvcReschedForm").valid());
        //            if ($("#SvcReschedForm").valid()) {
        //                $("#btnSave").removeAttr("disabled", "disabled");
        //            }
        //            else {
        //                $("#btnSave").attr("disabled", "disabled");
        //            }
        //        });
    });

</script>
    <div id="maincontent3" style="padding-left:135px">
    <h2 style="padding-left:95px; color:#990000">PECO Gas Home Service Renewal Scheduling</h2>
    <h3>1. To reschedule an existing scheduled service enter your home phone number.</h3>
    <form id="SvcReschedForm"  action="/Service/ReschedPhoneSave" method="post">
    <table style="height:400px; width:515px;  border:solid 2px black; background-color:#EFEFEF">
    <tr>
    <td style="padding: 0 0 0 130px">

    <table style="height:300px; width:250px;  border:solid 2px black; background-color:#FFFFFF">
    <tr>
    <td style="padding:  70px 0 0 50px; vertical-align:top">
    &nbsp;<b>Home Phone Number</b><br /><br />
    <input type="text" id="txtHomePhone" name="txtHomePhone" class="required" value="<%=ViewData["ReschedHomePhone"]%>"  /> 
    </tr>
    <tr>
    <td style="padding:  0  0 30px 30px;" >
    <input type="submit" value="Schedule Service Renewal" id="btnSave" style="" /> 
    
    </td>
    </tr>
    </table>
        <div style="padding: 20px 0 0 20px; float:left">
    <%= Html.ActionLink("Return to Enter Contact Info Page", "Index", "Service", null, null)%>
    </div>

    </td>
    </tr>
    <tr><td><h3 style="color:Red"><%=ViewData["SaveResultMsg"]%></h3></td></tr>
    </table>
    </form>
    </div>

</asp:Content>

