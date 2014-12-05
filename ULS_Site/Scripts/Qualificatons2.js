var curRow;
var curRowQuals;
var curQualsColor;
var curRowAdmin;
var curRowEmailAdmin;

jQuery(document).ready(function() {

    curRowQuals = -1;

    jQuery("#empgrid").jqGrid({
        url: '/Qualification/GridData/',
        editurl: '/Qualification/Edit/',
        datatype: 'json',
        mtype: 'GET',
        hoverrows: false,
        altRows: false,
        height: 255,
        width: 740,
        rowNum: 5000,
        colNames: ['Last', 'First', 'Middle', 'Suffix', 'empID', 'Status', 'OpArea', 'oqId', 'comment', 'ssn', 'address1', 'address2', 'city', 'state', 'zip', 'email', 'employeeid', 'homephone', 'cellphone', 'payRate', 'jobClass', 'oparea', 'MVRcheckDt', 'CBGcheckDt', 'DandAcheckDt', 'DandAresult', 'birthDate', 'DLnum', 'DLstate', 'DLclass', 'DLexpDate', 'medicalCardExpDt'],
        colModel: [
   		        { name: 'lname', index: 'lname', width: 130, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'fname', index: 'fname', width: 130, search: false },
   		        { name: 'mname', index: 'mname', width: 130, search: false },
   		        { name: 'suffix', index: 'suffix', width: 80, search: false },
                { name: 'empID', index: 'empID', search: false },
   		        { name: 'empStatus', index: 'empStatus', width: 80, search: false },
   		        { name: 'opArea', index: 'opArea', width: 80, search: false },
                { name: 'oqId', hidden: true, search: false },
                { name: 'comment', hidden: true, search: false },
                { name: 'ssn', hidden: true, search: false },
                { name: 'address1', hidden: true, search: false },
                { name: 'address2', hidden: true, search: false },
                { name: 'city', hidden: true, search: false },
                { name: 'state', hidden: true, search: false },
                { name: 'zip', hidden: true, search: false },
                { name: 'email', hidden: true, search: false },
   		        { name: 'employeeid', hidden: true, search: false },
   		        { name: 'homephone', hidden: true, search: false },
   		        { name: 'cellphone', hidden: true, search: false },
   		        { name: 'payRate', hidden: true, search: false },
   		        { name: 'jobClass', hidden: true, search: false },
   		        { name: 'oparea', hidden: true, search: false },
   		        { name: 'MVRcheckDt', hidden: true, search: false },
   		        { name: 'CBGcheckDt', hidden: true, search: false },
   		        { name: 'DandAcheckDt', hidden: true, search: false },
   		        { name: 'DandAresult', hidden: true, search: false },
   		        { name: 'birthDate', hidden: true, search: false },
   		        { name: 'DLnum', hidden: true, search: false },
   		        { name: 'DLstate', hidden: true, search: false },
   		        { name: 'DLclass', hidden: true, search: false },
   		        { name: 'DLexpDate', hidden: true, search: false },
   		        { name: 'medicalCardExpDt', hidden: true, search: false }
            ],
        sortname: 'lname',
        sortorder: "asc",
        viewrecords: true,
        pager: jQuery('#empgridp'),
        caption: 'Employees',
        ondblClickRow: function(rowid) {
            var data = $("#empgrid").getRowData(curRow);
            if (data.employeeid == null)
                alert("  Please Select a Row!");
            else {

                var eID = document.getElementById("hdnEditOper");
                eID.value = "Edit";

                var eID = document.getElementById("hdnEditID");
                eID.value = data.employeeid;

                $("#hdnEditID").val('');
                $("#txtEmpID").val('');
                $("#txtSSN").val('');
                $("#txtFName").val('');
                $("#txtMName").val('');
                $("#txtLName").val('');
                $("#txtSuffix").val('');
                $("#txtAddress1").val('');
                $("#txtAddress2").val('');
                $("#txtCity").val('');
                $("#ddlState").val('');
                //                $("#txtState").val('');
                $("#txtZip").val('');
                $("#txtEmpComment").val('');

                $("#txtHomePhone").val('');
                $("#txtCellPhone").val('');
                $("#txtOqid").val('');
                $("#ddlResult").val('');

                $("#txtDLNum").val('');
                $("#ddlDLState").val('');
                $("#ddlDLClass").val('');

                $("#hdnEditID").val(data.employeeid);
                $("#txtEmpID").val(data.empID);
                $("#txtSSN").val(data.ssn);
                $("#txtFName").val(data.fname);
                $("#txtMName").val(data.mname);
                $("#txtLName").val(data.lname);
                $("#txtSuffix").val(data.suffix);
                $("#txtAddress1").val(data.address1);
                $("#txtAddress2").val(data.address2);
                $("#txtCity").val(data.city);
                $("#ddlState").val(data.state);
                //                $("#txtState").val(data.state);
                $("#txtZip").val(data.zip);
                $("#txtEmpComment").val(data.comment);
                $("#ddlStatus").val(data.empStatus);

                $("#txtHomePhone").val(data.homephone);
                $("#txtCellPhone").val(data.cellphone);
                $("#txtOqid").val(data.oqId);
                $("#ddlResult").val(data.DandAresult);

                $("#txtDLNum").val(data.DLnum);
                $("#ddlDLState").val(data.DLstate);
                $("#ddlDLClass").val(data.DLclass);

                OpenEmployeeEditDlg(data);

            }
            return false;
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                curRowQuals = -1;
                curRow = ids;
                var data = $("#empgrid").getRowData(ids);
                jQuery("#empqualsgrid").setGridParam({ url: "/Qualification/GetQualificationGridData/" + data.employeeid, page: 1 })
                        .trigger('reloadGrid');
                jQuery('#empqualsgrid').setCaption('Qualifications for: ' + data.lname + ', ' + data.fname);

            }
        }
    }).navGrid('#empgridp', { deltext: "Delete", searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: true, search: false, refresh: true }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             curRow = null;

             alert(response.responseText);

             if (response.responseText == "Success") {
                 jQuery("#success").show();
                 jQuery("#success").html("Employee successfully deleted");
                 jQuery("#success").fadeOut(6000);
                 jQuery("#empgrid").delRowData(curRow);
                 return [true, response.responseText]
             }
             else {
                 return [false, response.responseText]
             }
         }
     }, // del options
            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
            closeAfterSearch: true, closeOnEscape: true
        }, // search options
         {} // view options
          ).navButtonAdd('#empgridp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#empgrid").getRowData(curRow);
                  if (data.employeeid == null)
                      alert("  Please Select a Row!");
                  else {

                      var eID = document.getElementById("hdnEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnEditID");
                      eID.value = data.employeeid;

                      $("#hdnEditID").val('');
                      $("#txtEmpID").val('');
                      $("#txtSSN").val('');
                      $("#txtFName").val('');
                      $("#txtMName").val('');
                      $("#txtLName").val('');
                      $("#txtSuffix").val('');
                      $("#txtAddress1").val('');
                      $("#txtAddress2").val('');
                      $("#txtCity").val('');
                      $("#ddlState").val('');
                      //                $("#txtState").val('');
                      $("#txtZip").val('');
                      $("#txtEmpComment").val('');

                      $("#txtHomePhone").val('');
                      $("#txtCellPhone").val('');
                      $("#txtOqid").val('');
                      $("#ddlResult").val('');


                      $("#txtDLNum").val('');
                      $("#ddlDLState").val('');
                      $("#ddlDLClass").val('');

                      $("#hdnEditID").val(data.employeeid);
                      $("#txtEmpID").val(data.empID);
                      $("#txtSSN").val(data.ssn);
                      $("#txtFName").val(data.fname);
                      $("#txtMName").val(data.mname);
                      $("#txtLName").val(data.lname);
                      $("#txtSuffix").val(data.suffix);
                      $("#txtAddress1").val(data.address1);
                      $("#txtAddress2").val(data.address2);
                      $("#txtCity").val(data.city);
                      $("#ddlState").val(data.state);
                      //                $("#txtState").val(data.state);
                      $("#txtZip").val(data.zip);
                      $("#txtEmpComment").val(data.comment);
                      $("#ddlStatus").val(data.empStatus);

                      $("#txtHomePhone").val(data.homephone);
                      $("#txtCellPhone").val(data.cellphone);
                      $("#txtOqid").val(data.oqId);
                      $("#ddlResult").val(data.DandAresult);

                      $("#txtDLNum").val(data.DLnum);
                      $("#ddlDLState").val(data.DLstate);
                      $("#ddlDLClass").val(data.DLclass);


                      OpenEmployeeEditDlg(data);

                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#empgridp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {

                  var data = "";
                  var eID = document.getElementById("hdnEditOper");
                  eID.value = "Add";

                  $("#hdnEditID").val('');
                  $("#txtEmpID").val('');
                  $("#txtSSN").val('');
                  $("#txtFName").val('');
                  $("#txtMName").val('');
                  $("#txtLName").val('');
                  $("#txtSuffix").val('');
                  $("#txtAddress1").val('');
                  $("#txtAddress2").val('');
                  $("#txtCity").val('');
                  $("#ddlState").val('');
                  //                $("#txtState").val('');
                  $("#txtZip").val('');
                  $("#txtEmpComment").val('');

                  $("#txtHomePhone").val('');
                  $("#txtCellPhone").val('');
                  $("#txtOqid").val('');
                  $("#ddlResult").val('');

                  $("#txtDLNum").val('');
                  $("#ddlDLState").val('');
                  $("#ddlDLClass").val('');

                  OpenEmployeeEditDlg(data);
                  return false;
              },
              position: "first"
          });

    $('#empgridp_center').remove();
    $('#empgridp_right').remove();

    jQuery("#empqualsgrid").jqGrid({
        editurl: '/Qualification/EditQual/',
        datatype: 'json',
        mtype: 'GET',
        height: 355,
        width: 740,
        rowNum: 5000,
        colNames: ['ID', 'Description', 'Company', 'Test Date', 'Expire Date', 'Evaluator', 'expirewarn', 'employeeid'],
        colModel: [
    { name: 'qualId', index: 'qualId', width: 60 },
    { name: 'qualDesc', index: 'qualDesc', width: 275 },
    { name: 'qualCompany', index: 'qualCompany', width: 55 },
    { name: 'qualDate', index: 'qualDate', width: 70 },
    { name: 'qualExpire', index: 'qualExpire', width: 70 },
    { name: 'evaluator', index: 'evaluator', width: 70 },
    { name: 'expire_warn', hidden: true, search: false },
    { name: 'employeeId', hidden: true, search: false }
    ],
        sortname: 'qualDesc',
        multiselect: true,
        sortorder: "asc",
        viewrecords: true,
        pager: jQuery('#empqualsgridp'),
        caption: 'Qualifications',
        //        ondblClickRow: function(rowid) {

        //            var selArr = $("#empqualsgrid").getGridParam("selarrrow");

        //            var qualIDs = "";

        //            for (i = 0; i < selArr.length - 1; i++) {
        //                var data = $("#empqualsgrid").getRowData(selArr[i]);
        //                if (qualIDs == "") {
        //                    qualIDs = data.qualId;
        //                }
        //                else {
        //                    qualIDs = qualIDs + "," + data.qualId;
        //                }
        //            }

        //            var data = $("#empqualsgrid").getRowData(curRowQuals);
        //            var eID = document.getElementById("hdnEditEmpQualOper");
        //            eID.value = "Edit";
        //            var eID = document.getElementById("hdnEditQualIDs");
        //            eID.value = qualIDs;
        //            $("#hdnEditQualEmpID").val(data.employeeId);

        //            $("#dtTestDt").text('');
        //            $("#dtExpireDt").text('');
        //            $("#txtEvaluator").val('');
        //            $("#txtCompany").val('');
        //            $("#txtQualification").val('');
        //            $("#txtQualCode").val('');

        //            if (selArr.length < 2) {
        //                $("#txtCompany").val(data.qualCompany);
        //                $("#txtQualification").val(data.qualDesc);
        //                $("#txtQualCode").val(data.qualId);
        //            }
        //            else {
        //                $("#txtQualification").val("MULTIPLE UPDATE");
        //            }
        //            $("#dtTestDt").text(data.qualDate);
        //            $("#dtExpireDt").text(data.qualExpire);
        //            $("#txtEvaluator").val(data.evaluator);

        //            OpenEmpQualEditDlg(data);

        //            return false;
        //        },
        afterInsertRow: function(rowid, rowdata, rowelem) {
            if (rowelem[6] == 'SET_RED') {
                jQuery("#empqualsgrid").setCell(rowid, 'qualExpire', '', { color: 'red' })
            }
            if (rowelem[6] == 'SET_ORANGE') {
                jQuery("#empqualsgrid").setCell(rowid, 'qualExpire', '', { color: 'orange' })
            }
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                curRowQuals = ids;
            }
        }
    }).navGrid('#empqualsgridp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
    {}, // edit options
    {}, // add options
    {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
    afterSubmit: function(response, postdata) {

        if (response.responseText == "Success") {
            jQuery("#success").show();
            jQuery("#success").html("Qualification successfully deleted");
            jQuery("#success").fadeOut(6000);

            return [true, response.responseText]

        }
        else {
            return [false, response.responseText]
        }
    },
    onclickSubmit: function(params) {
        var ajaxData = {};

        var selArr = $("#empqualsgrid").getGridParam("selarrrow");
        var qualIDs = "";

        for (i = 0; i < selArr.length; i++) {
            var data = $("#empqualsgrid").getRowData(selArr[i]);
            if (qualIDs == "") {
                qualIDs = data.qualId;
            }
            else {
                qualIDs = qualIDs + "," + data.qualId;
            }
        }

        var rowData = $("#empqualsgrid").getRowData(curRowQuals);
        ajaxData = { id: '1', oper: 'del', intEmployeeID: rowData.employeeId, strQualID: qualIDs };

        return ajaxData;
    }

}, // del options
    {}, // search options
    {} // view options
    ).navButtonAdd('#empqualsgridp', {
        caption: "Edit",
        buttonicon: "ui-icon-pencil",
        onClickButton: function() {
            var selArr = $("#empqualsgrid").getGridParam("selarrrow");
            var testDt = "";
            var expDt = "";
            var evaluator = "";
            if (selArr.length < 1) {
                alert("Select a row to edit!");
            }
            else {
                var qualIDs = "";

                for (i = 0; i < selArr.length; i++) {
                    var data = $("#empqualsgrid").getRowData(selArr[i]);
                    if (qualIDs == "") {
                        qualIDs = data.qualId;
                        testDt = data.qualDate;
                        expDt = data.qualExpire;
                        evaluator = data.evaluator;
                    }
                    else {
                        qualIDs = qualIDs + "," + data.qualId;
                    }
                }

                var data = $("#empqualsgrid").getRowData(curRowQuals);
                var eID = document.getElementById("hdnEditEmpQualOper");
                eID.value = "Edit";
                var eID = document.getElementById("hdnEditQualIDs");
                eID.value = qualIDs;
                $("#hdnEditQualEmpID").val(data.employeeId);

                $("#dtTestDt").text('');
                $("#dtExpireDt").text('');
                $("#txtEvaluator").val('');
                $("#txtCompany").val('');
                $("#txtQualification").val('');
                $("#txtQualCode").val('');

                if (selArr.length < 1) {
                    $("#txtCompany").val(data.qualCompany);
                    $("#txtQualification").val(data.qualDesc);
                    $("#txtQualCode").val(data.qualId);
                    //                    $("#dtTestDt").text(data.qualDate);
                    //                    $("#dtExpireDt").text(data.qualExpire);
                    $("#txtEvaluator").val(data.evaluator);
                }
                else {
                    $("#txtQualification").val("MULTIPLE UPDATE");
                    data.qualExpire = expDt;
                    data.qualDate = testDt;
                    data.evaluator = evaluator;
                    //                    $("#dtTestDt").text(testDt);
                    //                    $("#dtExpireDt").text(expDt);
                    $("#txtEvaluator").val(data.evaluator);
                }

                OpenEmpQualEditDlg(data);
            }
            return false;
        },
        position: "first"
    }).navButtonAdd('#empqualsgridp', {
        caption: "Add",
        buttonicon: "ui-icon-plus",
        onClickButton: function() {
            var data = $("#empgrid").getRowData(curRow);
            if (data.employeeid == null)
                alert("  Please select an employee!");
            else {
                var eID = document.getElementById("hdnEditEmpQualOper");
                eID.value = "Add";
                var eID = document.getElementById("hdnEditQualEmpID");
                eID.value = data.employeeid;

                $("#dtTestDt").text('');
                $("#dtExpireDt").text('');
                $("#txtEvaluator").val('');
                $("#ddlCompany").val('');

                OpenEmpQualEditDlg(data);
            }
            return false;
        },
        position: "first"
    });

