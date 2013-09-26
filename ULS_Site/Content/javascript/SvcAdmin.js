
var curSvcDayRow;
var curSvcApptRow;
var curCrewRow;
var curRowAdminFormen; 

$(function() {
    $("#tabs").tabs();
});

function confirmServiceDelete() {

    if (confirm("Are you sure you want to delete this scheduled service?")) {
        $.post("/Service/DeleteService/" + curSvcApptRow, {},
                            function(data) {
                            if (data == "Success") {
                                jQuery("#schedapptgrid").delRowData(curSvcApptRow);
                                $("#btnEditAppt").attr("disabled", "disabled");
                                $("#btnReScheduleOne").attr("disabled", "disabled");
                                $("#btnDelSvc").attr("disabled", "disabled");

                                alert("Record Deleted!");
                                }
                                else {
                                    alert(data);
                                
                                }
                            }
                        );
    }
}

function CheckForemenForm() {

    var nm = $("#txtForemanName").val();

    if (nm.length > 0) {
        $("#btnSaveForeman").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveForeman").attr("disabled", "disabled");
    }
}

function CheckContactForm() {

    var nm = $("#txtName").val();
    var ph = $("#txtPhone").val();
    var em = $("#txtEmail").val();

    if (nm.length > 0 && ph.length > 0 && em.length > 0) {
        $("#btnSaveContact").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveContact").attr("disabled", "disabled");
    }
}


function CheckSvcCrewHistForm() {

    var from = $("#dtReportFrom").val();
    var to = $("#dtReportTo").val();

    listsel = $("#ddlRptCrews").val();

    if (from.length > 0 && to.length > 0 && listsel.length > 0) {
        $("#btnShowHistRpt").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnShowHistRpt").attr("disabled", "disabled");
    }
}

function CheckSvcAllHistForm() {

    var from = $("#dtReportAllFrom").val();
    var to = $("#dtReportAllTo").val();

    if (from.length > 0 && to.length > 0) {
        $("#btnShowAllHistRpt").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnShowAllHistRpt").attr("disabled", "disabled");
    }
}

function CheckPastSchedDaysDlg() {

    var from = $("#dtSchedDaysFrom").val();
    var to = $("#dtSchedDaysTo").val();

    if (from.length > 0 && to.length > 0) {
        $("#btnReloadSchedDays").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnReloadSchedDays").attr("disabled", "disabled");
    }
}

function CheckPastSvcForm() {

    var svcDateStr = $("#dtPastSvcDt").val();

    var svcDt = new Date(svcDateStr);
    
    var today = new Date();

    if (svcDt < today) {
        $("#btnPastSvcDt").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnPastSvcDt").attr("disabled", "disabled");
    }
}

function OpenEditApptDialog() {

    var data = $("#schedapptgrid").getRowData(curSvcApptRow);
    var strDate = data.svc_day + ", " + data.svc_date;
    var strName = data.first_name + " " + data.last_name;

    $("#divSvcDate").text(strDate);
    $("#divName").text(strName);
    $("#divAddress").text(data.street_address);
    $("#divCityStZip").text(data.city + ", " + data.state + "  " +data.zip);
    $("#divHomePhone").text(data.home_phone + '  (Home)');
    if (data.other_phone.length > 0) {
        $("#divOtherPhone").text(data.other_phone + '  (Other)');
    }
    $("#divRescheduled").text(data.reschedule);
    $("#txtComments").val(data.comments);

    $("#SvcApptCommentDlg").data("title.dialog", "Edit Record");

    jQuery('#SvcApptCommentDlg').dialog('open');
};

function OpenEditDateDialog() {

    var data = $("#scheddaysgrid").getRowData(curSvcDayRow);
    var strDate = data.svc_day + ", " + data.svc_sched_dt;
    $("#divDate").text(strDate);
    $("#ddlEditCrews").val(data.tot_crews);
    if (data.available == "True") {
        $("#chkAvail").attr("checked", true);
    }
    else {
        $("#chkAvail").attr("checked", false);
    }

    $("#hdnSvcDate").val(data.svc_sched_dt);
    $("#hdnSvcsSched").val(data.apts_sched);

    $("#edit_date_dialog").data("title.dialog", "Edit Record");

    jQuery('#edit_date_dialog').dialog('open');
};

