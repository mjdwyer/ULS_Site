var curRow;
var curRowAsgn;
var curDiv;
var curDefaultDiv;
var curElectronicsAssignColor;

// this gives exact match in dropdown
$.expr[":"].econtains = function(obj, index, meta, stack) {
    return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
}

jQuery(document).ready(function() {

    curDiv = $("#hdnDivision").val();
    curDefaultDiv = $("#hdnDefaultDiv").val();

    jQuery("#electronicsgrid").jqGrid({
        url: '/Electronics/GridData/',
        editurl: '/Electronics/Edit/',
        datatype: 'json',
        mtype: 'GET',
        hoverrows: false,
        altRows: false,
        height: 255,
        width: 740,
        rowNum: 5000,
        colNames: ['ID', 'Type', 'Make', 'Model', 'Year', 'Location', 'Reg By', 'Mngd By', 'Mngd By Dt', 'Serial Num', 'Air Card Num', 'Cost', 'Stolen', 'In Repair', 'Totaled', 'Unknown', 'Comment', '', ''],
        colModel: [
   		        { name: 'electronics_id', index: 'electronics_id', width: 65, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'type_desc', index: 'type_desc', width: 130, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/Electronics/GetTypesSearch'} },
   		        { name: 'make_desc', index: 'make_desc', width: 80, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/Electronics/GetMakesSearch'} },
   		        { name: 'model_desc', index: 'model_desc', width: 80, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/Electronics/GetModelsSearch'} },
   		        { name: 'year_pur', index: 'year_pur', width: 60, search: false },
   		        { name: 'location', index: 'work_loc', width: 80, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetLocations'} },
   		        { name: 'registered_by', index: 'registered_by', width: 80, search: false },
   		        { name: 'managed_by', index: 'managed_by', width: 80, search: false },
   		        { name: 'managed_by_dt', search: false },
   		        { name: 'serial_num', searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'air_card_num', hidden: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
                { name: 'cost', hidden: true, search: false },
                { name: 'stolen', hidden: true, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
                { name: 'in_repair', hidden: true, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
                { name: 'totaled', hidden: true, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
                { name: 'unknown', hidden: true, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
                { name: 'comment', hidden: true, search: false },
   		        { name: 'electronics_loan_color', hidden: true, search: false },
   		        { name: 'electronics_assign_color', hidden: true, search: false }
            ],
        sortname: 'electronics_id',
        sortorder: "asc",
        afterInsertRow: function(rowid, rowdata, rowelem) {

            if (rowelem[17] == 'SET_GREEN') {
                jQuery("#electronicsgrid").setCell(rowid, 'electronics_id', '', { color: 'green' })
            }
            if (rowelem[17] == 'SET_PURPLE') {
                jQuery("#electronicsgrid").setCell(rowid, 'electronics_id', '', { color: 'purple' })
            }
        },
        viewrecords: true,
        pager: jQuery('#electronicsgridp'),
        //            caption: 'Inventory for ' + curDiv +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        //             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>',
        ondblClickRow: function(rowid) {
            var data = $("#electronicsgrid").getRowData(curRow);
            if (data.electronics_id == null)
                alert("  Please Select a Row!");
            else {

                var eID = document.getElementById("hdnEditOper");
                eID.value = "Edit";

                var eID = document.getElementById("hdnEditID");
                eID.value = data.electronics_id;

                $("#hdnEditID").val('');
                $("#ddlElectronicsMake").val('');
                $("#ddlElectronicsModel").val('');
                $("#ddlElectronicsType").val('');
                $("#ddlElectronicsRegBy").val('');
                $("#ddlElectronicsMngBy").val('');
                $("#ddlElectronicsLoc").val('');
                $("#txtElectronicsYear").val('');
                $("#dtElectronicsMngByDt").val('');
                $("#txtElectronicsSerialNum").val('');
                $("#txtElectronicsAirCardNum").val('');
                $("#txtElectronicsCost").val('');
                $("#txtElectronicsComment").val('');
                $('#chkElectronicsStolen').attr('checked', false);
                $('#chkElectronicsUnknown').attr('checked', false);
                $('#chkElectronicsInRepair').attr('checked', false);
                $('#chkElectronicsTotaled').attr('checked', false);


                $('#hdnElectronicsInRepair').val('');
                $('#hdnElectronicsTotaled').val('');
                $('#hdnElectronicsStolen').val('');
                $('#hdnElectronicsUnknown').val('');


                $("#hdnEditID").val(data.electronics_id);
                $("#txtElectronicsYear").val(data.year_pur);
                $("#dtElectronicsMngByDt").val(data.managed_by_dt);
                $("#txtElectronicsSerialNum").val(data.serial_num);
                $("#txtElectronicsAirCardNum").val(data.air_card_num);
                $("#txtElectronicsCost").val(data.cost);
                $("#txtElectronicsComment").val(data.comment);
                if (data.unknown == 'True') {
                    $('#chkElectronicsUnknown').attr('checked', true);
                    $('#hdnElectronicsUnknown').val('on');
                }
                else {
                    $('#chkElectronicsUnknown').attr('checked', false);
                    $('#hdnElectronicsUnknown').val('off');
                }
                if (data.stolen == 'True') {
                    $('#chkElectronicsStolen').attr('checked', true);
                    $('#hdnElectronicsStolen').val('on');
                }
                else {
                    $('#chkElectronicsStolen').attr('checked', false);
                    $('#hdnElectronicsStolen').val('off');
                }
                if (data.in_repair == 'True') {
                    $('#chkElectronicsInRepair').attr('checked', true);
                    $('#hdnElectronicsInRepair').val('on');
                }
                else {
                    $('#chkElectronicsInRepair').attr('checked', false);
                    $('#hdnElectronicsInRepair').val('off');
                }
                if (data.totaled == 'True') {
                    $('#chkElectronicsTotaled').attr('checked', true);
                    $('#hdnElectronicsTotaled').val('on');
                }
                else {
                    $('#chkElectronicsTotaled').attr('checked', false);
                    $('#hdnElectronicsTotaled').val('off');
                }

                $("#elecronics_results").html('');

                OpenElectronicsEditDlg(data);

            }
            return false;
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                curRowAsgn = -1;
                curRow = ids;
                var data = $("#electronicsgrid").getRowData(ids);
                jQuery("#electronics_asgn").setGridParam({ url: "/Electronics/GetAssignGridData/" + data.electronics_id, page: 1 })
                .trigger('reloadGrid');
                curElectronicsAssignColor = data.electronics_assign_color;
            }
        },
        loadComplete: function() {
            var uData = jQuery('#electronicsgrid').getGridParam('userData');
            var strCap;

            if (uData.searchVal == '') {
                strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>';
            }
            else {

                strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="red">FILTER ON:</font>' + '&nbsp;&nbsp;&nbsp;' + uData.searchVal +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>';
                if (uData.searchStolen != '') {
                    alert(uData.searchVal + " is not available.\n Registered By: " + uData.searchRegBy + "\n Stolen: " + uData.searchStolen + "\n Unknown: " + uData.searchUnknown + "\n In Repair: " + uData.searchInRepair + "\n Totaled: " + uData.searchTotaled + "\n ID: " + uData.searchId);
                }
            }

            jQuery('#electronicsgrid').setCaption(strCap);

        }
    }).navGrid('#electronicsgridp', { deltext: "Delete", searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: false, search: true, refresh: true }, //options
         {}, // edit options
         {}, // add options
         {mtype: "POST", reloadAfterSubmit: true, serializeDelData: function(postdata) {
             var rowdata = jQuery('#electronicsgrid').getRowData(postdata.id);
             // append postdata with any information
             return { id: postdata.id, oper: postdata.oper, electronics_id: rowdata.electronics_id };
         }
     }, // del options
            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
            closeAfterSearch: true, closeOnEscape: true
        }, // search options
         {} // view options
          ).navButtonAdd('#electronicsgridp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#electronicsgrid").getRowData(curRow);
                  if (data.electronics_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.electronics_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "ElectronicsOneRpt";
                      $("#rpt_dialog").data("title.dialog", "Summary Report for ID: " + data.electronics_id)

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#electronicsgridp', {
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
                      $("#ddlElectronicsMake").val('');
                      $("#ddlElectronicsModel").val('');
                      $("#ddlElectronicsType").val('');
                      $("#ddlElectronicsRegBy").val('');
                      $("#ddlElectronicsMngBy").val('');
                      $("#ddlElectronicsLoc").val('');
                      $("#txtElectronicsYear").val('');
                      $("#dtElectronicsMngByDt").val('');
                      $("#txtElectronicsSerialNum").val('');
                      $("#txtElectronicsAirCardNum").val('');
                      $("#txtElectronicsCost").val('');
                      $("#txtElectronicsComment").val('');
                      $('#chkElectronicsStolen').attr('checked', false);
                      $('#chkElectronicsUnknown').attr('checked', false);
                      $('#chkElectronicsInRepair').attr('checked', false);
                      $('#chkElectronicsTotaled').attr('checked', false);


                      $('#hdnElectronicsInRepair').val('');
                      $('#hdnElectronicsTotaled').val('');
                      $('#hdnElectronicsStolen').val('');
                      $('#hdnElectronicsUnknown').val('');


                      $("#hdnEditID").val(data.electronics_id);
                      $("#txtElectronicsYear").val(data.year_pur);
                      $("#dtElectronicsMngByDt").val(data.managed_by_dt);
                      $("#txtElectronicsSerialNum").val(data.serial_num);
                      $("#txtElectronicsAirCardNum").val(data.air_card_num);
                      $("#txtElectronicsCost").val(data.cost);
                      $("#txtElectronicsComment").val(data.comment);
                      if (data.unknown == 'True') {
                          $('#chkElectronicsUnknown').attr('checked', true);
                          $('#hdnElectronicsUnknown').val('on');
                      }
                      else {
                          $('#chkElectronicsUnknown').attr('checked', false);
                          $('#hdnElectronicsUnknown').val('off');
                      }
                      if (data.stolen == 'True') {
                          $('#chkElectronicsStolen').attr('checked', true);
                          $('#hdnElectronicsStolen').val('on');
                      }
                      else {
                          $('#chkElectronicsStolen').attr('checked', false);
                          $('#hdnElectronicsStolen').val('off');
                      }
                      if (data.in_repair == 'True') {
                          $('#chkElectronicsInRepair').attr('checked', true);
                          $('#hdnElectronicsInRepair').val('on');
                      }
                      else {
                          $('#chkElectronicsInRepair').attr('checked', false);
                          $('#hdnElectronicsInRepair').val('off');
                      }
                      if (data.totaled == 'True') {
                          $('#chkElectronicsTotaled').attr('checked', true);
                          $('#hdnElectronicsTotaled').val('on');
                      }
                      else {
                          $('#chkElectronicsTotaled').attr('checked', false);
                          $('#hdnElectronicsTotaled').val('off');
                      }

                      $("#electronics_results").html('');

                      OpenElectronicsEditDlg(data);
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
                  $("#ddlElectronicsMake").val('');
                  $("#ddlElectronicsModel").val('');
                  $("#ddlElectronicsType").val('');
                  $("#ddlElectronicsRegBy").val('');
                  $("#ddlElectronicsMngBy").val('');
                  $("#ddlElectronicsLoc").val('');
                  $("#txtElectronicsYear").val('');
                  $("#dtElectronicsMngByDt").val('');
                  $("#txtElectronicsSerialNum").val('');
                  $("#txtElectronicsAirCardNum").val('');
                  $("#txtElectronicsCost").val('');
                  $("#txtElectronicsComment").val('');
                  $('#chkElectronicsStolen').attr('checked', false);
                  $('#chkElectronicsUnknown').attr('checked', false);
                  $('#chkElectronicsInRepair').attr('checked', false);
                  $('#chkElectronicsTotaled').attr('checked', false);


                  $('#hdnElectronicsInRepair').val('');
                  $('#hdnElectronicsTotaled').val('');
                  $('#hdnElectronicsStolen').val('');
                  $('#hdnElectronicsUnknown').val('');

                  $("#electronics_results").html('');

                  OpenElectronicsEditDlg(data);
                  return false;
              },
              position: "first"
          });
    $('#electronicsgridp_center').remove();
    $('#electronicsgridp_right').remove();


    jQuery("#electronics_asgn").jqGrid({
        editurl: '/Electronics/EditAssign/',
        datatype: 'json',
        mtype: 'GET',
        height: 100,
        width: 740,
        rowNum: 5000,
        colNames: ['ID', 'Assign To', 'Date Assigned', 'Return Date', 'Assign Condition', 'Return Condition', 'Comments', 'AssignID'],
        colModel: [
   		        { name: 'electronics_id', index: 'electronics_id', width: 65 },
   		        { name: 'assigned_to', index: 'assigned_to', width: 80 },
                { name: 'assigned_dt', index: 'assigned_dt', width: 100 },
                { name: 'return_dt', index: 'return_dt', width: 100 },
   		        { name: 'asgn_condition_id', index: 'asgn_condition_id', width: 80 },
   		        { name: 'ret_condition_id', index: 'ret_condition_id', width: 80 },
                { name: 'comments', hidden: true },
                { name: 'assign_id', hidden: true }
            ],
        sortname: 'assigned_dt',
        sortorder: "desc",
        viewrecords: true,
        pager: jQuery('#electronicsasgnp'),
        caption: 'Assignments',
        ondblClickRow: function(rowid) {
            var data = $("#electronics_asgn").getRowData(curRowAsgn);
            if (data.electronics_id == null)
                alert("  Please Select an Assignment Row!");
            else {
                var eID = document.getElementById("hdnAsgnEditOper");
                eID.value = "Edit";

                var eID = document.getElementById("hdnAsgnEditID");
                eID.value = data.electronics_id;

                $('#dtElectronicsAsgnDt').text('');
                $('#dtElectronicsRetDt').text('');
                $('#ddlAsgnCond').val('');
                $('#ddlRetCond').val('');
                $('#txtElectronicsAsgnComments').val('');

                $('#dtElectronicsAsgnDt').text(data.assigned_dt);
                $('#dtElectronicsRetDt').text(data.return_dt);

                if (data.asgn_condition_id.length > 0)
                    $("#ddlAsgnCond option:econtains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

                if (data.ret_condition_id.length > 0)
                    $("#ddlRetCond option:econtains(" + data.ret_condition_id + ")").attr('selected', 'selected');

                $('#txtElectronicsAsgnComments').val(data.comments);

                $("#electronics_asgn_results").html('');

                OpenElectronicsEditAsgnDlg(data);
            }

            return false;
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                curRowAsgn = ids;
                var data = $("#electronics_asgn").getRowData(curRowAsgn);
                var eIS = document.getElementById("hdnAsgnID");
                eIS.value = data.assign_id;

            }
        }
    }).navGrid('#electronicsasgnp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             if (response.responseText == "Success") {
                 jQuery("#success").show();
                 jQuery("#success").html("Assignment successfully deleted");
                 jQuery("#success").fadeOut(6000);

                 return [true, response.responseText]
             }
             else {
                 return [false, response.responseText]
             }
         }
     }, // del options
         {}, // search options
         {} // view options
          ).navButtonAdd('#electronicsasgnp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#electronics_asgn").getRowData(curRowAsgn);
                  if (data.electronics_id == null)
                      alert("  Please Select an Assignment Row!");
                  else {
                      var eID = document.getElementById("hdnAsgnEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnAsgnEditID");
                      eID.value = data.electronics_id;

                      $('#dtElectronicsAsgnDt').text('');
                      $('#dtElectronicsRetDt').text('');
                      $('#ddlAsgnCond').val('');
                      $('#ddlRetCond').val('');
                      $('#txtElectronicsAsgnComments').val('');


                      $('#dtElectronicsAsgnDt').text(data.assigned_dt);
                      $('#dtElectronicsRetDt').text(data.return_dt);

                      if (data.asgn_condition_id.length > 0)
                          $("#ddlAsgnCond option:econtains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

                      if (data.ret_condition_id.length > 0)
                          $("#ddlRetCond option:econtains(" + data.ret_condition_id + ")").attr('selected', 'selected');

                      $('#txtElectronicsAsgnComments').val(data.comments);

                      $("#electronics_asgn_results").html('');

                      OpenElectronicsEditAsgnDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#electronicsasgnp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {
                  var data = $("#electronicsgrid").getRowData(curRow);
                  if (data.electronics_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnAsgnEditOper");
                      eID.value = "Add";

                      var eID = document.getElementById("hdnAsgnEditID");
                      eID.value = data.electronics_id;

                      $('#dtElectronicsAsgnDt').text('');
                      $('#dtElectronicsRetDt').text('');
                      $('#ddlAsgnCond').val('');
                      $('#ddlRetCond').val('');
                      $('#txtElectronicsAsgnComments').val('');

                      if (curElectronicsAssignColor == "SET_GREEN") {
                          $("#electronics_asgn_results").html('');
                          OpenElectronicsEditAsgnDlg(data);
                      }
                      else {
                          alert('Currently selected electronics is already assigned!');
                      }

                  }
                  return false;
              },
              position: "first"
          });

    $('#electronicsasgnp_center').remove();
    $('#electronicsasgnp_right').remove();

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
        $("#rpt_dialog_hist").dialog({
            bgiframe: true,
            width: 540,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtReportFrom').datepicker('enable');
                $('#dtReportTo').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtReportFrom').datepicker('hide');
                $('#dtReportTo').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#electronics_asgn_edit_dlg").dialog({
            bgiframe: true,
            width: 450,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtElectronicsAsgnDt').datepicker('enable');
                $('#dtElectronicsRetDt').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtElectronicsAsgnDt').datepicker('hide');
                $('#dtElectronicsRetDt').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#electronics_edit_dlg").dialog({
            bgiframe: true,
            width: 650,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtElectronicsMngByDt').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtElectronicsMngByDt').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#admin_dialog").dialog({
            bgiframe: true,
            width: 600,
            height: 315,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#admin_loc_dlg").dialog({
            bgiframe: true,
            width: 600,
            height: 315,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#admin_users_dlg").dialog({
            bgiframe: true,
            width: 650,
            height: 325,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#admin_assignto_dlg").dialog({
            bgiframe: true,
            width: 700,
            height: 350,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#admin_id_dlg").dialog({
            bgiframe: true,
            width: 600,
            height: 330,
            modal: true,
            autoOpen: false,
            resizable: false
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

    //                $('#expDlgForm').ajaxForm(function(data) {
    //                    alert('here');
    //                });

    $('#adminidform').ajaxForm(function(data) {

    });

    $('#electronics_asgn_edit_form').ajaxForm(function(data) {


        jQuery('#electronics_asgn_loading').hide();

        if (data == "Success") {
            jQuery("#electronics_asgn_success").show();
            jQuery("#electronics_asgn").trigger('reloadGrid');

            if ($("#dtElectronicsAsgnDt").val() != "" && $("#dtElectronicsRetDt").val() == "") {
                jQuery("#electronicsgrid").setCell(curRow, 'electronics_id', '', { color: 'black' })
                jQuery("#electronicsgrid").setRowData(curRow, { electronics_assign_color: 'OK' });

                curElectronicsAssignColor = "OK";
            }
            else if ($("#dtElectronicsRetDt").val() != "") {
                jQuery("#electronicsgrid").setCell(curRow, 'electronics_id', '', { color: 'green' })
                jQuery("#electronicsgrid").setRowData(curRow, { electronics_assign_color: 'SET_GREEN' });

                curElectronicsAssignColor = "SET_GREEN";
            }

            return [true, "Success"]
        }
        else {
            return [false, "Failure"]
        }
        return [true, "Success"]
    });


    $('#electronics_edit_form').ajaxForm(function(data) {
        var respArray = data.split(",");
        jQuery('#electronics_loading').hide();

        if (respArray[0] == "Success") {
            jQuery("#electronics_success").html('Save Successful!');
            jQuery("#electronics_success").show();

            var electronicsID = $('#txtElectronicsID').val();
            var electronicsMake = $("#ddlElectronicsMake option:selected").text()
            var electronicsModel = $("#ddlElectronicsModel option:selected").text()
            var electronicsType = $("#ddlElectronicsType option:selected").text()
            var electronicsRegBy = $("#ddlElectronicsRegBy option:selected").text()
            var electronicsMngBy = $("#ddlElectronicsMngBy option:selected").text()
            var electronicsLoc = $("#ddlElectronicsLoc option:selected").text()
            var txtElectronicsYear = $("#txtElectronicsYear").val();
            var dtElectronicsMngByDt = $("#dtElectronicsMngByDt").val();
            var txtElectronicsSerialNum = $("#txtElectronicsSerialNum").val();
            var txtElectronicsAirCardNum = $("#txtElectronicsAirCardNum").val();
            var txtElectronicsCost = $("#txtElectronicsCost").val();
            var txtElectronicsComment = $("#txtElectronicsComment").val();
            var chkElectronicsStolen;
            if ($('#chkElectronicsStolen').attr('checked') == 'checked') {
                chkElectronicsStolen = "True";
            }
            else {
                chkElectronicsStolen = "False";
            }
            var chkElectronicsUnknown;
            if ($('#chkElectronicsUnknown').attr('checked') == 'checked') {
                chkElectronicsUnknown = "True";
            }
            else {
                chkElectronicsUnknown = "False";
            }
            var chkElectronicsInRepair;
            if ($('#chkElectronicsInRepair').attr('checked') == 'checked') {
                chkElectronicsInRepair = "True";
            }
            else {
                chkElectronicsInRepair = "False";
            }
            var chkElectronicsStolen;
            if ($('#chkElectronicsStolen').attr('checked') == 'checked') {
                chkElectronicsStolen = "True";
            }
            else {
                chkElectronicsStolen = "False";
            }
            var chkElectronicsTotaled;
            if ($('#chkElectronicsTotaled').attr('checked') == 'checked') {
                chkElectronicsTotaled = "True";
            }
            else {
                chkElectronicsTotaled = "False";
            }

            var dataArray = { electronics_id: electronicsID,
                type_desc: electronicsType,
                make_desc: electronicsMake,
                model_desc: electronicsModel,
                year_pur: txtElectronicsYear,
                location: electronicsLoc,
                registered_by: electronicsRegBy,
                managed_by: electronicsMngBy,
                managed_by_dt: dtElectronicsMngByDt,
                serial_num: txtElectronicsSerialNum,
                air_card_num: txtElectronicsAirCardNum,
                cost: txtElectronicsCost,
                stolen: chkElectronicsStolen,
                in_repair: chkElectronicsInRepair,
                totaled: chkElectronicsTotaled,
                unknown: chkElectronicsUnknown,
                comment: txtElectronicsComment
            };

            var oper = $('#hdnEditOper').val();

            if (chkElectronicsStolen == "True" || chkElectronicsInRepair == "True" || chkElectronicsTotaled == "True" || chkElectronicsUnknown == "True") {
                jQuery("#electronicsgrid").delRowData(curRow);
            }
            else if (oper == "Edit") {

                jQuery("#electronicsgrid").setRowData(curRow, dataArray);

            }
            else {
                if (curRow == null) {
                    jQuery("#electronicsgrid").addRowData(electronicsID, dataArray, "first");
                }
                else {
                    jQuery("#electronicsgrid").addRowData(electronicsID, dataArray, "after", curRow);
                }

                jQuery("#electronicsgrid").setCell(electronicsID, 'electronics_id', '', { color: 'green' })

                $("#btnSaveElectronics").attr("disabled", "disabled");
                $("#txtElectronicsID").attr("disabled", "disabled");
            }

            if (respArray[1] == electronicsRegBy && electronicsMngBy != "" && electronicsMngBy != respArray[1]) {
                jQuery("#electronicsgrid").setCell(electronicsID, 'electronics_id', '', { color: 'purple' })
            }

            //                return [true, data]
        }
        else {
            jQuery("#electronics_success").html(respArray[0]);
            jQuery("#electronics_success").show();
            //                return [false, data]
        }
        //            return [true, data]
    });



    $('#adminDlgForm').ajaxForm(function(data) {

        var respArray = data.split(",");

        if (respArray[0] == "Success") {

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


    $('#adminlocform').ajaxForm(function(data) {
        if (data == "Success") {

            jQuery("#adminlocgrid").trigger("reloadGrid");

            jQuery("#adminLocSuccess").show();
            jQuery("#adminLocSuccess").html("Successfully saved.");
            jQuery("#adminLocSuccess").fadeOut(6000);

        }
        else {
            jQuery("#adminLocSuccess").show();
            jQuery("#adminLocSuccess").html("Error saving.");
            jQuery("#adminLocSuccess").fadeOut(6000);
        }

        $("#btnAddLoc").removeAttr("disabled", "disabled");
        $("#btnDelLoc").attr("disabled", "disabled");
        $("#btnSaveLoc").attr("disabled", "disabled");
    });

    $('#adminusersform').ajaxForm(function(data) {
        if (data == "Success") {

            jQuery("#adminusersgrid").trigger("reloadGrid");

            jQuery("#adminUsersSuccess").show();
            jQuery("#adminUsersSuccess").html("Successfully saved.");
            jQuery("#adminUsersSuccess").fadeOut(6000);

        }
        else {
            jQuery("#adminUsersSuccess").show();
            jQuery("#adminUsersSuccess").html("Error saving.");
            jQuery("#adminUsersSuccess").fadeOut(6000);
        }

        $("#btnAddUser").removeAttr("disabled", "disabled");
        $("#btnDelUser").attr("disabled", "disabled");
        $("#btnSaveUser").attr("disabled", "disabled");
    });

    $('#adminassigntoform').ajaxForm(function(data) {

        if (data == "Success") {

            jQuery("#adminassigntogrid").trigger("reloadGrid");

            jQuery("#adminAssignToSuccess").show();
            jQuery("#adminAssignToSuccess").html("Successfully saved.");
            jQuery("#adminAssignToSuccess").fadeOut(6000);
        }
        else {
            jQuery("#adminAssignToSuccess").show();
            jQuery("#adminAssignToSuccess").html("Error saving.");
            jQuery("#adminAssignToSuccess").fadeOut(6000);
        }

        $("#btnAddAssignTo").removeAttr("disabled", "disabled");
        $("#btnDelAssignTo").attr("disabled", "disabled");
        $("#btnSaveAssignTo").attr("disabled", "disabled");
    });

});

function OpenElectronicsEditAsgnDlg(dta) {

    var oper = $('#hdnAsgnEditOper').val();

    if (oper == 'Add') {
        $("#btnElectronicsAsgnSave").attr("disabled", "disabled");
    }
    else {

        $("#btnElectronicsAsgnSave").removeAttr("disabled", "disabled");
    }

    $("#electronics_asgn_success").hide();
    $("#electronics_asgn_loading").hide();
    $("#electronics_asgn_edit_dlg").data("title.dialog", oper + " Electronics Assigment")

    $('#txtElectronicsAsgnID').val(dta.electronics_id);
    $("#txtElectronicsAsgnID").attr("disabled", "disabled");

    $('#dtElectronicsAsgnDt').val('');
    $('#dtElectronicsAsgnDt').datepicker('disable');
    $('#dtElectronicsAsgnDt').val(dta.assigned_dt);

    $('#dtElectronicsRetDt').val('');
    $('#dtElectronicsRetDt').datepicker('disable');
    $('#dtElectronicsRetDt').val(dta.return_dt);

    jQuery('#electronics_asgn_edit_dlg').dialog('open');

    $.get("/Electronics/GetElectronicsAsgnEditDlg/", {}, function(data) {
        $("#electronics_asgn_results").html(data);
        //            $("#ddlAssignedTo option:econtains(" + dta.assigned_to + ")").attr('selected', 'selected');
        $('#ddlAssignedTo').val(dta.assigned_to);
    });

}


function OpenElectronicsEditDlg(dta) {

    $("#btnSaveElectronics").removeAttr("disabled", "disabled");
    var oper = $('#hdnEditOper').val();

    $("#electronics_success").html("Save Successful!");
    $("#electronics_success").hide();
    $("#electronics_loading").hide();

    $("#electronics_edit_dlg").data("title.dialog", oper + " Electronics")

    if (oper == "Edit") {
        $('#txtElectronicsID').val(dta.electronics_id);
        $("#txtElectronicsID").attr("disabled", "disabled");
    }
    else {
        $('#txtElectronicsID').val('');
        $("#txtElectronicsID").removeAttr("disabled", "disabled");
    }

    jQuery('#electronics_edit_dlg').dialog('open');

    $.get("/Electronics/GetElectronicsEditDlg/", {}, function(data) {
        $("#electronics_results").html(data);
        if (oper == "Edit") {
            if (dta.make_descr.length > 0)
                $("#ddlElectronicsMake option:econtains(" + dta.make_descr + ")").attr('selected', 'selected');
            if (dta.model_desc.length > 0)
                $("#ddlElectronicsModel option:econtains(" + dta.model_desc + ")").attr('selected', 'selected');
            if (dta.type_desc.length > 0)
                $("#ddlElectronicsType option:econtains(" + dta.type_desc + ")").attr('selected', 'selected');
            $('#ddlElectronicsLoc').val(dta.location);
            $('#ddlElectronicsRegBy').val(dta.registered_by);
            $('#ddlElectronicsMngBy').val(dta.managed_by);
        }
    });

    $("#btnSaveElectronics").attr("disabled", "disabled");

}

function selectInDropdown(id, val) {

    alert(id);
    alert(val);
    for (i = 0; i < id.length; i++) {


        if (id.options[i].value == val) {
            id.selectedIndex = i
            break;
        }
    }
}