$('#empqualsgridp_center').remove();
$('#empqualsgridp_right').remove();

$(function() {
    $("#employee_edit_dlg").dialog({
        bgiframe: true,
        width: 590,
        modal: true,
        autoOpen: false,
        resizable: false,
        open: function(event, ui) {
            $('#dtMVRcheckDt').datepicker('enable');
            $('#dtCBGcheckDt').datepicker('enable');
            $('#dtDandAcheckDt').datepicker('enable');
            $('#dtBirthDate').datepicker('enable');
            $('#dtMedCrdExpDt').datepicker('enable');
            $('#dtDLExpDt').datepicker('enable');
        },
        close: function(event, ui) {
            $('#dtMVRcheckDt').datepicker('hide');
            $('#dtCBGcheckDt').datepicker('hide');
            $('#dtDandAcheckDt').datepicker('hide');
            $('#dtBirthDate').datepicker('hide');
            $('#dtMedCrdExpDt').datepicker('hide');
            $('#dtDLExpDt').datepicker('hide');
        }
    })
});

$(function() {
    $("#empqual_edit_dlg").dialog({
        bgiframe: true,
        width: 500,
        modal: true,
        autoOpen: false,
        resizable: false,
        open: function(event, ui) {
            $('#dtTestDt').datepicker('enable');
            $('#dtExpireDt').datepicker('enable');
        },
        close: function(event, ui) {
            $('#dtTestDt').datepicker('hide');
            $('#dtExpireDt').datepicker('hide');
        }

    })
});

