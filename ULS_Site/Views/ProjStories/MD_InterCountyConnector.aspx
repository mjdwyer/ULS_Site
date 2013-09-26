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
    <div>
    <h2>Maryland Inter-County Connector</h2> 
    </div>
    <div style="float:right">
    <%= Html.ActionLink("back to list", "ProjHighlights", "Home")%>
    </div>
    <table cellspacing= "20px">
    <tr>
    <td>
    <p>ULS is involved in $1.1M worth of natural gas pipeline relocations in conjunction with the construction
     of the MD200 highway (Inter-County Connector) in Montgomery County, MD. The project includes relocation of steel
      and plastic gas pipelines at ten separate locations.  The relocations include 6” to 20” steel, and 4” to 12” plastic
       gas pipelines; installation of 4” and 12” steel pipelines on new bridge overpasses; and directional bores of 550ft and
        530ft for 8” steel pipe.  ULS is completing this work for Intercounty Constructors on Phase A of the project and MD200
         Constructors on Phase B.</p> 
 <!--   <p>ULS performed all civil, mechanical, instrumentation and electric work associated with the installation of a gas conditioning
     system at Washington Gas Light’s Dranesville Gate Station.  As part of the project ULS installed a 1200ft, 12” steel transmission
      main extension.  The mechanical work included installation and pressure testing of 1”, 1 ½”, 2”, and 3” steel pipe,
       both underground and above ground to facilitate the injection of odorant and hexane into the gas supply.
         It also included the installation of a natural gas pressure reducing facility including underground concrete/steel supports,
          one control run with block valves, by-pass piping with equipment and tie-in, and construction of an injection rack with
           actuated valves.  The civil portion included construction of a gravel driveway, improvements to the gravel parking area,
            extension of a retaining wall, and multiple concrete and steel pipe supports.  The electrical and control portion
             included installation of 2” underground conduit, installation of electrical and control wiring, and numerous control
              panel boxes.</p> -->
    </td>     
    </tr>     
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC001.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC002.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC003.JPG" alt=" " /></center></td></tr> 
    <tr><td><center><img src="/Content/images/ProjHighlights/MDICC004.JPG" alt=" " /></center></td></tr> 
       
    </table>
</div>
</asp:Content>
