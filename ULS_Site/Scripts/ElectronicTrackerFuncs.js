function CloseElectronicsDialog() {

    jQuery('#electronics_edit_dlg').dialog('close');

};

function CloseElectronicsAsgnDialog() {

    jQuery('#electronics_asgn_edit_dlg').dialog('close');

};

function ShowEditFormWait() {

    $("#electronics_loading").show();

}

function ShowEditAsgnFormWait() {

    $("#electronics_asgn_loading").show();

}

function CheckElectronicsAssignForm() {

    var asgndt = $("#dtElectronicsAsgnDt").val();
    var asgnto = $("#ddlAssignedTo").val();
    if (asgndt.length > 0 > 0 && asgnto.length > 0) {
        $("#btnElectronicsAsgnSave").removeAttr("disabled", "disabled");
    }
    else {
        $("#btnElectronicsAsgnSave").attr("disabled", "disabled");
    }
}

function AdminElectronicsTypes() {

    SetUpAdminGrid('/Electronics/GetAdminElectronicsTypes/');


    $("#admin_dialog").data("title.dialog", "Electronics Types")

    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminElectronicsTypes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/Electronics/GetAdminElectronicsTypes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminElectronicsMakes() {

    SetUpAdminGrid('/Electronics/GetAdminElectronicsMakes/');

    $("#admin_dialog").data("title.dialog", "Electronics Makes")

    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminElectronicsMakes";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/Electronics/GetAdminElectronicsMakes/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
}

function AdminElectronicsModels() {

    SetUpAdminGrid('/Electronics/GetAdminElectronicsModels/');

    $("#admin_dialog").data("title.dialog", "Electronics Models")

    var eID = document.getElementById("hdnAdminType");
    eID.value = "AdminElectronicsModels";

    jQuery('#admingrid').clearGridData();
    jQuery('#admingrid').setGridParam({ url: "/Electronics/GetAdminElectronicsModels/" }).trigger("reloadGrid");
    jQuery('#admin_dialog').dialog('open');
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
                curRowAdmin = ids;
                $("#hdnAdminOper").val("Edit");

            }
        }
    });

    jQuery("#admingrid").resetSelection();

    InitAdminControls();

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

function CloseAdminDialog() {
    jQuery('#admin_dialog').dialog('close');

};