$('#employee_edit_form').ajaxForm(function(data) {
    jQuery('#employee_loading').hide();

    if (data == "Success") {
        jQuery("#employee_success").html('Save Successful!');
        jQuery("#employee_success").show();
        jQuery("#empgrid").trigger('reloadGrid');

        return [true, "Success"]
    }
    else {
        jQuery("#employee_success").html(data);
        jQuery("#employee_success").show();
        return [false, "Failure"]
    }
    return [true, "Success"]
});

$('#empqual_edit_form').ajaxForm(function(data) {
    jQuery('#empqual_loading').hide();

    if (data == "Success") {
        jQuery("#empqual_success").html('Save Successful!');
        jQuery("#empqual_success").show();
        jQuery("#empqualsgrid").trigger('reloadGrid');

        return [true, "Success"]
    }
    else {
        jQuery("#empqual_success").html(data);
        jQuery("#empqual_success").show();
        return [false, "Failure"]
    }
    return [true, "Success"]
});

$(function() {
    $("#rpt_dialog").dialog({
        bgiframe: true,
        width: 540,
        modal: true,
        autoOpen: false,
        resizable: false
    })
});

$(function() {
    $("#empWarnRecognition_dialog").dialog({
        bgiframe: true,
        width: 600,
        modal: true,
        autoOpen: false,
        resizable: false,
        open: function(event, ui) {
            //            $('#dtWarning').datepicker('enable');
        },
        close: function(event, ui) {
            $('#dtWarning').datepicker('hide');
        }

    })
});

