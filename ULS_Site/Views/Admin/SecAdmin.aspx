<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="HeadContentFromPage" ContentPlaceHolderId="EquipHeadContent" runat="server">
 <style>
.ui-jqgrid {font-size:1.2em}
</style>    
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script type="text/javascript">
    var curUser;

    jQuery(document).ready(function() {
        jQuery("#usersgrid").jqGrid({
            url: '/Admin/GetAllSecurityIds/',
            datatype: 'json',
            mtype: 'GET',
            height: 350,
            width: 175,
            rowNum: 5000,
            colNames: ['ID'],
            colModel: [
                { name: 'id', index: 'id', width: 80}],
            sortname: 'id',
            sortorder: 'asc',
            viewrecords: true,
            caption: '',
            gridComplete: function() {
                var top_rowid = $('#usersgrid tbody:first-child tr:first').attr('id');
                jQuery("#usersgrid").setSelection(top_rowid, true);
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    var data = $("#usersgrid").getRowData(ids);
                    curUser = data.id;
                    $("#txtID").val(data.id);
                    $("#hdnUID").val(data.id);
                    $("#txtID").attr("disabled", "disabled");

                    $.get("/Admin/GetUserRoles/" + data.id, {}, function(data) {
                        if (data.secRole == true)
                            $('#chkSecAdmin').attr('checked', true);
                        else
                            $('#chkSecAdmin').attr('checked', false);

                        if (data.shopRole == true)
                            $('#chkShpMgr').attr('checked', true);
                        else
                            $('#chkShpMgr').attr('checked', false);

                        if (data.frmRole == true)
                            $('#chkSvcFrmn').attr('checked', true);
                        else
                            $('#chkSvcFrmn').attr('checked', false);
                            
                        if (data.certRole == true)
                            $('#chkEmpQual').attr('checked', true);
                        else
                            $('#chkEmpQual').attr('checked', false);

                    }, "json");
                }
            }
        });

        $(function() {
            $("#add_users_dlg").dialog({
                bgiframe: true,
                width: 350,
                height: 315,
                modal: true,
                autoOpen: false,
                resizable: false
            })
        });

        $(function() {
            $("#reset_password_dlg").dialog({
                bgiframe: true,
                width: 350,
                height: 315,
                modal: true,
                autoOpen: false,
                resizable: false
            })
        });

        $('#addusersform').ajaxForm(function(data) {
            if (data == "Success") {

                jQuery("#addUserSuccess").show();
                jQuery("#addUserSuccess").html("Successfully added user.");
                jQuery("#addUserSuccess").fadeOut(6000);

                $("#txtUserID").val("");
                $("#txtPassword").val("");
                $("#txtUserID").focus();


                jQuery("#usersgrid").trigger("reloadGrid");

            }
            else {
                jQuery("#addUserSuccess").show();
                jQuery("#addUserSuccess").html("Error: " + data);
                jQuery("#addUserSuccess").fadeOut(6000);
            }

        });

        $('#resetpwdform').ajaxForm(function(data) {
            if (data == "Success") {

                jQuery("#resetPwdSuccess").show();
                jQuery("#resetPwdSuccess").html("Successfully reset password.");
                jQuery("#resetPwdSuccess").fadeOut(6000);

            }
            else {
                jQuery("#resetPwdSuccess").show();
                jQuery("#resetPwdSuccess").html("Error: " + data);
                jQuery("#resetPwdSuccess").fadeOut(10000);
            }
        });

        $('#SecUserForm').ajaxForm(function(data) {
            if (data == "Success") {

                jQuery("#adminSuccess").show();
                jQuery("#adminSuccess").html("Successfully saved roles.");
                jQuery("#adminSuccess").fadeOut(6000);

            }
            else {
                jQuery("#adminSuccess").show();
                jQuery("#adminSuccess").html("Error: " + data);
                jQuery("#adminSuccess").fadeOut(10000);
            }
        });

    });

    function CloseAddUsersDialog() {

        jQuery('#add_users_dlg').dialog('close');

    };

    function CloseResetPasswordDialog() {

        jQuery('#reset_password_dlg').dialog('close');

    };

    function AddUser() {

        $("#add_users_dlg").data("title.dialog", "Add User")

        jQuery('#add_users_dlg').dialog('open');
        $("#txtUserID").val("");
        $("#txtPassword").val("");
        $("#txtUserID").focus();
    };

    function ResetPassword() {

        $("#reset_password_dlg").data("title.dialog", "Reset Password")

        jQuery('#reset_password_dlg').dialog('open');
        $("#txtUID").val(curUser);
        $("#hdnID").val(curUser);
        $("#txtUID").attr("disabled", "disabled");
        $("#txtPwd").val("");
        $("#txtPwd").focus();
    };

    function UnlockUser() {

        $.get("/Admin/UnlockUser/" + curUser, {}, function(data) {

        if (data == "Success") {

            jQuery("#adminSuccess").show();
            jQuery("#adminSuccess").html("Successfully unlocked user.");
            jQuery("#adminSuccess").fadeOut(6000);

        }
        else {
            jQuery("#adminSuccess").show();
            jQuery("#adminSuccess").html("Error: " + data);
            jQuery("#adminSuccess").fadeOut(10000);
        }
    });
    };


    function CheckAddUserForm() {

        var usr = $("#txtUserID").val();
        var pwd = $("#txtPassword").val();
        if (usr.length > 3 && pwd.length >= 6) {
            $("#btnSaveUser").removeAttr("disabled", "disabled");
        }
        else {
            $("#btnSaveUser").attr("disabled", "disabled");
        }
    }
    
    function confirmUsersDelete() {

        if (confirm("Are you sure you want to delete this user?")) {
            $.post("/Admin/DeleteUser/" + curUser, {},
            function(data) {
            if (data == "Success") {

                    jQuery("#usersgrid").delRowData(curUser);

                    jQuery("#adminSuccess").show();
                    jQuery("#adminSuccess").html("Successfully deleted user.");
                    jQuery("#adminSuccess").fadeOut(6000);

                }
                else {
                    jQuery("#adminSuccess").show();
                    jQuery("#adminSuccess").html("Error: " + data);
                    jQuery("#adminSuccess").fadeOut(10000);
                }
            });
        }
    }
