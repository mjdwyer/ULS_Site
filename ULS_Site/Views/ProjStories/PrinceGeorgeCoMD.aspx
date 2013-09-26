<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#highlights a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style><div id="maincontent">

<!--    <h2>Maryland Inter-County Connector</h2> -->
    <h2>Prince Georges County, Maryland</h2>
    <div style="float:right">
    <%= Html.ActionLink("back to list", "ProjHighlights", "Home")%>
    </div>
    <table cellspacing= "20px">
    <tr>
    <td>
<!--    <p>ULS is involved in $1.1M worth of natural gas pipeline relocations in conjunction with the construction
     of the MD200 highway (Inter-County Connector) in Montgomery County, MD. The project includes relocation of steel
      and plastic gas pipelines at ten separate locations.  The relocations include 6” to 20” steel, and 4” to 12” plastic
       gas pipelines; installation of 4” and 12” steel pipelines on new bridge overpasses; and directional bores of 550ft and
        530ft for 8” steel pipe.  ULS is completing this work for Intercounty Constructors on Phase A of the project and MD200
         Constructors on Phase B.</p> -->
    <p>ULS participated in a three year replacement project in Prince Georges County, MD for Washington Gas Light Co.
      ULS replaced more than 24 miles of bare steel main and 6470 steel service lines.  The new main installation was primarily
       done by directional bore in established neighborhoods.  Services replacements were done by insertion, when possible, or
        direct buried.</p>
    </td>     
    </tr>     
<!--    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1598_2.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1600.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1601.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1602.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1603.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1605.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1608.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1609.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1610.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC_1611.JPG" alt=" " /></center></td></tr> -->
         
    </table>
</div>
</asp:Content>