$(function() {
    $("#help_popup").dialog({
        bgiframe: true,
        width: 300,
        height: 300,
        modal: true,
        autoOpen: false,
        resizable: false
    })
});

$(function() {
    $("#admin_dialog").dialog({
        bgiframe: true,
        width: 1100,
        height: 330,
        modal: true,
        autoOpen: false,
        resizable: false
    })
});

$(function() {
    $("#admin_email_dialog").dialog({
        bgiframe: true,
        width: 520,
        height: 330,
        modal: true,
        autoOpen: false,
        resizable: false
    })
});

$('#adminDlgForm').ajaxForm(function(data) {

    if (data == "Success") {

        jQuery("#admingrid").trigger("reloadGrid");

        jQuery("#adminSuccess").show();
        jQuery("#adminSuccess").html("Successfully saved.");
        jQuery("#adminSuccess").fadeOut(6000);

    }
    else {
        jQuery("#adminSuccess").show();
        jQuery("#adminSuccess").html("Error saving.");
        jQuery("#adminSuccess").fadeOut(6000);
    }

    $("#btnAdminAdd").removeAttr("disabled", "disabled");
    $("#btnAdminDel").attr("disabled", "disabled");
    $("#btnAdminSave").attr("disabled", "disabled");
});

$('#adminEmailDlgForm').ajaxForm(function(data) {

    if (data == "Success") {

        jQuery("#adminemailgrid").trigger("reloadGrid");

        jQuery("#adminEmailSuccess").show();
        jQuery("#adminEmailSuccess").html("Successfully saved.");
        jQuery("#adminEmailSuccess").fadeOut(6000);

    }
    else {
        jQuery("#adminEmailSuccess").show();
        jQuery("#adminEmailSuccess").html("Error saving.");
        jQuery("#adminEmailSuccess").fadeOut(6000);
    }

    $("#btnAdminAdd").removeAttr("disabled", "disabled");
    $("#btnAdminDel").attr("disabled", "disabled");
    $("#btnAdminSave").attr("disabled", "disabled");
});

