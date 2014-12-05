    var curRow;
    var curToolRow;
    var curSmallToolRow;
    var curRowAsgn;
    var curToolRowAsgn;
    var curDiv;
    var curDefaultDiv;
    var curRowSvc;
    var curSvcOldMileage;
    var curToolRowSvc;
    var curEquipAssignColor;
    var curToolAssignColor;
// this gives exact match in dropdown
    $.expr[":"].econtains = function(obj, index, meta, stack) {
            return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
    };
    jQuery(document).ready(function() {

        curDiv = $("#hdnDivision").val();
        curDefaultDiv = $("#hdnDefaultDiv").val();


        jQuery("#equipgrid").jqGrid({
            url: '/EquipTrack/GridData/',
            editurl: '/EquipTrack/Edit/',
            datatype: 'json',
            mtype: 'GET',
            hoverrows: false,
            altRows: false,
            height: 255,
            width: 740,
            rowNum: 5000,
            colNames: ['ID', 'Type', 'Make', 'Model', 'Year', 'Location', 'Insp Due', 'Serv Due', 'Miles/Hrs', 'Milage Dt', 'Reg By', 'Mngd By', 'Mngd By Dt', 'Tag Exp', '', '', '', '', 'Vin Num', 'Title Num', 'GVW', 'Unlaiden Wt', 'Tag Num', 'Tag State', 'Fuel', 'Cost', 'Inspect Rmndr(wks)', 'Tag Rmndr(wks)', 'Stolen', 'Sold', 'Lojack', 'In Repair', 'Totaled', 'Hut Sticker', 'Apportioned', 'IFTA Sticker', 'GPS', 'Comment', '', 'Unknown', 'Current Value', 'ImgCnt', 'Leased', 'GCW', '', '', '', '', '', 'To Be Sold', '','',''],
            colModel: [
   		        { name: 'equip_id', index: 'equip_id', width: 65, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'type_desc', index: 'type_desc', width: 130, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetTypes' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetTypesSearch'} },
   		        { name: 'make_descr', index: 'make_descr', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetMakes' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetMakesSearch'} },
   		        { name: 'model_descr', index: 'model_descr', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetModels' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetModelsSearch'} },
   		        { name: 'equip_year', index: 'equip_year', width: 60, editable: true, search: false },
   		        { name: 'work_loc', index: 'work_loc', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetLocations' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetLocations'} },
                { name: 'insp_due_dt', index: 'insp_due_dt', width: 100, editable: true, search: false,
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
   		        { name: 'service_due_num', index: 'service_due_num', width: 80, editable: true, search: false },
   		        { name: 'miles_hours', index: 'miles_hours', width: 80, editable: true, search: false },
                { name: 'miles_dt', index: 'miles_dt', width: 100, editable: true, search: false,
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
   		        { name: 'registered_by', index: 'registered_by', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: false },
   		        { name: 'managed_by', index: 'managed_by', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: false },
   		        { name: 'managed_by_dt', hidden: true, editable: true, editrules: { edithidden: true }, search: false,
   		            editoptions: { size: 12, dataInit: function(el) {
   		                $(el).datepicker({ dateFormat: 'mm/dd/yy' });
   		            }
   		            }
   		        },
   		        { name: 'tag_expire_dt', index: 'tag_expire_dt', width: 100, editable: true, search: false,
   		            editoptions: { size: 12, dataInit: function(el) {
   		                $(el).datepicker({ dateFormat: 'mm/dd/yy' });
   		            }
   		            }
   		        },
   		        { name: 'inspection_warn', hidden: true, search: false },
   		        { name: 'service_warn', hidden: true, search: false },
   		        { name: 'tag_warn', hidden: true, search: false },
   		        { name: 'equip_color', hidden: true, search: false },
   		        { name: 'vin_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew'], searchhidden: true} },
   		        { name: 'title_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew'], searchhidden: true} },
                { name: 'gross_v_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'unlaiden_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'tag_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew'], searchhidden: true} },
            { name: 'tag_state', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
		    { name: 'fuel_descr', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetFuels' }, search: false },
            { name: 'cost', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
   		    { name: 'insp_rmdr_wks', hidden: true, editable: true, edittype: "select", editoptions: { value: ":;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24" }, editrules: { edithidden: true }, search: false },
            { name: 'tag_expire_rmdr_wks', editable: true, hidden: true, edittype: "select", editoptions: { value: ":;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24" }, editrules: { edithidden: true }, search: false },
            { name: 'stolen', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            //{name:'system_defined',index:'system_defined', edittype:'checkbox', search: true, formatter: "checkbox", editoptions: { value: "1:Yes;0:No"},editable:true, searchoptions: { sopt: ['eq'], value: ":All;1:Yes;0:No" }, stype: 'select'}
            {name: 'sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'lojack', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'in_repair', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'totaled', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'hut_sticker', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'apportioned', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'ifta_sticker', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'gps', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'comment', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27" }, search: false },
   		    { name: 'equip_assign_color', hidden: true, search: false },
            { name: 'unknown', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'current_value', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
   		    { name: 'img_cnt', hidden: true, search: false },
            { name: 'leased', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'gross_c_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'gps_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'ezpass', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'ezpass_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'fuelcard', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'fuelcard_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'to_be_sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'fuel_card_loc', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'other_antitheft', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'other_antitheft_type', hidden: true, editable: true, editrules: { edithidden: true }, search: false }
            ],
            sortname: 'equip_id',
            sortorder: "asc",
            afterInsertRow: function(rowid, rowdata, rowelem) {

                if (rowelem[14] == 'SET_RED') {
                    jQuery("#equipgrid").setCell(rowid, 'insp_due_dt', '', { color: 'red' });
                }
                if (rowelem[15] == 'SET_RED') {
                    jQuery("#equipgrid").setCell(rowid, 'service_due_num', '', { color: 'red' });
                }
                if (rowelem[16] == 'SET_RED') {
                    jQuery("#equipgrid").setCell(rowid, 'tag_expire_dt', '', { color: 'red' });
                }
                if (rowelem[17] == 'SET_GREEN') {
                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { color: 'green' });
                }
                if (rowelem[17] == 'SET_PURPLE') {
                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { color: 'purple' });
                }
                if (rowelem[17] == 'SET_BLUE') {
                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { color: 'blue' });
                }
                if (rowelem[41] == 'HAS_PHOTOS') {
                    //                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { 'font-weight': '900' })
                    //                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { 'font-style': 'oblique' })
                    jQuery("#equipgrid").setCell(rowid, 'equip_id', '', { 'background-color': '#FFFFCC' });
                }
            },
            viewrecords: true,
            pager: jQuery('#equipgridp'),
            //            caption: 'Inventory for ' + curDiv +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>',
            ondblClickRow: function(rowid) {
                var data = $("#equipgrid").getRowData(curRow);
                if (data.equip_id == null)
                    alert("  Please Select a Row!");
                else {

                    var eID = document.getElementById("hdnEditOper");
                    eID.value = "Edit";

                    var eID = document.getElementById("hdnEditID");
                    eID.value = data.equip_id;

                    $("#hdnEditID").val('');
                    $("#ddlEquipMake").val('');
                    $("#ddlEquipModel").val('');
                    $("#ddlEquipType").val('');
                    $("#ddlEquipRegBy").val('');
                    $("#ddlEquipMngBy").val('');
                    $("#ddlEquipLoc").val('');
                    $("#txtEquipYear").val('');
                    $("#dtEquipInspDue").val('');
                    $("#dtEquipMngByDt").val('');
                    $("#txtEquipMilesHours").val('');
                    $("#dtEquipMilesDt").val('');
                    $("#txtEquipSvcDue").val('');
                    $("#dtEquipTagExp").val('');
                    $("#txtEquipVIN").val('');
                    $("#txtEquipTitleNum").val('');
                    $("#txtEquipTagNum").val('');
                    $("#txtEquipGVW").val('');
                    $("#txtEquipGCW").val('');
                    $("#txtEquipUnlaidenWt").val('');
                    $("#ddlTagSt").val('');
                    $("#ddlFuel").val('');
                    $("#txtCost").val('');
                    $("#txtCurrentValue").val('');
                    $("#ddlInspRmndr").val('');
                    $("#ddlTagRmndr").val('');
                    $("#txtEquipComment").val('');
                    $('#chkEquipSold').prop('checked', false);
                    $('#chkEquipToBeSold').prop('checked', false);
                    $('#chkEquipStolen').prop('checked', false);
                    $('#chkEquipLojack').prop('checked', false);
                    $('#chkEquipUnknown').prop('checked', false);
                    $('#chkEquipLeased').prop('checked', false);
                    $('#chkEquipInRepair').prop('checked', false);
                    $('#chkEquipTotaled').prop('checked', false);
                    $('#chkHUTSticker').prop('checked', false);
                    $('#chkEquipApportioned').prop('checked', false);
                    $('#chkIFTASticker').prop('checked', false);
                    $('#chkEquipGPS').prop('checked', false);
                    $('#chkEquipEZPASS').prop('checked', false);
                    $('#chkEquipFuelCard').prop('checked', false);
                    $("#txtGPSNum").val('');
                    $("#txtEZPASSNum").val('');
                    $("#txtFuelCardNum").val('');
                    $("#ddlFuelCardLoc").val('');

                    $('#chkOtherAntiTheft').prop('checked', false);
                    $('#hdnOtherAntiTheft').val('');
                    $("#ddlOtherAntiTheftTypes").val('');

                    $('#chkOtherAntiTheft').prop('checked', false);
                    $('#hdnOtherAntiTheft').val('');
                    $("#ddlOtherAntiTheftTypes").val('');

                    $('#hdnEquipApportioned').val('');
                    $('#hdnEquipInRepair').val('');
                    $('#hdnEquipLojack').val('');
                    $('#hdnEquipTotaled').val('');
                    $('#hdnHUTSticker').val('');
                    $('#hdnIFTASticker').val('');
                    $('#hdnEquipStolen').val('');
                    $('#hdnEquipSold').val('');
                    $('#hdnEquipToBeSold').val('');
                    $('#hdnEquipGPS').val('');
                    $('#hdnEquipEZPASS').val('');
                    $('#hdnEquipFuelCard').val('');
                    $('#hdnEquipUnknown').val('');
                    $('#hdnEquipLeased').val('');


                    $("#hdnEditID").val(data.equip_id);
                    $("#txtEquipYear").val(data.equip_year);
                    $("#dtEquipInspDue").val(data.insp_due_dt);
                    $("#dtEquipMngByDt").val(data.managed_by_dt);
                    $("#txtEquipMilesHours").val(data.miles_hours);
                    $("#dtEquipMilesDt").val(data.miles_dt);
                    $("#txtEquipSvcDue").val(data.service_due_num);
                    $("#dtEquipTagExp").val(data.tag_expire_dt);
                    $("#txtEquipVIN").val(data.vin_num);
                    $("#txtEquipTitleNum").val(data.title_num);
                    $("#txtEquipTagNum").val(data.tag_num);
                    $("#txtEquipGVW").val(data.gross_v_wt);
                    $("#txtEquipGCW").val(data.gross_c_wt);
                    $("#txtEquipUnlaidenWt").val(data.unlaiden_wt);
                    $("#ddlTagSt").val(data.tag_state);
                    if (data.fuel_descr.length > 0)
                        $("#ddlFuel option:econtains(" + data.fuel_descr + ")").prop('selected', 'selected');
                    $("#txtCost").val(data.cost);
                    $("#txtCurrentValue").val(data.current_value);
                    $("#ddlInspRmndr").val(data.insp_rmdr_wks);
                    $("#ddlTagRmndr").val(data.tag_expire_rmdr_wks);
                    $("#txtEquipComment").val(data.comment);
                    $("#txtGPSNum").val(data.gps_num);
                    $("#txtEZPASSNum").val(data.ezpass_num);
                    $("#txtFuelCardNum").val(data.fuelcard_num);
                    $("#ddlFuelCardLoc").val(data.fuel_card_loc);


                    $("#ddlOtherAntiTheftTypes").val(data.other_antitheft_type);

                    if (data.other_antitheft == 'True') {
                        $('#chkOtherAntiTheft').prop('checked', true);
                        $('#hdnOtherAntiTheft').val('on');
                    }
                    else {
                        $('#chkOtherAntiTheft').prop('checked', false);
                        $('#hdnOtherAntiTheft').val('off');
                    }

                    if (data.lojack == 'True') {
                        $('#chkEquipLojack').prop('checked', true);
                        $('#hdnEquipLojack').val('on');
                    }
                    else {
                        $('#chkEquipLojack').prop('checked', false);
                        $('#hdnEquipLojack').val('off');
                    }
                    if (data.unknown == 'True') {
                        $('#chkEquipUnknown').prop('checked', true);
                        $('#hdnEquipUnknown').val('on');
                    }
                    else {
                        $('#chkEquipUnknown').prop('checked', false);
                        $('#hdnEquipUnknown').val('off');
                    }
                    if (data.leased == 'True') {
                        $('#chkEquipLeased').prop('checked', true);
                        $('#hdnEquipLeased').val('on');
                    }
                    else {
                        $('#chkEquipLeased').prop('checked', false);
                        $('#hdnEquipLeased').val('off');
                    }
                    if (data.sold == 'True') {
                        $('#chkEquipSold').prop('checked', true);
                        $('#hdnEquipSold').val('on');
                    }
                    else {
                        $('#chkEquipSold').prop('checked', false);
                        $('#hdnEquipSold').val('off');
                    }
                    if (data.to_be_sold == 'True') {
                        $('#chkEquipToBeSold').prop('checked', true);
                        $('#hdnEquipToBeSold').val('on');
                    }
                    else {
                        $('#chkEquipToBeSold').prop('checked', false);
                        $('#hdnEquipToBeSold').val('off');
                    }
                    if (data.stolen == 'True') {
                        //                    alert(data.stolen + 'yes')
                        $('#chkEquipStolen').prop('checked', true);

                        //                        $('#chkEquipStolen').prop('checked', true);
                        $('#hdnEquipStolen').val('on');
                    }
                    else {
                        //                        alert(data.stolen + 'no')
                        $('#chkEquipStolen').prop('checked', false);
                        //                        $('#chkEquipStolen').prop('checked', false);
                        $('#hdnEquipStolen').val('off');
                    }
                    if (data.in_repair == 'True') {
                        $('#chkEquipInRepair').prop('checked', true);
                        //                        $('#chkEquipInRepair').prop('checked', true);
                        $('#hdnEquipInRepair').val('on');
                    }
                    else {
                        $('#chkEquipInRepair').prop('checked', false);
                        //                        $('#chkEquipInRepair').prop('checked', false);
                        $('#hdnEquipInRepair').val('off');
                    }
                    if (data.totaled == 'True') {
                        $('#chkEquipTotaled').prop('checked', true);
                        $('#hdnEquipTotaled').val('on');
                    }
                    else {
                        $('#chkEquipTotaled').prop('checked', false);
                        $('#hdnEquipTotaled').val('off');
                    }
                    if (data.hut_sticker == 'True') {
                        $('#chkHUTSticker').prop('checked', true);
                        $('#hdnHUTSticker').val('on');
                    }
                    else {
                        $('#chkHUTSticker').prop('checked', false);
                        $('#hdnHUTSticker').val('off');
                    }
                    if (data.apportioned == 'True') {
                        $('#chkEquipApportioned').prop('checked', true);
                        $('#hdnEquipApportioned').val('on');
                    }
                    else {
                        $('#chkEquipApportioned').prop('checked', false);
                        $('#hdnEquipApportioned').val('off');
                    }
                    if (data.ifta_sticker == 'True') {
                        $('#chkIFTASticker').prop('checked', true);
                        $('#hdnIFTASticker').val('on');
                    }
                    else {
                        $('#chkIFTASticker').prop('checked', false);
                        $('#hdnIFTASticker').val('off');
                    }
                    if (data.gps == 'True') {
                        $('#chkEquipGPS').prop('checked', true);
                        $('#hdnEquipGPS').val('on');
                    }
                    else {
                        $('#chkEquipGPS').prop('checked', false);
                        $('#hdnEquipGPS').val('off');
                    }

                    if (data.ezpass == 'True') {
                        $('#chkEquipEZPASS').prop('checked', true);
                        $('#hdnEquipEZPASS').val('on');
                    }
                    else {
                        $('#chkEquipEZPASS').prop('checked', false);
                        $('#hdnEquipEZPASS').val('off');
                    }

                    if (data.fuelcard == 'True') {
                        $('#chkEquipFuelCard').prop('checked', true);
                        $('#hdnEquipFuelCard').val('on');
                    }
                    else {
                        $('#chkEquipFuelCard').prop('checked', false);
                        $('#hdnEquipFuelCard').val('off');
                    }

                    $("#equip_results").html('');

                    OpenEquipEditDlg(data);

                }
                return false;
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    curRowSvc = -1;
                    curRowAsgn = -1;
                    $("#img_results").html('');

                    curRow = ids;
                    var data = $("#equipgrid").getRowData(ids);
                    jQuery("#equip_svc").setGridParam({ url: "/EquipTrack/GetServiceGridData/" + data.equip_id, page: 1 })
                .trigger('reloadGrid');
                    jQuery("#equip_asgn").setGridParam({ url: "/EquipTrack/GetAssignGridData/" + data.equip_id, page: 1 })
                .trigger('reloadGrid');
                    //                    jQuery("#equip_asgn").navGrid('#equipasgnp', { addtext: "Add", addicon: "ui-icon-plus" });
                    //                    jQuery("#equip_asgn").extend($.jgrid.nav, { add: true, addtext: "Add"});
                    curEquipAssignColor = data.equip_assign_color;
                }
            },
            loadComplete: function() {
                var uData = jQuery('#equipgrid').getGridParam('userData');
                var strCap;

                if (uData.searchVal == '') {
                    strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>,&nbsp<div style="background-color:#FFFFCC;width: 55px;float:right;padding-right:20px">has photo</div>';
                }
                else {

                    strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="red">FILTER ON:</font>' + '&nbsp;&nbsp;&nbsp;' + uData.searchVal +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>, &nbsp<div style="background-color:#FFFFCC;width: 55px;float:right;padding-right:20px">has photo</div>';
                    if (uData.searchLojack != '') {
                        alert(uData.searchVal + " is not available.\n Registered By: " + uData.searchRegBy + "\n Stolen: " + uData.searchStolen + "\n Unknown: " + uData.searchUnknown + "\n Leased: " + uData.searchLeased + "\n Sold: " + uData.searchSold + "\n Lojack: " + uData.searchLojack + "\n In Repair: " + uData.searchInRepair + "\n Totaled: " + uData.searchTotaled + "\n ID: " + uData.searchId + "\n To Be Sold: " + uData.searchToBeSold);
                    }
                }

                jQuery('#equipgrid').setCaption(strCap);

            }
        }).navGrid('#equipgridp', { searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: false, search: true, refresh: true }, //options
         {}, // edit options
         {}, // add options
         {}, // del options
		{odata: [{ oper: 'eq', text: 'equal' }, { oper: 'ne', text: 'not equal' }, { oper: 'lt', text: 'less' }, { oper: 'le', text: 'less or equal' }, { oper: 'gt', text: 'greater' }, { oper: 'ge', text: 'greater or equal' }, { oper: 'bw', text: 'begins with' }, { oper: 'bn', text: 'does not begin with' }, { oper: 'in', text: 'is in' }, { oper: 'ni', text: 'is not in' }, { oper: 'ew', text: 'ends with' }, { oper: 'en', text: 'does not end with' }, { oper: 'cn', text: 'contains' }, { oper: 'nc', text: 'does not contain' }, { oper: 'nu', text: 'is null' }, { oper: 'nn', text: 'is not null'}],
		//            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
		closeAfterSearch: true, closeOnEscape: true
}, // search options
         {} // view options
          ).navButtonAdd('#equipgridp', {
              caption: "Photo",
              buttonicon: "ui-icon-image",
              onClickButton: function() {
                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#img_loading").hide();
                      var iID = document.getElementById("hdnImageType");
                      iID.value = "EQUIP";
                      var eID = document.getElementById("hdnEquipIDInit");
                      eID.value = data.equip_id;
                      $("#img_dialog").dialog('option', 'title', "Images for ID: " + data.equip_id);
                      //                      $("#img_dialog").dialog('option', 'title', "Images for ID: " + data.equip_id)
                      $.get("/EquipTrack/GetEquipImages/" + data.equip_id + "/EQUIP", {}, function(data) {
                          $("#img_results").html(data);
                      });

                      $('#fileUpload').val('');
                      $('#img_results').html('');
                      $("#btnSave").attr("disabled", "disabled");
                      jQuery('#img_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#equipgridp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.equip_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "EquipOneRpt";
                      //                      $("#rpt_dialog").dialog('option', 'title', "Summary Report for ID: " + data.equip_id)
                      $("#rpt_dialog").dialog('option', 'title', "Summary Report for ID: " + data.equip_id);

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#equipgridp', {
              caption: "Delete",
              buttonicon: "ui-icon-trash",
              onClickButton: function() {
                  $("#btnDelEquip").removeAttr("disabled", "disabled");
                  $("#deleteEquipSuccess").hide();

                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnEID");
                      eID.value = data.equip_id;
                      $("#delete_equip_dlg").dialog('option', 'title', "Delete Equipment: " + data.equip_id);
                      jQuery('#delete_equip_dlg').dialog('open');
                  }
                  return false;
              }
          }).navButtonAdd('#equipgridp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnEditID");
                      eID.value = data.equip_id;

                      $("#hdnEditID").val('');
                      $("#ddlEquipMake").val('');
                      $("#ddlEquipModel").val('');
                      $("#ddlEquipType").val('');
                      $("#ddlEquipRegBy").val('');
                      $("#ddlEquipMngBy").val('');
                      $("#ddlEquipLoc").val('');
                      $("#txtEquipYear").val('');
                      $("#dtEquipInspDue").val('');
                      $("#dtEquipMngByDt").val('');
                      $("#txtEquipMilesHours").val('');
                      $("#dtEquipMilesDt").val('');
                      $("#txtEquipSvcDue").val('');
                      $("#dtEquipTagExp").val('');
                      $("#txtEquipVIN").val('');
                      $("#txtEquipTitleNum").val('');
                      $("#txtEquipTagNum").val('');
                      $("#txtEquipGVW").val('');
                      $("#txtEquipGCW").val('');
                      $("#txtEquipUnlaidenWt").val('');
                      $("#ddlTagSt").val('');
                      $("#ddlFuel").val('');
                      $("#txtCost").val('');
                      $("#txtCurrentValue").val('');
                      $("#ddlInspRmndr").val('');
                      $("#ddlTagRmndr").val('');
                      $("#txtEquipComment").val('');
                      $('#chkEquipSold').prop('checked', false);
                      $('#chkEquipToBeSold').prop('checked', false);
                      $('#chkEquipStolen').prop('checked', false);
                      $('#chkEquipLojack').prop('checked', false);
                      $('#chkEquipUnknown').prop('checked', false);
                      $('#chkEquipLeased').prop('checked', false);
                      $('#chkEquipInRepair').prop('checked', false);
                      $('#chkEquipTotaled').prop('checked', false);
                      $('#chkHUTSticker').prop('checked', false);
                      $('#chkEquipApportioned').prop('checked', false);
                      $('#chkIFTASticker').prop('checked', false);
                      $('#chkEquipGPS').prop('checked', false);
                      $('#chkEquipEZPASS').prop('checked', false);
                      $('#chkEquipFuelCard').prop('checked', false);
                      $("#txtGPSNum").val('');
                      $("#txtEZPassNum").val('');
                      $("#txtFuelCardNum").val('');
                      $("#ddlFuelCardLoc").val('');

                      $('#chkOtherAntiTheft').prop('checked', false);
                      $('#hdnOtherAntiTheft').val('');
                      $("#ddlOtherAntiTheftTypes").val('');

                      $('#hdnEquipApportioned').val('');
                      $('#hdnEquipInRepair').val('');
                      $('#hdnEquipLojack').val('');
                      $('#hdnEquipTotaled').val('');
                      $('#hdnHUTSticker').val('');
                      $('#hdnIFTASticker').val('');
                      $('#hdnEquipStolen').val('');
                      $('#hdnEquipSold').val('');
                      $('#hdnEquipToBeSold').val('');
                      $('#hdnEquipGPS').val('');
                      $('#hdnEquipEZPASS').val('');
                      $('#hdnEquipFuelCard').val('');
                      $('#hdnEquipUnknown').val('');
                      $('#hdnEquipLeased').val('');


                      $("#hdnEditID").val(data.equip_id);
                      $("#txtEquipYear").val(data.equip_year);
                      $("#dtEquipInspDue").val(data.insp_due_dt);
                      $("#dtEquipMngByDt").val(data.managed_by_dt);
                      $("#txtEquipMilesHours").val(data.miles_hours);
                      $("#dtEquipMilesDt").val(data.miles_dt);
                      $("#txtEquipSvcDue").val(data.service_due_num);
                      $("#dtEquipTagExp").val(data.tag_expire_dt);
                      $("#txtEquipVIN").val(data.vin_num);
                      $("#txtEquipTitleNum").val(data.title_num);
                      $("#txtEquipTagNum").val(data.tag_num);
                      $("#txtEquipGVW").val(data.gross_v_wt);
                      $("#txtEquipGCW").val(data.gross_c_wt);
                      $("#txtEquipUnlaidenWt").val(data.unlaiden_wt);
                      $("#ddlTagSt").val(data.tag_state);
                      if (data.fuel_descr.length > 0)
                          $("#ddlFuel option:econtains(" + data.fuel_descr + ")").prop('selected', 'selected');
                      $("#txtCost").val(data.cost);
                      $("#txtCurrentValue").val(data.current_value);
                      $("#ddlInspRmndr").val(data.insp_rmdr_wks);
                      $("#ddlTagRmndr").val(data.tag_expire_rmdr_wks);
                      $("#txtEquipComment").val(data.comment);
                      $("#txtGPSNum").val(data.gps_num);
                      $("#txtEZPassNum").val(data.ezpass_num);
                      $("#txtFuelCardNum").val(data.fuelcard_num);
                      $("#ddlFuelCardLoc").val(data.fuel_card_loc);
                      
                      $("#ddlOtherAntiTheftTypes").val(data.other_antitheft_type);

                      if (data.other_antitheft == 'True') {
                          $('#chkOtherAntiTheft').prop('checked', true);
                          $('#hdnOtherAntiTheft').val('on');
                      }
                      else {
                          $('#chkOtherAntiTheft').prop('checked', false);
                          $('#hdnOtherAntiTheft').val('off');
                      }
                    
                      if (data.lojack == 'True') {
                          $('#chkEquipLojack').prop('checked', true);
                          $('#hdnEquipLojack').val('on');
                      }
                      else {
                          $('#chkEquipLojack').prop('checked', false);
                          $('#hdnEquipLojack').val('off');
                      }
                      if (data.unknown == 'True') {
                          $('#chkEquipUnknown').prop('checked', true);
                          $('#hdnEquipUnknown').val('on');
                      }
                      else {
                          $('#chkEquipUnknown').prop('checked', false);
                          $('#hdnEquipUnknown').val('off');
                      }
                      if (data.leased == 'True') {
                          $('#chkEquipLeased').prop('checked', true);
                          $('#hdnEquipLeased').val('on');
                      }
                      else {
                          $('#chkEquipLeased').prop('checked', false);
                          $('#hdnEquipLeased').val('off');
                      }
                      if (data.sold == 'True') {
                          $('#chkEquipSold').prop('checked', true);
                          $('#hdnEquipSold').val('on');
                      }
                      else {
                          $('#chkEquipSold').prop('checked', false);
                          $('#hdnEquipSold').val('off');
                      }
                      if (data.to_be_sold == 'True') {
                          $('#chkEquipToBeSold').prop('checked', true);
                          $('#hdnEquipToBeSold').val('on');
                      }
                      else {
                          $('#chkEquipToBeSold').prop('checked', false);
                          $('#hdnEquipToBeSold').val('off');
                      }
                      if (data.stolen == 'True') {
                          $('#chkEquipStolen').prop('checked', true);
                          $('#hdnEquipStolen').val('on');
                      }
                      else {
                          $('#chkEquipStolen').prop('checked', false);
                          $('#hdnEquipStolen').val('off');
                      }
                      if (data.in_repair == 'True') {
                          $('#chkEquipInRepair').prop('checked', true);
                          $('#hdnEquipInRepair').val('on');
                      }
                      else {
                          $('#chkEquipInRepair').prop('checked', false);
                          $('#hdnEquipInRepair').val('off');
                      }
                      if (data.totaled == 'True') {
                          $('#chkEquipTotaled').prop('checked', true);
                          $('#hdnEquipTotaled').val('on');
                      }
                      else {
                          $('#chkEquipTotaled').prop('checked', false);
                          $('#hdnEquipTotaled').val('off');
                      }
                      if (data.hut_sticker == 'True') {
                          $('#chkHUTSticker').prop('checked', true);
                          $('#hdnHUTSticker').val('on');
                      }
                      else {
                          $('#chkHUTSticker').prop('checked', false);
                          $('#hdnHUTSticker').val('off');
                      }
                      if (data.apportioned == 'True') {
                          $('#chkEquipApportioned').prop('checked', true);
                          $('#hdnEquipApportioned').val('on');
                      }
                      else {
                          $('#chkEquipApportioned').prop('checked', false);
                          $('#hdnEquipApportioned').val('off');
                      }
                      if (data.ifta_sticker == 'True') {
                          $('#chkIFTASticker').prop('checked', true);
                          $('#hdnIFTASticker').val('on');
                      }
                      else {
                          $('#chkIFTASticker').prop('checked', false);
                          $('#hdnIFTASticker').val('off');
                      }
                      if (data.gps == 'True') {
                          $('#chkEquipGPS').prop('checked', true);
                          $('#hdnEquipGPS').val('on');
                      }
                      else {
                          $('#chkEquipGPS').prop('checked', false);
                          $('#hdnEquipGPS').val('off');
                      }

                      if (data.ezpass == 'True') {
                          $('#chkEquipEZPASS').prop('checked', true);
                          $('#hdnEquipEZPASS').val('on');
                      }
                      else {
                          $('#chkEquipEZPASS').prop('checked', false);
                          $('#hdnEquipEZPASS').val('off');
                      }

                      if (data.fuelcard == 'True') {
                          $('#chkEquipFuelCard').prop('checked', true);
                          $('#hdnEquipFuelCard').val('on');
                      }
                      else {
                          $('#chkEquipFuelCard').prop('checked', false);
                          $('#hdnEquipFuelCard').val('off');
                      }

                      $("#equip_results").html('');

                      OpenEquipEditDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#equipgridp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {

                  var data = "";

                  var eID = document.getElementById("hdnEditOper");
                  eID.value = "Add";

                  $("#hdnEditID").val('');
                  $("#ddlEquipMake").val('');
                  $("#ddlEquipModel").val('');
                  $("#ddlEquipType").val('');
                  $("#ddlEquipRegBy").val('');
                  $("#ddlEquipMngBy").val('');
                  $("#ddlEquipLoc").val('');
                  $("#txtEquipYear").val('');
                  $("#dtEquipInspDue").val('');
                  $("#dtEquipMngByDt").val('');
                  $("#txtEquipMilesHours").val('');
                  $("#dtEquipMilesDt").val('');
                  $("#txtEquipSvcDue").val('');
                  $("#dtEquipTagExp").val('');
                  $("#txtEquipVIN").val('');
                  $("#txtEquipTitleNum").val('');
                  $("#txtEquipTagNum").val('');
                  $("#txtEquipGVW").val('');
                  $("#txtEquipGCW").val('');
                  $("#txtEquipUnlaidenWt").val('');
                  $("#ddlTagSt").val('');
                  $("#ddlFuel").val('');
                  $("#txtCost").val('');
                  $("#txtCurrentValue").val('');
                  $("#ddlInspRmndr").val('');
                  $("#ddlTagRmndr").val('');
                  $("#txtEquipComment").val('');
                  $('#chkEquipSold').prop('checked', false);
                  $('#chkEquipToBeSold').prop('checked', false);
                  $('#chkEquipStolen').prop('checked', false);
                  $('#chkEquipLojack').prop('checked', false);
                  $('#chkEquipUnknown').prop('checked', false);
                  $('#chkEquipLeased').prop('checked', false);
                  $('#chkEquipInRepair').prop('checked', false);
                  $('#chkEquipTotaled').prop('checked', false);
                  $('#chkHUTSticker').prop('checked', false);
                  $('#chkEquipApportioned').prop('checked', false);
                  $('#chkIFTASticker').prop('checked', false);
                  $('#chkEquipGPS').prop('checked', false);
                  $('#chkEquipEZPASS').prop('checked', false);
                  $('#chkEquipFuelCard').prop('checked', false);
                  $("#txtGPSNum").val('');
                  $("#txtEZPASSNum").val('');
                  $("#txtFuelCardNum").val('');
                  $("#ddlFuelCardLoc").val('');
                  
                  $('#chkOtherAntiTheft').prop('checked', false);
                  $('#hdnOtherAntiTheft').val('');
                  $("#ddlOtherAntiTheftTypes").val('');

                  $('#hdnEquipApportioned').val('');
                  $('#hdnEquipInRepair').val('');
                  $('#hdnEquipLojack').val('');
                  $('#hdnEquipTotaled').val('');
                  $('#hdnHUTSticker').val('');
                  $('#hdnIFTASticker').val('');
                  $('#hdnEquipStolen').val('');
                  $('#hdnEquipSold').val('');
                  $('#hdnEquipToBeSold').val('');
                  $('#hdnEquipGPS').val('');
                  $('#hdnEquipEZPASS').val('');
                  $('#hdnEquipFuelCard').val('');
                  $('#hdnEquipUnknown').val('');
                  $('#hdnEquipLeased').val('');

                  $("#equip_results").html('');

                  OpenEquipEditDlg(data);
                  return false;
              },
              position: "first"
          });

        $('#equipgridp_center').remove();
        $('#equipgridp_right').remove();


        jQuery("#equip_svc").jqGrid({
            editurl: '/EquipTrack/EditService/',
            datatype: 'json',
            mtype: 'GET',
            height: 100,
            width: 740,
            rowNum: 5000,
            colNames: ['Service ID', 'ID', 'Service Date', 'Type', 'Mechanic', 'Miles/Hours', '', 'Labor Cost', 'Parts Cost', 'Total Cost', 'Update Next Svc Due', 'Service Requested', 'Service Performed', 'Parts Required', 'Comments'],
            colModel: [
                { name: 'service_id', hidden: true },
   		        { name: 'equip_id', index: 'equip_id', width: 65 },
                { name: 'service_dt', index: 'service_dt', width: 100 },
   		        { name: 'serv_descr', index: 'serv_descr', width: 80 },
   		        { name: 'mechanic', index: 'mechanic', width: 80 },
   		        { name: 'mileage', index: 'mileage', width: 60 },
   		        { name: 'hours', hidden: true },
   		        { name: 'labor_cost', index: 'labor_cost', width: 60 },
   		        { name: 'parts_cost', index: 'parts_cost', width: 60 },
   		        { name: 'total_cost', index: 'total_cost', width: 60 },
                { name: 'calc_next_svc', hidden: true },
                { name: 'serv_reqstd', hidden: true },
                { name: 'serv_perf_descr', hidden: true },
                { name: 'parts_reqrd', hidden: true },
                { name: 'comments', hidden: true }
            ],
            sortname: 'service_dt',
            sortorder: "desc",
            viewrecords: true,
            pager: jQuery('#equipsvcp'),
            caption: 'Services',
            ondblClickRow: function(rowid) {

                var data = $("#equip_svc").getRowData(curRowSvc);
                if (data.equip_id == null)
                    alert("  Please Select a Row!");
                else {
                    var eID = document.getElementById("hdnSvcEditOper");
                    eID.value = "Edit";

                    var eID = document.getElementById("hdnSvcEditID");
                    eID.value = data.equip_id;

                    $('lstEquipSvcTypes').val('');
                    $('#dtEquipSvcDt').text('');
                    $('#txtEquipSvcLabor').val('');
                    $('#txtEquipSvcMechanic').val('');
                    $('#txtEquipSvcParts').val('');
                    $('#txtEquipSvcMiles').val('');
                    //                    $('#txtEquipSvcHours').val('');
                    //                    $('#txtEquipSvcTotal').val('');
                    $('#txtEquipSvcReq').val('');
                    $('#txtEquipSvcPerf').val('');
                    $('#txtEquipPartsReq').val('');
                    $('#txtEquipSvcComments').val('');

                    $('#dtEquipSvcDt').text(data.service_dt);
                    $('#txtEquipSvcLabor').val(data.labor_cost);
                    $('#txtEquipSvcMechanic').val(data.mechanic);
                    $('#txtEquipSvcParts').val(data.parts_cost);
                    $('#txtEquipSvcMiles').val(data.mileage);
                    //                    $('#txtEquipSvcHours').val(data.hours);
                    //                    $('#txtEquipSvcTotal').val(data.total_cost);
                    $('#txtEquipSvcReq').val(data.serv_reqstd);
                    $('#txtEquipSvcPerf').val(data.serv_perf_descr);
                    $('#txtEquipPartsReq').val(data.parts_reqrd);
                    $('#txtEquipSvcComments').val(data.comments);

                    $("#equip_svc_results").html('');
                    OpenEquipEditSvcDlg(data);
                }
                return false;
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    curRowSvc = ids;
                    var data = $("#equip_svc").getRowData(ids);
                    //                    curSvcOldHours = data.hours;
                    curSvcOldMileage = data.mileage;
                    var eIM = document.getElementById("hdnSvcOldMileage");
                    eIM.value = curSvcOldMileage;
                    //                    var eIH = document.getElementById("hdnSvcOldHours");
                    //                    eIH.value = curSvcOldMileage;
                    var eIS = document.getElementById("hdnSvcID");
                    eIS.value = data.service_id;
                }
            }
        }).navGrid('#equipsvcp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             var respArray = response.responseText.split(",");

             if (respArray[0] == "Success") {
                 jQuery("#success").show();
                 jQuery("#success").html("Service successfully deleted");
                 jQuery("#success").fadeOut(6000);

                 return [true, response.responseText];
             }
             else {
                 return [false, response.responseText];
             }
         }
     }, // del options
         {}, // search options
         {} // view options
          ).navButtonAdd('#equipsvcp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#equip_svc").getRowData(curRowSvc);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.service_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "EquipOneSvcRpt";
                      //                      $("#rpt_dialog").dialog('option', 'title', "Service Report for ID: " + data.equip_id)
                      $("#rpt_dialog").dialog('option', 'title', "Service Report for ID: " + data.equip_id);

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#equipsvcp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#equip_svc").getRowData(curRowSvc);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnSvcEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnSvcEditID");
                      eID.value = data.equip_id;

                      $('lstEquipSvcTypes').val('');
                      $('#dtEquipSvcDt').text('');
                      $('#txtEquipSvcLabor').val('');
                      $('#txtEquipSvcMechanic').val('');
                      $('#txtEquipSvcParts').val('');
                      $('#txtEquipSvcMiles').val('');
                      //                      $('#txtEquipSvcHours').val('');
                      //                      $('#txtEquipSvcTotal').val('');
                      $('#txtEquipSvcReq').val('');
                      $('#txtEquipSvcPerf').val('');
                      $('#txtEquipPartsReq').val('');
                      $('#txtEquipSvcComments').val('');

                      $('#dtEquipSvcDt').text(data.service_dt);
                      $('#txtEquipSvcLabor').val(data.labor_cost);
                      $('#txtEquipSvcMechanic').val(data.mechanic);
                      $('#txtEquipSvcParts').val(data.parts_cost);
                      $('#txtEquipSvcMiles').val(data.mileage);
                      //                      $('#txtEquipSvcHours').val(data.hours);
                      //                      $('#txtEquipSvcTotal').val(data.total_cost);
                      $('#txtEquipSvcReq').val(data.serv_reqstd);
                      $('#txtEquipSvcPerf').val(data.serv_perf_descr);
                      $('#txtEquipPartsReq').val(data.parts_reqrd);
                      $('#txtEquipSvcComments').val(data.comments);

                      $("#equip_svc_results").html('');

                      OpenEquipEditSvcDlg(data);

                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#equipsvcp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {
                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {

                      var eID = document.getElementById("hdnSvcEditOper");
                      eID.value = "Add";

                      var eID = document.getElementById("hdnSvcEditID");
                      eID.value = data.equip_id;

                      $('lstEquipSvcTypes').val('');
                      $('#dtEquipSvcDt').text('');
                      $('#txtEquipSvcLabor').val('');
                      $('#txtEquipSvcMechanic').val('');
                      $('#txtEquipSvcParts').val('');
                      $('#txtEquipSvcMiles').val('');
                      //                      $('#txtEquipSvcHours').val('');
                      //                      $('#txtEquipSvcTotal').val('');
                      $('#txtEquipSvcReq').val('');
                      $('#txtEquipSvcPerf').val('');
                      $('#txtEquipPartsReq').val('');
                      $('#txtEquipSvcComments').val('');

                      $("#equip_svc_results").html('');

                      OpenEquipEditSvcDlg(data);
                  }
                  return false;
              },
              position: "first"
          });

        $('#equipsvcp_center').remove();
        $('#equipsvcp_right').remove();
        jQuery("#equip_asgn").jqGrid({
            editurl: '/EquipTrack/EditAssign/',
            datatype: 'json',
            mtype: 'GET',
            height: 100,
            width: 740,
            rowNum: 5000,
            colNames: ['ID', 'Assign To', 'Date Assigned', 'Return Date', 'Assign Condition', 'Return Condition', 'Assign Miles', 'Return Miles', 'Assign Hours', 'Return Hours', 'Comments', 'AssignID', 'ImgCnt'],
            colModel: [
   		        { name: 'equip_id', index: 'equip_id', width: 65 },
   		        { name: 'assigned_to', index: 'assigned_to', width: 80 },
                { name: 'assigned_dt', index: 'assigned_dt', width: 100 },
                { name: 'return_dt', index: 'return_dt', width: 100 },
   		        { name: 'asgn_condition_id', index: 'asgn_condition_id', width: 80 },
   		        { name: 'ret_condition_id', index: 'ret_condition_id', width: 80 },
   		        { name: 'asgn_miles', hidden: true },
   		        { name: 'ret_miles', hidden: true },
   		        { name: 'asgn_hours', hidden: true },
   		        { name: 'ret_hours', hidden: true },
                { name: 'comments', hidden: true },
                { name: 'assign_id', hidden: true },
                { name: 'img_cnt', hidden: true }
            ],
            sortname: 'assigned_dt',
            sortorder: "desc",
            afterInsertRow: function(rowid, rowdata, rowelem) {
                if (rowelem[12] == 'HAS_PHOTOS') {
                    jQuery("#equip_asgn").setCell(rowid, 'equip_id', '', { 'background-color': '#FFFFCC' });
                }
            },
            viewrecords: true,
            pager: jQuery('#equipasgnp'),
            caption: 'Assignments',
            ondblClickRow: function(rowid) {
                var data = $("#equip_asgn").getRowData(curRowAsgn);
                if (data.equip_id == null)
                    alert("  Please Select an Assignment Row!");
                else {
                    var eID = document.getElementById("hdnAsgnEditOper");
                    eID.value = "Edit";

                    var eID = document.getElementById("hdnAsgnEditID");
                    eID.value = data.equip_id;

                    $('#dtEquipAsgnDt').text('');
                    $('#dtEquipRetDt').text('');
                    $('#ddlAsgnCond').val('');
                    $('#ddlRetCond').val('');
                    $('#txtEquipAsgnMiles').val('');
                    $('#txtEquipAsgnHours').val('');
                    $('#txtEquipRetMiles').val('');
                    $('#txtEquipRetHours').val('');
                    $('#txtEquipAsgnComments').val('');


                    $('#dtEquipAsgnDt').text(data.assigned_dt);
                    $('#dtEquipRetDt').text(data.return_dt);

                    if (data.asgn_condition_id.length > 0)
                        $("#ddlAsgnCond option:econtains(" + data.asgn_condition_id + ")").prop('selected', 'selected');

                    if (data.ret_condition_id.length > 0)
                        $("#ddlRetCond option:econtains(" + data.ret_condition_id + ")").prop('selected', 'selected');

                    $('#txtEquipAsgnMiles').val(data.asgn_miles);
                    $('#txtEquipAsgnHours').val(data.asgn_hours);
                    $('#txtEquipRetMiles').val(data.ret_miles);
                    $('#txtEquipRetHours').val(data.ret_hours);
                    $('#txtEquipAsgnComments').val(data.comments);

                    $("#equip_asgn_results").html('');

                    OpenEquipEditAsgnDlg(data);
                }

                return false;
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    $("#img_assign_before_results").html('');
                    $("#img_assign_after_results").html('');
                    curRowAsgn = ids;
                    var data = $("#equip_asgn").getRowData(curRowAsgn);
                    var eIS = document.getElementById("hdnAsgnID");
                    eIS.value = data.assign_id;

                    var eaM = document.getElementById("hdnAsgnOldMileage");
                    eaM.value = data.asgn_miles;
                    var eaH = document.getElementById("hdnAsgnOldHours");
                    eaH.value = data.asgn_hours;
                    var erM = document.getElementById("hdnRetOldMileage");
                    erM.value = data.ret_miles;
                    var erH = document.getElementById("hdnRetOldHours");
                    erH.value = data.ret_hours;
                }
            }
        }).navGrid('#equipasgnp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             var respArray = response.responseText.split(",");

             if (respArray[0] == "Success") {
                 jQuery("#success").show();
                 jQuery("#success").html("Assignment successfully deleted");
                 jQuery("#success").fadeOut(6000);
                 if (respArray[1] == "Y") {
                     jQuery("#equipgrid").setCell(curRow, 'equip_id', '', { color: 'green' });
                     jQuery("#equipgrid").setRowData(curRow, { equip_assign_color: 'SET_GREEN' });
                     curEquipAssignColor = "SET_GREEN";
                 }
                 return [true, response.responseText];
             }
             else {
                 return [false, response.responseText];
             }
         }
     }, // del options
         {}, // search options
         {} // view options
          ).navButtonAdd('#equipasgnp', {
              caption: "Photo",
              buttonicon: "ui-icon-image",
              onClickButton: function() {
                  var data = $("#equip_asgn").getRowData(curRowAsgn);
                  if (data.assign_id == null)
                      alert("  Please Select a Row in Assignments!");
                  else {
                      $("#img_assign_loading").hide();
                      var iBID = document.getElementById("hdnAssignBeforeImageType");
                      iBID.value = "EQUIP";
                      var iAID = document.getElementById("hdnAssignAfterImageType");
                      iAID.value = "EQUIP";
                      var bID = document.getElementById("hdnEquipAssignBeforeIDInit");
                      bID.value = data.assign_id;
                      var aID = document.getElementById("hdnEquipAssignAfterIDInit");
                      aID.value = data.assign_id;
                      //                      $("#img_dialog_assign").dialog('option', 'title', "Assignment Images for ID: " + data.equip_id)
                      $("#img_dialog_assign").dialog('option', 'title', "Assignment Images for ID: " + data.equip_id);
                      $.get("/EquipTrack/GetEquipImages/" + data.assign_id + "/EQUIP_ASSIGN_B", {}, function(data) {
                          $("#img_assign_before_results").html(data);
                      });

                      $.get("/EquipTrack/GetEquipImages/" + data.assign_id + "/EQUIP_ASSIGN_A", {}, function(data) {
                          $("#img_assign_after_results").html(data);
                      });

                      $('#fileUploadAssignBefore').val('');
                      $('#fileUploadAssignAfter').val('');
                      $('#img_assign_before_results').html('');
                      $('#img_assign_after_results').html('');
                      $("#btnSaveBefore").attr("disabled", "disabled");
                      $("#btnSaveAfter").attr("disabled", "disabled");

                      jQuery('#img_dialog_assign').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#equipasgnp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#equip_asgn").getRowData(curRowAsgn);
                  if (data.equip_id == null)
                      alert("  Please Select an Assignment Row!");
                  else {
                      var eID = document.getElementById("hdnAsgnEditOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnAsgnEditID");
                      eID.value = data.equip_id;

                      $('#dtEquipAsgnDt').text('');
                      $('#dtEquipRetDt').text('');
                      $('#ddlAsgnCond').val('');
                      $('#ddlRetCond').val('');
                      $('#txtEquipAsgnMiles').val('');
                      $('#txtEquipAsgnHours').val('');
                      $('#txtEquipRetMiles').val('');
                      $('#txtEquipRetHours').val('');
                      $('#txtEquipAsgnComments').val('');


                      $('#dtEquipAsgnDt').text(data.assigned_dt);
                      $('#dtEquipRetDt').text(data.return_dt);

                      if (data.asgn_condition_id.length > 0)
                          $("#ddlAsgnCond option:econtains(" + data.asgn_condition_id + ")").prop('selected', 'selected');

                      if (data.ret_condition_id.length > 0)
                          $("#ddlRetCond option:econtains(" + data.ret_condition_id + ")").prop('selected', 'selected');

                      $('#txtEquipAsgnMiles').val(data.asgn_miles);
                      $('#txtEquipAsgnHours').val(data.asgn_hours);
                      $('#txtEquipRetMiles').val(data.ret_miles);
                      $('#txtEquipRetHours').val(data.ret_hours);
                      $('#txtEquipAsgnComments').val(data.comments);

                      $("#equip_asgn_results").html('');

                      OpenEquipEditAsgnDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#equipasgnp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {
                  var data = $("#equipgrid").getRowData(curRow);
                  if (data.equip_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnAsgnEditOper");
                      eID.value = "Add";

                      var eID = document.getElementById("hdnAsgnEditID");
                      eID.value = data.equip_id;

                      $('#dtEquipAsgnDt').text('');
                      $('#dtEquipRetDt').text('');
                      $('#ddlAsgnCond').val('');
                      $('#ddlRetCond').val('');
                      $('#txtEquipAsgnMiles').val('');
                      $('#txtEquipAsgnHours').val('');
                      $('#txtEquipRetMiles').val('');
                      $('#txtEquipRetHours').val('');
                      $('#txtEquipAsgnComments').val('');

                      if (curEquipAssignColor == "SET_GREEN") {
                          $("#equip_asgn_results").html('');
                          OpenEquipEditAsgnDlg(data);
                      }
                      else {
                          alert('Currently selected equipment is already assigned!');
                      }

                  }
                  return false;
              },
              position: "first"
          });

        $('#equipasgnp_center').remove();
        $('#equipasgnp_right').remove();

        jQuery("#toolgrid").jqGrid({
            url: '/EquipTrack/ToolGridData/',
            //            editurl: '/EquipTrack/EditTool/',
            datatype: 'json',
            mtype: 'GET',
            hoverrows: false,
            altRows: false,
            height: 255,
            width: 740,
            //            rowNum: 100,
            rowNum: 5000,
            colNames: ['ID', 'Item', 'Description', 'Manufacturer', 'Size', 'Work Loc', 'Reg By', 'Mng By', 'Calibrate Due', '', '', 'Managed By Date', 'Model #', 'Serial #', 'Year Bought', 'Cost', 'Stolen', 'Sold', 'Electrical', 'Lojack', 'In Repair', 'Totaled', 'Comments', '', '', 'Unknown', 'ImgCnt', 'To Be Sold'],
            colModel: [
   		        { name: 'tool_id', index: 'tool_id', width: 85, editable: true, key: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'tools_type_descr', index: 'tools_type_descr', width: 100, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetToolTypes' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetToolTypesSearch'} },
   		        { name: 'tools_descr_descr', index: 'tools_descr_descr', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetToolDescs' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetToolDescsSearch'} },
   		        { name: 'tool_mfg_descr', index: 'tool_mfg_descr', width: 90, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetToolMfgs' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetToolMfgsSearch'} },
   		        { name: 'size_descr', index: 'size_descr', width: 60, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetToolSizes' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetToolSizesSearch'} },
   		        { name: 'work_loc', index: 'work_loc', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetLocations' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetLocations'} },
   		        { name: 'registered_by', index: 'registered_by', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: false },
   		        { name: 'managed_by', index: 'managed_by', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: false },
   		        { name: 'calibration_due_dt', index: 'calibration_due_dt', width: 80, editable: true, search: false,
   		            editoptions: { size: 12, dataInit: function(el) {
   		                $(el).datepicker({ dateFormat: 'mm/dd/yy' });
   		            }
   		            }
   		        },
   		        { name: 'calibration_due_warn', hidden: true, search: false },
                { name: 'calibration_rmdr_wks', editable: true, hidden: true, edittype: "select", editoptions: { value: ":;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24" }, editrules: { edithidden: true }, search: false },
   		        { name: 'managed_by_dt', hidden: true, editable: true, editrules: { edithidden: true }, search: false,
   		            editoptions: { size: 12, dataInit: function(el) {
   		                $(el).datepicker({ dateFormat: 'mm/dd/yy' });
   		            }
   		            }
   		        },
   		    { name: 'model_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew'], searchhidden: true} },
   		    { name: 'serial_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew'], searchhidden: true} },
   		    { name: 'year_pur', hidden: true, search: false, editable: true, editrules: { edithidden: true} },
            { name: 'cost', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'stolen', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'electrical', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'lojack', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'in_repair', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'totaled', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
            { name: 'comment', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27" }, search: false },
   		    { name: 'tool_color', hidden: true, search: false },
   		    { name: 'tool_assign_color', hidden: true, search: false },
            { name: 'unknown', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} },
   		    { name: 'img_cnt', hidden: true, search: false },
            { name: 'to_be_sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], value: "True:Yes;False:No", searchhidden: true} }
            ],
            sortname: 'tool_id',
            sortorder: "asc",
            afterInsertRow: function(rowid, rowdata, rowelem) {
                if (rowelem[9] == 'SET_RED') {
                    jQuery("#toolgrid").setCell(rowid, 'calibration_due_dt', '', { color: 'red' });
                }
                if (rowelem[23] == 'SET_GREEN') {
                    jQuery("#toolgrid").setCell(rowid, 'tool_id', '', { color: 'green' });
                }
                if (rowelem[23] == 'SET_PURPLE') {
                    jQuery("#toolgrid").setCell(rowid, 'tool_id', '', { color: 'purple' });
                }
                if (rowelem[26] == 'HAS_PHOTOS') {
                    jQuery("#toolgrid").setCell(rowid, 'tool_id', '', { 'background-color': '#FFFFCC' });
                }
            },
            viewrecords: true,
            pager: jQuery('#toolgridp'),
            //            caption: 'Inventory for ' + curDiv +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>',
            ondblClickRow: function(rowid) {

                var data = $("#toolgrid").getRowData(curToolRow);
                if (data.tool_id == null)
                    alert("  Please Select a Row!");
                else {
                    var eID = document.getElementById("hdnToolOper");
                    eID.value = "Edit";

                    $("#hdnToolID").val('');
                    $("#ddlToolMfg").val('');
                    $("#ddlToolType").val('');
                    $("#ddlToolDesc").val('');
                    $("#ddlToolSize").val('');
                    $("#ddlToolRegBy").val('');
                    $("#ddlToolMngBy").val('');
                    $("#ddlToolLoc").val('');
                    $("#txtToolYearPur").val('');
                    $("#dtToolMngByDt").val('');
                    $("#dtCalibrationDue").val('');
                    $("#ddlCalibrationRmndr").val('');
                    $("#txtToolCost").val('');
                    $("#txtToolSerialNum").val('');
                    $("#txtToolModelNum").val('');
                    $("#txtToolComment").val('');
                    $('#chkToolStolen').prop('checked', false);
                    $('#chkToolSold').prop('checked', false);
                    $('#chkToolToBeSold').prop('checked', false);
                    $('#chkToolElectrical').prop('checked', false);
                    $('#chkToolLojack').prop('checked', false);
                    $('#chkToolUnknown').prop('checked', false);
                    $('#chkToolInRepair').prop('checked', false);
                    $('#chkToolTotaled').prop('checked', false);

                    $("#hdnToolStolen").val('');
                    $("#hdnToolSold").val('');
                    $("#hdnToolToBeSold").val('');
                    $("#hdnToolElectrical").val('');
                    $("#hdnToolLojack").val('');
                    $("#hdnToolUnknown").val('');
                    $("#hdnToolInRepair").val('');
                    $("#hdnToolTotaled").val('');

                    $("#hdnToolID").val(data.tool_id);
                    $("#ddlToolMfg").val(data.tool_mfg_descr);
                    $("#ddlToolType").val(data.tools_descr_descr);
                    $("#ddlToolDesc").val(data.tools_descr_descr);
                    $("#ddlToolSize").val(data.size_descr);
                    $("#ddlToolRegBy").val(data.registered_by);
                    $("#ddlToolMngBy").val(data.managed_by);
                    $("#ddlToolLoc").val(data.work_loc);
                    $("#txtToolYearPur").val(data.year_pur);
                    $("#dtToolMngByDt").val(data.managed_by_dt);
                    $("#dtCalibrationDue").val(data.calibration_due_dt);
                    $("#ddlCalibrationRmndr").val(data.calibration_rmdr_wks);
                    $("#txtToolCost").val(data.cost);
                    $("#txtToolSerialNum").val(data.serial_num);
                    $("#txtToolModelNum").val(data.model_num);
                    $("#txtToolComment").val(data.comment);
                    if (data.electrical == 'True') {
                        $('#chkToolElectrical').prop('checked', true);
                        $('#hdnToolElectrical').val('on');

                    }
                    else {
                        $('#chkToolElectrical').prop('checked', false);
                        $('#hdnToolElectrical').val('off');
                    }

                    if (data.lojack == 'True') {
                        $('#chkToolLojack').prop('checked', true);
                        $('#hdnToolLojack').val('on');
                    }
                    else {
                        $('#chkToolLojack').prop('checked', false);
                        $('#hdnToolLojack').val('off');
                    }

                    if (data.unknown == 'True') {
                        $('#chkToolUnknown').prop('checked', true);
                        $('#hdnToolUnknown').val('on');
                    }
                    else {
                        $('#chkToolUnknown').prop('checked', false);
                        $('#hdnToolUnknown').val('off');
                    }

                    if (data.sold == 'True') {
                        $('#chkToolSold').prop('checked', true);
                        $('#hdnToolSold').val('on');
                    }
                    else {
                        $('#chkToolSold').prop('checked', false);
                        $('#hdnToolSold').val('off');
                    }
                    if (data.to_be_sold == 'True') {
                        $('#chkToolToBeSold').prop('checked', true);
                        $('#hdnToolToBeSold').val('on');
                    }
                    else {
                        $('#chkToolToBeSold').prop('checked', false);
                        $('#hdnToolToBeSold').val('off');
                    }
                    if (data.stolen == 'True') {
                        $('#chkToolStolen').prop('checked', true);
                        $('#hdnToolStolen').val('on');
                    }
                    else {
                        $('#chkToolStolen').prop('checked', false);
                        $('#hdnToolStolen').val('off');
                    }
                    if (data.in_repair == 'True') {
                        $('#chkToolInRepair').prop('checked', true);
                        $('#hdnToolInRepair').val('on');
                    }
                    else {
                        $('#chkToolInRepair').prop('checked', false);
                        $('#hdnToolInRepair').val('off');
                    }
                    if (data.totaled == 'True') {
                        $('#chkToolTotaled').prop('checked', true);
                        $('#hdnToolTotaled').val('on');
                    }
                    else {
                        $('#chkToolTotaled').prop('checked', false);
                        $('#hdnToolTotaled').val('off');
                    }

                    $("#tool_dlg_results").html('');

                    OpenToolEditDlg(data);
                }
                return false;

            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    $("#img_results").html('');
                    curToolRow = ids;
                    var data = $("#toolgrid").getRowData(ids);
                    jQuery("#tool_svc").setGridParam({ url: "/EquipTrack/GetToolServiceGridData/" + data.tool_id, page: 1 })
                            .trigger('reloadGrid');
                    jQuery("#tool_asgn").setGridParam({ url: "/EquipTrack/GetToolAssignGridData/" + data.tool_id, page: 1 })
                             .trigger('reloadGrid');
                    curToolAssignColor = data.tool_assign_color;

                }
            },
            loadComplete: function() {

                var uData = jQuery('#toolgrid').getGridParam('userData');
                var strCap;

                if (uData.searchVal == '') {
                    strCap = 'Inventory for ' + curDiv +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>,&nbsp<div style="background-color:#FFFFCC;width: 55px;float:right;padding-right:20px">has photo</div>';
                }
                else {

                    strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="red">FILTER ON:</font>' + '&nbsp;&nbsp;&nbsp;' + uData.searchVal +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'ID Color Key: assigned, <font color="green">available</font>, <font color="purple">on loan</font>,&nbsp<div style="background-color:#FFFFCC;float:right">has photos</div>';
                    if (uData.searchElectrical != '') {
                        alert(uData.searchVal + " is not available.\n Registered By: " + uData.searchRegBy + "\n Stolen: " + uData.searchStolen + "\n Unknown: " + uData.searchUnknown + "\n Sold: " + uData.searchSold + "\n Electrical: " + uData.searchElectrical + "\n In Repair: " + uData.searchInRepair + "\n Totaled: " + uData.searchTotaled + "\n ID: " + uData.searchId + "\n To Be Sold: " + uData.searchToBeSold);
                    }
                }

                jQuery('#toolgrid').setCaption(strCap);

            }
        }).navGrid('#toolgridp', { deltext: "Delete", searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: false, search: true, refresh: true }, //options
         {}, // edit options
         {}, // add options
         {}, // del options
		{odata: [{ oper: 'eq', text: 'equal' }, { oper: 'ne', text: 'not equal' }, { oper: 'lt', text: 'less' }, { oper: 'le', text: 'less or equal' }, { oper: 'gt', text: 'greater' }, { oper: 'ge', text: 'greater or equal' }, { oper: 'bw', text: 'begins with' }, { oper: 'bn', text: 'does not begin with' }, { oper: 'in', text: 'is in' }, { oper: 'ni', text: 'is not in' }, { oper: 'ew', text: 'ends with' }, { oper: 'en', text: 'does not end with' }, { oper: 'cn', text: 'contains' }, { oper: 'nc', text: 'does not contain' }, { oper: 'nu', text: 'is null' }, { oper: 'nn', text: 'is not null'}],
		//            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
		//         {odata: ['equals','begins with'],
		closeAfterSearch: true, closeOnEscape: true
}, // search options
         {} // view options
          ).navButtonAdd('#toolgridp', {
              caption: "Photo",
              buttonicon: "ui-icon-image",
              onClickButton: function() {
                  var data = $("#toolgrid").getRowData(curToolRow);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#img_loading").hide();
                      var iID = document.getElementById("hdnImageType");
                      iID.value = "TOOL";
                      var eID = document.getElementById("hdnEquipIDInit");
                      eID.value = data.tool_id;
                      //                      $("#img_dialog").dialog('option', 'title', "Images for ID: " + data.tool_id)
                      $("#img_dialog").dialog('option', 'title', "Images for ID: " + data.tool_id);
                      $.get("/EquipTrack/GetEquipImages/" + data.tool_id + "/TOOL", {}, function(data) {
                          $("#img_results").html(data);
                      });

                      $('#fileUpload').val('');
                      $('#img_results').html('');
                      $("#btnSave").attr("disabled", "disabled");
                      jQuery('#img_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#toolgridp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#toolgrid").getRowData(curToolRow);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.tool_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "ToolOneRpt";
                      //                      $("#rpt_dialog").dialog('option', 'title', "Summary Report for ID: " + data.tool_id)
                      $("#rpt_dialog").dialog('option', 'title', "Summary Report for ID: " + data.tool_id);

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#toolgridp', {
              caption: "Delete",
              buttonicon: "ui-icon-trash",
              onClickButton: function() {
              $("#btnDelTool").removeAttr("disabled", "disabled");
              var data = $("#toolgrid").getRowData(curToolRow);
              $("#deleteToolSuccess").hide();
              if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnTID");
                      eID.value = data.tool_id;
                      $("#delete_tool_dlg").dialog('option', 'title', "Delete Tool: " + data.tool_id);
                      jQuery('#delete_tool_dlg').dialog('open');
                  }
                  return false;
              }
          }).navButtonAdd('#toolgridp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#toolgrid").getRowData(curToolRow);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnToolOper");
                      eID.value = "Edit";

                      $("#hdnToolID").val('');
                      $("#ddlToolMfg").val('');
                      $("#ddlToolType").val('');
                      $("#ddlToolDesc").val('');
                      $("#ddlToolSize").val('');
                      $("#ddlToolRegBy").val('');
                      $("#ddlToolMngBy").val('');
                      $("#ddlToolLoc").val('');
                      $("#txtToolYearPur").val('');
                      $("#dtToolMngByDt").val('');
                      $("#dtCalibrationDue").val('');
                      $("#ddlCalibrationRmndr").val('');
                      $("#txtToolCost").val('');
                      $("#txtToolSerialNum").val('');
                      $("#txtToolModelNum").val('');
                      $("#txtToolComment").val('');
                      $('#chkToolStolen').prop('checked', false);
                      $('#chkToolSold').prop('checked', false);
                      $('#chkToolToBeSold').prop('checked', false);
                      $('#chkToolElectrical').prop('checked', false);
                      $('#chkToolLojack').prop('checked', false);
                      $('#chkToolUnknown').prop('checked', false);
                      $('#chkToolInRepair').prop('checked', false);
                      $('#chkToolTotaled').prop('checked', false);

                      $("#hdnToolStolen").val('');
                      $("#hdnToolSold").val('');
                      $("#hdnToolToBeSold").val('');
                      $("#hdnToolElectrical").val('');
                      $("#hdnToolLojack").val('');
                      $("#hdnToolUnknown").val('');
                      $("#hdnToolInRepair").val('');
                      $("#hdnToolTotaled").val('');


                      $("#hdnToolID").val(data.tool_id);
                      $("#ddlToolMfg").val(data.tool_mfg_descr);
                      $("#ddlToolType").val(data.tools_descr_descr);
                      $("#ddlToolDesc").val(data.tools_descr_descr);
                      $("#ddlToolSize").val(data.size_descr);
                      $("#ddlToolRegBy").val(data.registered_by);
                      $("#ddlToolMngBy").val(data.managed_by);
                      $("#ddlToolLoc").val(data.work_loc);
                      $("#txtToolYearPur").val(data.year_pur);
                      $("#dtToolMngByDt").val(data.managed_by_dt);
                      $("#dtCalibrationDue").val(data.calibration_due_dt);
                      $("#ddlCalibrationRmndr").val(data.calibration_rmdr_wks);
                      $("#txtToolCost").val(data.cost);
                      $("#txtToolSerialNum").val(data.serial_num);
                      $("#txtToolModelNum").val(data.model_num);
                      $("#txtToolComment").val(data.comment);
                      if (data.electrical == 'True') {
                          $('#chkToolElectrical').prop('checked', true);
                          $('#hdnToolElectrical').val('on');

                      }
                      else {
                          $('#chkToolElectrical').prop('checked', false);
                          $('#hdnToolElectrical').val('off');
                      }

                      if (data.lojack == 'True') {
                          $('#chkToolLojack').prop('checked', true);
                          $('#hdnToolLojack').val('on');
                      }
                      else {
                          $('#chkToolLojack').prop('checked', false);
                          $('#hdnToolLojack').val('off');
                      }

                      if (data.unknown == 'True') {
                          $('#chkToolUnknown').prop('checked', true);
                          $('#hdnToolUnknown').val('on');
                      }
                      else {
                          $('#chkToolUnknown').prop('checked', false);
                          $('#hdnToolUnknown').val('off');
                      }

                      if (data.sold == 'True') {
                          $('#chkToolSold').prop('checked', true);
                          $('#hdnToolSold').val('on');
                      }
                      else {
                          $('#chkToolSold').prop('checked', false);
                          $('#hdnToolSold').val('off');
                      }
                      if (data.to_be_sold == 'True') {
                          $('#chkToolToBeSold').prop('checked', true);
                          $('#hdnToolToBeSold').val('on');
                      }
                      else {
                          $('#chkToolToBeSold').prop('checked', false);
                          $('#hdnToolToBeSold').val('off');
                      }
                      if (data.stolen == 'True') {
                          $('#chkToolStolen').prop('checked', true);
                          $('#hdnToolStolen').val('on');
                      }
                      else {
                          $('#chkToolStolen').prop('checked', false);
                          $('#hdnToolStolen').val('off');
                      }
                      if (data.in_repair == 'True') {
                          $('#chkToolInRepair').prop('checked', true);
                          $('#hdnToolInRepair').val('on');
                      }
                      else {
                          $('#chkToolInRepair').prop('checked', false);
                          $('#hdnToolInRepair').val('off');
                      }
                      if (data.totaled == 'True') {
                          $('#chkToolTotaled').prop('checked', true);
                          $('#hdnToolTotaled').val('on');
                      }
                      else {
                          $('#chkToolTotaled').prop('checked', false);
                          $('#hdnToolTotaled').val('off');
                      }

                      $("#tool_dlg_results").html('');
                      OpenToolEditDlg(data);
                  }
                  return false;

              },
              position: "first"
          }).navButtonAdd('#toolgridp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {

                  var data = "";

                  var eID = document.getElementById("hdnToolOper");
                  eID.value = "Add";

                  $("#hdnToolID").val('');
                  $("#ddlToolMfg").val('');
                  $("#ddlToolType").val('');
                  $("#ddlToolDesc").val('');
                  $("#ddlToolSize").val('');
                  $("#ddlToolRegBy").val('');
                  $("#ddlToolMngBy").val('');
                  $("#ddlToolLoc").val('');
                  $("#txtToolYearPur").val('');
                  $("#dtToolMngByDt").val('');
                  $("#dtCalibrationDue").val('');
                  $("#ddlCalibrationRmndr").val('');
                  $("#txtToolCost").val('');
                  $("#txtToolSerialNum").val('');
                  $("#txtToolModelNum").val('');
                  $("#txtToolComment").val('');
                  $('#chkToolStolen').prop('checked', false);
                  $('#chkToolSold').prop('checked', false);
                  $('#chkToolToBeSold').prop('checked', false);
                  $('#chkToolElectrical').prop('checked', false);
                  $('#chkToolLojack').prop('checked', false);
                  $('#chkToolUnknown').prop('checked', false);
                  $('#chkToolInRepair').prop('checked', false);
                  $('#chkToolTotaled').prop('checked', false);

                  $("#hdnToolStolen").val('');
                  $("#hdnToolSold").val('');
                  $("#hdnToolToBeSold").val('');
                  $("#hdnToolElectrical").val('');
                  $("#hdnToolLojack").val('');
                  $("#hdnToolUnknown").val('');
                  $("#hdnToolInRepair").val('');
                  $("#hdnToolTotaled").val('');

                  $("#tool_dlg_results").html('');
                  OpenToolEditDlg(data);

                  return false;
              },
              position: "first"
          });

        $('#toolgridp_center').remove();
        $('#toolgridp_right').remove();


        jQuery("#tool_svc").jqGrid({
            editurl: '/EquipTrack/EditToolService/',
            datatype: 'json',
            mtype: 'GET',
            height: 100,
            width: 740,
            rowNum: 5000,
            colNames: ['Service ID', 'ID', 'Service Date', 'Type', 'Mechanic', 'Labor Cost', 'Parts Cost', 'Total Cost', 'Service Requested', 'Service Performed', 'Parts Required', 'Comments'],
            colModel: [
                { name: 'service_id', hidden: true, editable: true },
   		        { name: 'tool_id', index: 'tool_id', width: 65, editable: true, editoptions: { readonly: 'readonly'} }, //, editoptions: {readonly: 'readonly'}
                {name: 'service_dt', index: 'service_dt', width: 100, editable: true,
                editoptions: { size: 12, dataInit: function(el) {
                    $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                }
                }
            },
   		        { name: 'serv_descr', index: 'serv_descr', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetToolServiceTypes'} },
   		        { name: 'mechanic', index: 'mechanic', width: 80, editable: true },
   		        { name: 'labor_cost', index: 'labor_cost', width: 60, editable: true },
   		        { name: 'parts_cost', index: 'parts_cost', width: 60, editable: true },
   		        { name: 'total_cost', index: 'total_cost', width: 60, editable: false },
                { name: 'serv_reqstd', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} },
                { name: 'serv_perf_descr', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} },
                { name: 'parts_reqrd', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} },
                { name: 'comments', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} }
            ],
            sortname: 'service_dt',
            sortorder: "desc",
            viewrecords: true,
            pager: jQuery('#toolsvcp'),
            caption: 'Services',
            ondblClickRow: function(rowid) {

                var data = $("#tool_svc").getRowData(curToolRowSvc);
                if (data.tool_id == null)
                    alert("  Please Select a Row!");
                else {
                    var eID = document.getElementById("hdnToolSvcOper");
                    eID.value = "Edit";

                    var eID = document.getElementById("hdnToolSvcToolID");
                    eID.value = data.tool_id;

                    $('#dtToolSvcDt').text('');
                    $('#txtToolSvcMechanic').val('');
                    $('#txtToolSvcParts').val('');
                    $('#txtToolSvcLabor').val('');
                    $('#txtToolSvcReq').val('');
                    $('#txtToolSvcPerf').val('');
                    $('#txtToolPartsReq').val('');
                    $('#txtToolSvcComments').val('');

                    $('#dtToolSvcDt').text(data.service_dt);
                    $('#txtToolSvcMechanic').val(data.mechanic);
                    $('#txtToolSvcParts').val(data.parts_cost);
                    $('#txtToolSvcLabor').val(data.labor_cost);
                    $('#txtToolSvcReq').val(data.serv_reqstd);
                    $('#txtToolPartsReq').val(data.parts_reqrd);
                    $('#txtToolSvcPerf').val(data.serv_perf_descr);
                    $('#txtToolSvcComments').val(data.comments);

                    $("#tool_svc_results").html('');

                    OpenToolSvcDlg(data);

                }
                return false;
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    curToolRowSvc = ids;
                    var data = $("#tool_svc").getRowData(ids);
                    var eIS = document.getElementById("hdnToolSvcID");
                    eIS.value = data.service_id;
                }
            }

        }).navGrid('#toolsvcp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             if (response.responseText == "Success") {
                 jQuery("#tool_success").show();
                 jQuery("#tool_success").html("Service successfully deleted");
                 jQuery("#tool_success").fadeOut(6000);

                 return [true, response.responseText];
             }
             else {
                 return [false, response.responseText];
             }
         }
     }, // del options
         {}, // search options
         {} // view options
          ).navButtonAdd('#toolsvcp', {
              caption: "Print",
              buttonicon: "ui-icon-print",
              onClickButton: function() {
                  var data = $("#tool_svc").getRowData(curToolRowSvc);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      $("#rpt_loading").hide();
                      var eID = document.getElementById("hdnID");
                      eID.value = data.service_id;
                      var eRpt = document.getElementById("hdnReportName");
                      eRpt.value = "ToolOneSvcRpt";
                      //                      $("#rpt_dialog").dialog('option', 'title', "Service Report for ID: " + data.tool_id)
                      $("#rpt_dialog").dialog('option', 'title', "Service Report for ID: " + data.tool_id);

                      jQuery('#rpt_dialog').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#toolsvcp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#tool_svc").getRowData(curToolRowSvc);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnToolSvcOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnToolSvcToolID");
                      eID.value = data.tool_id;

                      $('#dtToolSvcDt').text('');
                      $('#txtToolSvcMechanic').val('');
                      $('#txtToolSvcParts').val('');
                      $('#txtToolSvcLabor').val('');
                      $('#txtToolSvcReq').val('');
                      $('#txtToolSvcPerf').val('');
                      $('#txtToolPartsReq').val('');
                      $('#txtToolSvcComments').val('');

                      $('#dtToolSvcDt').text(data.service_dt);
                      $('#txtToolSvcMechanic').val(data.mechanic);
                      $('#txtToolSvcParts').val(data.parts_cost);
                      $('#txtToolSvcLabor').val(data.labor_cost);
                      $('#txtToolSvcReq').val(data.serv_reqstd);
                      $('#txtToolPartsReq').val(data.parts_reqrd);
                      $('#txtToolSvcPerf').val(data.serv_perf_descr);
                      $('#txtToolSvcComments').val(data.comments);

                      $("#tool_svc_results").html('');

                      OpenToolSvcDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#toolsvcp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {
                  var data = $("#toolgrid").getRowData(curToolRow);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {

                      var eID = document.getElementById("hdnToolSvcOper");
                      eID.value = "Add";

                      var eID = document.getElementById("hdnToolSvcToolID");
                      eID.value = data.tool_id;

                      $('#dtToolSvcDt').text('');
                      $('#txtToolSvcMechanic').val('');
                      $('#txtToolSvcParts').val('');
                      $('#txtToolSvcLabor').val('');
                      $('#txtToolSvcReq').val('');
                      $('#txtToolSvcPerf').val('');
                      $('#txtToolPartsReq').val('');
                      $('#txtToolSvcComments').val('');

                      $("#tool_svc_results").html('');

                      OpenToolSvcDlg(data);
                  }
                  return false;
              },
              position: "first"
          });

        $('#toolsvcp_center').remove();
        $('#toolsvcp_right').remove();

        jQuery("#tool_asgn").jqGrid({
            editurl: '/EquipTrack/EditToolAssign/',
            datatype: 'json',
            mtype: 'GET',
            height: 100,
            width: 740,
            rowNum: 5000,
            colNames: ['ID', 'Assign To', 'Date Assigned', 'Return Date', 'Assign Condition', 'Return Condition', 'Comments', 'AssignID', 'IMGCNT'],
            colModel: [
   		        { name: 'tool_id', index: 'tool_id', width: 65, editable: true },
   		        { name: 'assigned_to', index: 'assigned_to', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetAssignTo'} },
                { name: 'assigned_dt', index: 'assigned_dt', width: 100, editable: true,
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
                { name: 'return_dt', index: 'return_dt', width: 100, editable: true,
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
   		        { name: 'asgn_condition_id', index: 'asgn_condition_id', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetConditions'} },
   		        { name: 'ret_condition_id', index: 'ret_condition_id', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetConditions'} },
                { name: 'comments', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} },
                { name: 'assign_id', hidden: true, editable: true },
                { name: 'img_cnt', hidden: true, search: false }
            ],
            sortname: 'assigned_dt',
            sortorder: "desc",
            afterInsertRow: function(rowid, rowdata, rowelem) {
                if (rowelem[8] == 'HAS_PHOTOS') {
                    jQuery("#tool_asgn").setCell(rowid, 'tool_id', '', { 'background-color': '#FFFFCC' });
                }
            },
            viewrecords: true,
            pager: jQuery('#toolasgnp'),
            caption: 'Assignments',
            ondblClickRow: function(rowid) {

                var data = $("#tool_asgn").getRowData(curToolRowAsgn);
                if (data.tool_id == null)
                    alert("  Please Select an Assignment Row!");
                else {
                    var eID = document.getElementById("hdnToolAsgnOper");
                    eID.value = "Edit";

                    var eID = document.getElementById("hdnToolAsgnToolID");
                    eID.value = data.tool_id;

                    $('#dtToolAsgnDt').text('');
                    $('#dtToolRetDt').text('');
                    $('#ddlToolAsgnCond').val('');
                    $('#ddlToolRetCond').val('');
                    $('#txtToolAsgnComments').val('');


                    $('#dtToolAsgnDt').text(data.assigned_dt);
                    $('#dtToolRetDt').text(data.return_dt);

                    if (data.asgn_condition_id.length > 0)
                        $("#ddlToolAsgnCond option:econtains(" + data.asgn_condition_id + ")").prop('selected', 'selected');

                    if (data.ret_condition_id.length > 0)
                        $("#ddlToolRetCond option:econtains(" + data.ret_condition_id + ")").prop('selected', 'selected');

                    $('#txtToolAsgnComments').val(data.comments);

                    $("#tool_asgn_results").html('');

                    OpenToolAsgnDlg(data);
                }

                return false;
            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    curToolRowAsgn = ids;
                    var data = $("#tool_asgn").getRowData(curToolRowAsgn);
                    var eIS = document.getElementById("hdnToolAsgnID");
                    eIS.value = data.assign_id;
                }
            }
        }).navGrid('#toolasgnp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
         {}, // edit options
         {}, // add options
         {reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true,
         afterSubmit: function(response, postdata) {

             var respArray = response.responseText.split(",");

             if (respArray[0] == "Success") {
                 jQuery("#tool_success").show();
                 jQuery("#tool_success").html("Assignment successfully deleted");
                 jQuery("#tool_success").fadeOut(6000);
                 if (respArray[1] == "Y") {
                     jQuery("#toolgrid").setCell(curToolRow, 'tool_id', '', { color: 'green' });
                     jQuery("#toolgrid").setRowData(curToolRow, { tool_assign_color: 'SET_GREEN' });
                     curToolAssignColor = "SET_GREEN";
                 }
                 return [true, response.responseText];
             }
             else {
                 return [false, response.responseText];
             }
         }
     }, // del options
         {}, // search options
         {} // view options
          ).navButtonAdd('#toolasgnp', {
              caption: "Photo",
              buttonicon: "ui-icon-image",
              onClickButton: function() {
                  var data = $("#tool_asgn").getRowData(curToolRowAsgn);
                  if (data.assign_id == null)
                      alert("  Please Select a Row in Assignments!");
                  else {
                      $("#img_assign_loading").hide();
                      var iBID = document.getElementById("hdnAssignBeforeImageType");
                      iBID.value = "TOOL";
                      var iAID = document.getElementById("hdnAssignAfterImageType");
                      iAID.value = "TOOL";
                      var bID = document.getElementById("hdnEquipAssignBeforeIDInit");
                      bID.value = data.assign_id;
                      var aID = document.getElementById("hdnEquipAssignAfterIDInit");
                      aID.value = data.assign_id;
                      //                      $("#img_dialog_assign").dialog('option', 'title', "Assignment Images for ID: " + data.tool_id)
                      $("#img_dialog_assign").dialog('option', 'title', "Assignment Images for ID:  " + data.tool_id);
                      $.get("/EquipTrack/GetEquipImages/" + data.assign_id + "/TOOL_ASSIGN_B", {}, function(data) {
                          $("#img_assign_before_results").html(data);
                      });

                      $.get("/EquipTrack/GetEquipImages/" + data.assign_id + "/TOOL_ASSIGN_A", {}, function(data) {
                          $("#img_assign_after_results").html(data);
                      });

                      $('#fileUploadAssignBefore').val('');
                      $('#fileUploadAssignAfter').val('');
                      $('#img_assign_before_results').html('');
                      $('#img_assign_after_results').html('');

                      $("#btnSaveBefore").attr("disabled", "disabled");
                      $("#btnSaveAfter").attr("disabled", "disabled");
                      jQuery('#img_dialog_assign').dialog('open');
                  }
                  return false;
              },
              position: "last"
          }).navButtonAdd('#toolasgnp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#tool_asgn").getRowData(curToolRowAsgn);
                  if (data.tool_id == null)
                      alert("  Please Select an Assignment Row!");
                  else {
                      var eID = document.getElementById("hdnToolAsgnOper");
                      eID.value = "Edit";

                      var eID = document.getElementById("hdnToolAsgnToolID");
                      eID.value = data.tool_id;

                      $('#dtToolAsgnDt').text('');
                      $('#dtToolRetDt').text('');
                      $('#ddlToolAsgnCond').val('');
                      $('#ddlToolRetCond').val('');
                      $('#txtToolAsgnComments').val('');


                      $('#dtToolAsgnDt').text(data.assigned_dt);
                      $('#dtToolRetDt').text(data.return_dt);

                      if (data.asgn_condition_id.length > 0)
                          $("#ddlToolAsgnCond option:econtains(" + data.asgn_condition_id + ")").prop('selected', 'selected');

                      if (data.ret_condition_id.length > 0)
                          $("#ddlToolRetCond option:econtains(" + data.ret_condition_id + ")").prop('selected', 'selected');

                      $('#txtToolAsgnComments').val(data.comments);

                      $("#tool_asgn_results").html('');

                      OpenToolAsgnDlg(data);
                  }
                  return false;
              },
              position: "first"
          }).navButtonAdd('#toolasgnp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {
                  var data = $("#toolgrid").getRowData(curToolRow);
                  if (data.tool_id == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnToolAsgnOper");
                      eID.value = "Add";

                      var eID = document.getElementById("hdnToolAsgnToolID");
                      eID.value = data.tool_id;

                      $('#dtToolAsgnDt').text('');
                      $('#dtToolRetDt').text('');
                      $('#ddlToolAsgnCond').val('');
                      $('#ddlToolRetCond').val('');
                      $('#txtToolAsgnComments').val('');

                      if (curToolAssignColor == "SET_GREEN") {
                          $("#tool_asgn_results").html('');
                          OpenToolAsgnDlg(data);
                      }
                      else {
                          alert('Currently selected tool is already assigned!');
                      }

                  }
                  return false;
              },
              position: "first"
          });
        $('#toolasgnp_center').remove();
        $('#toolasgnp_right').remove();

        jQuery("#smalltoolgrid").jqGrid({
            url: '/EquipTrack/SmallToolGridData/',
            editurl: '/EquipTrack/EditSmallTool/',
            datatype: 'json',
            mtype: 'GET',
            hoverrows: false,
            altRows: false,
            height: 355,
            width: 740,
            rowNum: 5000,
            colNames: ['ID', 'Item', 'Description', 'Size', 'Manufacturer', 'Model#', 'Serial#', 'ID', 'Condition', 'Reg By', 'Mngd By', 'Managed By Dt', 'Assigned To', 'Assigned Dt', 'Return Dt', 'Shop', 'Comments', ''],
            colModel: [
                { name: 'stID', hidden: true, editable: true, search: false },
   		        { name: 'item', index: 'item', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
  		        { name: 'description', index: 'description', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'size', index: 'size', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'MFG', index: 'MFG', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'model', index: 'model', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'serNum', index: 'serNum', width: 95, editable: true, search: true, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'IDnum', editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'condition_descr', index: 'condition_descr', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetConditions' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetConditions'} },
   		        { name: 'reg_by', index: 'reg_by', width: 85, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetDivisions'} },
   		        { name: 'managed_by', index: 'managed_by', width: 85, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetDivisions' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetDivisions'} },
   		        { name: 'managed_by_dt', hidden: true, editable: true, editrules: { edithidden: true }, search: false,
   		            editoptions: { size: 12, dataInit: function(el) {
   		                $(el).datepicker({ dateFormat: 'mm/dd/yy' });
   		            }
   		            }
   		        },
   		        { name: 'assigned_to', index: 'assigned_to', width: 80, editable: true, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetAssignTo' }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/GetAssignTo'} },
                { name: 'assigned_dt', index: 'assigned_dt', width: 100, editable: true, search: false,
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
                { name: 'return_dt', index: 'return_dt', width: 100, editable: true, hidden: true, search: false, editrules: { edithidden: true },
                    editoptions: { size: 12, dataInit: function(el) {
                        $(el).datepicker({ dateFormat: 'mm/dd/yy' });
                    }
                    }
                },
   		        { name: 'inoutshop', hidden: true, editable: true, edittype: "select", editoptions: { value: "IN:IN;OUT:OUT" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq']} },
                { name: 'comments', hidden: true, search: false, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27"} },
   		        { name: 'small_tool_color', hidden: true, search: false }
            ],
            sortname: 'item',
            sortorder: "asc",
            afterInsertRow: function(rowid, rowdata, rowelem) {
                if (rowelem[17] == 'SET_GREEN') {
                    jQuery("#smalltoolgrid").setCell(rowid, 'item', '', { color: 'green' });
                }
                if (rowelem[17] == 'SET_PURPLE') {
                    jQuery("#smalltoolgrid").setCell(rowid, 'item', '', { color: 'purple' });
                }
            },
            viewrecords: true,
            pager: jQuery('#smalltoolgridp'),
            //            caption: 'Inventory for ' + curDiv +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            //             'Item Color Key: Out of Shop, <font color="green">In Shop</font>, <font color="purple">On Loan</font>',
            ondblClickRow: function(rowid) {

                var data = $("#smalltoolgrid").getRowData(curSmallToolRow);
                if (data.stID == null)
                    alert("  Please Select a Row!");
                else {
                    var eID = document.getElementById("hdnSmallToolOper");
                    eID.value = "Edit";

                    $("#hdnSmallToolID").val('');
                    $("#txtSmallToolItem").val('');
                    $("#txtSmallToolDesc").val('');
                    $("#txtSmallToolSize").val('');
                    $("#txtSmallToolMfg").val('');
                    $("#txtSmallToolModelNum").val('');
                    $("#txtSmallToolSerNum").val('');
                    $("#txtSmallToolID").val('');
                    $("#ddlSmallToolCond").val('');
                    $("#ddlSmallToolShop").val('');
                    $("#dtSmallToolMngByDt").val('');
                    $("#dtSmallToolAsgnDt").val('');
                    $("#dtSmallToolRetDt").val('');
                    $("#txtSmallToolComment").val('');

                    $("#hdnSmallToolID").val(data.stID);
                    $("#txtSmallToolItem").val(data.item);
                    $("#txtSmallToolDesc").val(data.description);
                    $("#txtSmallToolSize").val(data.size);
                    $("#txtSmallToolMfg").val(data.MFG);
                    $("#txtSmallToolModelNum").val(data.model);
                    $("#txtSmallToolSerNum").val(data.serNum);
                    $("#txtSmallToolID").val(data.IDnum);
                    if (data.condition_descr.length > 0)
                        $("#ddlSmallToolCond option:econtains(" + data.condition_descr + ")").prop('selected', 'selected');
                    $("#ddlSmallToolShop").val(data.inoutshop);
                    $("#dtSmallToolMngByDt").val(data.managed_by_dt);
                    $("#dtSmallToolAsgnDt").val(data.assigned_dt);
                    $("#dtSmallToolRetDt").val(data.return_dt);
                    $("#txtSmallToolComment").val(data.comments);

                    $("#smalltool_dlg_results").html('');
                    OpenSmallToolEditDlg(data);
                }
                return false;

            },
            onSelectRow: function(ids) {
                if (ids != null) {
                    curSmallToolRow = ids;
                    var data = $("#smalltoolgrid").getRowData(ids);
                    var eIS = document.getElementById("hdnSmallToolID");
                    eIS.value = data.stID;
                }
            },
            loadComplete: function() {

                var uData = jQuery('#smalltoolgrid').getGridParam('userData');
                var strCap;

                if (uData.searchVal == '') {
                    strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'Item Color Key: Out of Shop, <font color="green">In Shop</font>, <font color="purple" style="padding-right:20px">On Loan</font>';
                }
                else {

                    strCap = 'Inventory for ' + curDiv +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="red">FILTER ON:</font>' + '&nbsp;&nbsp;&nbsp;' + uData.searchVal +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
             'Item Color Key: Out of Shop, <font color="green">In Shop</font>, <font color="purple">On Loan</font>';
                }

                jQuery('#smalltoolgrid').setCaption(strCap);

            }
        }).navGrid('#smalltoolgridp', { deltext: "Delete", searchtext: "Find", refreshtext: "Reload", edit: false, add: false, del: false, search: true, refresh: true }, //options
         {}, // edit options
         {}, // add options
         {}, // del options
		{odata: [{ oper: 'eq', text: 'equal' }, { oper: 'ne', text: 'not equal' }, { oper: 'lt', text: 'less' }, { oper: 'le', text: 'less or equal' }, { oper: 'gt', text: 'greater' }, { oper: 'ge', text: 'greater or equal' }, { oper: 'bw', text: 'begins with' }, { oper: 'bn', text: 'does not begin with' }, { oper: 'in', text: 'is in' }, { oper: 'ni', text: 'is not in' }, { oper: 'ew', text: 'ends with' }, { oper: 'en', text: 'does not end with' }, { oper: 'cn', text: 'contains' }, { oper: 'nc', text: 'does not contain' }, { oper: 'nu', text: 'is null' }, { oper: 'nn', text: 'is not null'}],
		//            {odata: ['equals', 'not equal', 'less', 'less or equal', 'greater', 'greater or equal', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
		//         {odata: ['equals','begins with'],
		closeAfterSearch: true, closeOnEscape: true
}, // search options
         {} // view options
          ).navButtonAdd('#smalltoolgridp', {
              caption: "Edit",
              buttonicon: "ui-icon-pencil",
              onClickButton: function() {
                  var data = $("#smalltoolgrid").getRowData(curSmallToolRow);
                  if (data.stID == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnSmallToolOper");
                      eID.value = "Edit";

                      $("#hdnSmallToolID").val('');
                      $("#txtSmallToolItem").val('');
                      $("#txtSmallToolDesc").val('');
                      $("#txtSmallToolSize").val('');
                      $("#txtSmallToolMfg").val('');
                      $("#txtSmallToolModelNum").val('');
                      $("#txtSmallToolSerNum").val('');
                      $("#txtSmallToolID").val('');
                      $("#ddlSmallToolCond").val('');
                      $("#ddlSmallToolShop").val('');
                      $("#dtSmallToolMngByDt").val('');
                      $("#dtSmallToolAsgnDt").val('');
                      $("#dtSmallToolRetDt").val('');
                      $("#txtSmallToolComment").val('');

                      $("#hdnSmallToolID").val(data.stID);
                      $("#txtSmallToolItem").val(data.item);
                      $("#txtSmallToolDesc").val(data.description);
                      $("#txtSmallToolSize").val(data.size);
                      $("#txtSmallToolMfg").val(data.MFG);
                      $("#txtSmallToolModelNum").val(data.model);
                      $("#txtSmallToolSerNum").val(data.sernum);
                      $("#txtSmallToolID").val(data.IDnum);
                      $("#ddlSmallToolCond").val(data.condition_descr);
                      $("#ddlSmallToolShop").val(data.inoutshop);
                      $("#dtSmallToolMngByDt").val(data.managed_by_dt);
                      $("#dtSmallToolAsgnDt").val(data.assigned_dt);
                      $("#dtSmallToolRetDt").val(data.return_dt);
                      $("#txtSmallToolComment").val(data.comments);

                      $("#smalltool_dlg_results").html('');

                      OpenSmallToolEditDlg(data);
                  }
                  return false;

              },
              position: "first"
          }).navButtonAdd('#smalltoolgridp', {
              caption: "Delete",
              buttonicon: "ui-icon-trash",
              onClickButton: function() {
              $("#btnDelSmallTool").removeAttr("disabled", "disabled");
              $("#deleteSmallToolSuccess").hide();
              var data = $("#smalltoolgrid").getRowData(curSmallToolRow);
                  if (data.stID == null)
                      alert("  Please Select a Row!");
                  else {
                      var eID = document.getElementById("hdnSTID");
                      eID.value = data.stID;
                      $("#delete_smalltool_dlg").dialog('option', 'title', "Delete Small Tool: " + data.stID);
                      jQuery('#delete_smalltool_dlg').dialog('open');
                  }
                  return false;
              }
          }).navButtonAdd('#smalltoolgridp', {
              caption: "Add",
              buttonicon: "ui-icon-plus",
              onClickButton: function() {

                  var data = "";

                  var eID = document.getElementById("hdnSmallToolOper");
                  eID.value = "Add";

                  $("#hdnSmallToolID").val('');
                  $("#txtSmallToolItem").val('');
                  $("#txtSmallToolDesc").val('');
                  $("#txtSmallToolSize").val('');
                  $("#txtSmallToolMfg").val('');
                  $("#txtSmallToolModelNum").val('');
                  $("#txtSmallToolSerNum").val('');
                  $("#txtSmallToolID").val('');
                  $("#ddlSmallToolCond").val('');
                  $("#ddlSmallToolShop").val('');
                  $("#dtSmallToolMngByDt").val('');
                  $("#dtSmallToolAsgnDt").val('');
                  $("#dtSmallToolRetDt").val('');
                  $("#txtSmallToolComment").val('');

                  $("#smalltool_dlg_results").html('');

                  OpenSmallToolEditDlg(data);

                  return false;
              },
              position: "first"
          });

        $('#smalltoolgridp_center').remove();
        $('#smalltoolgridp_right').remove();

        $(function() {
            $("#img_dialog").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });


        $(function() {
            $("#img_dialog_assign").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#rpt_dialog").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#delete_tool_dlg").dialog({
                bgiframe: true,
                width: 340,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#delete_smalltool_dlg").dialog({
                bgiframe: true,
                width: 340,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#delete_equip_dlg").dialog({
                bgiframe: true,
                width: 340,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#export_dlg").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false
            });
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
            });
        });


        $(function() {
            $("#equip_svc_edit_dlg").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtEquipSvcDt').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtEquipSvcDt').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#tool_svc_edit_dlg").dialog({
                bgiframe: true,
                width: 540,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtToolSvcDt').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtToolSvcDt').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#equip_asgn_edit_dlg").dialog({
                bgiframe: true,
                width: 450,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtEquipAsgnDt').datepicker('enable');
                    $('#dtEquipRetDt').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtEquipAsgnDt').datepicker('hide');
                    $('#dtEquipRetDt').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#tool_asgn_edit_dlg").dialog({
                bgiframe: true,
                width: 450,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtToolAsgnDt').datepicker('enable');
                    $('#dtToolRetDt').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtToolAsgnDt').datepicker('hide');
                    $('#dtToolRetDt').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#equip_edit_dlg").dialog({
                bgiframe: true,
                width: 775,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {

                    $('#dtEquipInspDue').datepicker('enable');
                    $('#dtEquipMngByDt').datepicker('enable');
                    $('#dtEquipMilesDt').datepicker('enable');
                    $('#dtEquipTagExp').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtEquipInspDue').datepicker('hide');
                    $('#dtEquipMngByDt').datepicker('hide');
                    $('#dtEquipMilesDt').datepicker('hide');
                    $('#dtEquipTagExp').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#tool_edit_dlg").dialog({
                bgiframe: true,
                width: 600,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtToolMngByDt').datepicker('enable');
                    $('#dtCalibrationDue').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtToolMngByDt').datepicker('hide');
                    $('#dtCalibrationDue').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#smalltool_edit_dlg").dialog({
                bgiframe: true,
                width: 660,
                modal: true,
                autoOpen: false,
                resizable: false,
                open: function(event, ui) {
                    $('#dtSmallToolMngByDt').datepicker('enable');
                    $('#dtSmallToolAsgnDt').datepicker('enable');
                    $('#dtSmallToolRetDt').datepicker('enable');
                },
                close: function(event, ui) {
                    $('#dtSmallToolMngByDt').datepicker('hide');
                    $('#dtSmallToolAsgnDt').datepicker('hide');
                    $('#dtSmallToolRetDt').datepicker('hide');
                }
            });
        });

        $(function() {
            $("#admin_dialog").dialog({
                bgiframe: true,
                width: 600,
                height: 315,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_loc_dlg").dialog({
                bgiframe: true,
                width: 600,
                height: 315,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_users_dlg").dialog({
                bgiframe: true,
                width: 650,
                height: 325,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_xfer_assignments").dialog({
                bgiframe: true,
                width: 1050,
                height: 625,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_assignto_dlg").dialog({
                bgiframe: true,
                width: 700,
                height: 350,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_svc_dlg").dialog({
                bgiframe: true,
                width: 600,
                height: 330,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#admin_id_dlg").dialog({
                bgiframe: true,
                width: 600,
                height: 330,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $(function() {
            $("#help_popup").dialog({
                bgiframe: true,
                width: 300,
                height: 300,
                modal: true,
                autoOpen: false,
                resizable: false
            });
        });

        $('#adminidform').ajaxForm(function(data) {

        });

        $('#equip_svc_edit_form').ajaxForm(function(data) {

            var respArray = data.split(",");
            jQuery('#equip_svc_loading').hide();

            if (respArray[0] == "Success") {

                jQuery("#equip_svc_success").html('Save Successful!');

                jQuery("#equip_svc_success").show();
                jQuery("#equip_svc").trigger('reloadGrid');

                jQuery("#equipgrid").setRowData(curRow, { miles_hours: respArray[1], miles_dt: respArray[2] });


                if ($('#chkEquipSvcDue').prop('checked') == true) {
                    jQuery("#equipgrid").setRowData(curRow, { service_due_num: respArray[3] });
                    jQuery("#equipgrid").setCell(curRow, 'service_due_num', '', { color: 'black' });
                }

                return [true, respArray[0]];
            }
            else {
                jQuery("#equip_svc_success").html(respArray[0]);
                jQuery("#equip_svc_success").show();
                return [false, respArray[0]];
            }
        });


        $('#tool_svc_edit_form').ajaxForm(function(data) {

            var respArray = data.split(",");

            jQuery('#tool_svc_loading').hide();

            if (data == "Success") {
                jQuery("#tool_svc_success").show();
                jQuery("#tool_svc").trigger('reloadGrid');

                return [true, respArray[0]];
            }
            else {
                return [false, respArray[0]];
            }
        });

        $('#equip_asgn_edit_form').ajaxForm(function(data) {

            var respArray = data.split(",");

            jQuery('#equip_asgn_loading').hide();

            if (respArray[0] == "Success") {
                jQuery("#equip_asgn_success").show();
                jQuery("#equip_asgn").trigger('reloadGrid');

                jQuery("#equipgrid").setRowData(curRow, { miles_hours: respArray[1], miles_dt: respArray[2] });

                if ($("#dtEquipAsgnDt").val() != "" && $("#dtEquipRetDt").val() == "") {
                    jQuery("#equipgrid").setCell(curRow, 'equip_id', '', { color: 'black' });
                    jQuery("#equipgrid").setRowData(curRow, { equip_assign_color: 'OK' });
                    curEquipAssignColor = "OK";
                }
                else if ($("#dtEquipRetDt").val() != "") {
                    jQuery("#equipgrid").setCell(curRow, 'equip_id', '', { color: 'green' });
                    jQuery("#equipgrid").setRowData(curRow, { equip_assign_color: 'SET_GREEN' });
                    curEquipAssignColor = "SET_GREEN";
                }

                return [true, respArray[0]];
            }
            else {
                return [false, respArray[0]];
            }
            return [true, respArray[0]];
        });

        $('#tool_asgn_edit_form').ajaxForm(function(data) {

            jQuery('#tool_asgn_loading').hide();

            if (data == "Success") {
                jQuery("#tool_asgn_success").show();
                jQuery("#tool_asgn").trigger('reloadGrid');

                if ($("#dtToolAsgnDt").val() != "" && $("#dtToolRetDt").val() == "") {
                    jQuery("#toolgrid").setCell(curToolRow, 'tool_id', '', { color: 'black' });
                    jQuery("#toolgrid").setRowData(curToolRow, { tool_assign_color: 'OK' });
                    curToolAssignColor = "OK";
                }
                else if ($("#dtToolRetDt").val() != "") {
                    jQuery("#toolgrid").setCell(curToolRow, 'tool_id', '', { color: 'green' });
                    jQuery("#toolgrid").setRowData(curToolRow, { tool_assign_color: 'SET_GREEN' });
                    curToolAssignColor = "SET_GREEN";
                }

                return [true, data];
            }
            else {
                return [false, data];
            }
            return [true, data];
        });

        $('#equip_edit_form').ajaxForm(function(data) {
            var respArray = data.split(",");
            jQuery('#equip_loading').hide();

            if (respArray[0] == "Success") {
                jQuery("#equip_success").html('Save Successful!');
                jQuery("#equip_success").show();

                var equipID = $('#txtEquipID').val();
                var equipMake = $("#ddlEquipMake option:selected").text();
                var equipModel = $("#ddlEquipModel option:selected").text();
                var equipType = $("#ddlEquipType option:selected").text();
                var equipRegBy = $("#ddlEquipRegBy option:selected").text();
                var equipMngBy = $("#ddlEquipMngBy option:selected").text();
                var equipLoc = $("#ddlEquipLoc option:selected").text();
                var txtEquipYear = $("#txtEquipYear").val();
                var dtEquipInspDue = $("#dtEquipInspDue").val();
                var dtEquipMngByDt = $("#dtEquipMngByDt").val();
                var txtEquipMilesHours = $("#txtEquipMilesHours").val();
                var dtEquipMilesDt = $("#dtEquipMilesDt").val();
                var txtEquipSvcDue = $("#txtEquipSvcDue").val();
                var dtEquipTagExp = $("#dtEquipTagExp").val();
                var txtEquipVIN = $("#txtEquipVIN").val();
                var txtEquipTitleNum = $("#txtEquipTitleNum").val();
                var txtEquipTagNum = $("#txtEquipTagNum").val();
                var txtEquipGVW = $("#txtEquipGVW").val();
                var txtEquipGCW = $("#txtEquipGCW").val();
                var txtEquipUnlaidenWt = $("#txtEquipUnlaidenWt").val();
                var ddlTagSt = $("#ddlTagSt").val();
                var ddlFuel = $("#ddlFuel option:selected").text();
                var txtCost = $("#txtCost").val();
                var txtCurrentValue = $("#txtCurrentValue").val();
                var ddlInspRmndr = $("#ddlInspRmndr").val();
                var ddlTagRmndr = $("#ddlTagRmndr").val();
                var txtEquipComment = $("#txtEquipComment").val();

                var ddlOtherAntiTheftTypes = $("#ddlOtherAntiTheftTypes option:selected").text();

                var chkOtherAntiTheft;
                if ($('#chkOtherAntiTheft').prop('checked') == true) {
                    chkOtherAntiTheft = "True";
                }
                else {
                    chkOtherAntiTheft = "False";
                }
                
                var chkEquipSold;
                if ($('#chkEquipSold').prop('checked') == true) {
                    chkEquipSold = "True";
                }
                else {
                    chkEquipSold = "False";
                }
                var chkEquipToBeSold;
                if ($('#chkEquipToBeSold').prop('checked') == true) {
                    chkEquipToBeSold = "True";
                }
                else {
                    chkEquipToBeSold = "False";
                }
                var chkEquipStolen;
                if ($('#chkEquipStolen').prop('checked') == true) {
                    chkEquipStolen = "True";
                }
                else {
                    chkEquipStolen = "False";
                }
                var chkEquipLojack;
                if ($('#chkEquipLojack').prop('checked') == true) {
                    chkEquipLojack = "True";
                }
                else {
                    chkEquipLojack = "False";
                }
                var chkEquipUnknown;
                if ($('#chkEquipUnknown').prop('checked') == true) {
                    chkEquipUnknown = "True";
                }
                else {
                    chkEquipUnknown = "False";
                }
                var chkEquipLeased;
                if ($('#chkEquipLeased').prop('checked') == true) {
                    chkEquipLeased = "True";
                }
                else {
                    chkEquipLeased = "False";
                }
                var chkEquipInRepair;
                if ($('#chkEquipInRepair').prop('checked') == true) {
                    chkEquipInRepair = "True";
                }
                else {
                    chkEquipInRepair = "False";
                }
                var chkEquipTotaled;
                if ($('#chkEquipTotaled').prop('checked') == true) {
                    chkEquipTotaled = "True";
                }
                else {
                    chkEquipTotaled = "False";
                }
                var chkHUTSticker;
                if ($('#chkHUTSticker').prop('checked') == true) {
                    chkHUTSticker = "True";
                }
                else {
                    chkHUTSticker = "False";
                }
                var chkApportioned;
                if ($('#chkEquipApportioned').prop('checked') == true) {
                    chkApportioned = "True";
                }
                else {
                    chkApportioned = "False";
                }
                var chkIFTASticker;
                if ($('#chkIFTASticker').prop('checked') == true) {
                    chkIFTASticker = "True";
                }
                else {
                    chkIFTASticker = "False";
                }
                var chkEquipGPS;
                if ($('#chkEquipGPS').prop('checked') == true) {
                    chkEquipGPS = "True";
                }
                else {
                    chkEquipGPS = "False";
                }
                var chkEquipEZPASS;
                if ($('#chkEquipEZPASS').prop('checked') == true) {
                    chkEquipEZPASS = "True";
                }
                else {
                    chkEquipEZPASS = "False";
                }
                var chkEquipFuelCard;
                if ($('#chkEquipFuelCard').prop('checked') == true) {
                    chkEquipFuelCard = "True";
                }
                else {
                    chkEquipFuelCard = "False";
                }

                var txtEZPASSNum = $('#txtEZPASSNum').val();
                var txtGPSNum = $('#txtGPSNum').val();
                var txtFuelCardNum = $('#txtFuelCardNum').val();

                var dataArray = { equip_id: equipID,
                    equip_year: txtEquipYear,
                    type_desc: equipType,
                    make_descr: equipMake,
                    model_descr: equipModel,
                    work_loc: equipLoc,
                    insp_due_dt: dtEquipInspDue,
                    service_due_num: txtEquipSvcDue,
                    miles_hours: txtEquipMilesHours,
                    miles_dt: dtEquipMilesDt,
                    registered_by: equipRegBy,
                    managed_by: equipMngBy,
                    managed_by_dt: dtEquipMngByDt,
                    tag_expire_dt: dtEquipTagExp,
                    vin_num: txtEquipVIN,
                    title_num: txtEquipTitleNum,
                    gross_v_wt: txtEquipGVW,
                    unlaiden_wt: txtEquipUnlaidenWt,
                    tag_num: txtEquipTagNum,
                    tag_state: ddlTagSt,
                    fuel_descr: ddlFuel,
                    cost: txtCost,
                    insp_rmdr_wks: ddlInspRmndr,
                    tag_expire_rmdr_wks: ddlTagRmndr,
                    stolen: chkEquipStolen,
                    sold: chkEquipSold,
                    lojack: chkEquipLojack,
                    in_repair: chkEquipInRepair,
                    totaled: chkEquipTotaled,
                    hut_sticker: chkHUTSticker,
                    apportioned: chkApportioned,
                    ifta_sticker: chkIFTASticker,
                    gps: chkEquipGPS,
                    comment: txtEquipComment,
                    unknown: chkEquipUnknown,
                    current_value: txtCurrentValue,
                    leased: chkEquipLeased,
                    gross_c_wt: txtEquipGCW,
                    gps_num: txtGPSNum,
                    ezpass: chkEquipEZPASS,
                    ezpass_num: txtEZPASSNum,
                    fuelcard: chkEquipFuelCard,
                    fuelcard_num: txtFuelCardNum,
                    to_be_sold: chkEquipToBeSold,
                    other_antitheft: chkOtherAntiTheft,
                    other_antitheft_type: ddlOtherAntiTheftTypes
                };

                var oper = $('#hdnEditOper').val();

                if (chkEquipSold == "True" || chkEquipStolen == "True" || chkEquipInRepair == "True" || chkEquipTotaled == "True" || chkEquipUnknown == "True" || chkEquipToBeSold == "True") {
                    jQuery("#equipgrid").delRowData(curRow);
                }
                else if (oper == "Edit") {

                    jQuery("#equipgrid").setRowData(curRow, dataArray);

                }
                else {
                    if (curRow == null) {
                        jQuery("#equipgrid").addRowData(equipID, dataArray, "first");
                    }
                    else {
                        jQuery("#equipgrid").addRowData(equipID, dataArray, "after", curRow);
                    }

                    jQuery("#equipgrid").setCell(equipID, 'equip_id', '', { color: 'green' });
                    $("#btnSaveEquip").attr("disabled", "disabled");
                    $("#txtEquipID").attr("disabled", "disabled");
                }

                if (respArray[1] == equipRegBy && equipMngBy != "" && equipMngBy != respArray[1]) {
                    jQuery("#equipgrid").setCell(equipID, 'equip_id', '', { color: 'purple' });
                }

                //                return [true, data]
            }
            else {
                jQuery("#equip_success").html(respArray[0]);
                jQuery("#equip_success").show();
                //                return [false, data]
            }
            //            return [true, data]
        });


        $('#tool_edit_form').ajaxForm(function(data) {

            var respArray = data.split(",");
            jQuery('#tool_loading').hide();

            if (respArray[0] == "Success") {
                jQuery("#tool_dlg_success").show();

                var toolID = $('#txtToolID').val();
                var toolMfg = $("#ddlToolMfg option:selected").text();
                var toolType = $("#ddlToolType option:selected").text();
                var toolDesc = $("#ddlToolDesc option:selected").text();
                var toolSize = $("#ddlToolSize option:selected").text();
                var toolRegBy = $("#ddlToolRegBy option:selected").text();
                var toolMngBy = $("#ddlToolMngBy option:selected").text();
                var toolLoc = $("#ddlToolLoc option:selected").text();
                var txtToolYearPur = $("#txtToolYearPur").val();
                var dtToolMngByDt = $("#dtToolMngByDt").val();
                var dtCalibrationDue = $("#dtCalibrationDue").val();
                var CalibrationRmndr = $("#ddlCalibrationRmndr option:selected").text();
                var txtToolCost = $("#txtToolCost").val();
                var txtToolSerNum = $("#txtToolSerialNum").val();
                var txtToolModelNum = $("#txtToolModelNum").val();
                var txtToolComment = $("#txtToolComment").val();
                var chkToolSold;
                if ($('#chkToolSold').prop('checked') == true) {
                    chkToolSold = "True";
                }
                else {
                    chkToolSold = "False";
                }
                var chkToolToBeSold;
                if ($('#chkToolToBeSold').prop('checked') == true) {
                    chkToolToBeSold = "True";
                }
                else {
                    chkToolToBeSold = "False";
                }
                var chkToolElectrical;
                if ($('#chkToolElectrical').prop('checked') == true) {
                    chkToolElectrical = "True";
                }
                else {
                    chkToolElectrical = "False";
                }
                var chkToolLojack;
                if ($('#chkToolLojack').prop('checked') == true) {
                    chkToolLojack = "True";
                }
                else {
                    chkToolLojack = "False";
                }
                var chkToolUnknown;
                if ($('#chkToolUnknown').prop('checked') == true) {
                    chkToolUnknown = "True";
                }
                else {
                    chkToolUnknown = "False";
                }
                var chkToolInRepair;
                if ($('#chkToolInRepair').prop('checked') == true) {
                    chkToolInRepair = "True";
                }
                else {
                    chkToolInRepair = "False";
                }
                var chkToolStolen;
                if ($('#chkToolStolen').prop('checked') == true) {
                    chkToolStolen = "True";
                }
                else {
                    chkToolStolen = "False";
                }
                var chkToolTotaled;
                if ($('#chkToolTotaled').prop('checked') == true) {
                    chkToolTotaled = "True";
                }
                else {
                    chkToolTotaled = "False";
                }

                var dataArray = { tool_id: toolID,
                    tools_type_descr: toolType,
                    tools_descr_descr: toolDesc,
                    tool_mfg_descr: toolMfg,
                    size_descr: toolSize,
                    work_loc: toolLoc,
                    registered_by: toolRegBy,
                    managed_by: toolMngBy,
                    calibration_due_dt: dtCalibrationDue,
                    calibration_rmdr_wks: CalibrationRmndr,
                    managed_by_dt: dtToolMngByDt,
                    model_num: txtToolModelNum,
                    serial_num: txtToolSerNum,
                    year_pur: txtToolYearPur,
                    cost: txtToolCost,
                    stolen: chkToolStolen,
                    sold: chkToolSold,
                    electrical: chkToolElectrical,
                    lojack: chkToolLojack,
                    in_repair: chkToolInRepair,
                    totaled: chkToolTotaled,
                    comment: txtToolComment,
                    unknown: chkToolUnknown,
                    to_be_sold: chkToolToBeSold
                };

                var oper = $('#hdnToolOper').val();

                if (chkToolSold == "True" || chkToolStolen == "True" || chkToolInRepair == "True" || chkToolTotaled == "True" || chkToolUnknown == "True" || chkToolToBeSold == "True") {
                    //                   alert(curToolRow);
                    jQuery("#toolgrid").delRowData(curToolRow);
                }
                else if (oper == "Edit") {

                    jQuery("#toolgrid").setRowData(curToolRow, dataArray);

                }
                else {
                    if (curToolRow == null) {
                        jQuery("#toolgrid").addRowData(toolID, dataArray, "first");
                    }
                    else {
                        jQuery("#toolgrid").addRowData(toolID, dataArray, "after", curToolRow);
                    }

                    jQuery("#toolgrid").setCell(toolID, 'tool_id', '', { color: 'green' });
                    $("#btnSaveToolDlg").attr("disabled", "disabled");
                    $("#txtToolID").attr("disabled", "disabled");
                }

                if (respArray[1] == toolRegBy && toolMngBy != "" && toolMngBy != respArray[1]) {
                    jQuery("#toolgrid").setCell(equipID, 'tool_id', '', { color: 'purple' });
                }

                return [true, data];
            }
            else {
                jQuery("#tool_dlg_success").html(respArray[0]);
                jQuery("#tool_dlg_success").show();
                return [false, data];
            }
            return [true, data];
        });

        $('#smalltool_edit_form').ajaxForm(function(data) {

            var respArray = data.split(",");
            jQuery('#smalltool_loading').hide();

            if (respArray[0] == "Success") {
                jQuery("#smalltool_dlg_success").show();
                var stoolID = respArray[2];
                var stoolMfg = $("#txtSmallToolMfg").val();
                var stoolType = $("#txtSmallToolItem").val();
                var stoolDesc = $("#txtSmallToolDesc").val();
                var stoolSize = $("#txtSmallToolSize").val();
                var stoolCond = $("#ddlSmallToolCond option:selected").text();
                var stoolRegBy = $("#ddlSmallToolRegBy option:selected").text();
                var stoolMngBy = $("#ddlSmallToolMngBy option:selected").text();
                var stoolAsgnTo = $("#ddlSmallToolAsgnTo option:selected").text();
                var stoolMFG = $("#txtSmallToolMfg").val();
                var stoolMngByDt = $("#dtSmallToolMngByDt").val();
                var stoolAsgnDt = $("#dtSmallToolAsgnDt").val();
                var stoolRetDt = $("#dtSmallToolRetDt").val();
                var stoolIDNum = $("#txtSmallToolID").val();
                var stoolSerNum = $("#txtSmallToolSerNum").val();
                var stoolModelNum = $("#txtSmallToolModelNum").val();
                var stoolComment = $("#txtSmallToolComment").val();
                var stoolShop = $("#ddlSmallToolShop option:selected").text();
                var dataArray = { stID: stoolID,
                    description: stoolDesc,
                    size: stoolSize,
                    MFG: stoolMfg,
                    item: stoolType,
                    reg_by: stoolRegBy,
                    assigned_to: stoolAsgnTo,
                    condition_descr: stoolCond,
                    managed_by: stoolMngBy,
                    managed_by_dt: stoolMngByDt,
                    model: stoolModelNum,
                    sernum: stoolSerNum,
                    assigned_dt: stoolAsgnDt,
                    return_dt: stoolRetDt,
                    IDnum: stoolIDNum,
                    comments: stoolComment,
                    inoutshop: stoolShop
                };

                var oper = $('#hdnSmallToolOper').val();

                if (oper == "Edit") {

                    jQuery("#smalltoolgrid").setRowData(curSmallToolRow, dataArray);

                }
                else {

                    stoolID = respArray[2];

                    if (curSmallToolRow == null) {
                        jQuery("#smalltoolgrid").addRowData(stoolID, dataArray, "first");
                    }
                    else {
                        jQuery("#smalltoolgrid").addRowData(stoolID, dataArray, "after", curSmallToolRow);
                    }

                    $("#btnSmallToolSave").attr("disabled", "disabled");
                }

                if (stoolShop == 'OUT')
                    jQuery("#smalltoolgrid").setCell(stoolID, 'item', '', { color: 'black' });
                else
                    jQuery("#smalltoolgrid").setCell(stoolID, 'item', '', { color: 'green' });
                if (respArray[1] == stoolRegBy && stoolMngBy != "" && stoolMngBy != respArray[1]) {
                    jQuery("#smalltoolgrid").setCell(stoolID, 'item', '', { color: 'purple' });
                }


                return [true, respArray[0]];
            }
            else {
                jQuery("#smalltool_dlg_success").html(respArray[0]);
                jQuery("#smalltool_dlg_success").show();
                return [false, respArray[0]];
            }
            return [true, respArray[0]];
        });

        $('#adminDlgForm').ajaxForm(function(data) {

            var respArray = data.split(",");

            if (respArray[0] == "Success") {

                jQuery("#admingrid").trigger("reloadGrid");

                jQuery("#adminSuccess").show();
                jQuery("#adminSuccess").html("Successfully saved.");
                jQuery("#adminSuccess").fadeOut(6000);

                if (respArray[1] == "YesAddType") {
                    alert('Reminder: Set new service due parameters for this new equipment type!');
                }

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

        $('#adminsvcform').ajaxForm(function(data) {

            if (data == "Success") {

                jQuery("#adminsvcgrid").trigger("reloadGrid");

                jQuery("#adminSvcSuccess").show();
                jQuery("#adminSvcSuccess").html("Successfully saved.");
                jQuery("#adminSvcSuccess").fadeOut(6000);

            }
            else {
                jQuery("#adminSvcSuccess").show();
                jQuery("#adminSvcSuccess").html("Error saving.");
                jQuery("#adminSvcSuccess").fadeOut(6000);

            }

        });

        $('#deleteToolForm').ajaxForm(function(data) {

            if (data == "Success") {
                jQuery("#deleteToolSuccess").show();
                jQuery("#deleteToolSuccess").html("Tool Deleted.");
                jQuery("#toolgrid").delRowData(curToolRow);
                $("#btnDelTool").attr("disabled", "disabled");
                
            }
            else {
                jQuery("#deleteToolSuccess").show();
                jQuery("#deleteToolSuccess").html("Error Deleting.");
            }

        });

        $('#deleteSmallToolForm').ajaxForm(function(data) {

            if (data == "Success") {
                jQuery("#deleteSmallToolSuccess").show();
                jQuery("#deleteSmallToolSuccess").html("Small Tool Deleted.");
                jQuery("#smalltoolgrid").delRowData(curSmallToolRow);
                $("#btnDelSmallTool").attr("disabled", "disabled");
            }
            else {
                jQuery("#deleteSmallToolSuccess").show();
                jQuery("#deleteSmallToolSuccess").html("Error Deleting.");
            }

        });

        $('#deleteEquipForm').ajaxForm(function(data) {

            if (data == "Success") {
                jQuery("#deleteEquipSuccess").show();
                jQuery("#deleteEquipSuccess").html("Equipment Deleted.");
                jQuery("#equipgrid").delRowData(curRow);
                $("#btnDelEquip").attr("disabled", "disabled");
            }
            else {
                jQuery("#deleteEquipSuccess").show();
                jQuery("#deleteEquipSuccess").html("Error Deleting.");
            }

        });

        $('#xfer_assignments_form').ajaxForm(function(data) {

            if (data == "Success") {

                jQuery("#adminxferassignments").trigger("reloadGrid");
                jQuery("#adminxfertoolassigns").trigger("reloadGrid");
                jQuery("#adminxfersmalltoolassigns").trigger("reloadGrid");

                $('.cbox').trigger('click').removeAttr('checked');

                jQuery("#xfrer_assign_success").show();
                jQuery("#xfrer_assign_success").html("Successfully Transferred Assignments.");
                jQuery("#xfrer_assign_success").fadeOut(6000);

            }
            else {
                jQuery("#xfrer_assign_success").show();
                jQuery("#xfrer_assign_success").html("Error Transferring Assignments.");
                jQuery("#xfrer_assign_success").fadeOut(6000);

            }

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

        $('#imageDlgForm').ajaxForm(function(data) {
            var iID = document.getElementById("hdnImageType");
            var rdata;
            var id;
            if (iID.value == "TOOL") {
                rdata = $("#toolgrid").getRowData(curToolRow);
                id = rdata.tool_id;
                jQuery("#toolgrid").setCell(curToolRow, 'tool_id', '', { 'background-color': '#FFFFCC' });
            }
            else {
                rdata = $("#equipgrid").getRowData(curRow);
                id = rdata.equip_id;
                jQuery("#equipgrid").setCell(curRow, 'equip_id', '', { 'background-color': '#FFFFCC' });
            }

            $.get("/EquipTrack/GetEquipImages/" + id + "/" + iID.value, {}, function(data2) {
                $("#img_loading").hide();
                $("#img_results").html(data2);
                $("#btnSave").attr("disabled", "disabled");
            });

        });

        $('#imageAssgnBeforeDlgForm').ajaxForm(function(data) {
            var iID = document.getElementById("hdnAssignBeforeImageType");
            var rdata;
            if (iID.value == "TOOL") {
                rdata = $("#tool_asgn").getRowData(curToolRowAsgn);
                jQuery("#tool_asgn").setCell(curToolRowAsgn, 'tool_id', '', { 'background-color': '#FFFFCC' });
            }
            else {
                rdata = $("#equip_asgn").getRowData(curRowAsgn);
                jQuery("#equip_asgn").setCell(curRowAsgn, 'equip_id', '', { 'background-color': '#FFFFCC' });
            }

            //            $('loading').show()

            $.get("/EquipTrack/GetEquipImages/" + rdata.assign_id + "/" + iID.value + "_ASSIGN_B", {}, function(data2) {
                $("#img_assign_loading").hide();
                $("#img_assign_before_results").html(data2);
                $("#btnSaveBefore").attr("disabled", "disabled");

            });
        });

        $('#imageAssgnAfterDlgForm').ajaxForm(function(data) {
            var iID = document.getElementById("hdnAssignAfterImageType");
            var rdata;
            var type;

            if (iID.value == "TOOL") {
                rdata = $("#tool_asgn").getRowData(curToolRowAsgn);
                type = "TOOL_ASSIGN_A";
                jQuery("#tool_asgn").setCell(curToolRowAsgn, 'tool_id', '', { 'background-color': '#FFFFCC' });
            }
            else {
                rdata = $("#equip_asgn").getRowData(curRowAsgn);
                type = "EQUIP_ASSIGN_A";
                jQuery("#equip_asgn").setCell(curRowAsgn, 'equip_id', '', { 'background-color': '#FFFFCC' });
            }
            $.get("/EquipTrack/GetEquipImages/" + rdata.assign_id + "/" + type, {}, function(data2) {
                $("#img_assign_loading").hide();
                $("#img_assign_after_results").html(data2);
                $("#btnSaveAfter").attr("disabled", "disabled");

                //            $('loading').hide()    
            });
        });

    });
    
    function DeleteImage(id) {
        if (confirm("Are you sure you want to remove this image?")) {
            $.post("/EquipTrack/DeleteImage/" + id, {},
                            function(data) {
                                var iID = document.getElementById("hdnImageType");
                                var rdata;
                                var id;
                                if (iID.value == "TOOL") {
                                    rdata = $("#toolgrid").getRowData(curToolRow);
                                    id = rdata.tool_id;
                                }
                                else {
                                    rdata = $("#equipgrid").getRowData(curRow);
                                    id = rdata.equip_id;
                                }

                                $.get("/EquipTrack/GetEquipImages/" + id + "/" + iID.value, {}, function(data2) {
                                    $("#img_results").html(data2);
                                });
                            });
        }
    };


    function DeleteAssignBeforeImage(id) {
        if (confirm("Are you sure you want to remove this image?")) {
            $.post("/EquipTrack/DeleteImage/" + id, {},
                            function(data) {
                                var iID = document.getElementById("hdnAssignBeforeImageType");
                                var rdata;
                                var type;
                                if (iID.value == "TOOL") {
                                    rdata = $("#tool_asgn").getRowData(curToolRowAsgn);
                                    type = "TOOL_ASSIGN_B";
                                }
                                else {
                                    rdata = $("#equip_asgn").getRowData(curRowAsgn);
                                    type = "EQUIP_ASSIGN_B";
                                }
                                $.get("/EquipTrack/GetEquipImages/" + rdata.assign_id + "/" + type, {}, function(data2) {
                                    $("#img_assign_before_results").html(data2);
                                });
                            });
        }
    };
    
    function DeleteAssignAfterImage(id) {
        if (confirm("Are you sure you want to remove this image?")) {
            $.post("/EquipTrack/DeleteImage/" + id, {},
                            function(data) {
                                var iID = document.getElementById("hdnAssignAfterImageType");
                                var rdata;
                                var type;

                                if (iID.value == "TOOL") {
                                    rdata = $("#tool_asgn").getRowData(curToolRowAsgn);
                                    type = "TOOL_ASSIGN_A";
                                }
                                else {
                                    rdata = $("#equip_asgn").getRowData(curRowAsgn);
                                    type = "EQUIP_ASSIGN_A";
                                }
                                $.get("/EquipTrack/GetEquipImages/" + rdata.assign_id + "/" + type, {}, function(data2) {
                                    $("#img_assign_after_results").html(data2);
                                });
                            });
        }
    };

    function OpenEquipEditSvcDlg(dta) {

        var oper = $('#hdnSvcEditOper').val();

        if (oper == 'Add') {
            $("#btnSaveEquipSvc").attr("disabled", "disabled");
        }
        else {

            $("#btnSaveEquipSvc").removeAttr("disabled", "disabled");
        }

        $("#equip_svc_success").hide();
        $("#equip_svc_loading").hide();
//        $("#equip_svc_edit_dlg").dialog('option', 'title', oper + " Equipment Service")
        $("#equip_svc_edit_dlg").dialog('option', 'title', oper + " Equipment Service");

        $('#txtEquipSvcID').val(dta.equip_id);
        $("#txtEquipSvcID").attr("disabled", "disabled");

        $('#dtEquipSvcDt').val('');
        $('#dtEquipSvcDt').datepicker('disable');
        $('#dtEquipSvcDt').val(dta.service_dt);

        $("#txtEquipSvcMiles").numeric();

        jQuery('#equip_svc_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetEquipSvcEditDlg/", {}, function(data) {
        $("#equip_svc_results").html(data);
            if(dta.serv_descr.length > 0 )  
                $("#lstEquipSvcTypes option:econtains(" + dta.serv_descr + ")").prop('selected', 'selected');
        });

    }

    function OpenToolSvcDlg(dta) {

        var oper = $('#hdnToolSvcOper').val();

        if (oper == 'Add') {
            $("#btnSaveToolSvc").attr("disabled", "disabled");
        }
        else {

            $("#btnSaveToolSvc").removeAttr("disabled", "disabled");
        }

        $("#tool_svc_success").hide();
        $("#tool_svc_loading").hide();
//        $("#tool_svc_edit_dlg").dialog('option', 'title', oper + " Tool Service")
        $("#tool_svc_edit_dlg").dialog('option', 'title', oper + " Tool Service");

        $('#txtToolSvcID').val(dta.tool_id);
        $("#txtToolSvcID").attr("disabled", "disabled");

        $('#dtToolSvcDt').val('');
        $('#dtToolSvcDt').datepicker('disable');
        $('#dtToolSvcDt').val(dta.service_dt);

        jQuery('#tool_svc_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetToolSvcEditDlg/", {}, function(data) {
        $("#tool_svc_results").html(data);
        if (dta.serv_descr.length > 0)
            $("#lstToolSvcTypes option:econtains(" + dta.serv_descr + ")").prop('selected', 'selected');
        });

    }

    function OpenEquipEditAsgnDlg(dta) {

        var oper = $('#hdnAsgnEditOper').val();

        if (oper == 'Add') {
            $("#btnEquipAsgnSave").attr("disabled", "disabled");
        }
        else {

            $("#btnEquipAsgnSave").removeAttr("disabled", "disabled");
        }
        
        $("#equip_asgn_success").hide();
        $("#equip_asgn_loading").hide();
//        $("#equip_asgn_edit_dlg").dialog('option', 'title', oper + " Equipment Assigment")
        $("#equip_asgn_edit_dlg").dialog('option', 'title', oper + " Equipment Assigment");

        $('#txtEquipAsgnID').val(dta.equip_id);
        $("#txtEquipAsgnID").attr("disabled", "disabled");

        $('#dtEquipAsgnDt').val('');
        $('#dtEquipAsgnDt').datepicker('disable');
        $('#dtEquipAsgnDt').val(dta.assigned_dt);

        $('#dtEquipRetDt').val('');
        $('#dtEquipRetDt').datepicker('disable');
        $('#dtEquipRetDt').val(dta.return_dt);

        jQuery('#equip_asgn_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetEquipAsgnEditDlg/", {}, function(data) {
            $("#equip_asgn_results").html(data);
            //            $("#ddlAssignedTo option:econtains(" + dta.assigned_to + ")").prop('selected', 'selected');
            $('#ddlAssignedTo').val(dta.assigned_to);
        });

    }

    function OpenToolAsgnDlg(dta) {

        var oper = $('#hdnToolAsgnOper').val();

        if (oper == 'Add') {
            $("#btnSaveToolAssign").attr("disabled", "disabled");
        }
        else {

            $("#btnSaveToolAssign").removeAttr("disabled", "disabled");
        }

        $("#tool_asgn_success").hide();
        $("#tool_asgn_loading").hide();
//        $("#tool_asgn_edit_dlg").dialog('option', 'title', oper + " Tool Assigment")
        $("#tool_asgn_edit_dlg").dialog('option', 'title', oper + " Tool Assigment");

        $('#txtToolAsgnID').val(dta.tool_id);
        $("#txtToolAsgnID").attr("disabled", "disabled");

        $('#dtToolAsgnDt').val('');
        $('#dtToolAsgnDt').datepicker('disable');
        $('#dtToolAsgnDt').val(dta.assigned_dt);

        $('#dtToolRetDt').val('');
        $('#dtToolRetDt').datepicker('disable');
        $('#dtToolRetDt').val(dta.return_dt);

        jQuery('#tool_asgn_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetToolAsgnEditDlg/", {}, function(data) {
            $("#tool_asgn_results").html(data);
            $('#ddlToolAssignedTo').val(dta.assigned_to);
        });

    }

    function OpenEquipEditDlg(dta) {

        $("#btnSaveEquip").removeAttr("disabled", "disabled");
        var oper = $('#hdnEditOper').val();

        $("#equip_success").html("Save Successful!");
        $("#equip_success").hide();
        $("#equip_loading").hide();
        
//        $("#equip_edit_dlg").dialog('option', 'title', oper + " Equipment")
        $("#equip_edit_dlg").dialog('option', 'title', oper + " Equipment");

        if (oper == "Edit") {
            $('#txtEquipID').val(dta.equip_id);
            $("#txtEquipID").attr("disabled", "disabled");
        }
        else {
            $('#txtEquipID').val('');
            $("#txtEquipID").removeAttr("disabled", "disabled");
//            $("#txtEquipID").alphanumeric({ichars:'. /&*$%@_+!'});
        }

        var chval = $("#chkEquipGPS").prop('checked');

        if (chval == true) {
            $("#txtGPSNum").removeAttr("disabled", "disabled");
            $('#divGPS').css('color', 'black');
        }
        else {
            $('#txtGPSNum').val('');
            $("#txtGPSNum").attr("disabled", "disabled");
            $('#divGPS').css('color', 'gray');
        }

        var chval2 = $("#chkEquipEZPASS").prop('checked');

        if (chval2 == true) {
            $("#txtEZPASSNum").removeAttr("disabled", "disabled");
            $('#divEZPASS').css('color', 'black');
        }
        else {
            $("#txtEZPASSNum").attr("disabled", "disabled");
            $('#divEZPASS').css('color', 'gray');
        }

        var chval3 = $("#chkEquipFuelCard").prop('checked');

        if (chval3 == true) {
            $("#txtFuelCardNum").removeAttr("disabled", "disabled");
            $("#ddlFuelCardLoc").removeAttr("disabled", "disabled");
            $('#divFuelCard').css('color', 'black');
        }
        else {
            $("#txtFuelCardNum").attr("disabled", "disabled");
            $("#ddlFuelCardLoc").attr("disabled", "disabled");
            $('#divFuelCard').css('color', 'gray');
        }

        var chval4 = $("#chkOtherAntiTheft").prop('checked');

        if (chval4 == true) {
            $("#ddlOtherAntiTheftTypes").removeAttr("disabled", "disabled");
        }
        else {
            $("#ddlOtherAntiTheftTypes").attr("disabled", "disabled");
        }

        

        jQuery('#equip_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetEquipEditDlg/", {}, function(data) {
            $("#equip_results").html(data);
            if (oper == "Edit") {
                if(dta.make_descr.length != 0)
                    $("#ddlEquipMake option:econtains(" + dta.make_descr + ")").prop('selected', 'selected');
                if (dta.model_descr.length != 0)
                    $("#ddlEquipModel option:econtains(" + dta.model_descr + ")").prop('selected', 'selected');
                if (dta.type_desc.length != 0)
                    $("#ddlEquipType option:econtains(" + dta.type_desc + ")").prop('selected', 'selected');
                $('#ddlEquipLoc').val(dta.work_loc);
                $('#ddlEquipRegBy').val(dta.registered_by);
                $('#hdnEquipRegBy').val(dta.registered_by);
                $('#ddlEquipMngBy').val(dta.managed_by);
            }
        });

    }

    function OpenToolEditDlg(dta) {

        $("#btnSaveToolDlg").removeAttr("disabled", "disabled");
        var oper = $('#hdnToolOper').val();

        $("#tool_dlg_success").html("Save Successful!");
        $("#tool_dlg_success").hide();
        $("#tool_loading").hide();

//        $("#tool_edit_dlg").dialog('option', 'title', oper + " Tool")
        $("#tool_edit_dlg").dialog('option', 'title', oper + " Tool");


        if (oper == "Edit") {
            $('#txtToolID').val(dta.tool_id);
            $("#txtToolID").attr("disabled", "disabled");
        }
        else {
            $('#txtToolID').val('');
            $("#txtToolID").removeAttr("disabled", "disabled");
//            $("#txtToolID").alphanumeric({ ichars: '. /&*$%@_+!' });
        }
        
        
        $('#dtToolMngByDt').val('');
        $('#dtToolMngByDt').datepicker('disable');
        $('#dtToolMngByDt').val(dta.managed_by_dt);

        $('#dtCalibrationDue').val('');
        $('#dtCalibrationDue').datepicker('disable');
        $('#dtCalibrationDue').val(dta.calibration_due_dt);

        jQuery('#tool_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetToolEditDlg/", {}, function(data) {
            $("#tool_dlg_results").html(data);
            if (oper == "Edit") {
                if (dta.tool_mfg_descr.length != 0)
                    $("#ddlToolMfg option:econtains(" + dta.tool_mfg_descr + ")").prop('selected', 'selected');
                if (dta.tools_type_descr.length != 0)
                    $("#ddlToolType option:econtains(" + dta.tools_type_descr + ")").prop('selected', 'selected');
                if (dta.tools_descr_descr.length != 0)
                    $("#ddlToolDesc option:econtains(" + dta.tools_descr_descr + ")").prop('selected', 'selected');
                if (dta.size_descr.length != 0)
                    $("#ddlToolSize option:econtains(" + dta.size_descr + ")").prop('selected', 'selected');
                $('#ddlToolLoc').val(dta.work_loc);
                $('#ddlToolRegBy').val(dta.registered_by);
                $('#ddlToolMngBy').val(dta.managed_by);
            }
        });

    }

    function OpenSmallToolEditDlg(dta) {
        $("#btnSmallToolSave").removeAttr("disabled", "disabled");
        var oper = $('#hdnSmallToolOper').val();

        $("#smalltool_dlg_success").html("Save Successful!");
        $("#smalltool_dlg_success").hide();
        $("#smalltool_loading").hide();

//        $("#smalltool_edit_dlg").dialog('option', 'title', oper + " Small Tool")
        $("#smalltool_edit_dlg").dialog('option', 'title', oper + " Small Tool");

        jQuery('#smalltool_edit_dlg').dialog('open');

        $.get("/EquipTrack/GetSmallToolEditDlg/", {}, function(data) {
            $("#smalltool_dlg_results").html(data);
            if (oper == "Edit") {
                $('#ddlSmallToolMngBy').val(dta.managed_by);
                $('#ddlSmallToolRegBy').val(dta.reg_by);
                $('#ddlSmallToolAsgnTo').val(dta.assigned_to);
            }
        });
    }

    function selectInDropdown(id, val) {

        for (var i = 0; i < id.length; i++) {


            if (id.options[i].value == val) {
                id.selectedIndex = i;
                break;
            }
        }
    }

