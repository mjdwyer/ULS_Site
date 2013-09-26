<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Management.aspx.cs" Inherits="ULS_Site.Views.Home.Management" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style type="text/css">

/* To make the navigation bar show a highlighted button indicating that "You are here", this style rule (below) should be changed on each individual page. It should show the CSS "ID" of the navigation bar button which links to the current page. The appropriate ID is declared inside the <li> in the nav bar. */
#management a {
	color: #FFFFFF;
	cursor: default;
	background-color: #999999;
}

</style>
      <div id="maincontent">
        <h1>ULS Management Team</h1>
        <div class="managers">Austin Meehan</div>
        <div class="managers">President, Utility Line Services, Inc.</div>
        <p> Austin A. Meehan is Founder and President of Utility Line Services, Inc.  He founded ULS
         in 1996 and is responsible for growing and maintaining the business.  He brings more than 20 years
          of experience in natural gas construction including 18 years of experience estimating, managing and
           overseeing multiple projects.  He is responsible for acquiring Great Western Services, a distribution
            and transmission pipeline company in 2002.  This acquisition doubled the size of the Company and its territory.</p>
<br />
<!--                <div class="managers">Jack Thomas</div>
        <div class="managers">Controller</div>
        <p> As Controller, Jack Thomas oversees the accounting and cash management of ULS/GWS.  He is responsible for both internal
         and external audits, review and analysis and the presentation of the Financial Statement.  He has more than 15 years of
          Management/Controller experience.  He is a Certified Public Accountant.</p>
<br /> -->
                <div class="managers">Robert Nye</div>
        <div class="managers">Chief Estimator, ULS Distribution, Pennsylvania Divisions</div>
        <p> Bob Nye is Chief Estimator, ULS Distribution Pennsylvania Divisions.  He is responsible for all contract
         administration. Mr. Nye joined ULS in 1997. He has more than 31 years experience in the natural gas construction industry.</p>
<br />
                <div class="managers">Vernon "Chuck" Nicholson</div>
        <div class="managers">Division Manager, ULS Distribution Construction Operations</div>
        <p> Chuck Nicholson is Division Manager of ULS Construction Operations.  He is responsible for scheduling
         and managing project productivity and profitability.   He has more than 17 years of utility construction project estimation and
          administration experience.</p>
<br />
                <div class="managers">Daniel Sebesta</div>
        <div class="managers">Manager, ULS Safety & Training</div>
        <p> As a manager, supervisor, foreman and laborer Dan has over 28 total years of experience in the gas distribution industry. Currently he is responsible for the overall ULS safety and compliance program.
He is Certified OQ (Operator Qualification) instructor/trainer.</p>
<br />
        <h2>Great Western Services, Inc</h2>
        <div class="managers">Keith Drozda</div>
        <div class="managers">President, Great Western Services, Inc.</div>
        <p> Keith Drozda is president of Utility Line Services, Inc.’s Great Western Services (GWS) Division.
          He is responsible for directing operations of GWS.  He has more than 30 years experience in the gas construction industry.</p>
<br />
</div>

</asp:Content>