$('#empWarnRecognitionForm').ajaxForm(function(data) {

    if (data == "Success") {

        var EmpID = $('#hdnEditID').val();
        var type = $('#hdnWRType').val();

        $.get("/Qualification/GetEmpWarnRecogDates/" + EmpID + "/" + type, {}, function(data) {

            $("#empwarnrecog_results").html(data);
        });

        jQuery("#adminemailgrid").trigger("reloadGrid");

        jQuery("#warnRecognitionSuccess").show();
        jQuery("#warnRecognitionSuccess").html("Successfully saved.");
        jQuery("#warnRecognitionSuccess").fadeOut(6000);

    }
    else {
        jQuery("#warnRecognitionSuccess").show();
        jQuery("#warnRecognitionSuccess").html("Error saving.");
        jQuery("#warnRecognitionSuccess").fadeOut(6000);
    }

});



});                                                    //ready function end

function OpenEmployeeEditDlg(dta) {

    $("#btnSaveEmployee").removeAttr("disabled", "disabled");

    $("#employee_success").html("Save Successful!");
    $("#employee_success").hide();
    $("#employee_loading").hide();

    var oper = $('#hdnEditOper').val();

    $("#employee_edit_dlg").dialog('option', 'title', oper + " Employee");

    $.get("/Qualification/GetEmployeeEditDlg/", {}, function(data) {
        $("#employee_edit_results").html(data);
        if (oper == "Edit") {
            $('#ddlJobClass').val(dta.jobClass);
            $('#ddlOpAreas').val(dta.oparea);
        }
    });

    $('#dtMVRcheckDt').val('');
    $('#dtMVRcheckDt').datepicker('disable');
    $('#dtMVRcheckDt').val(dta.MVRcheckDt);

    $('#dtCBGcheckDt').val('');
    $('#dtCBGcheckDt').datepicker('disable');
    $('#dtCBGcheckDt').val(dta.CBGcheckDt);

    $('#dtDandAcheckDt').val('');
    $('#dtDandAcheckDt').datepicker('disable');
    $('#dtDandAcheckDt').val(dta.DandAcheckDt);

    $('#dtBirthDate').val('');
    $('#dtBirthDate').datepicker('disable');
    $('#dtBirthDate').val(dta.birthDate);

    $('#dtMedCrdExpDt').val('');
    $('#dtMedCrdExpDt').datepicker('disable');
    $('#dtMedCrdExpDt').val(dta.medicalCardExpDt);

    $('#dtDLExpDt').val('');
    $('#dtDLExpDt').datepicker('disable');
    $('#dtDLExpDt').val(dta.DLexpDate);

    jQuery('#employee_edit_dlg').dialog('open');

}

