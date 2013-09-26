<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#highlights a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style>
<div id="maincontent">
        <h1>Project Highlights</h1>
<br />
<br />
<center>
<%= Html.ActionLink("Maryland Inter-County Connector", "MD_InterCountyConnector", "ProjStories")%>
<br />
<br />
<%= Html.ActionLink("Dranesville Gate Station – Dranesville, VA (Washington Gas)", "DranesvilleVA", "ProjStories")%>
<br />
<br />
<%= Html.ActionLink("Montgomery and Frederick County, MD", "MontcoFredMD", "ProjStories")%>
<br />
<br />
<%= Html.ActionLink("Prince Georges County, Maryland", "PrinceGeorgeCoMD", "ProjStories")%>
</center>
</div>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
</asp:Content>