function OpenEditCrewDialog() {

    $("#hdnCrewOper").val("Edit");
    $("#crew_dlg_success").hide();
    var dta = $("#crewsgrid").getRowData(curCrewRow);
    var strCrew = "Crew: " + dta.crew;


    $("#divCrewNum").text(strCrew);
    $.get("/Service/GetSvcForemen/", {}, function(data) {
        $("#crew_dlg_results").html(data);
        $('#ddlSvcFormen').val(dta.foreman_id);
    });

    $("#hdnCrewNum").val(dta.crew);

    $("#edit_crews_dialog").data("title.dialog", "Edit Pairing");

    jQuery('#edit_crews_dialog').dialog('open');
};

function OpenAddCrewDialog() {

    $("#hdnCrewOper").val("Add");
    $("#crew_dlg_success").hide();
    $.get("/Service/GetNewCrewNum/", {}, function(data) {
        $("#divCrewNum").text("Crew: " + data);
        $("#hdnCrewNum").val(data);
    });
    
    $.get("/Service/GetSvcForemen/", {}, function(data) {
        $("#crew_dlg_results").html(data);
    });


    $("#edit_crews_dialog").data("title.dialog", "Add Pairing");

    jQuery('#edit_crews_dialog').dialog('open');
};

function ShowHistRptFormWait() {

    $("#rpthist_loading").show();

}

function ShowAllHistRptFormWait() {

    $("#rptallhist_loading").show();

}

function OpenByCrewRptDlg() {

    $("#rpthist_loading").hide();

    $("#hdnReportNameHist").val("SvcSchedByCrewHist");

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    $("#rpt_svc_crew_hist").data("title.dialog", "Crew Schedule Report");

    jQuery('#rpt_svc_crew_hist').dialog('open');
};

function OpenAllCrewsRptDlg() {

    $("#rptallhist_loading").hide();

    $("#hdnAllRptName").val("SvcSchedAllCrewsHist");

    $('#dtReportAllFrom').val('');
    $('#dtReportAllTo').val('');

    $('#dtReportAllFrom').datepicker('disable');
    $('#dtReportAllTo').datepicker('disable');

    $("#btnShowAllHistRpt").attr("disabled", "disabled");

    $("#rpt_svc_all_hist").data("title.dialog", " All Crews Schedule Report");

    jQuery('#rpt_svc_all_hist').dialog('open');
};

function OpenPastSvcDlg() {

    $('#dtPastSvcDt').val('');

    $('#dtPastSvcDt').datepicker('disable');

    $("#btnPastSvcDt").attr("disabled", "disabled");

    $("#past_svc_dlg").data("title.dialog", "Set Service Date");

    jQuery('#past_svc_dlg').dialog('open');
};

function OpenPastSchedDaysDlg() {

    $('#dtSchedDaysFrom').val('');
    $('#dtSchedDaysFrom').datepicker('disable');
    $('#dtSchedDaysTo').val('');
    $('#dtSchedDaysTo').datepicker('disable');

    $("#btnReloadSchedDays").attr("disabled", "disabled");

    $("#sched_days_hist_dlg").data("title.dialog", "Load Past Schedule Days");

    jQuery('#sched_days_hist_dlg').dialog('open');
};


function CloseAdminDialog() {
    
    jQuery('#edit_date_dialog').dialog('close');

};

function CloseAdminFormenDialog() {

    jQuery('#admin_foremen_dlg').dialog('close');

};

function ClosePastSvcDlg() {
    jQuery('#past_svc_dlg').dialog('close');

};

function CloseAdminApptDialog() {
    jQuery('#SvcApptCommentDlg').dialog('close');

};

function CloseCrewDialog() {
    
    jQuery('#edit_crews_dialog').dialog('close');

};

function ClosePastSchedDaysDialog() {

    $('#dtSchedDaysFrom').val('');
    $('#dtSchedDaysTo').val('');

    jQuery('#sched_days_hist_dlg').dialog('close');

};


function CompDate(adate, bdate) {
    a = adate.split('/');
    b = bdate.split('/');
    var sDate = new Date(a[2], a[0] - 1, a[1]);
    var eDate = new Date(b[2], b[0] - 1, b[1]);

    if (sDate <= eDate) {
        return true;
    }
    else {
        return false;
    }
}

function CheckSvcAddDaysForm() {

    var from = $("#dtDaysFrom").val();
    var to = $("#dtDaysTo").val();
    var listsel;

    listsel = $("#ddlCrews").val();

    if (from.length > 0 && to.length > 0 && listsel.length > 0) {


        if (!CompDate(from, to)) {
            alert("From Date must be less than or equal to To Date");
            $("#btnAddSchedDays").attr("disabled", "disabled");
            return;
        }

        $("#btnAddSchedDays").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnAddSchedDays").attr("disabled", "disabled");
    }
}

