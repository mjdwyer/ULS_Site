var curRow;
var curRowQuals;
var curQualsColor;

jQuery(document).ready(function() {
    jQuery("#empgrid").jqGrid({
        url: '/Qualification/GridData/',
        editurl: '/Qualification/EditEmp/',
        datatype: 'json',
        mtype: 'GET',
        hoverrows: false,
        altRows: false,
        height: 255,
        width: 740,
        rowNum: 5000,
        colNames: ['Last', 'First', 'Middle', 'Suffix', 'empID', 'Status', 'Org', 'oqId', 'comment', 'ssn', 'address1', 'address2', 'city', 'state', 'zip', 'email', 'employeeid'],
        colModel: [
   		        { name: 'lname', index: 'lname', width: 130, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'fname', index: 'fname', width: 130, search: false },
   		        { name: 'mname', index: 'mname', width: 130, search: false },
   		        { name: 'suffix', index: 'suffix', width: 80, search: false },
                { name: 'empID', index: 'empID', search: false },
   		        { name: 'empStatus', index: 'empStatus', width: 80, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetLocations'} },
   		        { name: 'org', index: 'org', width: 80, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetLocations'} },
                { name: 'oqId', hidden: true, search: false },
                { name: 'comment', hidden: true, search: false },
                { name: 'ssn', hidden: true, search: false },
                { name: 'address1', hidden: true, search: false },
                { name: 'address2', hidden: true, search: false },
                { name: 'city', hidden: true, search: false },
                { name: 'state', hidden: true, search: false },
                { name: 'zip', hidden: true, search: false },
                { name: 'email', hidden: true, search: false },
   		        { name: 'employeeid', hidden: true, search: false }
            ],
        sortname: 'lname',
        sortorder: "asc",
        viewrecords: true,
        pager: jQuery('#empgridp'),
        //            caption: 'Inventory for ' + curDiv +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>',
        ondblClickRow: function(rowid) {
//            var data = $("#empgrid").getRowData(curRow);
//            if (data.employeeid == null)
//                alert("  Please Select a Row!");
//            else {

//                var eID = document.getElementById("hdnEditOper");
//                eID.value = "Edit";

//                var eID = document.getElementById("hdnEditID");
//                eID.value = data.employeeid;

//                $("#hdnEditID").val('');
//                $("#txtEmpID").val('');
//                $("#txtSSN").val('');
//                $("#txtFName").val('');
//                $("#txtMName").val('');
//                $("#txtLName").val('');
//                $("#txtAddress1").val('');
//                $("#txtAddress2").val('');
//                $("#txtCity").val('');
//                $("#txtState").val('');
//                $("#txtZip").val('');
//                $("#txtEmail").val('');
//                $("#txtEmpComment").val('');


//                $("#hdnEditID").val(data.employeeid);
//                $("#txtEmpID").val(data.empID);
//                $("#txtSSN").val(data.ssn);
//                $("#txtFName").val(data.fname);
//                $("#txtMName").val(data.mname);
//                $("#txtLName").val(data.lname);
//                $("#txtAddress1").val(data.address1);
//                $("#txtAddress2").val(data.address2);
//                $("#txtCity").val(data.city);
//                $("#txtState").val(data.state);
//                $("#txtZip").val(data.zip);
//                $("#txtEmail").val(data.email);
//                $("#txtEmpComment").val(data.comment);

//                OpenEmployeeEditDlg(data);

//            }
//            return false;
        },
        onSelectRow: function(ids) {
//            if (ids != null) {
//                curRowAsgn = -1;
//                curRow = ids;
//                var data = $("#empgrid").getRowData(ids);
//                //mjd                jQuery("#electronics_asgn").setGridParam({ url: "/Electronics/GetAssignGridData/" + data.electronics_id, page: 1 })
                //                .trigger('reloadGrid');
                //                curElectronicsAssignColor = data.electronics_assign_color;
//            }
        },
        loadComplete: function() {

            //            jQuery('#electronicsgrid').setCaption(strCap);

        }
    }).navGrid('#empgridp', { deltext: "Delete", searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: true, search: true, refresh: true }, //options
         {}, // edit options
         {}, // add options
        {
//        mtype: "POST", reloadAfterSubmit: true, serializeDelData: function(postdata) {
//            return ""; // the body MUST be empty in DELETE HTTP requests
//        }, onclickSubmit: function(params) {
//            var ajaxData = {};

//            var rowData = $("#electronicsgrid").getRowData(curRow);

//            ajaxData = { id: '1', oper: 'del', intElectronicsID: rowData.electronics_id };

//            return ajaxData;
//        }
    }, // del options
            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
            closeAfterSearch: true, closeOnEscape: true
        }, // search options
         {} // view options
          )
          .navButtonAdd('#empgridp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#empgrid").getRowData(curRow);
                  if (data.electronics_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.electronics_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "EmployeeOneRpt";
                      $("#rpt_dialog").data("title.dialog", "Summary Report for ID: " + data.employeeid)

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#empgridp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#electronicsgrid").getRowData(curRow);
                  if (data.electronics_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnEditID");
                      eID.value = data.electronics_id;

                      $("#hdnEditID").val('');
                      $("#txtEmpID").val('');
                      $("#txtSSN").val('');
                      $("#txtFName").val('');
                      $("#txtMName").val('');
                      $("#txtLName").val('');
                      $("#txtAddress1").val('');
                      $("#txtAddress2").val('');
                      $("#txtCity").val('');
                      $("#txtState").val('');
                      $("#txtZip").val('');
                      $("#txtEmail").val('');
                      $("#txtEmpComment").val('');


                      $("#hdnEditID").val(data.employeeid);
                      $("#txtEmpID").val(data.empID);
                      $("#txtSSN").val(data.ssn);
                      $("#txtFName").val(data.fname);
                      $("#txtMName").val(data.mname);
                      $("#txtLName").val(data.lname);
                      $("#txtAddress1").val(data.address1);
                      $("#txtAddress2").val(data.address2);
                      $("#txtCity").val(data.city);
                      $("#txtState").val(data.state);
                      $("#txtZip").val(data.zip);
                      $("#txtEmail").val(data.email);
                      $("#txtEmpComment").val(data.comment);

                      OpenEmployeeEditDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#electronicsgridp', {
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
                  $("#txtAddress1").val('');
                  $("#txtAddress2").val('');
                  $("#txtCity").val('');
                  $("#txtState").val('');
                  $("#txtZip").val('');
                  $("#txtEmail").val('');
                  $("#txtEmpComment").val('');

                  $("#employee_results").html('');

                  OpenEmployeeEditDlg(data);
                  return false;
              },
              position: "first"
          });
    $('#empgridp_center').remove();
    $('#empgridp_right').remove();


    //    jQuery("#electronics_asgn").jqGrid({
    //        editurl: '/Electronics/EditAssign/',
    //        datatype: 'json',
    //        mtype: 'GET',
    //        height: 100,
    //        width: 740,
    //        rowNum: 5000,
    //        colNames: ['ID', 'Assign To', 'Date Assigned', 'Return Date', 'Assign Condition', 'Return Condition', 'Comments', 'AssignID'],
    //        colModel: [
    //   		        { name: 'electronics_id', index: 'electronics_id', width: 65 },
    //   		        { name: 'assigned_to', index: 'assigned_to', width: 80 },
    //                { name: 'assigned_dt', index: 'assigned_dt', width: 100 },
    //                { name: 'return_dt', index: 'return_dt', width: 100 },
    //   		        { name: 'asgn_condition_id', index: 'asgn_condition_id', width: 80 },
    //   		        { name: 'ret_condition_id', index: 'ret_condition_id', width: 80 },
    //                { name: 'comments', hidden: true },
    //                { name: 'assign_id', hidden: true }
    //            ],
    //        sortname: 'assigned_dt',
    //        sortorder: "desc",
    //        viewrecords: true,
    //        pager: jQuery('#electronicsasgnp'),
    //        caption: 'Assignments',
    //        ondblClickRow: function(rowid) {
    //            var data = $("#electronics_asgn").getRowData(curRowAsgn);
    //            if (data.electronics_id == null)
    //                alert("  Please Select an Assignment Row!");
    //            else {
    //                var eID = document.getElementById("hdnAsgnEditOper");
    //                eID.value = "Edit";

    //                var eID = document.getElementById("hdnAsgnEditID");
    //                eID.value = data.electronics_id;

    //                $('#dtElectronicsAsgnDt').text('');
    //                $('#dtElectronicsRetDt').text('');
    //                $('#ddlAsgnCond').val('');
    //                $('#ddlRetCond').val('');
    //                $('#txtElectronicsAsgnComments').val('');

    //                $('#dtElectronicsAsgnDt').text(data.assigned_dt);
    //                $('#dtElectronicsRetDt').text(data.return_dt);

    //                if (data.asgn_condition_id.length > 0)
    //                    $("#ddlAsgnCond option:contains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

    //                if (data.ret_condition_id.length > 0)
    //                    $("#ddlRetCond option:contains(" + data.ret_condition_id + ")").attr('selected', 'selected');

    //                $('#txtElectronicsAsgnComments').val(data.comments);

    //                $("#electronics_asgn_results").html('');

    //                OpenElectronicsEditAsgnDlg(data);
    //            }

    //            return false;
    //        },
    //        onSelectRow: function(ids) {
    //            if (ids != null) {
    //                curRowAsgn = ids;
    //                var data = $("#electronics_asgn").getRowData(curRowAsgn);
    //                var eIS = document.getElementById("hdnAsgnID");
    //                eIS.value = data.assign_id;

    //            }
    //        }
    //    }).navGrid('#electronicsasgnp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
    //         {}, // edit options
    //         {}, // add options
    //         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
    //         afterSubmit: function(response, postdata) {

    //             if (response.responseText == "Success") {
    //                 jQuery("#success").show();
    //                 jQuery("#success").html("Assignment successfully deleted");
    //                 jQuery("#success").fadeOut(6000);

    //                 return [true, response.responseText]
    //             }
    //             else {
    //                 return [false, response.responseText]
    //             }
    //         }
    //     }, // del options
    //         {}, // search options
    //         {} // view options
    //          ).navButtonAdd('#electronicsasgnp', {
    //              caption: "Edit",
    //              buttonicon: "ui-icon-pencil",
    //              onClickButton: function() {
    //                  var data = $("#electronics_asgn").getRowData(curRowAsgn);
    //                  if (data.electronics_id == null)
    //                      alert("  Please Select an Assignment Row!");
    //                  else {
    //                      var eID = document.getElementById("hdnAsgnEditOper");
    //                      eID.value = "Edit";

    //                      var eID = document.getElementById("hdnAsgnEditID");
    //                      eID.value = data.electronics_id;

    //                      $('#dtElectronicsAsgnDt').text('');
    //                      $('#dtElectronicsRetDt').text('');
    //                      $('#ddlAsgnCond').val('');
    //                      $('#ddlRetCond').val('');
    //                      $('#txtElectronicsAsgnComments').val('');


    //                      $('#dtElectronicsAsgnDt').text(data.assigned_dt);
    //                      $('#dtElectronicsRetDt').text(data.return_dt);

    //                      if (data.asgn_condition_id.length > 0)
    //                          $("#ddlAsgnCond option:contains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

    //                      if (data.ret_condition_id.length > 0)
    //                          $("#ddlRetCond option:contains(" + data.ret_condition_id + ")").attr('selected', 'selected');

    //                      $('#txtElectronicsAsgnComments').val(data.comments);

    //                      $("#electronics_asgn_results").html('');

    //                      OpenElectronicsEditAsgnDlg(data);
    //                  }
    //                  return false;
    //              },
    //              position: "first"
    //          }).navButtonAdd('#electronicsasgnp', {
    //              caption: "Add",
    //              buttonicon: "ui-icon-plus",
    //              onClickButton: function() {
    //                  var data = $("#electronicsgrid").getRowData(curRow);
    //                  if (data.electronics_id == null)
    //                      alert("  Please Select a Row!");
    //                  else {
    //                      var eID = document.getElementById("hdnAsgnEditOper");
    //                      eID.value = "Add";

    //                      var eID = document.getElementById("hdnAsgnEditID");
    //                      eID.value = data.electronics_id;

    //                      $('#dtElectronicsAsgnDt').text('');
    //                      $('#dtElectronicsRetDt').text('');
    //                      $('#ddlAsgnCond').val('');
    //                      $('#ddlRetCond').val('');
    //                      $('#txtElectronicsAsgnComments').val('');

    //                      if (curElectronicsAssignColor == "SET_GREEN") {
    //                          $("#electronics_asgn_results").html('');
    //                          OpenElectronicsEditAsgnDlg(data);
    //                      }
    //                      else {
    //                          alert('Currently selected electronics is already assigned!');
    //                      }

    //                  }
    //                  return false;
    //              },
    //              position: "first"
    //          });

    //    $('#electronicsasgnp_center').remove();
    //    $('#electronicsasgnp_right').remove();

    //    $(function() {
    //        $("#rpt_dialog").dialog({
    //            bgiframe: true,
    //            width: 540,
    //            modal: true,
    //            autoOpen: false,
    //            resizable: false
    //        })
    //    });


    $(function() {
        $("#employee_edit_dlg").dialog({
            bgiframe: true,
            width: 650,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    //                $('#expDlgForm').ajaxForm(function(data) {
    //                    alert('here');
    //                });

//    $('#adminidform').ajaxForm(function(data) {

//    });

//    $('#employee_edit_form').ajaxForm(function(data) {


//        jQuery('#employee_loading').hide();

//        if (respArray[0] == "Success") {
//            jQuery("#employee_success").html('Save Successful!');
//            jQuery("#employee_success").show();


//            var lname = $('#txtLName').val();
//            var fname = $('#txtFName').val();
//            var mname = $('#txtMName').val();
//            var suffix = $('#txtSuffix').val();
//            var empStatus = $("#ddlStatus option:selected").text()
//            var oqId = $('#txtOqid').val();
//            var comment = $('#txtEmpComment').val();
//            var ssn = $('#txtSSN').val();
//            var address1 = $('#txtAddress1').val();
//            var address2 = $('#txtAddress2').val();
//            var city = $('#txtCity').val();
//            var state = $('#txtState').val();
//            var zip = $('#txtZip').val();
//            var email = $('#txtEmail').val();
//            var empID = $('#txtEmpID').val();

//            var dataArray = { lname: lname,
//                fname: fname,
//                mname: mname,
//                suffix: suffix,
//                empStatus: empStatus,
//                oqId: oqId,
//                comment: comment,
//                ssn: ssn,
//                address1: address1,
//                address2: address2,
//                city: city,
//                state: state,
//                zip: zip,
//                email: email,
//                empID: empID
//            };

//            var oper = $('#hdnEditOper').val();

//            if (oper == "Edit") {

//                jQuery("#empgrid").setRowData(curRow, dataArray);

//            }
//            else {
//                if (curRow == null) {
//                    jQuery("#empgrid").addRowData(respArray[1], dataArray, "first");
//                }
//                else {
//                    jQuery("#electronicsgrid").addRowData(respArray[1], dataArray, "after", curRow);
//                }

//                $("#btnSaveEmployee").attr("disabled", "disabled");
//            }

//        }
//        else {
//            jQuery("#employee_success").html(respArray[0]);
//            jQuery("#employee_success").show();

//        }
//    });

});

//function OpenEmployeeEditDlg(dta) {

//    $("#btnSaveEmployee").removeAttr("disabled", "disabled");

//    $("#employee_success").html("Save Successful!");
//    $("#employee_success").hide();
//    $("#employee_loading").hide();

//    $("#employee_edit_dlg").data("title.dialog", oper + " Employee")


//    jQuery('#employee_edit_dlg').dialog('open');

//}

//function CloseEmployeeDialog() {

//    jQuery('#employee_edit_dlg').dialog('close');

//};

//function ShowEditFormWait() {

//    $("#employee_loading").show();

//}