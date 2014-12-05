var curRowAdmin;
var curRowAdminSvc;
var curRowAdminLoc;
var curRowAdminUsers;
var curRowAdminAssignTo;

function ShowHelp() {

    jQuery('#help_popup').dialog('open');

};

function CloseHelp() {

    jQuery('#help_popup').dialog('close');

};

$(function() {
    $("#tabs").tabs();
});


function CloseDialog() {
    jQuery('#img_dialog').dialog('close');

};

function CloseEquipSvcDialog() {

    jQuery('#equip_svc_edit_dlg').dialog('close');

};

function CloseToolSvcDialog() {

    jQuery('#tool_svc_edit_dlg').dialog('close');

};

function CloseEquipDialog() {

    jQuery('#equip_edit_dlg').dialog('close');

};

function CloseToolDialog() {

    jQuery('#tool_edit_dlg').dialog('close');

};

function CloseSmallToolDialog() {

    jQuery('#smalltool_edit_dlg').dialog('close');

};

function CloseEquipAsgnDialog() {
    jQuery('#equip_asgn_edit_dlg').dialog('close');

};

function CloseToolAsgnDialog() {
    jQuery('#tool_asgn_edit_dlg').dialog('close');

};

function CloseReportDialog() {
    jQuery('#rpt_dialog').dialog('close');

};

function CloseDeleteToolDialog() {
    jQuery('#delete_tool_dlg').dialog('close');

};

function CloseDeleteSmallToolDialog() {
    jQuery('#delete_smalltool_dlg').dialog('close');

};

function CloseDeleteEquipDialog() {
    jQuery('#delete_equip_dlg').dialog('close');

};

function CloseExportDialog() {
    jQuery('#export_dlg').dialog('close');

};

function CloseReportHistDialog() {
    jQuery('#rpt_dialog_hist').dialog('close');

};

function CloseAdminDialog() {
    jQuery('#admin_dialog').dialog('close');

};

function CloseAdminLocDialog() {
    jQuery('#admin_loc_dlg').dialog('close');

};

function CloseAdminUsersDialog() {
    jQuery('#admin_users_dlg').dialog('close');

};

function CloseAdminXferAssignments() {
    jQuery('#admin_xfer_assignments').dialog('close');

};

function CloseAdminAssignToDialog() {
    jQuery('#admin_assignto_dlg').dialog('close');

};

function CloseAdminSvcDialog() {
    jQuery('#admin_svc_dlg').dialog('close');

};

function CloseAdminIDDialog() {
    jQuery('#admin_id_dlg').dialog('close');

};


function CloseAssignDialog() {
    jQuery('#img_dialog_assign').dialog('close');

};

function ShowRptFormWait() {

    $("#rpt_loading").show();

}

function ShowExpFormWait() {

    setTimeout(jQuery('#export_dlg').dialog('close'), 3000);

    //        $("#exp_loading").show();

}

function ShowHistRptFormWait() {

    $("#rpthist_loading").show();

}

function ShowImageFormWait() {

    $("#img_loading").show();

}

function ShowAssignImageFormWait() {

    $("#img_assign_loading").show();

}

function ShowEditSvcFormWait() {

    $("#equip_svc_loading").show();

}

function ShowEditAsgnFormWait() {

    var asgndt = $("#dtEquipAsgnDt").val();
    var retdt = $("#dtEquipRetDt").val();
    var asgnmls = $("#txtEquipAsgnMiles").val();
    var retmls = $("#txtEquipRetMiles").val();
    var asgnhrs = $("#txtEquipAsgnHours").val();
    var rethrs = $("#txtEquipRetHours").val();
    var eID = document.getElementById("hdnAsgnFail");

    if (asgndt != '' && asgnmls == '' && asgnhrs == '') {
        alert("You must specify either assign miles or hours when assign date is specified!");
        eID.value = "Yes";
    }
    else if (retdt != '' && retmls == '' && rethrs == '') {
        alert("You must specify either return miles or hours when return date is specified!");
        eID.value = "Yes";

    }
    else {
        $("#equip_asgn_loading").show();
        eID.value = "No";

        $("#btnEquipAsgnSave").attr("disabled", "disabled");
    }

}

function ShowEditFormWait() {

    $("#equip_loading").show();
    $("#btnSaveEquip").attr("disabled", "disabled");
    
}

function ShowEditToolFormWait() {

    $("#tool_loading").show();

}

function ShowSmallToolFormWait() {

    $("#smalltool_loading").show();

}

function ShowToolSvcFormWait() {

    $("#tool_svc_loading").show();
    $("#btnSaveToolSvc").attr("disabled", "disabled"); 

}

function ShowToolAsgnFormWait() {

    $("#tool_asgn_loading").show();
    $("#btnSaveToolAssign").attr("disabled", "disabled");

}

