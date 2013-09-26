<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script type="text/javascript">
    $(function() {
        $("#FAQ_svc_dlg").dialog({
            bgiframe: true,
            width: 440,
            height: 415,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });


    function ShowFAQs() {
        $("#FAQ_svc_dlg").data("title.dialog", "Frequently Asked Questions")

        jQuery('#FAQ_svc_dlg').dialog('open');
    }

$(document).ready(function() {
    $("#btnSave").attr("disabled", "disabled");

    $("#AvailableDates").change(function() {

    
    var seldate = $("#AvailableDates").val();
        if (seldate.length > 0) {
            $("#btnSave").removeAttr("disabled", "disabled");
        }
        else {
            $("#btnSave").attr("disabled", "disabled");
        }

    });


});

</script>
<div style="padding: 10px 0 0 660px">
<a href="javascript:ShowFAQs();">FAQ</a>
</div>
    <div id="maincontent3" style="padding-left:135px">
    <h2 style="padding-left:95px; color:#990000">PECO Gas Home Service Renewal Scheduling</h2>
    <h3>2. Select a date for service renewal.</h3>
    <form id="SvcAddressForm"  action="/Service/SaveDate" method="post">
    <table style="height:400px; width:515px;  border:solid 2px black; background-color:#EFEFEF">
    <tr>
    <td style="padding: 0 0 0 130px">

    <table style="height:300px; width:250px;  border:solid 2px black; background-color:#FFFFFF">
    <tr>
    <td style="padding:  70px 0 0 55px; vertical-align:top">
    &nbsp;&nbsp;&nbsp;&nbsp;<b>Available Dates</b><br /><br />
    <%=Html.DropDownList("AvailableDates", "--please choose--")%></td>
    </tr>
    <tr>
    <td style="padding:  0  0 30px 30px;" >
    <input type="submit" value="Schedule Service Renewal" id="btnSave" style="" /> 
    
    </td>
    </tr>
    </table>
    
    </td>
    </tr>
    <tr><td><h3 style="color:Red"><%=ViewData["SaveResultMsg"]%></h3></td></tr>
    </table>
    </form>
    </div>
  <div id="FAQ_svc_dlg" title="">
  <b><p><b>Why does the crew need access to my home?</b></b> <br />
  The gas service will be shut off during the installation of the new pipe. Access to the inside
   of the property is needed to relocate the existing meter to the outside wall and/or to relight all the appliances.</p>
   <br />
  <p><b>My meter is outside already. Why are you replacing it?</b> <br />
  The primary purpose of PECO's renewal program is to replace the service piping. Even if your gas meter is currently located
  outside - the service pipe may still need to be upgraded.</p>
   <br />
  <p><b>I already have an automatic meter. Why are you replacing it?</b> <br />
  The primary purpose of PECO's renewal program is to replace the service piping. Even though your meter is located outside or may be fairly 
  new or even an automatic read meter - the service pipe may need to be replaced - the meter may remain.</p>
   <br />
  <p><b>How long will I need to be at home?</b> <br />
  The time on site varies depending on the site conditions, access issues, location of the service pipe,
  gas meter and gas main. Typically, all work is completed in 8 hours.</p>
   <br />
  <p><b>I only have one appliance hooked up to gas. Will that shorten the time in which you need to access my home?</b> <br />
  Not really. The primary focus is on the upgrade and replacing the existing gas service piping between the gas main and 
  your existing meter. The number of gas apppliances in the house does not directly impact the time required to preform the service pipe
  upgrade.</p>
   <br />
  <p><b>How will I know it is one of your employees and not an imposter?</b> <br />
  You will be contacted in advance by written letter and/or by telephone. You may verify the contact information by calling the numbers listed on the letter.
   ULS trucks are labled (typically white vehicles with red lettering). ULS foremen have ID cards.</p>
   <br />
  <p><b>Where will you be digging?</b> <br />
  The number and location of excavations will vary depending on the site conditions, gas pipe locations, ect. Every effort is made
  to limit the number of excavations. Typically, excavations are required at the gas main, just behind the curb and at least one opening at the house. Other 
  excavations may be required to install the new piping. All excavations will be restored within a few weeks after the service work has been completed.</p>
   <br />
  <p><b>Who can I can contact at your company with more questions?</b> <br />
   <%=ViewData["ContactName"] %> can be reached at <%=ViewData["ContactPhone"] %>. By email: <%=ViewData["ContactEmail"] %> </p>
   <br />
  
  </div>

</asp:Content>