function CheckSvcApptForm() {

    var from = $("#dtApptDaysFrom").val();
    var to = $("#dtApptDaysTo").val();

    if (from.length > 0 && to.length > 0) {


        if (!CompDate(from, to)) {
            alert("From Date must be less than or equal to To Date");
            $("#btnApptReload").attr("disabled", "disabled");
            return;
        }

        $("#btnApptReload").removeAttr("disabled", "disabled");
    }
}

function ReloadApptGrid() {
    jQuery("#schedapptgrid").jqGrid().setGridParam({ url: '/Service/SvcAppointmentsGridData?fromDate=' + $("#dtApptDaysFrom").val() + '&toDate=' + $("#dtApptDaysTo").val() }).trigger("reloadGrid")
    $("#btnEditAppt").attr("disabled", "disabled");
    $("#btnReScheduleOne").attr("disabled", "disabled");
    $("#btnDelSvc").attr("disabled", "disabled");
}

function ReloadSchedDaysGrid() {
    jQuery("#scheddaysgrid").jqGrid().setGridParam({ url: '/Service/SvcDaysGridData?fromDate=' + $("#dtSchedDaysFrom").val() + '&toDate=' + $("#dtSchedDaysTo").val() }).trigger("reloadGrid")
    jQuery('#sched_days_hist_dlg').dialog('close');
    $('#dtSchedDaysFrom').val('');
    $('#dtSchedDaysTo').val('');

}

function OpenAdminForemenDialog() {

    SetUpAdminForemanGrid();
    
    $("#foremen_dlg_success").hide();
    jQuery('#formen_loading').hide();


    $("#admin_foremen_dlg").data("title.dialog", "Foremen Administration")

    jQuery('#admin_foremen_dlg').dialog('open');
}

function SetUpAdminForemanGrid() {

    jQuery("#adminformengrid").jqGrid({
        url: '/Service/GetAdminForemen/',
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 210,
        rowNum: 5000,
        colNames: ['Name', ''],
        colModel: [
                { name: 'svc_foreman_nm', width: 125 },
   		        { name: 'svc_foreman_id', hidden: true }],
        viewrecords: true,
        caption: 'Service Formen',
        gridComplete: function() {
        var top_rowid = $('#adminformengrid tbody:first-child tr:first').attr('id');
        jQuery("#adminformengrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminformengrid").getRowData(ids);
                $("#txtForemanName").val(data.svc_foreman_nm);
                $("#txtForemanName").attr("disabled", "disabled");
                $("#btnSaveForeman").attr("disabled", "disabled");
                $("#btnAddForeman").removeAttr("disabled", "disabled");
                curRowAdminFormen = ids;
            }
        }
    });

    jQuery("#adminformengrid").resetSelection();

    InitAdminForemenControls();

}

function InitAdminForemenControls() {

    $("#btnAddForeman").removeAttr("disabled", "disabled");
    $("#btnSaveForeman").attr("disabled", "disabled");
    $("#txtForemanName").attr("disabled", "disabled");
    $("#txtForemanName").val("");
}

function AddAdminFormenDialog() {

    var eID = document.getElementById("hdnAdminFormenOper");
    eID.value = "Add";

    $("#txtForemanName").removeAttr("disabled");
    $("#txtForemanName").val('');
    $("#txtForemanName").focus();
    $("#btnAddForeman").attr("disabled", "disabled");
}


