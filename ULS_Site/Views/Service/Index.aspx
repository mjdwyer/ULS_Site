<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">
    <script type="text/javascript" src="/Content/javascript/jquery.maskedinput-1.2.2.js"></script>
    <script type="text/javascript" src="/Content/javascript/jquery.validate.js"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<style type="text/css">
label.error { float: none; color: red; padding-left: .5em; vertical-align: top; }
</style>

<script type="text/javascript">

    jQuery(function($) {
    $("#txtHomePhone").mask("(999) 999-9999");
    $("#txtOtherPhone").mask("(999) 999-9999");
});

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

    var emailVal = $("#hdnEmailVal").val();

    if (emailVal == "Yes") {
        $("#SvcAddressForm").validate({
            rules: {
                txtFname: "required",
                txtLname: "required",
                txtAddress: "required",
                txtCity: "required",
                ddlState: "required",
                txtZip: "required",
                txtHomePhone: "required",
                txtEmail: {
                    required: true,
                    email: true
                }
            }

        });
    }
    else {
        $("#SvcAddressForm").validate({
            rules: {
                txtLname: "required",
                txtAddress: "required",
                txtHomePhone: "required"
            }

        });
    
    }
});

</script>
    <input type="hidden"  id="hdnEmailVal" name="hdnEmailVal" value="<%=ViewData["emailVal"] %>"/>
    <div id="maincontent3" style="padding-left:0px">
    <div style="padding: 10px 0 0 10px; float:left">
    <%= Html.ActionLink("Reschedule", "ReSchedPhone", "Service", null, null)%>
    </div>
    <div style="padding:10px   10px 0 0px; float:right">
    <a href="javascript:ShowFAQs();">FAQ</a>
    </div>
    <h2 style="padding: 0px 190px 0 0; color:#990000; float:right">PECO Gas Home Service Renewal Scheduling</h2>
    <br />
    <br />
    <div style="padding-left:135px">
    <h3>1. Enter Contact Info</h3>
    <form id="SvcAddressForm"  action="/Service/SaveAddress" method="post">
    <table style="height:400px; width:515px;  border:solid 2px black">
    <tr>
    <td style="text-align:right">
    First Name: 
    </td>
    <td>
    <input type="text" id="txtFname" name="txtFname"  autocomplete="off" style="width:100px" /> 
    &nbsp;&nbsp;&nbsp;&nbsp;Last Name:
    <input type="text" id="txtLname" name="txtLname"  autocomplete="off" style="width:100px" /> 
    </td>
    </tr>
    <tr>
    <td style="text-align:right">
    Address: 
    </td>
    <td>
    <input type="text" id="txtAddress" name="txtAddress" style="width:250px"  autocomplete="off"/> 
    </td>
    </tr>
    <tr>
    <td style="text-align:right">
    City: 
    </td>
    <td>
    <input type="text" id="txtCity" name="txtCity"  autocomplete="off"/> 
    </td>
    </tr>
    <tr>
    <td style="text-align:right">
    State: 
    </td>
    <td>
    <select name="ddlState" id="ddlState" >
	<option value=""></option>
	<option value="AL">AL</option>
	<option value="AK">AK</option>
	<option value="AZ">AZ</option>
	<option value="AR">AR</option>
	<option value="CA">CA</option>
	<option value="CO">CO</option>
	<option value="CT">CT</option>
	<option value="DE">DE</option>
	<option value="DC">DC</option>
	<option value="FL">FL</option>
	<option value="GA">GA</option>
	<option value="HI">HI</option>
	<option value="ID">ID</option>
	<option value="IL">IL</option>
	<option value="IN">IN</option>
	<option value="IA">IA</option>
	<option value="KS">KS</option>
	<option value="KY">KY</option>
	<option value="LA">LA</option>
	<option value="ME">ME</option>
	<option value="MD">MD</option>
	<option value="MA">MA</option>
	<option value="MI">MI</option>
	<option value="MN">MN</option>
	<option value="MS">MS</option>
	<option value="MO">MO</option>
	<option value="MT">MT</option>
	<option value="NE">NE</option>
	<option value="NV">NV</option>
	<option value="NH">NH</option>
	<option value="NJ">NJ</option>
	<option value="NM">NM</option>
	<option value="NY">NY</option>
	<option value="NC">NC</option>
	<option value="ND">ND</option>
	<option value="OH">OH</option>
	<option value="OK">OK</option>
	<option value="OR">OR</option>
	<option value="PA">PA</option>
	<option value="RI">RI</option>
	<option value="SC">SC</option>
	<option value="SD">SD</option>
	<option value="TN">TN</option>
	<option value="TX">TX</option>
	<option value="UT">UT</option>
	<option value="VT">VT</option>
	<option value="VA">VA</option>
	<option value="WA">WA</option>
	<option value="WV">WV</option>
	<option value="WI">WI</option>
	<option value="WY">WY</option>
</select>
&nbsp;&nbsp;&nbsp;&nbsp;Zip: <input type="text" id="txtZip" name="txtZip"  autocomplete="off"/> 
    </td>
    </tr>
    <tr>
    <td style="text-align:right">
    Home Phone: 
    </td>
    <td>
    <input type="text" id="txtHomePhone" name="txtHomePhone"  style="width:100px"/>
    &nbsp;&nbsp;&nbsp;&nbsp;Other Phone: 
    <input type="text" id="txtOtherPhone" name="txtOtherPhone" style="width:100px"/> 
    </td>
    </tr>
    <tr>
    <td  style="text-align:right">
    Email: 
    </td>
    <td>
    <input type="text" id="txtEmail" name="txtEmail"  style="width:200px" autocomplete="off"/> 
    </td>
    </tr>
    <tr>
    <td  style="text-align:right">
    Notes: 
    </td>
    <td>
    <textarea id="txtNotes" name="txtNotes" rows="2" cols="45" autocomplete="off"></textarea>
    </td>
    </tr>
    <tr>
    <td  style="text-align:right">
    </td>
    <td style="padding-left:90px">
        <input type="submit" value="   Continue >>>>   " id="btnSave" style="" /> 
    </td>
    </tr>
    </table>
    </form>
    </div>
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