function AddAdminDialog() {
    var eID = document.getElementById("hdnAdminOper");
    eID.value = "Add";

    var adminType = $("#hdnAdminType").val();
    if (adminType == 'AdminElectronicsTypes') {
        $.get("/Electronics/GetNextElectronicsTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminElectronicsModels') {

        $.get("/Electronics/GetNextModelTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }
    else if (adminType == 'AdminElectronicsMakes') {
        $.get("/Electronics/GetNextMakeTypeId/", {}, function(data) {
            $("#txtID").val(data);
            $("#hdnAdminID").val(data);
        });
    }

    $("#txtDescription").removeAttr("disabled");
    $("#txtDescription").val('');
    $("#txtDescription").focus();
    $("#btnAdminAdd").attr("disabled", "disabled");

}

function confirmDelete() {
    var adminType = $("#hdnAdminType").val();
    var result = "";
    var adminTypeName;

    if (confirm("Are you sure you want to delete this item?")) {
        if (adminType == 'AdminElectronicsTypes') {
            $.post("/Electronics/DeleteElectronicsType/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminElectronicsModels') {
            adminTypeName = "Model Type";
            $.post("/Electronics/DeleteElectronicsModel/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
        else if (adminType == 'AdminElectronicsMakes') {
            $.post("/Electronics/DeleteElectronicsMake/" + curRowAdmin, {},
                            function(data) {
                                DeleteMsg(data);
                            }
                        );
        }
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

function AdminLocations() {

    $.get("/EquipTrack/GetDivisions/", {}, function(data) {
        $("#divisions").html(data);
    });

    SetUpAdminLocGrid();


    $("#admin_loc_dlg").data("title.dialog", "Equipment Locations")

    jQuery('#admin_loc_dlg').dialog('open');
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

function CloseAdminLocDialog() {
    jQuery('#admin_loc_dlg').dialog('close');

};

function CloseAdminAssignToDialog() {
    jQuery('#admin_assignto_dlg').dialog('close');

};


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

function confirmLocDelete() {

    if (confirm("Are you sure you want to delete this location?")) {
        $.post("/EquipTrack/DeleteLocation/" + curRowAdminLoc, {},
                            function(data) {
                                DeleteMsgLoc(data);
                            }
                        );
    }
}

function DeleteMsgLoc(data) {

    if (data == "Success") {
        InitAdminLocControls();

        AdminLocSuccessFailure(true)
    }
    else {
        AdminLocSuccessFailure(false)
    }
}

function DeleteMsgAssignTo(data) {

    if (data == "Success") {
        InitAdminAssignToControls();

        AdminAssignToSuccessFailure(true)
    }
    else {
        AdminAssignToSuccessFailure(false)
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

function AdminAssignTo() {

    $.get("/EquipTrack/GetAssignToDivisions/", {}, function(data) {
        $("#assign_divs").html(data);
    });

    SetUpAdminAssignToGrid();


    $("#admin_assignto_dlg").data("title.dialog", "Assign To List")

    jQuery('#admin_assignto_dlg').dialog('open');
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
        },
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


function confirmAssignToDelete() {

    if (confirm("Are you sure you want to delete this name?")) {
        $.post("/EquipTrack/DeleteAssignTo/" + curRowAdminAssignTo, {},
                            function(data) {
                                DeleteMsgAssignTo(data);
                            }
                        );
    }
}

function ElectronicsInvByTypeReport() {
    $("#help_popup").data("title.dialog", "Electronics Inventory By Type Help")
    $.get("/EquipTrack/GetHelpMsg/" + "ElectronicsInvByType", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").data("title.dialog", "Electronics Inventory By Type")
    $.get("/Electronics/GetRptDlgTypes/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ElectronicsInvByType";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function ElectronicsAirCardInvReport() {
    $("#help_popup").data("title.dialog", "Air Card Inventory Help")
    $.get("/EquipTrack/GetHelpMsg/" + "ElectronicsAirCard", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").data("title.dialog", "Air Card Inventory")
    var eID = document.getElementById("hdnReportName");
    eID.value = "ElectronicsAirCardInv";

    jQuery('#rpt_dialog').dialog('open');
}

function ElectronicsAssignedToReport() {
    $("#help_popup").data("title.dialog", "Electronics Assigned To Help")
    $.get("/EquipTrack/GetHelpMsg/" + "ElectronicsAsgnToInv", {}, function(data) {
        $("#help_results").html(data);
    });

    $("#rpt_loading").hide();
    $("#rpt_dialog").data("title.dialog", "Assigned To")
    $.get("/EquipTrack/GetRptDlgAssignTo/", {}, function(data) {
        $("#rpt_dlg_results").html(data);
    });

    var eID = document.getElementById("hdnReportName");
    eID.value = "ElectronicsAssignedTo";

    $("#btnSubmit").attr("disabled", "disabled");
    jQuery('#rpt_dialog').dialog('open');
}

function CloseReportDialog() {
    jQuery('#rpt_dialog').dialog('close');

};

function CheckRptAssignForm() {

    var assgnd = $("#lstAssigned").val();
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

function ShowHelp() {

    jQuery('#help_popup').dialog('open');

};

function ShowRptFormWait() {

    $("#rpt_loading").show();

}

function CheckElectronicsTotaled() {
    var chval = $("#chkElectronicsTotaled").attr('checked');
    var onoff;

    if (chval == 'checked') {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnElectronicsTotaled").val(onoff);
}

function CheckElectronicsStolen() {
    var chval = $("#chkElectronicsStolen").attr('checked');
    var onoff;

    if (chval == 'checked') {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnElectronicsStolen").val(onoff);
}

function CheckElectronicsUnknown() {
    var chval = $("#chkElectronicsUnknown").attr('checked');
    var onoff;

    if (chval == 'checked') {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnElectronicsUnknown").val(onoff);
}

function CheckElectronicsInRepair() {
    var chval = $("#chkElectronicsInRepair").attr('checked');
    var onoff;

    if (chval == 'checked') {
        onoff = "on";
    }
    else {
        onoff = "off";
    }
    $("#hdnElectronicsInRepair").val(onoff);
}