jQuery(document).ready(function() {

    jQuery("#scheddaysgrid").jqGrid({
        url: '/Service/SvcDaysGridData?fromDate=' + $("#dtSchedDaysFrom").val() + '&toDate=' + $("#dtSchedDaysTo").val(),
        datatype: 'json',
        mtype: 'GET',
        height: 250,
        width: 585,
        rowNum: 5000,
        colNames: ['Date', 'Day', 'Total Crews', 'Services Scheduled', 'Available'],
        colModel: [
                { name: 'svc_sched_dt', index: 'svc_sched_dt', width: 150, align: 'center' },
   		        { name: 'svc_day', width: 150, align: 'center' },
   		        { name: 'tot_crews', width: 120, align: 'center' },
   		        { name: 'apts_sched', width: 180, align: 'center' },
   		        { name: 'available', width: 120, align: 'center'}],
        sortname: 'svc_sched_dt',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        ondblClickRow: function(rowid) {

            OpenEditDateDialog();
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                $("#btnEditDate").removeAttr("disabled", "disabled");
                curSvcDayRow = ids;
            }
        }
    });

    jQuery("#crewsgrid").jqGrid({
        url: '/Service/CrewsGridData/',
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 220,
        rowNum: 5000,
        colNames: ['Crew', 'Foreman', ''],
        colModel: [
                { name: 'crew', width: 50, align: 'center' },
   		        { name: 'foreman', width: 150, align: 'left' },
   		        { name: 'foreman_id', hidden: true}],
        viewrecords: true,
        caption: '',
        ondblClickRow: function(rowid) {
            OpenEditCrewDialog();
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                $("#btnEditCrew").removeAttr("disabled", "disabled");
                curCrewRow = ids;
            }
        }
    });

    //    $("#btnApptReload").attr("disabled", "disabled");
    var myDate = new Date();
    var prettyDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' +
        myDate.getFullYear();

    $("#dtApptDaysFrom").val(prettyDate);
    jQuery("#schedapptgrid").jqGrid({
        url: '/Service/SvcAppointmentsGridData?fromDate=' + $("#dtApptDaysFrom").val() + '&toDate=' + $("#dtApptDaysTo").val(),
        datatype: 'json',
        mtype: 'GET',
        height: 250,
        width: 745,
        rowNum: 5000,
        colNames: ['Date', 'Day', 'Address', 'Last Name', 'Home Phone', 'Crew', 'svc_id', 'first_name', 'city', 'state', 'zip', 'other_phone', 'email', 'reschedule', 'comments'],
        colModel: [
                { name: 'svc_date', index: 'svc_sched_dt', width: 125, align: 'center' },
   		        { name: 'svc_day', width: 100, align: 'center' },
   		        { name: 'street_address', width: 220 },
   		        { name: 'last_name', width: 150, align: 'center' },
   		        { name: 'home_phone', width: 150, align: 'center' },
   		        { name: 'crew', index: 'crew', width: 50, align: 'center' },
   		        { name: 'svc_id', hidden: true },
   		        { name: 'first_name', hidden: true },
   		        { name: 'city', hidden: true },
   		        { name: 'state', hidden: true },
   		        { name: 'zip', hidden: true },
   		        { name: 'other_phone', hidden: true },
   		        { name: 'email', hidden: true },
   		        { name: 'reschedule', hidden: true },
   		        { name: 'comments', hidden: true },
   		        ],
        sortname: 'svc_date',
        sortorder: 'asc',
        afterInsertRow: function(rowid, rowdata, rowelem) {
            if (rowelem[13] == 'True') {

                jQuery("#schedapptgrid").setCell(rowid, 'svc_date', '', { color: 'red' })
            }
        },
        viewrecords: true,
        caption: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="red" size="2">* red service date = recheduled</font>',
        ondblClickRow: function(rowid) {

            OpenEditApptDialog();
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                $("#btnEditAppt").removeAttr("disabled", "disabled");
                $("#btnReScheduleOne").removeAttr("disabled", "disabled");
                $("#btnDelSvc").removeAttr("disabled", "disabled");
                curSvcApptRow = ids;
                var eID = document.getElementById("hdnSvcid");
                eID.value = curSvcApptRow;

                var data = $("#schedapptgrid").getRowData(ids);

                var pID = document.getElementById("hdnPhone");
                pID.value = data.home_phone;
                var sID = document.getElementById("hdnSvcId");
                sID.value = data.svc_id;
            }
        }
    });

    $(function() {
        $("#edit_date_dialog").dialog({
            bgiframe: true,
            width: 355,
            height: 355,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtDaysFrom').datepicker('enable');
                $('#dtDaysTo').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtDaysFrom').datepicker('hide');
                $('#dtDaysTo').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#SvcApptCommentDlg").dialog({
            bgiframe: true,
            width: 455,
            height: 400,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#edit_crews_dialog").dialog({
            bgiframe: true,
            width: 350,
            height: 350,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#admin_foremen_dlg").dialog({
            bgiframe: true,
            width: 500,
            height: 400,
            modal: true,
            autoOpen: false,
            resizable: false
        })
    });

    $(function() {
        $("#rpt_svc_crew_hist").dialog({
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
        $("#rpt_svc_all_hist").dialog({
            bgiframe: true,
            width: 540,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtReportAllFrom').datepicker('enable');
                $('#dtReportAllTo').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtReportAllFrom').datepicker('hide');
                $('#dtReportAllTo').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#past_svc_dlg").dialog({
            bgiframe: true,
            width: 440,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtPastSvcDt').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtPastSvcDt').datepicker('hide');
            }
        })
    });

    $(function() {
        $("#sched_days_hist_dlg").dialog({
            bgiframe: true,
            width: 540,
            modal: true,
            autoOpen: false,
            resizable: false,
            open: function(event, ui) {
                $('#dtSchedDaysFrom').datepicker('enable');
                $('#dtSchedDaysTo').datepicker('enable');
            },
            close: function(event, ui) {
                $('#dtSchedDaysFrom').datepicker('hide');
                $('#dtSchedDaysTo').datepicker('hide');
            }
        })
    });

    $("#btnEditCrew").attr("disabled", "disabled");
    $("#btnEditDate").attr("disabled", "disabled");
    $("#btnEditAppt").attr("disabled", "disabled");
    $("#btnAddSchedDays").attr("disabled", "disabled");
    $("#btnReScheduleOne").attr("disabled", "disabled");
    $("#btnDelSvc").attr("disabled", "disabled");

    $('#edDtDlgForm').ajaxForm(function(data) {

        if (data == "Success") {

            jQuery("#adminSuccess").show();
            jQuery("#adminSuccess").html("Successfully saved.");
            jQuery("#adminSuccess").fadeOut(6000);

            jQuery("#scheddaysgrid").trigger("reloadGrid");

            $("#btnEditDate").attr("disabled", "disabled");

        }
        else {
            jQuery("#adminSuccess").show();
            jQuery("#adminSuccess").html("Error saving.");
            jQuery("#adminSuccess").fadeOut(6000);
        }

        $("#btnAddLoc").removeAttr("disabled", "disabled");
        $("#btnDelLoc").attr("disabled", "disabled");
        $("#btnSaveLoc").attr("disabled", "disabled");
    });

    $('#SvcContactForm').ajaxForm(function(data) {

        if (data == "Success") {

            jQuery("#svc_contact_success").show();
            jQuery("#svc_contact_success").html("Successfully saved!");
            jQuery("#svc_contact_success").fadeOut(6000);

        }
        else {
            jQuery("#svc_contact_success").show();
            jQuery("#svc_contact_success").html("Error saving.");
            //            jQuery("#svc_contact_success").fadeOut(6000);
        }

    });

    $('#addSvcDaysForm').ajaxForm(function(data) {

        if (data == "Success") {

            jQuery("#add_svc_dt_success").show();
            jQuery("#add_svc_dt_success").html("Successfully saved.");
            jQuery("#add_svc_dt_success").fadeOut(6000);

            jQuery("#scheddaysgrid").trigger("reloadGrid");

            $("#btnAddSchedDays").attr("disabled", "disabled");
            $("#dtDaysFrom").val('');
            $("#dtDaysTo").val('');
            $("#ddlCrews").val('');
        }
        else {
            jQuery("#add_svc_dt_success").show();
            jQuery("#add_svc_dt_success").html("Error saving.");
            jQuery("#add_svc_dt_success").fadeOut(6000);
        }

        $("#btnAddLoc").removeAttr("disabled", "disabled");
        $("#btnDelLoc").attr("disabled", "disabled");
        $("#btnSaveLoc").attr("disabled", "disabled");
    });

    $('#SvcApptCommentForm').ajaxForm(function(data) {

        if (data == "Success") {

            var strComments = $("#txtComments").val();

            jQuery("#schedapptgrid").setRowData(curSvcApptRow, { comments: strComments });

            jQuery("#apptsuccess").show();
            jQuery("#apptsuccess").html("Successfully saved.");
            jQuery("#apptsuccess").fadeOut(6000);

        }
        else {
            jQuery("#apptsuccess").show();
            jQuery("#apptsuccess").html("Error saving.");
            jQuery("#apptsuccess").fadeOut(6000);
        }

    });

    $('#adminforemenform').ajaxForm(function(data) {

        var respArray = data.split(",");
        jQuery('#formen_loading').hide();

        if (respArray[0] == "Success") {
            jQuery("#foremen_dlg_success").show();
            var newID = respArray[2];

            var strName = $("#txtForemanName").val();

            var dataArray = { svc_foreman_nm: strName,
                svc_foreman_id: curRowAdminFormen
            };

            if (curRowAdminFormen == null) {
                jQuery("#adminformengrid").addRowData(newID, dataArray, "first");
            }
            else {
                jQuery("#adminformengrid").addRowData(newID, dataArray, "after", curRowAdminFormen);
            }
        }
    });

    $('#crewsDlgForm').ajaxForm(function(data) {

//        jQuery('#formen_loading').hide();

        if (data == "Success") {
            jQuery("#crew_dlg_success").show();
            jQuery("#crewsgrid").trigger("reloadGrid");
            
        }
    });


});

