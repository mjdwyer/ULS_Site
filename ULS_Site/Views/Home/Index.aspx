<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="ULS_Site.Views.Home.Index" %>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContent" runat="server">
<style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#home a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style>
      <div id="maincontent">
        <h1>Who We Are</h1>
        <p>Utility Line Services is a full service underground utility 
        contractor focused on delivering cost effective solutions to
        facilitate customer project requirements. Aggressively managing projects to 
        ensure timely installation and quality service, Utility Line Services capitalizes on the 
        extensive knowledge and experience of its employees to offer:</p>        
<!--        <img src="/Content/images/long-pipe-and-machine.jpg" alt=" " width="300" height="305" class="image-aligned-right" /> -->
 <!--        <img src="/Content/images/city_trench2.jpg" alt=" " width="300" height="229" class="image-aligned-right" /> -->
         <img src="/Content/images/backinup.jpg" alt=" " width="300" height="201" class="image-aligned-right" /> 
		<ul>
			<li>Turnkey Design Capabilities</li>
			<li>Innovative Construction Solutions Utilizing Latest 
	Technology</li>
			<li>Competitive Pricing</li>
			<li>Diverse Underground Utility Construction Experience</li>
			<li>Comprehensive Quality Assurance Program</li>
		</ul> 
        <h1>What We Do</h1>
        <p>We offer a wide range of services 
        to the utility industry.  From natural gas pipelines to 
        water mains, ULS utilizes the experience and 
        capabilities of its veteran personnel for safe and timely completion of customer projects.
        </p>
        <p>Experienced in urban, residential and cross-country underground construction, ULS expertly installs high 
        and low pressure gas steel or plastic mains and services which range from .5" to 42" in diameter. State of the art equipment is used to help limit
        restoration requirements as well as increase productivity.Our diversity of experience include:</p>
		<table id="home-photo-list-table" cellspacing="0">
  <tr>
    <td><img src="/Content/images/city_snow2.jpg" alt=" " /></td> 
<!--    <td><img src="/../../Content/images/long-view-of-pipe.jpg" alt=" " /></td> -->
    <td><ul>
      <li><a href="http://www.ulspipeline.com">ULS Transmission Division</a></li>
      <li>Regulator Stations</li>
      <li>Distribution Mains and Services</li>
      <li>Telecommunications</li>
      <li>Joint Trench Facilities</li>
      <li>Water Main Distribution</li>
      <li>Directional Drilling</li>
      <li>River Crossings</li>
    </ul></td>
  </tr>
</table>

		<h1>How We Do It</h1>
    <p>ULS provides turnkey solutions to its customers.  
        Offering computer aided design (CAD) and 
        engineering, from single residential natural gas 
        services and large gas distribution main 
        replacement projects to duct and manhole
        telecommunications and electric facilities.  Clients 
        enjoy the ease of doing business as ULS 
        concentrates on the details of each phase of the 
        project.  Knowledge and experience coupled with 
        state-of-the-art equipment; aid ULS in finding the best construction solution.
        </p>		
        <p>ULS completes permit and license applications, 
        submits drawings to local and state agencies for road 
        highway permits; DEP and soil conservation 
        applications; soil and erosion plans; and stream 
        and waterways applications.
        </p>
        <p>From small commercial gas services and gas main 
        distribution to district regulator stations, ULS has 
        provided Natural Gas customers total turnkey solution packages from start to finish.
     </p>
     <img src="/Content/images/sub_hoe1.jpg" alt=" " width="300" height="229" class="image-aligned-right" />

     <p>ULS completes the details for each phase of your project.</p>
     <p>Cost Estimating -> Construction Design Review -> Permit Application -> Materials Procurement -></p>
     <p>-> Product Installation -> Testing and Start Up -> Site Restoration -> As Built Documentation</p>
     <h1>Quality Assured</h1>
     <p>ULS implements a stringent quality control program with personnel dedicated specifically for
      Quality Assurance and Quality Control.  Working in accordance with applicable codes, standards,
      regulations and specifications, ULS' Quality Assurance Program documents the training, experience
      and daily work completed by each crew.</p>
      <p>Initially implemented with PECO Energy Company, ULS' Quality Assurance program has
       expanded to allow its clients to concentrate on running their business rather than spending
       their valuable time watching subcontractors.  Lessening the need for the customer's own Field
       Inspectors is easy to accomplish since documentation is provided which describes the Quality Assurance
       checks completed during each project phase.</p>
       <p>Our Quality Assurance program gives our customers peace of mind because they know all
        work performed is done in a professional manner.</p>
        </div>
</asp:Content>
