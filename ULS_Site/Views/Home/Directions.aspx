<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Directions.aspx.cs" Inherits="ULS_Site.Views.Home.Directions" %>
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">

    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false
        &amp;key=ABQIAAAAQTtGiimlXEddMFpTePYrCRT6EsdNAaB0L6Z7CXsQ6zU94iPI4RTbBL7xxDHxMnv1oomPBLxxEbiQoQ"
        type="text/javascript">
     </script>

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#directions a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

#map_canvas {
border:1px solid #000000;
height:500px;
width:500px;
}
</style>
<script type="text/javascript">

    var map;
    var gdir;
    var geocoder = null;
    var addressMarker;
    var myArray;
    
    function setDirections(fromAddress, toAddress, locale) {

        gdir.load("from: " + fromAddress + " to: " + toAddress,
        { "locale": locale });
    }
    
    function onSelectChange(){
        var selectedIdx = $("#locations")[0].selectedIndex;
        $('#fromAddress').val(myArray[selectedIdx])
    } 
    
    $(document).ready(function() {
        if (GBrowserIsCompatible()) {
            map = new GMap2(document.getElementById("map_canvas"));
            gdir = new GDirections(map, document.getElementById("drv_directions"));
            GEvent.addListener(gdir, "load", onGDirectionsLoad);
            GEvent.addListener(gdir, "error", handleErrors);

            setDirections("King of Prussia, PA", "E Ridge Pike and Conshohocken Road, Conshohocken, PA 19428", "en_US");

            $("#locations").change(onSelectChange);
            $("input[type=text]")
            .focus(function() {
                $(this).select();
            });
            
                myArray = [
            <% foreach (string item in ViewData["DefaultFroms"] as IEnumerable<string>) { %>
            "<%= item %>",
            <% } %>
            ];
            
        }
        $('form').submit(function() {
            var fromAddress = $(this).find('#fromAddress').val();
            var toAddress = $(this).find('#locations').val();
            var locale = 'en-US';
            setDirections(fromAddress, toAddress, locale);
            return false;
        });

    });


    function handleErrors() {
        if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
            alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + gdir.getStatus().code);
        else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
            alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + gdir.getStatus().code);

        else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
            alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + gdir.getStatus().code);

        // else if (gdir.getStatus().code == G_UNAVAILABLE_ADDRESS) <--- Doc bug... this is either not defined, or Doc is wrong
        // alert("The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.\n Error code: " + gdir.getStatus().code);

        else if (gdir.getStatus().code == G_GEO_BAD_KEY)
            alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);

        else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
            alert("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);

        else alert("An unknown error occurred.");

    }

    function onGDirectionsLoad() {
        // Use this function to access information about the latest load()
        // results.

        // e.g.
        // document.getElementById("getStatus").innerHTML = gdir.getStatus().code;
        // and yada yada yada...
    }
</script>

      <div id="maincontent2">
      <form action="#">

        <table>
        <tr><th align="left">From:&nbsp;</th>

        <td align="left" ><input type="text" id="fromAddress" name="from" size="35px"
        value="King of Prussia, PA"/>
        </td>
        <th align="left">&nbsp;&nbsp;To:&nbsp;</th>
        <td align="left"> <%= Html.DropDownList("locations", (SelectList)ViewData["OfficeLocations"])%></td> 
        </tr>
        <tr><td></td><td><div style="font-size:10px">(enter starting address or zip code)</div></td><td></td></tr>
        <tr>
        <td></td>
        <td align="left">
        <br />
        <input name="submit" type="submit" value="Get Directions!" />
        </td>
        </tr>
        </table>
        <table>
        <tr>
        <td valign="top"><div id="drv_directions" style="width: 250px"></div></td>
        <td valign="top" style="padding-top:15px"><div id ="map_canvas"></div></td>
        </tr>
        </table> 
          
     </form>
      
      </div>
</asp:Content>