function EquipTotalInvReport() {

    $("#help_popup").dialog('option', 'title', "Equipment Total Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "TotalEquipInv", {}, function(data) {
    $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Total Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipTotalInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipTotalInvReportRegBy() {
    $("#help_popup").dialog('option', 'title', "Equipment Inventory - Registered To Help");
    $.get("/EquipTrack/GetHelpMsg/" + "TotalEquipInvRegBy", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Inventory - Registered To");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipTotalInvRegBy";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsTotalInvReport() {
    $("#help_popup").dialog('option', 'title', "Tools Total Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "TotalToolInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsTotalInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsTotalInvReportRegBy() {
    $("#help_popup").dialog('option', 'title', "Tools Total Inventory - Registered To Help");
    $.get("/EquipTrack/GetHelpMsg/" + "TotalToolInvRegTo", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Inventory - Registered To");
    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsTotalInvRegBy";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsLojackInvReport() {
    $("#help_popup").dialog('option', 'title', "Tools Lojack Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolInvLojack", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Lojack Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsLojackInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsToBeSoldReport() {
    $("#help_popup").dialog('option', 'title', "Tools To Be Sold Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolInvToBeSold", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools To Be Sold Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsToBeSold";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsUnknownInvReport() {
    $("#help_popup").dialog('option', 'title', "Tools Unknown Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolInvUnknown", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Unknown Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsUnknownInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipHUTReport() {
    $("#help_popup").dialog('option', 'title', "Equipment HUT Sticker Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "HUTStickerInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "HUT Sticker Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipHUTInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipApportionedReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Apportioned Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ApportionedInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Apportioned Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipApportionedInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipLojackReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Lojack Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipLojackInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Lojack Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipLojackInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipOtherAntiTheftReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Other Anti-theft Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipOtherAntiTheftInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Other Anti-theft Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipOtherAntiTheftInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipToBeSold() {
    $("#help_popup").dialog('option', 'title', "Equipment To Be Sold Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipToBeSoldInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "To Be Sold Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipToBeSoldInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipLeasedReport() {

    $("#help_popup").dialog('option', 'title', "Leased Equipment Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipLeasedInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Leased Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipLeasedInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipFuelCardReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Fuel Card Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipFuelCardInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Fuel Card Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipFuelCardInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipFuelCardDivReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Fuel Card Division Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipFuelCardDivInv", {}, function(data) {
        $("#help_results").html(data);
    });
    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Inventory By Fuel Card Division ");
    $.get("/EquipTrack/GetRptDlgFuelDivs/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipFuelCardDivInv";
    jQuery('#rpt_dialog').dialog('open');
}

function EquipGPSReport() {
    $("#help_popup").dialog('option', 'title', "Equipment GPS Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipGPSInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "GPS Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipGPSInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipEZPASSReport() {
    $("#help_popup").dialog('option', 'title', "Equipment EZPASS Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipEZPASSInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "EZPASS Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipEZPASSInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipUnknownReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Unknown Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipUnknownInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Unknown Equipment Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipUnknownInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function EquipIFTAReport() {
    $("#help_popup").dialog('option', 'title', "Equipment IFTA Inventory Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipIFTAInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "IFTA Sticker Inventory");
    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipIFTAInv";
    $("#rpt_dlg_results").html('');
    jQuery('#rpt_dialog').dialog('open');
}

function AssignedToReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Assigned To Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipAsgnToInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Assigned To");
    $.get("/EquipTrack/GetRptDlgAssignTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipAssignedTo";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipInvByTypeandLocReport() {

    $("#help_popup").dialog('option', 'title', "Equipment Inventory Type and Loc Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipTypeLocInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Inventory By Type and Location Across All Divisions");
    $.get("/EquipTrack/GetRptDlgEquipInvByTypeAndLoc/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInvByTypeAndLoc";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipTotalInvWithCost() {

    $("#help_popup").dialog('option', 'title', "Equipment Inventory With Cost Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipCostInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Total Inventory With Cost");
    $.get("/EquipTrack/GetRptDlgEquipInvTotalWithCost/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInvWithCost";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
    
}

function EquipTotalInvByGVW() {

    $("#help_popup").dialog('option', 'title', "Equipment Inventory By GVW");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipGVWInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Total Inventory By GVW");
    $.get("/EquipTrack/GetRptDlgEquipInvTotalByGVW/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInvByGVW";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');

}


function EquipSvcCostHistoryAllTypesDivs() {


    $("#help_popup").dialog('option', 'title', "Equipment Service Cost Hist By Types and Divs Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipSvcCostAllTypesDivs", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();

    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Service Cost History");
    $.get("/EquipTrack/GetRptDlgEquipSvcCostAllTypesDivs/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipSvcCostAllTypesDivs";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');

}

function EquipChangeLogHist() {
    $("#help_popup").dialog('option', 'title', "Equipment Change Log History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipChangeLogHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();

    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Change Log History");
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipChangeLogHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');

}

function EquipMngByHist() {
    $("#help_popup").dialog('option', 'title', "Equipment Manage By History");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipMngByHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();

    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Manage By History");
    $.get("/EquipTrack/GetRptDlgEquipMngByHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipMngByHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');

}

function ToolsChangeLogHist() {
    $("#help_popup").dialog('option', 'title', "Tools Change Log History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsChangeLogHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();

    $("#rpt_dialog_hist").dialog('option', 'title', "Tools Change Log History");
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolsChangeLogHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');

}


function ToolAssignedToReport() {
    $("#help_popup").dialog('option', 'title', "Tools Assigned To Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsAssignedTo", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Assigned To");
    $.get("/EquipTrack/GetRptDlgAssignTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsAssignedTo";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function SmallToolAssignedToReport() {
    $("#help_popup").dialog('option', 'title', "Small Tools Assigned To Help");
    $.get("/EquipTrack/GetHelpMsg/" + "SmallToolsAssignedTo", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Small Tools Assigned To");
    $.get("/EquipTrack/GetRptDlgAssignTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "SmallToolsAssignedTo";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipOnLoanReport() {
    $("#help_popup").dialog('option', 'title', "Equipment On Loan Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipOnLoan", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment On Loan");
    $.get("/EquipTrack/GetRptDlgOnLoanTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipOnLoan";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsChangeLogByID() {
    $("#help_popup").dialog('option', 'title', "Tools Change Log Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsChangeLogByID", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Change Log");
    $.get("/EquipTrack/GetRptDlgToolIds/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsChangeLogByID";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipChangeLogByID() {
    $("#help_popup").dialog('option', 'title', "Equipment Change Log Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipChangeLogByID", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Change Log");
    $.get("/EquipTrack/GetRptDlgEquipIds/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipChangeLogByID";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsOnLoanReport() {
    $("#help_popup").dialog('option', 'title', "Tools On Loan Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsOnLoan", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools On Loan");
    $.get("/EquipTrack/GetRptDlgOnLoanTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsOnLoan";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipInspectionsDueReport() {
    $("#help_popup").dialog('option', 'title', "Inspections Due Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipInspectionDue", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Inspections Due");
    $.get("/EquipTrack/GetRptInspectionDates/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInspectionDue";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipInspectionsDueReportMngBy() {
    $("#help_popup").dialog('option', 'title', "Inspections Due Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipInspectionDue", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Inspections Due");
    $.get("/EquipTrack/GetRptInspectionDates/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInspectionDueMngBy";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsInvByLocReport() {
    $("#help_popup").dialog('option', 'title', "Tools Inventory By Location Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsInvByLoc", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Inventory By Location");
    $.get("/EquipTrack/GetRptDlgLocs/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsInvByLoc";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipInvByLocReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Inventory By Location Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipInvByLoc", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Inventory By Location");
    $.get("/EquipTrack/GetRptDlgLocs/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInvByLoc";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipInvByTypeReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Inventory By Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipInvByType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Equipment Inventory By Type");
    $.get("/EquipTrack/GetRptDlgTypes/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "EquipInvByType";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function ToolsInvByTypeReport() {
    $("#help_popup").dialog('option', 'title', "Tools Inventory By Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsInvByLoc", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").dialog('option', 'title', "Tools Inventory By Type");
    $.get("/EquipTrack/GetRptDlgToolTypes/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ToolsInvByType";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function EquipSvcCostHistoryReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Service Cost History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipSvcCostHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Service Cost History");
    $.get("/EquipTrack/GetRptDlgEquipSvcCostHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipSvcCostHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function EquipSvcCostHistoryByTypeReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Service Cost History By Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipSvcCostHistByType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Service Cost History By Type");
    $.get("/EquipTrack/GetRptDlgEquipSvcCostHistTypes/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipSvcCostHistByType";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function EquipSvcCostHistoryByServiceType() {
    $("#help_popup").dialog('option', 'title', "Equipment Service Cost History By Service Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipSvcCostHistBySvcType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Service Cost History By Service Type");
    $.get("/EquipTrack/GetRptDlgEquipSvcCostHistSvcTypes/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipSvcCostHistBySvcType";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolSvcCostHistoryByServiceType() {
    $("#help_popup").dialog('option', 'title', "Tool Service Cost History By Service Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolSvcCostHistBySvcType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Tool Service Cost History By Service Type");
    $.get("/EquipTrack/GetRptDlgToolSvcCostHistSvcTypes/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolSvcCostHistBySvcType";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolSvcCostHistoryByTypeReport() {
    $("#help_popup").dialog('option', 'title', "Tool Service Cost History By Type Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolSvcCostHistByType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Tool Service Cost History By Type");
    $.get("/EquipTrack/GetRptDlgToolSvcCostHistTypes/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolSvcCostHistByType";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function EquipSvcCostHistoryAllReport() {
    $("#help_popup").dialog('option', 'title', "Equipment Service Cost History (All) Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipSvcCostHistAll", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Service Cost History (All)");
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipSvcCostHistAll";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolSvcCostHistoryAllReport() {
    $("#help_popup").dialog('option', 'title', "Tool Service Cost History (All) Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolSvcCostHistAll", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Tool Service Cost History (All)");
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolSvcCostHistAll";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolSvcCostHistoryReport() {
    $("#help_popup").dialog('option', 'title', "Tool Service Cost History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolSvcCostHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_dlg_hist_results").html('');
    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Tool Service Cost History");
    $.get("/EquipTrack/GetRptDlgToolSvcCostHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolSvcCostHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function AssignedToHistReport() {

    $("#help_popup").dialog('option', 'title', "Equipment Assigned To History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipAssignedToHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Equipment Assigned To History");
    $.get("/EquipTrack/GetRptDlgAssignToHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipAssignedToHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolsAssignedToHistReport() {
    $("#help_popup").dialog('option', 'title', "Tools Assigned To History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsAssignedToHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Tools Assigned To History");
    $.get("/EquipTrack/GetRptDlgAssignToHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });

    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolsAssignedToHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");

    jQuery('#rpt_dialog_hist').dialog('open');
}

function EquipBrokenHistReport() {
    $("#help_popup").dialog('option', 'title', "Broken Equipment History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "EquipBrokenHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Broken Equipment History");
    $.get("/EquipTrack/GetRptDlgAssignToHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "EquipBrokenHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");
    jQuery('#rpt_dialog_hist').dialog('open');
}

function ToolsBrokenHistReport() {
    $("#help_popup").dialog('option', 'title', "Broken Tools History Help");
    $.get("/EquipTrack/GetHelpMsg/" + "ToolsBrokenHist", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpthist_loading").hide();
    $("#rpt_dialog_hist").dialog('option', 'title', "Broken Tools History");
    $.get("/EquipTrack/GetRptDlgAssignToHist/", {}, function(data) {
        $("#rpt_dlg_hist_results").html(data);
    });
    var eID = document.getElementById("hdnReportNameHist");
    eID.value = "ToolsBrokenHist";

    $('#dtReportFrom').val('');
    $('#dtReportTo').val('');

    $('#dtReportFrom').datepicker('disable');
    $('#dtReportTo').datepicker('disable');

    $("#btnShowHistRpt").attr("disabled", "disabled");
    jQuery('#rpt_dialog_hist').dialog('open');
}

function SetUpAdminGrid(strUrl) {

    jQuery("#admingrid").jqGrid({
        url: strUrl,
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 275,
        rowNum: 5000,
        colNames: ['ID', 'Description'],
        colModel: [
                { name: 'id', index: 'id', width: 60 },
   		        { name: 'description', index: 'description', width: 200}],
        sortname: 'description',
        sortorder: 'asc',
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

function SetUpAdminLocGrid() {

    jQuery("#adminlocgrid").jqGrid({
        url: '/EquipTrack/GetAdminEquipLocs/',
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 275,
        rowNum: 5000,
        colNames: ['Location', 'Division'],
        colModel: [
                { name: 'equip_loc', index: 'equip_loc', width: 175 },
   		        { name: 'division', index: 'division', width: 85}],
        sortname: 'equip_loc',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#adminlocgrid tbody:first-child tr:first').attr('id');
            jQuery("#adminlocgrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminlocgrid").getRowData(ids);
                $("#txtLoc").val(data.equip_loc);
                $("#hdnAdminLocDiv").val(data.division);
                $("#txtLoc").attr("disabled", "disabled");
                $("#lstDivisions").val(data.division);
                $("#btnDelLoc").removeAttr("disabled", "disabled");
                $("#btnSaveLoc").removeAttr("disabled", "disabled");
                $("#lstDivisions").removeAttr("disabled");
                curRowAdminLoc = ids;
                $("#hdnAdminLocOper").val("Edit");
                $("#hdnAdminLocID").val(curRowAdminLoc);

            }
        }
    });

    jQuery("#adminlocgrid").resetSelection();

    InitAdminLocControls();

}

function SetUpAdminUsersGrid() {

    jQuery("#adminusersgrid").jqGrid({
        url: '/EquipTrack/GetAdminUsers/',
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 295,
        rowNum: 5000,
        colNames: ['User ID', 'Division', 'Last Log On'],
        colModel: [
                { name: 'user_id', index: 'user_id', width: 125 },
   		        { name: 'div', index: 'div', width: 85 },
   		        { name: 'lst_log_on', index: 'lst_log_on', width: 85}],
   		sortname: 'user_id',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#adminusersgrid tbody:first-child tr:first').attr('id');
            jQuery("#adminusersgrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminusersgrid").getRowData(ids);
                $("#txtUserID").val(data.user_id);
                $("#hdnAdminUsersDiv").val(data.div);
                $("#txtUserID").attr("disabled", "disabled");
                $("#lstUsersDivs").val(data.div);
                $("#btnDelUser").removeAttr("disabled", "disabled");
                $("#btnSaveUser").removeAttr("disabled", "disabled");
                $("#lstUsersDivs").removeAttr("disabled");
                curRowAdminUsers = ids;
                $("#hdnAdminUsersOper").val("Edit");
                $("#hdnAdminUsersID").val(curRowAdminUsers);
            }
        }
    });

    jQuery("#adminusersgrid").resetSelection();

    InitAdminUsersControls();

}

function SetUpAdminXferAssignments() {

    var AllConditions = { "1": "Totaled", "2": "Poor", "3": "Fair", "4": "Good", "5": "Excellent", "6": "New", "7": "Broken", "8": "Stolen", "9": "Repairs", "10": "Service" };


    jQuery("#adminxferassignments").jqGrid({
        datatype: 'json',
        mtype: 'GET',
        height: 100,
        width: 1000,
        rowNum: 5000,
        colNames: ['Equip ID', 'Type', 'Make', 'Model', 'Year', 'Assign Cond', 'Return Cond', 'Assign Miles ', 'Return Miles', 'Assign Hours', 'Return Hours', 'id'],
        colModel: [
   		        { name: 'equip_id', index: 'equip_id', width: 65, editable: false },
  		        { name: 'type_desc', index: 'type_desc', width: 130, editable: false },
   		        { name: 'make_descr', index: 'make_descr', width: 100, editable: false },
   		        { name: 'model_descr', index: 'model_descr', width: 100, editable: false },
   		        { name: 'equip_year', index: 'equip_year', width: 60, editable: false },
   		        { name: 'asgn_condition', index: 'asgn_condition', width: 100, editable: false, edittype: "select", editoptions: { value: AllConditions} },
   		        { name: 'ret_condition', index: 'ret_condition', width: 100, editable: true, edittype: "select", editoptions: { value: AllConditions} },
   		        { name: 'asgn_miles', editable: false, edittype: "text", width: 80 },
   		        { name: 'ret_miles', editable: true, edittype: "text", width: 80 },
   		        { name: 'asgn_hours', editable: false, edittype: "text", width: 80 },
   		        { name: 'ret_hours', editable: true, edittype: "text", width: 80 },
                { name: 'assign_id', editable: false, hidden: true}],
        sortname: 'equip_id',
        sortorder: 'asc',
        viewrecords: true,
        multiselect: true,
        afterInsertRow: function(rowid, rowdata, rowelem) {
        jQuery('#adminxferassignments').editRow(rowid, true);

        var data = $("#adminxferassignments").getRowData(rowid);
        $("#" + data.assign_id + "_ret_miles").attr('autocomplete', 'off');
        $("#" + data.assign_id + "_ret_hours").attr('autocomplete', 'off');
    },
    loadComplete: function() {
//        $('.cbox').trigger('click').attr('checked', true); 
    },    
        caption: ''
    });

    jQuery("#adminxferassignments").resetSelection();

}

function SetUpAdminXferToolAssignments() {

    var AllConditions = { "1": "Totaled", "2": "Poor", "3": "Fair", "4": "Good", "5": "Excellent", "6": "New", "7": "Broken", "8": "Stolen", "9": "Repairs", "10": "Service" };


    jQuery("#adminxfertoolassigns").jqGrid({
        datatype: 'json',
        mtype: 'GET',
        height: 100,
        width: 1000,
        rowNum: 5000,
        colNames: ['Tool ID', 'Type', 'Description', 'Manufacturer', 'Size', 'Assign Cond', 'Return Cond', 'id'],
        colModel: [
   		        { name: 'tool_id', index: 'tool_id', width: 65, editable: false },
  		        { name: 'tools_type_descr', index: 'tools_type_descr', width: 130, editable: false },
   		        { name: 'tools_descr_descr', index: 'tools_descr_descr', width: 100, editable: false },
   		        { name: 'tool_mfg_descr', index: 'tool_mfg_descr', width: 100, editable: false },
   		        { name: 'size_descr', index: 'size_descr', width: 60, editable: false },
   		        { name: 'asgn_condition', index: 'asgn_condition', width: 100, editable: false, edittype: "select", editoptions: { value: AllConditions} },
   		        { name: 'ret_condition', index: 'ret_condition', width: 100, editable: true, edittype: "select", editoptions: { value: AllConditions} },
                { name: 'assign_id', editable: false, hidden: true}],
        sortname: 'tool_id',
        sortorder: 'asc',
        viewrecords: true,
        multiselect: true,
        afterInsertRow: function(rowid, rowdata, rowelem) {
            jQuery('#adminxfertoolassigns').editRow(rowid, true);

        },
        loadComplete: function() {
//            $('.cbox').trigger('click').attr('checked', true);
        },
        caption: ''
    });

    jQuery("#adminxfertoolassigns").resetSelection();

}

function SetUpAdminXferSmallToolAssignments() {

    var AllConditions = { "1": "Totaled", "2": "Poor", "3": "Fair", "4": "Good", "5": "Excellent", "6": "New", "7": "Broken", "8": "Stolen", "9": "Repairs", "10": "Service" };


    jQuery("#adminxfersmalltoolassigns").jqGrid({
        datatype: 'json',
        mtype: 'GET',
        height: 100,
        width: 1000,
        rowNum: 5000,
        colNames: ['ID', 'Item', 'Description', 'Size','Manufacturer', 'Model', 'Serial #', 'ID #', 'Condition'],
        colModel: [
                { name: 'stID', hidden: true, editable: false, search: false },
   		        { name: 'item', index: 'item', editable: false },
  		        { name: 'description', index: 'description', editable: false },
   		        { name: 'size', index: 'size', editable: false },
   		        { name: 'MFG', index: 'MFG',  editable: false },
   		        { name: 'model', index: 'model', editable: false },
   		        { name: 'serNum', index: 'serNum',  editable: false },
   		        { name: 'IDnum', editable: false },
   		        { name: 'condition_descr', index: 'condition_descr',  editable: true, edittype: "select", editoptions: { value: AllConditions} }],
   		 sortname: 'item',
        sortorder: 'asc',
        viewrecords: true,
        multiselect: true,
        afterInsertRow: function(rowid, rowdata, rowelem) {
            jQuery('#adminxfersmalltoolassigns').editRow(rowid, true);

        },
        loadComplete: function() {
//            $('.cbox').trigger('click').attr('checked', true);
        },
        caption: ''
    });

    jQuery("#adminxfersmalltoolassigns").resetSelection();

}

function SetUpAdminAssignToGrid() {

    jQuery("#adminassigntogrid").jqGrid({
        url: '/EquipTrack/GetAdminEquipAssignTo/',
        datatype: 'json',
        mtype: 'GET',
        height: 200,
        width: 375,
        rowNum: 5000,
        colNames: ['Name', 'Status', 'Division'],
        colModel: [
                { name: 'assign_to1', index: 'assign_to1', width: 175 },
   		        { name: 'active_status', index: 'active_status', width: 85 },
   		        { name: 'work_loc', index: 'work_loc', width: 85}],
        sortname: 'assign_to1',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#adminassigntogrid tbody:first-child tr:first').attr('id');
            jQuery("#adminassigntogrid").setSelection(top_rowid, true);
        } ,
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminassigntogrid").getRowData(ids);
                $("#txtName").val(data.assign_to1);
                $("#txtName").attr("disabled", "disabled");
                $("#lstAssignToDivs").val(data.work_loc);
                $("#btnDelAssignTo").removeAttr("disabled", "disabled");
                $("#btnSaveAssignTo").removeAttr("disabled", "disabled");
                $("#lstAssignToDivs").removeAttr("disabled");
                curRowAdminAssignTo = ids;
                $("#hdnAdminAssignToOper").val("Edit");
                $("#hdnAdminAssignToID").val(curRowAdminAssignTo);
                if (data.active_status == "ACTIVE") {
                    $("#chkActive").attr("checked", true);
                }
                else {
                    $("#chkActive").attr("checked", false);
                }
            }
        }
    });

    jQuery("#adminassigntogrid").resetSelection();

    InitAdminAssignToControls();

}

function SetUpAdminSvcGrid() {

    jQuery("#adminsvcgrid").jqGrid({
        url: '/EquipTrack/GetAdminSvcDueParms/',
        datatype: 'json',
        mtype: 'GET',
        height: 225,
        width: 350,
        rowNum: 5000,
        colNames: ['ID', 'Description', 'Svc Due mls/hrs', 'Warn within mls/hrs'],
        colModel: [
                { name: 'type_id', index: 'type_id', width: 85 },
   		        { name: 'type_desc', index: 'type_desc', width: 175 },
   		        { name: 'service_every', index: 'service_every', width: 85 },
   		        { name: 'warning_within', index: 'warning_within', width: 85 }
   		        ],
        sortname: 'type_desc',
        sortorder: 'asc',
        viewrecords: true,
        caption: '',
        gridComplete: function() {
            var top_rowid = $('#adminsvcgrid tbody:first-child tr:first').attr('id');
            jQuery("#adminsvcgrid").setSelection(top_rowid, true);
        },
        onSelectRow: function(ids) {
            if (ids != null) {
                var data = $("#adminsvcgrid").getRowData(ids);
                $("#txtSvcDueID").val(data.type_id);
                $("#hdnAdminSvcID").val(data.type_id);
                $("#txtSvcDueDesc").val(data.type_desc);
                $("#txtSvcDueAmt").val(data.service_every);
                $("#txtSvcDueWarn").val(data.warning_within);
                //                    $("#btnSaveSvcDue").removeAttr("disabled", "disabled");
                curRowAdminSvc = ids;

            }
        }
    });

    //        jQuery("#adminsvcgrid").resetSelection();


    InitAdminSvcControls();

}

function SetUpAdminIDGrid() {

    jQuery("#adminidgrid").jqGrid({
        //            url: '/EquipTrack/GetAllEquipIds/',
        datatype: 'json',
        mtype: 'GET',
        height: 225,
        width: 350,
        rowNum: 5000,
        colNames: ['ID', 'Registered By', 'Managed By'],
        colModel: [
                { name: 'item_id', index: 'item_id', width: 85 },
   		        { name: 'registered_by', index: 'registered_by', width: 85 },
   		        { name: 'managed_by', index: 'managed_by', width: 85 }
   		        ],
        sortname: 'item_id',
        sortorder: 'asc',
        viewrecords: true,
        caption: ''
    });
}

function ClearIDGrid() {

    jQuery("#adminidgrid").clearGridData();
    $("#txtIDSearch").val("");

}

function FindIDs() {

    var search = $('#txtIDSearch').val();

    var the_value;
    the_value = jQuery('#adminidform input:radio:checked').val();

    if (the_value == "Equipment") {
        jQuery("#adminidgrid").setGridParam({ url: "/EquipTrack/GetAllEquipIds/" + search, page: 1 })
                    .trigger('reloadGrid');
    }
    else {
        jQuery("#adminidgrid").setGridParam({ url: "/EquipTrack/GetAllToolIds/" + search, page: 1 })
                    .trigger('reloadGrid');
    }
}

function InitAdminSvcControls() {

    //        $("#btnSaveSvcDue").attr("disabled", "disabled");
    $("#txtSvcDueID").attr("disabled", "disabled");
    $("#txtSvcDueDesc").attr("disabled", "disabled");
}

function InitAdminAssignToControls() {

    $("#btnAddAssignTo").removeAttr("disabled", "disabled");
    $("#btnDelAssignTo").attr("disabled", "disabled");
    $("#btnSaveAssignTo").attr("disabled", "disabled");
    $("#txtName").attr("disabled", "disabled");
    $("#lstAssignToDivs").attr("disabled", "disabled");
    $("#lstAssignToDivs").val("");
    $("#txtName").val("");
}

function InitAdminLocControls() {

    $("#btnAddLoc").removeAttr("disabled", "disabled");
    $("#btnDelLoc").attr("disabled", "disabled");
    $("#btnSaveLoc").attr("disabled", "disabled");
    $("#txtLoc").attr("disabled", "disabled");
    $("#lstDivisions").attr("disabled", "disabled");
    $("#lstDivisions").val("");
    $("#txtLoc").val("");
}

function InitAdminUsersControls() {

    $("#btnAddUser").removeAttr("disabled", "disabled");
    $("#btnDelUser").attr("disabled", "disabled");
    $("#btnSaveUser").attr("disabled", "disabled");
    $("#txtUserID").attr("disabled", "disabled");
    $("#lstUsersDivs").attr("disabled", "disabled");
    $("#lstUsersDivs").val("");
    $("#txtUserID").val("");
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

function AdminFindIds() {


    SetUpAdminIDGrid();


    $("#admin_id_dlg").dialog('option', 'title', "Find IDs - All Offices");
    jQuery('#admin_id_dlg').dialog('open');


}

function AdminSvcDue() {


    SetUpAdminSvcGrid();


    $("#admin_svc_dlg").dialog('option', 'title', "Service Due Parameters");
    jQuery('#admin_svc_dlg').dialog('open');


}

function ExportEquipGrid() {

    //        $("#exp_loading").hide();

    $("#export_dlg").dialog('option', 'title', "Export Equipment Grid To Excel");
    var eID = document.getElementById("hdnExportType");
    eID.value = "EquipExport";

    jQuery('#export_dlg').dialog('open');
}

function ExportToolsGrid() {

    //        $("#exp_loading").hide();

    $("#export_dlg").dialog('option', 'title', "Export Tools Grid To Excel");
    var eID = document.getElementById("hdnExportType");
    eID.value = "ToolsExport";

    jQuery('#export_dlg').dialog('open');
}

function ExportSmallToolsGrid() {

    //        $("#exp_loading").hide();

    $("#export_dlg").dialog('option', 'title', "Export Small Tools Grid To Excel");
    var eID = document.getElementById("hdnExportType");
    eID.value = "SmallToolsExport";

    jQuery('#export_dlg').dialog('open');
}

function AdminAssignTo() {

    $.get("/EquipTrack/GetAssignToDivisions/", {}, function(data) {
        $("#assign_divs").html(data);
    });

    SetUpAdminAssignToGrid();


    $("#admin_assignto_dlg").dialog('option', 'title', "Assign To List");
    jQuery('#admin_assignto_dlg').dialog('open');
}

function AdminUsers() {

    $("#help_popup").dialog('option', 'title', "Admin - User Administration Help");
    $.get("/EquipTrack/GetHelpMsg/" + "AdminUserAdmin", {}, function(data) {
        $("#help_results").html(data);
    });
    
    $.get("/EquipTrack/GetUsersDivisions/", {}, function(data) {
        $("#user_divs").html(data);
    });

    SetUpAdminUsersGrid();


    $("#admin_users_dlg").dialog('option', 'title', "User Administration");
    jQuery('#admin_users_dlg').dialog('open');
}

function AdminXferAssignments() {
    $("#help_popup").dialog('option', 'title', "Admin - Assignment Transfer");
//    $("#help_popup").dialog('option', 'title', "Admin - Assignment Transfer")
    $.get("/EquipTrack/GetHelpMsg/" + "AdminAssignmentXfer", {}, function(data) {
        $("#help_results").html(data);
        });

    $("#lstFromAssign").val("");
    $("#lstToAssign").val("");
    $('#adminxferassignments').clearGridData();
    $('#adminxfertoolassigns').clearGridData();
    $('#adminxfersmalltoolassigns').clearGridData();

    $("#btnSaveAssignXfer").attr("disabled", "disabled");

    $.get("/EquipTrack/GetXferAssignLsts/", {}, function(data) {
        $("#fromEmployee").html(data);
    });

    SetUpAdminXferAssignments();

    SetUpAdminXferToolAssignments();
    
    SetUpAdminXferSmallToolAssignments();

    $("#admin_xfer_assignments").dialog('option', 'title', "Transfer Assignments");
    $('#admin_xfer_assignments').dialog('open');
}




function AdminLocations() {

    $.get("/EquipTrack/GetDivisions/", {}, function(data) {
        $("#divisions").html(data);
    });

    SetUpAdminLocGrid();


    $("#admin_loc_dlg").dialog('option', 'title', "Equipment Locations");
    jQuery('#admin_loc_dlg').dialog('open');
}

function AdminEquipTypes() {

    SetUpAdminGrid('/EquipTrack/GetAdminEquipTypes/');


    $("#admin_dialog").dialog('option', 'title', "Equipment Types");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminEquipTypes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminEquipTypes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminMakeTypes() {

    SetUpAdminGrid('/EquipTrack/GetAdminMakeTypes/');


    $("#admin_dialog").dialog('option', 'title', "Make Types");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminMakeTypes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminMakeTypes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminModelTypes() {

    SetUpAdminGrid('/EquipTrack/GetAdminModelTypes/');

    $("#admin_dialog").dialog('option', 'title', "Model Types");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminModelTypes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminModelTypes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminToolTypes() {

    SetUpAdminGrid('/EquipTrack/GetAdminToolTypes/');


    $("#admin_dialog").dialog('option', 'title', "Tool Types");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminToolTypes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminToolTypes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminToolDesc() {

    SetUpAdminGrid('/EquipTrack/GetAdminToolDescs/');


    $("#admin_dialog").dialog('option', 'title', "Tool Descriptions");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminToolDescs";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminToolDescs/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminToolManfs() {

    SetUpAdminGrid('/EquipTrack/GetAdminToolManfs/');


    $("#admin_dialog").dialog('option', 'title', "Tool Manufacturers");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminToolManfs";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminToolManfs/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminToolSizes() {

    SetUpAdminGrid('/EquipTrack/GetAdminToolSizes/');


    $("#admin_dialog").dialog('option', 'title', "Tool Sizes");
    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminToolSizes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/EquipTrack/GetAdminToolSizes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AddAdminDialog() {
    var eID = document.getElementById("hdnAdminOper");
    eID.value = "Add";

    var adminType = $("#hdnAdminType").val();
    if (adminType == 'AdminEquipTypes') {
        $.get("/EquipTrack/GetNextEquipTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminModelTypes') {

        $.get("/EquipTrack/GetNextModelTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminMakeTypes') {
        $.get("/EquipTrack/GetNextMakeTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminToolTypes') {
        $.get("/EquipTrack/GetNextToolTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminToolDescs') {
        $.get("/EquipTrack/GetNextToolDescId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminToolManfs') {
        $.get("/EquipTrack/GetNextToolManfId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminToolSizes') {
        $.get("/EquipTrack/GetNextToolSizeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }

    $("#txtDescription").removeAttr("disabled");
    $("#txtDescription").val('');
    $("#txtDescription").focus();
    $("#btnAdminAdd").attr("disabled", "disabled");

}

function AddAdminLocDialog() {
    var eID = document.getElementById("hdnAdminLocOper");
    eID.value = "Add";

    $("#txtLoc").removeAttr("disabled");
    $("#txtLoc").val('');
    $("#txtLoc").focus();
    $("#lstDivisions").removeAttr("disabled");
    $("#lstDivisions").val('');
    $("#btnAddLoc").attr("disabled", "disabled");

}

function AddAdminUsersDialog() {
    var eID = document.getElementById("hdnAdminUsersOper");
    eID.value = "Add";

    $("#txtUserID").removeAttr("disabled");
    $("#txtUserID").val('');
    $("#txtUserID").focus();
    $("#lstUsersDivs").removeAttr("disabled");
    $("#lstUsersDivs").val('');
    $("#btnAddUser").attr("disabled", "disabled");

}

function AddAdminAssignToDialog() {
    var eID = document.getElementById("hdnAdminAssignToOper");
    eID.value = "Add";

    $("#txtName").removeAttr("disabled");
    $("#txtName").val('');
    $("#txtName").focus();
    $("#lstAssignToDivs").removeAttr("disabled");
    $("#lstAssignToDivs").val('');
    $("#btnAddAssignTo").attr("disabled", "disabled");
    $("#chkActive").attr("checked", true);

}

function confirmDelete() {
    var adminType = $("#hdnAdminType").val();
    var result = "";
    var adminTypeName;

    if (confirm("Are you sure you want to delete this item?")) {
        if (adminType == 'AdminEquipTypes') {
            $.post("/EquipTrack/DeleteEquipType/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminModelTypes') {
            adminTypeName = "Model Type";
            $.post("/EquipTrack/DeleteModelType/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminMakeTypes') {
            $.post("/EquipTrack/DeleteMakeType/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminToolTypes') {
            $.post("/EquipTrack/DeleteToolType/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminToolDescs') {
            $.post("/EquipTrack/DeleteToolDesc/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminToolManfs') {
            $.post("/EquipTrack/DeleteToolManf/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminToolSizes') {
            $.post("/EquipTrack/DeleteToolSize/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
    }
}

function confirmLocDelete() {

    if (confirm("Are you sure you want to delete this location?")) {
        $.post("/EquipTrack/DeleteLocation/" + curRowAdminLoc, {},
                            function(data) {
                                DeleteMsgLoc(data);
                            }
                        );
    }
}

function confirmUsersDelete() {

    if (confirm("Are you sure you want to delete this user?")) {
        $.post("/EquipTrack/DeleteUser/" + curRowAdminUsers, {},
                            function(data) {
                                DeleteMsgUser(data);
                            }
                        );
    }
}

function confirmAssignToDelete() {

    if (confirm("Are you sure you want to delete this name?")) {
        $.post("/EquipTrack/DeleteAssignTo/" + curRowAdminAssignTo, {},
                            function(data) {
                                DeleteMsgAssignTo(data);
                            }
                        );
    }
}

function DeleteMsg(data) {

    if (data == "Success") {
        InitAdminControls();

        AdminSuccessFailure(true);
    }
    else {
        AdminSuccessFailure(false);
    }

}

function DeleteMsgLoc(data) {

    if (data == "Success") {
        InitAdminLocControls();

        AdminLocSuccessFailure(true);
    }
    else {
        AdminLocSuccessFailure(false);
    }
}

function DeleteMsgUser(data) {

    if (data == "Success") {
        InitAdminUsersControls();

        AdminUsersSuccessFailure(true);
    }
    else {
        AdminUsersSuccessFailure(false);
    }
}

function DeleteMsgAssignTo(data) {

    if (data == "Success") {
        InitAdminAssignToControls();

        AdminAssignToSuccessFailure(true);
    }
    else {
        AdminAssignToSuccessFailure(false);
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

function AdminUsersSuccessFailure(success) {
    if (success) {
        jQuery("#adminusersgrid").delRowData(curRowAdminUsers);
        jQuery("#adminUsersSuccess").show();
        jQuery("#adminUsersSuccess").html("Successfully deleted.");
        jQuery("#adminUsersSuccess").fadeOut(6000);
    }
    else {
        jQuery("#adminUsersSuccess").show();
        jQuery("#adminUsersSuccess").html("Error deleting row.");
        jQuery("#adminUsersSuccess").fadeOut(6000);
    }
}

function AdminLocSuccessFailure(success) {
    if (success) {
        jQuery("#adminlocgrid").delRowData(curRowAdminLoc);
        jQuery("#adminLocSuccess").show();
        jQuery("#adminLocSuccess").html("Successfully deleted.");
        jQuery("#adminLocSuccess").fadeOut(6000);
    }
    else {
        jQuery("#adminLocSuccess").show();
        jQuery("#adminLocSuccess").html("Error deleting row.");
        jQuery("#adminLocSuccess").fadeOut(6000);
    }
}

function AdminAssignToSuccessFailure(success) {
    if (success) {
        jQuery("#adminassigntogrid").delRowData(curRowAdminAssignTo);
        jQuery("#adminAssignToSuccess").show();
        jQuery("#adminAssignToSuccess").html("Successfully deleted.");
        jQuery("#adminAssignToSuccess").fadeOut(6000);
    }
    else {
        jQuery("#adminAssignToSuccess").show();
        jQuery("#adminAssignToSuccess").html("Error deleting row.");
        jQuery("#adminAssignToSuccess").fadeOut(6000);
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

function CheckLocForm() {

    var loc = $("#txtLoc").val();
    var div = $("#lstDivisions").val();
    if (loc.length > 0 && div != '') {
        $("#hdnAdminLocDiv").val(div);
        $("#btnSaveLoc").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveLoc").attr("disabled", "disabled");
    }
}

function CheckUsersForm() {

    var loc = $("#txtUserID").val();
    var div = $("#lstUsersDivs").val();
    if (loc.length > 0) {
        $("#hdnAdminUsersDiv").val(div);
        $("#btnSaveUser").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveUser").attr("disabled", "disabled");
    }
}

function CheckAssignToForm() {

    var loc = $("#txtName").val();
    var div = $("#lstAssignToDivs").val();
    if (loc.length > 0 && div != '') {
        $("#hdnAdminAssignToDiv").val(div);
        $("#btnSaveAssignTo").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveAssignTo").attr("disabled", "disabled");
    }
}

function CheckEquipSvcForm() {

    var svcdt = $("#dtEquipSvcDt").val();
    var type = $("#lstEquipSvcTypes").val();
    if (svcdt.length > 0 > 0 && type.length > 0) {
        $("#btnSaveEquipSvc").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveEquipSvc").attr("disabled", "disabled");
    }
}

function CheckToolSvcForm() {

    var svcdt = $("#dtToolSvcDt").val();
    var type = $("#lstToolSvcTypes").val();
    if (svcdt.length > 0 > 0 && type.length > 0) {
        $("#btnSaveToolSvc").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveToolSvc").attr("disabled", "disabled");
    }
}

function CheckEquipAssignForm() {

    var asgndt = $("#dtEquipAsgnDt").val();
    var asgnto = $("#ddlAssignedTo").val();
    if (asgndt.length > 0 > 0 && asgnto.length > 0) {
        $("#btnEquipAsgnSave").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnEquipAsgnSave").attr("disabled", "disabled");
    }
}

function CheckToolAssignForm() {

    var asgndt = $("#dtToolAsgnDt").val();
    var asgnto = $("#ddlToolAssignedTo").val();
    if (asgndt.length > 0 > 0 && asgnto.length > 0) {
        $("#btnSaveToolAssign").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveToolAssign").attr("disabled", "disabled");
    }
}

function CheckRptHistForm() {
    
    var from = $("#dtReportFrom").val();
    var to = $("#dtReportTo").val();
    var listsel;
    var listTypes;
    var listSvcTypes;
    var listRegBy;
    var listMngBy;
    var eID = document.getElementById("hdnReportNameHist"); 
    var rpt = eID.value;

    if (rpt == "EquipAssignedToHist" || rpt == "ToolsAssignedToHist" || rpt == "EquipBrokenHist" || rpt == "ToolsBrokenHist") {
        listsel = $("#lstHistAssigned").val();
    }
    else if (rpt == "EquipSvcCostHist") {
        listsel = $("#lstHistEquipIds").val();
    }
    else if (rpt == "ToolSvcCostHist") {
        listsel = $("#lstHistToolIds").val();
    }
    else if (rpt == "EquipSvcCostHistByType") {
        listsel = $("#lstHistTypes").val();
    }
    else if (rpt == "ToolSvcCostHistByType") {
        listsel = $("#lstHistToolTypes").val();
    }
    else if (rpt == "EquipSvcCostHistBySvcType") {
        listsel = $("#lstSvcTypes").val();
    }
    else if (rpt == "ToolSvcCostHistBySvcType") {
        listsel = $("#lstToolSvcTypes").val();
    }
    else if (rpt == "EquipSvcCostAllTypesDivs") {
        listTypes = $("#ddlEquipType").val();
        listSvcTypes = $("#ddlSvcTypes").val();
        listRegBy = $("#ddlEquipRegBy").val();
        listMngBy = $("#ddlEquipMngBy").val();
    }
    else if (rpt == "EquipSvcCostHistAll" || rpt == "ToolSvcCostHistAll" || "EquipChangeLogHist") {
        listsel = "ALL";
    }

    if (rpt != "EquipSvcCostAllTypesDivs") {
        if (from.length > 0 && to.length > 0 && listsel.length > 0) {
            $("#btnShowHistRpt").removeAttr("disabled", "disabled");
        }
        else {
            $("#btnShowHistRpt").attr("disabled", "disabled");
        }
    }
    else {
        if (from.length > 0 && to.length > 0 && listTypes.length > 0 && listSvcTypes.length > 0 && listRegBy.length > 0 && listMngBy.length > 0) {
            $("#btnShowHistRpt").removeAttr("disabled", "disabled");
        }
        else {
            $("#btnShowHistRpt").attr("disabled", "disabled");
        }
    }
}

function CheckRptHistForm2() {

    var from = $("#dtReportFrom").val();
    var to = $("#dtReportTo").val();
    var listTypes;
    var listSvcTypes;
    var listRegBy;
    var listMngBy;

    listTypes = $("#ddlEquipType").val();
    listSvcTypes = $("#ddlSvcTypes").val();
    listRegBy = $("#ddlEquipRegBy").val();
    listMngBy = $("#ddlEquipMngBy").val();

    alert(listTypes);
    alert(listSvcTypes);
    alert(listRegBy);
    alert(listMngBy);

    if (from.length > 0 && to.length > 0 && listTypes.length > 0 && listSvcTypes.length > 0 && listRegBy.length > 0 && listRegBy.length > 0) {
        $("#btnShowHistRpt").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnShowHistRpt").attr("disabled", "disabled");
    }
}

function CheckRptAssignForm() {
    
    var assgnd = $("#lstAssigned").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptTypeLocForm() {

    var locs = $("#lstLocs").val();
    var types = $("#lstTypes").val();
    if (locs.length > 0 && types.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptLocationForm() {

    var locs = $("#lstLocations").val();
    if (locs.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptOnLoanForm() {

    var assgnd = $("#lstOnLoanTo").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptByTypeForm() {
    

    var assgnd = $("#lstTypes").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptEquipChangeLog() {


    var assgnd = $("#lstEquipID").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptToolChangeLog() {


    var assgnd = $("#lstToolID").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptWithCostForm() {

    var types = $("#ddlEquipType").val();
    var regs = $("#ddlEquipRegBy").val();
    var mngs = $("#ddlEquipMngBy").val();

    if (types.length > 0 && regs.length > 0 && mngs.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptByGVWForm() {

    var types = $("#ddlGVW").val();
    var regs = $("#ddlEquipRegBy").val();
    var mngs = $("#ddlEquipMngBy").val();

    if (types.length > 0 && regs.length > 0 && mngs.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckImgForm() {

    $("#btnSave").removeAttr("disabled", "disabled");
}

function CheckBeforeImgForm() {

    $("#btnSaveBefore").removeAttr("disabled", "disabled");
}

function CheckAfterImgForm() {

    $("#btnSaveAfter").removeAttr("disabled", "disabled");
}

function CheckRptToolTypeForm() {

    var assgnd = $("#lstToolTypes").val();
    if (assgnd.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function CheckRptInspDueForm() {

    var months = $("#lstMonths").val();
    var years = $("#lstYears").val();
    if (months.length > 0 && years.length > 0) {
        $("#btnSubmit").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSubmit").attr("disabled", "disabled");
    }
}

function setSelectedIndex(s, v) {
    alert(v);
    alert(s.options.length);
    for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].value == v) {
            s.options[i].selected = true;
            return;
        }
    }

}

function CheckEquipInRepair() {
    var chval = $("#chkEquipInRepair").prop('checked');
//    alert(chval);
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipInRepair").val(onoff);
}

function CheckEquipLojack() {
    var chval = $("#chkEquipLojack").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipLojack").val(onoff);
}

function CheckEquipTotaled() {
    var chval = $("#chkEquipTotaled").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipTotaled").val(onoff);
}

function CheckHUTSticker() {
    var chval = $("#chkHUTSticker").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnHUTSticker").val(onoff);
}

function CheckIFTASticker() {
    var chval = $("#chkIFTASticker").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnIFTASticker").val(onoff);
}

function CheckEquipStolen() {
    var chval = $("#chkEquipStolen").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipStolen").val(onoff);
}

function CheckEquipSold() {
    var chval = $("#chkEquipSold").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipSold").val(onoff);
}

function CheckEquipToBeSold() {
    var chval = $("#chkEquipToBeSold").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipToBeSold").val(onoff);
}

function CheckOtherAntiTheft() {
   
    var chval = $("#chkOtherAntiTheft").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
        $("#ddlOtherAntiTheftTypes").removeAttr("disabled", "disabled");
    }
    else {
        onoff = "off";
        $("#ddlOtherAntiTheftTypes").attr("disabled", "disabled");
    }
    $("#hdnOtherAntiTheft").val(onoff);
}

function CheckEquipGPS() {
    var chval = $("#chkEquipGPS").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
        $("#txtGPSNum").removeAttr("disabled", "disabled");
        $('#divGPS').css('color', 'black');
    }
    else {
        onoff = "off";
        $("#txtGPSNum").val('');
        $("#txtGPSNum").attr("disabled", "disabled");
        $('#divGPS').css('color', 'gray');
    }
    $("#hdnEquipGPS").val(onoff);
}

function CheckEquipFuelCard() {
    var chval = $("#chkEquipFuelCard").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
        $("#txtFuelCardNum").removeAttr("disabled", "disabled");
        $("#ddlFuelCardLoc").removeAttr("disabled", "disabled");
        $('#divFuelCard').css('color', 'black');
    }
    else {
        onoff = "off";
        $("#txtFuelCardNum").val('');
//        $("#ddlFuelCardLoc").val("");
        $('#ddlFuelCardLoc option:first-child').attr("selected", "selected");
        $("#txtFuelCardNum").attr("disabled", "disabled");
        $("#ddlFuelCardLoc").attr("disabled", "disabled");
        $('#divFuelCard').css('color', 'gray');
    }
    $("#hdnEquipFuelCard").val(onoff);
}

function CheckEquipEZPASS() {
    var chval = $("#chkEquipEZPASS").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
        $("#txtEZPASSNum").removeAttr("disabled", "disabled");
        $('#divEZPASS').css('color', 'black');
    }
    else {
        onoff = "off";
        $("#txtEZPASSNum").val('');
        $("#txtEZPASSNum").attr("disabled", "disabled");
        $('#divEZPASS').css('color', 'gray');
    }
    $("#hdnEquipEZPASS").val(onoff);
}

function CheckEquipUnknown() {
    var chval = $("#chkEquipUnknown").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipUnknown").val(onoff);
}

function CheckEquipLeased() {
    var chval = $("#chkEquipLeased").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipLeased").val(onoff);
}

function CheckEquipApportioned() {
    var chval = $("#chkEquipApportioned").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnEquipApportioned").val(onoff);
}

function CheckToolStolen() {
    var chval = $("#chkToolStolen").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolStolen").val(onoff);
}

function CheckToolSold() {
    var chval = $("#chkToolSold").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolSold").val(onoff);
}

function CheckToolElectrical() {
    var chval = $("#chkToolElectrical").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolElectrical").val(onoff);
}

function CheckToolLojack() {
    var chval = $("#chkToolLojack").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolLojack").val(onoff);
}

function CheckToolUnknown() {
    var chval = $("#chkToolUnknown").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolUnknown").val(onoff);
}

function CheckToolToBeSold() {
    var chval = $("#chkToolToBeSold").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolToBeSold").val(onoff);
}

function CheckToolInRepair() {
    var chval = $("#chkToolInRepair").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolInRepair").val(onoff);
}

function CheckToolTotaled() {
    var chval = $("#chkToolTotaled").prop('checked');
    var onoff;

    if (chval == true) {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnToolTotaled").val(onoff);
}

function OnChangeAssignFrom() {

    var assignFrom = $("#lstFromAssign").val();

    $("#adminxferassignments").setGridParam({ url: "/EquipTrack/GetAssignFromGridData/" + assignFrom, page: 1 })
                .trigger('reloadGrid');

    $("#adminxfertoolassigns").setGridParam({ url: "/EquipTrack/GetToolAssignXferGridData/" + assignFrom, page: 1 })
                .trigger('reloadGrid');

    $("#adminxfersmalltoolassigns").setGridParam({ url: "/EquipTrack/GetSmallToolAssignXferGridData/" + assignFrom, page: 1 })
                .trigger('reloadGrid');
}

function OnChangeAssignTo() {

    var from = $("#lstFromAssign").val();
    var to = $("#lstToAssign").val();

    if (from.length > 0 && to.length > 0) {
        $("#btnSaveAssignXfer").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnSaveAssignXfer").attr("disabled", "disabled");
    }

}

function clickSaveXfer() {

    var selArr = $("#adminxferassignments").getGridParam("selarrrow");
    var assignIDs = "";
    var retConds = "";
    var retHours = "";
    var retMiles = "";
    var equipIDs = "";

    var retCondID = "";
    var retMile = "";
    var retHour = "";

    var selToolArr = $("#adminxfertoolassigns").getGridParam("selarrrow");
    var assignToolIDs = "";
    var retToolConds = "";
    var toolIDs = "";
    var retToolCondID = "";

    var selSmallToolArr = $("#adminxfersmalltoolassigns").getGridParam("selarrrow");
    var smallToolIDs = "";
    var retSmallToolConds = "";
    var retSmallToolCondID = "";

    if (selArr.length == 0 && selToolArr.length == 0 && selSmallToolArr.length == 0) {
        alert("No Items have been selected for assignment transfer!");
        CloseAdminXferAssignments();
    } 

    //equipment
    for (i = 0; i < selArr.length; i++) {
        var data = $("#adminxferassignments").getRowData(selArr[i]);
        if (assignIDs == "") {
            assignIDs = data.assign_id;
            equipIDs = data.equip_id;
            if (data.ret_condition != null) {
                retConds = $("#" + data.assign_id + "_ret_condition").val();
            }
            else {
                retConds = "";
            }
            if (data.ret_hours != null) {
                retHours = $("#" + data.assign_id + "_ret_hours").val();
            }
            else {
                retHours = "";
            }
            if (data.ret_miles != null) {
                retMiles = $("#" + data.assign_id + "_ret_miles").val();
            }
            else {
                retMiles = "";
            }
        }
        else {
            assignIDs = assignIDs + "," + data.assign_id;
            equipIDs = equipIDs + "," + data.equip_id;
            retCondID = $("#" + data.assign_id + "_ret_condition").val();
            retMile = $("#" + data.assign_id + "_ret_miles").val();
            retHour = $("#" + data.assign_id + "_ret_hours").val();
            
            if (retCondID != null) {
                retConds = retConds + "," + retCondID;
            }
            else {
                retConds = retConds + "," + "";
            }
            if (retHour != null) {
                retHours = retHours + "," + retHour;
            }
            else {
                retHours = retHours + "," + "";
            }
            if (retMile != null) {
                retMiles = retMiles + "," + retMile;
            }
            else {
                retMiles = retMiles + "," + "";
            }
        }
    }
    
//tools
    for (i = 0; i < selToolArr.length; i++) {
        var dataTool = $("#adminxfertoolassigns").getRowData(selToolArr[i]);

        if (assignToolIDs == "") {
            assignToolIDs = dataTool.assign_id;
            toolIDs = dataTool.tool_id;
            if (dataTool.ret_condition != null) {
                retToolConds = $("#" + dataTool.assign_id + "_ret_condition").val();
            }
            else {
                retToolConds = "";
            }
        }
        else {
            assignToolIDs = assignToolIDs + "," + dataTool.assign_id;
            toolIDs = toolIDs + "," + dataTool.tool_id;
            retToolCondID = $("#" + dataTool.assign_id + "_ret_condition").val();

            if (retToolCondID != null) {
                retToolConds = retToolConds + "," + retToolCondID;
            }
            else {
                retToolConds = retToolConds + "," + "";
            }
        
        }

    }

    //smalltools

    
    for (i = 0; i < selSmallToolArr.length; i++) {
        var dataSmallTool = $("#adminxfersmalltoolassigns").getRowData(selSmallToolArr[i]);

        if (smallToolIDs == "") {
            smallToolIDs = dataSmallTool.stID;
            if (dataSmallTool.condition_descr != null) {
                retSmallToolConds = $("#" + dataSmallTool.stID + "_condition_descr").val();
            }
            else {
                retSmallToolConds = "";
            }
        }
        else {
            smallToolIDs = smallToolIDs + "," + dataSmallTool.stID;
            retSmallToolCondID = $("#" + dataSmallTool.stID + "_condition_descr").val();

            if (retSmallToolCondID != null) {
                retSmallToolConds = retSmallToolConds + "," + retSmallToolCondID;
            }
            else {
                retSmallToolConds = retSmallToolConds + "," + "";
            }
        }
    }

    $("#hdnToolXferRetConds").val(retToolConds);

    $("#hdnEquipXferIds").val(equipIDs);
    $("#hdnEquipXferAssignIds").val(assignIDs);
    $("#hdnEquipXferRetCond").val(retConds);
    $("#hdnEquipXferRetMiles").val(retHours);
    $("#hdnEquipXferRetHours").val(retMiles);

    $("#hdnToolXferIds").val(toolIDs);
    $("#hdnToolXferAssignIds").val(assignToolIDs);

    $("#hdnSmallToolXferIds").val(smallToolIDs);
    $("#hdnSmallToolConds").val(retSmallToolConds);
  
}