</script>

<div id="maincontent3">
<center><h1>Security Administration</h1></center>
<h2>Users</h2>
        <form id="SecUserForm"  action="/Admin/SaveUserRoles" method="post">
        <div style="float:left;padding-right:30px"> 
        <table id="usersgrid" cellpadding="0" cellspacing="0" /></table> 
        </div>
        <div style="float:left;padding-right:0px">
        <table>
        <tr>
        <td>
        <input type="text" id="txtID" name="txtID" />
        </td>
        </tr>
        <tr>
        <td>
        <br />
        <br />
        <br />
        </td>
        </tr>
        <tr>
        <td>
        <h2>Roles</h2>
        </td>
        </tr>
        <tr>
        <td>
                <input type="checkbox" id="chkSecAdmin" name="chkSecAdmin"  />
                Security Administrator
        </td>
        </tr>
        <tr>
        <td>
                <input type="checkbox" id="chkShpMgr" name="chkShpMgr"  />
                Equipment Shop Manager
        </td>
        </tr>
        <tr>
        <td>
                <input type="checkbox" id="chkSvcFrmn" name="chkSvcFrmn"  />
                Service Foreman
        </td>
        </tr>
        <tr>
        <td>
                <input type="checkbox" id="chkEmpQual" name="chkEmpQual"  />
                Employee Certifications
        </td>
        </tr>
        <tr>
        <td>
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
        <input type="button" onclick="AddUser()" value="Add User" id="btnAddUser" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="ResetPassword()" value="Reset Password" id="btnResetPwd" style="float:left;padding-right:10px"/> 
        <input type="button" onclick="UnlockUser()" value="Unlock User" id="btnUnlockUser" style="float:left;padding-right:10px"/>  
        <input type="button" onclick="confirmUsersDelete()" value="Delete User" id="btnDelUser" style="float:left;padding-right:10px" /> 
        <input type="submit" value="Save Roles" id="btnAdminSave" style="float:left;padding-right:10px" /> 
        <input type="hidden"  id="hdnUID" name="hdnUID" value=""/>
        </td>
        </tr>        
        </table>
        </div>
        </form>
        <table>
        <tr>
        <td>
        <br />
        <div id="adminSuccess" style="color:green; padding-left:140px"></div> 
         <br />
        </td>
        </tr>
        </table>
</div>
    
    <div id="add_users_dlg" title="">
        <form id="addusersform"  action="/Admin/AddUser" method="post"  defaultfocus="txtUserID">
        <table style="float:left">
        <tr>
        <td style="padding-left:100px">
        <center>
        <div>User ID</div>
        <input type="text" id="txtUserID" name="txtUserID" onkeyup="CheckAddUserForm()" autocomplete="off"/>
        </center>
        <br />
        <br />
        </td>
        </tr>
        <tr>
        <td style="padding-left:100px">
        <center>
        <div>Password</div>
        <input type="text" id="txtPassword" name="txtPassword" onkeyup="CheckAddUserForm()" autocomplete="off"/>
        </center>
        </td>
        </tr>        
        <tr>
        <td style="padding-left:110px">
        <br />
        <br />
        <input type="submit" value="Save" id="btnSaveUser" style="float:left;padding-right:10px" /> 
        <input type="button" onclick="CloseAddUsersDialog()" value="Close" id="btnCloseUsersDlg" style="float:left;padding-right:10px"/>   
        </td>
        </tr>        
        </table>
        </form>
        <table>
        <tr>
        <td>
        <br />
        <br />
        <div id="addUserSuccess" style="color:green; padding-left:80px"></div> 
        </td>
        </tr>
        </table>
    </div>
    
    <div id="reset_password_dlg" title="">
        <form id="resetpwdform"  action="/Admin/ResetPassword" method="post"  defaultfocus="txtUserID">
        <table style="float:left">
        <tr>
        <td style="padding-left:100px">
        <center>
        <div>User ID</div>
        <input type="text" id="txtUID" name="txtUserID" />
        </center>
        <br />
        <br />
        </td>
        </tr>
        <tr>
        <td style="padding-left:100px">
        <center>
        <div>New Password</div>
        <input type="text" id="txtPwd" name="txtPassword" onkeyup="CheckAddUserForm()" autocomplete="off"/>
        </center>
        </td>
        </tr>        
        <tr>
        <td style="padding-left:110px">
        <br />
        <br />
        <input type="submit" value="Save" id="btnReset" style="float:left;padding-right:10px" /> 
        <input type="button" onclick="CloseResetPasswordDialog()" value="Close" id="btnCloseResetPwd" style="float:left;padding-right:10px"/>   
        </td>
        </tr>        
        </table>
        <input type="hidden"  id="hdnID" name="hdnID" value=""/>
        </form>
        <table>
        <tr>
        <td>
        <br />
        <div id="resetPwdSuccess" style="color:green; padding-left:80px"></div> 
        </td>
        </tr>
        </table>
    </div>
</asp:Content>