function SelectWRDate() {

    var WRType = $('#hdnWRType').val();
    var EmpID = $('#hdnWREmpID').val();

    var selected = $("#lbEmpWarnRecogDates").find(':selected').text();

    $('#dtWarning').val('');
    $('#dtWarning').val(selected);

    $("#dtWarning").attr("disabled", "disabled");
    $('#dtWarning').datepicker('disable');
    $("#txtWarnComments").removeAttr("disabled", "disabled");
    

    var str = replacement = '.';
    var sel = selected.replace(/\//g, replacement);

    $.get("/Qualification/GetEmpWRComment/" + EmpID + "/" + WRType + "/" + sel, {}, function(data) {
        $('#txtWarnComments').val(data);
    });
}

function OpenEmpWRDlg(type) {

    var EmpID = $('#hdnEditID').val();
    $('#hdnWREmpID').val(EmpID);

    $('#hdnWRType').val(type);

    $('#dtWarning').val('');
    $("#dtWarning").attr("disabled", "disabled");
    $('#dtWarning').datepicker('disable');

    if (type == 'W') {
        $("#empWarnRecognition_dialog").dialog('option', 'title', "Employee Warnings");
    }
    else {
        $("#empWarnRecognition_dialog").dialog('option', 'title', "Employee Recognitions");
    }

    $.get("/Qualification/GetEmpWarnRecogDates/" + EmpID + "/" + type, {}, function(data) {

        $("#empwarnrecog_results").html(data);

        var itemCnt = $("#lbEmpWarnRecogDates").children().length;

        if (itemCnt > 0) {
            var options = lbEmpWarnRecogDates.options;
            options[0].selected = true;

            SelectWRDate();
        }
        else {

            $('#txtWarnComments').val('');
            $("#txtWarnComments").attr("disabled", "disabled");
        
        }
    });

    $('#dtWarning').val('');
    $('#dtWarning').datepicker('disable');

    jQuery('#empWarnRecognition_dialog').dialog('open');

}

function OpenEmpQualEditDlg(dta) {

    $("#btnSaveEmpQual").removeAttr("disabled", "disabled");

    $("#empqual_success").html("Save Successful!");
    $("#empqual_success").hide();
    $("#empqual_loading").hide();

    var oper = $('#hdnEditEmpQualOper').val();

    if (oper == 'Edit') {
        $("#divCompDDL").hide();
        $("#txtCompany").show();
        $("#txtQualification").show();
        $("#txtQualCode").show();
        $("#txtCompany").attr("disabled", "disabled");
        $("#txtQualification").attr("disabled", "disabled");
        $("#txtQualCode").attr("disabled", "disabled");
    }
    else {
        $("#divCompDDL").show();
        $("#txtCompany").hide();
        $("#txtQualification").hide();
        $("#txtQualCode").hide();
        $("#divQualLbl").hide();
        $("#divCodeLbl").hide();

        var Company = "test";

        $.get("/Qualification/GetQualEditDlg/", { strCompany: Company }, function(data) {
            $("#empqual_results").html(data);
        });
    }

    $("#empqual_edit_dlg").dialog('option', 'title', oper + " Qualification");

    $('#dtTestDt').val('');
    $('#dtTestDt').datepicker('disable');
    $('#dtTestDt').val(dta.qualDate);

    $('#dtExpireDt').val('');
    $('#dtExpireDt').datepicker('disable');
    $('#dtExpireDt').val(dta.qualExpire);



    jQuery('#empqual_edit_dlg').dialog('open');

}

function LoadQualDDLs() {
    var Company = $('#ddlCompany').val();

    $.get("/Qualification/GetQualEditDlg/", { strCompany: Company }, function(data) {
        $("#empqual_results").html(data);
    });
}

function LoadEmpWarnRecogDates(EmpID, Flg) {

    $.get("/Qualification/GetEmpWarnRecogDates/" + EmpID + "/" + Flg, {}, function(data) {
        $("#empwarnrecog_results").html(data);
    });
}



function LoadRptQualDDLs() {

    var rptNm = $('#hdnReportName').val();

    if (rptNm == 'EmployeeListByCertification') {

        var Company = $('#ddlRptCompany').val();

        $.get("/Qualification/GetQualEditDlg/", { strCompany: Company }, function(data) {
            $("#rpt_dlg_results").html(data);
        });
    }
    else {
        $("#rpt_dlg_results").hide();
    }

}

function SelectQualDesc() {

    var code = $('#ddlQualCodes').val();

    $('#ddlQualDescriptions').val(code);

}

function SelectQualCode() {

    var code = $('#ddlQualDescriptions').val();

    $('#ddlQualCodes').val(code);

}

function CloseEmployeeDialog() {

    jQuery('#employee_edit_dlg').dialog('close');

};

function ShowEditFormWait() {

    $("#employee_loading").show();
    $("#btnSaveEmployee").attr("disabled", "disabled");

}

function ShowEmpQualFormWait() {

    $("#empqual_loading").show();
    $("#btnSaveEmpQual").attr("disabled", "disabled");

}

function CloseEmpQualDialog() {

    jQuery('#empqual_edit_dlg').dialog('close');

};

function CloseReportDialog() {
    jQuery('#rpt_dialog').dialog('close');

};

function ShowRptFormWait() {

    $("#rpt_loading").show();

}

function ShowHelp() {

    jQuery('#help_popup').dialog('open');

};

function EmployeeListByCertification() {

    jQuery('#ddlRptCompany').val('');

    $("#help_popup").dialog('option', 'title', "Employee List By Certification");

    $.get("/EquipTrack/GetHelpMsg/" + "EmployeeListByCertification", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Qualified Employee List By Certification");


    var eID = document.getElementById("hdnReportName");
    eID.value = "EmployeeListByCertification";

    LoadRptQualDDLs();

    jQuery('#rpt_dialog').dialog('open');
};

function EmployeeListByCompany() {

    jQuery('#ddlRptCompany').val('');

    $("#help_popup").dialog('option', 'title', "Qualified Employee List By Company");

    $.get("/EquipTrack/GetHelpMsg/" + "EmployeeListByCompany", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Qualified Employee List By Company");


    var eID = document.getElementById("hdnReportName");
    eID.value = "EmployeeListByCompany";

    LoadRptQualDDLs();

    jQuery('#rpt_dialog').dialog('open');
};

function EmployeeListOfExpiredCerts() {

    $('#ddlRptCompany').hide();
    $('#divCompRptLbl').hide();

    $("#help_popup").dialog('option', 'title', "Employee List of Expired Certifications");
    $.get("/EquipTrack/GetHelpMsg/" + "EmployeeListExpiredCerts", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Employee List of Expired Certifications");


    var eID = document.getElementById("hdnReportName");
    eID.value = "EmployeeListExpiredCerts";

    jQuery('#rpt_dialog').dialog('open');
};

function EmployeeListDueToExpireCerts() {

    $('#ddlRptCompany').hide();
    $('#divCompRptLbl').hide();

    $("#help_popup").dialog('option', 'title', "Employee List of Certifications Due to Expire (within 90 days)");
    $.get("/EquipTrack/GetHelpMsg/" + "EmployeeListCertsDueToExpire", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Employee List of Certifications Due to Expire (within 90 days)");

    var eID = document.getElementById("hdnReportName");
    eID.value = "EmployeeListDueToExpireCerts";

    jQuery('#rpt_dialog').dialog('open');
};

function CertListByEmployee() {

    $('#ddlRptCompany').hide();
    $('#divCompRptLbl').hide();

    $("#help_popup").dialog('option', 'title', "Certifications List By Employee");
    $.get("/EquipTrack/GetHelpMsg/" + "CertificationsListByEmployee", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Certifications List By Employee");

    LoadEmployeeDDL()


    var eID = document.getElementById("hdnReportName");
    eID.value = "CertListByEmployee";

    jQuery('#rpt_dialog').dialog('open');
};

function LoadEmployeeDDL() {

    $.get("/Qualification/GetCertRptDlg/", function(data) {
        $("#rpt_dlg_results").html(data);
        $("#rpt_dlg_results").show();

    });
};

function CloseAdminDialog() {
    jQuery('#admin_dialog').dialog('close');

};

function CloseEmailAdminDialog() {

    jQuery('#admin_email_dialog').dialog('close');

};

function CloseWRDialog() {

    jQuery('#empWarnRecognition_dialog').dialog('close');

};

function SetUpAdminGrid(strUrl) {

    jQuery("#admingrid").jqGrid({
        url: strUrl,
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 560,
        rowNum: 5000,
        colNames: ['ID', 'Description', 'Type'],
        colModel: [
                { name: 'id', sortable: false, width: 60 },
   		        { name: 'description', sortable: false, width: 400 },
   		        { name: 'type', sortable: false, width: 100, align: 'center' },
   		        ],
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#admingrid tbody:first-child tr:first').attr('id');
            jQuery("#admingrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#admingrid").getRowData(ids);
                $("#txtID").val(data.id);
                $("#hdnAdminID").val(data.id);
                $("#txtID").attr("disabled", "disabled");
                $("#txtDescription").val(data.description);
                $("#ddlAdminCompany").val(data.type);
                $("#ddlAdminCompany").attr("disabled", "disabled");

                $("#btnAdminAdd").removeAttr("disabled", "disabled");
                $("#btnAdminDel").removeAttr("disabled", "disabled");
                $("#btnAdminSave").removeAttr("disabled", "disabled");
                $("#txtDescription").removeAttr("disabled");
                //                    $("#txtID").removeAttr("disabled", "disabled");
                curRowAdmin = ids;
                $("#hdnAdminOper").val("Edit");

            }
        }
    });

    jQuery("#admingrid").resetSelection();

    InitAdminControls();

}

function SetUpEmailAdminGrid(strUrl) {

    jQuery("#adminemailgrid").jqGrid({
        url: strUrl,
        datatype: 'json',
        mtype: 'GET',
        height: 150,
        width: 200,
        rowNum: 5000,
        colNames: ['Email', 'id'],
        colModel: [
                { name: 'email', sortable: false, width: 160 },
                { name: 'id', hidden: true }
                ],
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#adminemailgrid tbody:first-child tr:first').attr('id');
            jQuery("#adminemailgrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminemailgrid").getRowData(ids);
                $("#txtAdminEmail").val(data.email);
                $("#hdnEmailAdminID").val(data.id);

                $("#btnAddEmail").removeAttr("disabled", "disabled");
                $("#btnDeleteEmail").removeAttr("disabled", "disabled");
                $("#btnEmailAdminSave").removeAttr("disabled", "disabled");
                //                $("#txtDescription").removeAttr("disabled");
                curRowEmailAdmin = ids;
                $("#hdnEmailAdminOper").val("Edit");

            }
        }
    });

    jQuery("#adminemailgrid").resetSelection();

    InitEmailAdminControls();

}



function AdminEmailNotifications() {

    SetUpEmailAdminGrid('/Qualification/GetAdminEmailNotification/');

    $("#admin_email_dialog").dialog('option', 'title', "Email Notifications");

    var eID = document.getElementById("hdnEmailAdminType");
    eID.value = "AdminEmailNotifications";

    jQuery('#adminemailgrid').clearGridData();
    jQuery('#adminemailgrid').setGridParam({ url: "/Qualification/GetAdminEmailNotification/" }).trigger("reloadGrid");
    jQuery('#admin_email_dialog').dialog('open');
}

function AdminCertifications() {

    SetUpAdminGrid('/Qualification/GetAdminQualifications/');

    $("#admin_dialog").dialog('option', 'title', "Certifications");

    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminCertifications";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/Qualification/GetAdminQualifications/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function InitAdminControls() {

    $("#btnAdminAdd").removeAttr("disabled", "disabled");
    $("#btnAdminDel").attr("disabled", "disabled");
    $("#btnAdminSave").attr("disabled", "disabled");
    $("#txtID").attr("disabled", "disabled");
    $("#txtDescription").attr("disabled", "disabled");
    $("#txtDescription").val("");
    $("#txtID").val("");
}

function InitEmailAdminControls() {

    $("#btnAddEmail").removeAttr("disabled", "disabled");
    $("#btnDeleteEmail").attr("disabled", "disabled");
    $("#btnEmailAdminSave").attr("disabled", "disabled");
    //    $("#txtAdminEmail").attr("disabled", "disabled");
    $("#txtAdminEmail").val("");
}

function AddAdminDialog() {
    var eID = document.getElementById("hdnAdminOper");
    eID.value = "Add";


    $("#ddlAdminCompany").removeAttr("disabled");
    $("#ddlAdminCompany").val('');
    $("#txtID").removeAttr("disabled");
    $("#txtID").val('');
    $("#txtDescription").removeAttr("disabled");
    $("#txtDescription").val('');
    $("#ddlAdminCompany").focus();
    $("#btnAdminAdd").attr("disabled", "disabled");

}

function AddEmailAdminDialog() {
    var eID = document.getElementById("hdnEmailAdminOper");
    eID.value = "Add";

    //    $("#txtAdminEmail").removeAttr("disabled");
    $("#txtAdminEmail").val('');
    $("#txtAdminEmail").focus();
    $("#btnAddEmail").attr("disabled", "disabled");

}

function AddWRDialog() {
    var eID = document.getElementById("hdnWROper");
    eID.value = "Add";

    $('#dtWarning').val('');
    $("#dtWarning").removeAttr("disabled", "disabled");
    $('#dtWarning').datepicker('enable');

    $('#txtWarnComments').val('');
    $("#txtWarnComments").removeAttr("disabled", "disabled");

//    $("#lbEmpWarnRecogDates").find("option").attr("selected", false);

}

function AdminCompanyClick() {

    var eID = document.getElementById("hdnCompany");
    var comp = $("#ddlAdminCompany").val();

    eID.value = comp;

}

function confirmDelete() {
    var adminType = $("#hdnAdminType").val();
    var result = "";
    var adminTypeName;
    var qualID = $("#hdnAdminID").val();

    if (confirm("Are you sure you want to delete this item?")) {
        if (adminType == 'AdminCertifications') {
            $.post("/Qualification/DeleteAdminQual/" + qualID, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
    }
}

function confirmEmailDelete() {
    var adminType = $("#hdnEmailAdminType").val();
    var result = "";
    var adminTypeName;
    var qualID = $("#hdnEmailAdminID").val();

    if (confirm("Are you sure you want to delete this item?")) {
        if (adminType == 'AdminEmailNotifications') {
            $.post("/Qualification/DeleteAdminEmail/" + qualID, {},
                            function(data) {
                                DeleteEmailMsg(data);
                            }
                        );
        }
    }
}

function confirmWRDelete() {
    var wrType = $("#hdnWRType").val();
    var empID = $("#hdnWREmpID").val();
    var date = $("#dtWarning").val();

    var sel = date.replace(/\//g, replacement);

    if (confirm("Are you sure you want to delete this item?")) {
        $.post("/Qualification/DeleteWR/" + empID + "/" + wrType + "/" + sel, {},
                            function(data) {
                            DeleteWR(data);
                            $.get("/Qualification/GetEmpWarnRecogDates/" + empID + "/" + wrType, {}, function(data) {
                                $("#empwarnrecog_results").html(data);
                            });
                                
                            }
                        );
    }
}

function DeleteMsg(data) {

    if (data == "Success") {
        InitAdminControls();

        AdminSuccessFailure(true)
    }
    else {
        AdminSuccessFailure(false)
    }

}

function DeleteEmailMsg(data) {

    if (data == "Success") {
        InitEmailAdminControls();

        AdminEmailSuccessFailure(true)
    }
    else {
        AdminEmailSuccessFailure(false)
    }

}

function DeleteWR(data) {

    if (data == "Success") {

        WRSuccessFailure(true)
    }
    else {
        WRSuccessFailure(false)
    }

}

function AdminSuccessFailure(success) {
    if (success) {

         
        jQuery("#admingrid").delRowData(curRowAdmin);
        jQuery("#adminSuccess").show();
        jQuery("#adminSuccess").html("Successfully deleted.");
        jQuery("#adminSuccess").fadeOut(6000);
    }
    else {
        jQuery("#adminSuccess").show();
        jQuery("#adminSuccess").html("Error deleting row.");
        jQuery("#adminSuccess").fadeOut(6000);
    }
}

function AdminEmailSuccessFailure(success) {
    if (success) {
        jQuery("#adminemailgrid").delRowData(curRowEmailAdmin);
        jQuery("#adminEmailSuccess").show();
        jQuery("#adminEmailSuccess").html("Successfully deleted.");
        jQuery("#adminEmailSuccess").fadeOut(6000);
    }
    else {
        jQuery("#adminEmailSuccess").show();
        jQuery("#adminEmailSuccess").html("Error deleting row.");
        jQuery("#adminEmailSuccess").fadeOut(6000);
    }
}

function WRSuccessFailure(success) {
    if (success) {
        jQuery("#warnRecognitionSuccess").show();
        jQuery("#warnRecognitionSuccess").html("Successfully deleted.");
        jQuery("#warnRecognitionSuccess").fadeOut(6000);
    }
    else {
        jQuery("#warnRecognitionSuccess").show();
        jQuery("#warnRecognitionSuccess").html("Error deleting row.");
        jQuery("#warnRecognitionSuccess").fadeOut(6000);
    }
}

function CheckValidWRForm() {

    var dtWRval = $("#dtWarning").val();
    var wrVal = $("#txtWarnComments").val();

    if (dtWRval.length > 0 && wrVal.length > 0) {
        return true;
    }
    else {
        alert('You must suppy date and comment to save!');
        return false;
    }
}

function CheckAdminDesc(desc) {

    if (desc.length > 0) {
        $("#btnAdminSave").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnAdminSave").attr("disabled", "disabled");
    }
}

