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
    <h2>Montgomery and Frederick County, MD</h2>
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
    <p>ULS has had the blanket contract for all gas distribution work for Washington Gas Light Co. in Montgomery and Frederick
     counties in Maryland.  This work included New Construction mains and services, Replacement mains and services, regulator stations,
      and Market Enhancement mains and services.  ULS has employed conventional open dig methods, main and service insertion, directional
       boring, conventional boring and key-hole technology.  ULS has installed plastic mains from 2” to 12”; Steel mains from 2” to 12”;
        and all types of new and replacement services.</p>
    </td>     
    </tr>     
    <tr><td><center><img src="/Content/images/ProjHighlights/MNTCOFRED1.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MNTCOFRED2.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MNTCOFRED3.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MNTCOFRED4.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MNTCOFRED5.JPG" alt=" " /></center></td></tr> 
         
    </table>
</div>
</asp:Content>
