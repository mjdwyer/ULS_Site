<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="ULS_Site.Views.Home.About" %>
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

	<script type="text/javascript">
	    function TestTheDropdown() {
	        $("#menu").val("3");
 
	    
	    }

	</script>
    
</asp:Content>

<asp:Content ID="aboutContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>About Us</h2>
    <p>
        <select name="menu"  id="menu">
<option value="0">Sunday</option>
<option value="1">monday</option>
<option value="2">tuesday</option>
<option value="3">wednesday</option>
<option value="4">thursday</option>
<option value="5">friday</option>
<option value="6">Saturday</option>
</select>
    </p>
           <input type="button" onclick="TestTheDropdown()" value="Close" id="btnAdminClose" style="float:left;padding-right:10px"/>   

</asp:Content>
