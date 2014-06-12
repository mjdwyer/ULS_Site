<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>



<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<link rel="stylesheet" type="text/css" media="screen" href="../../Content/jqGrid/jquery-ui-1.10.4.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="../../Content/ui.jqgrid.css" />
<!-- <link rel="stylesheet" type="text/css" media="screen" href="../../Content/jquery.searchFilter.css" /> -->

<script src="/Scripts/jqGrid/jquery-1.11.0.min.js" type="text/javascript"></script>

<script src="/Scripts/jqGrid/grid.locale-en.js" type="text/javascript"></script>

<script src="/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

<script type="text/javascript">
    jQuery(document).ready(function() {

        var mydata = [
{ id: "one", "name": "row one" },
{ id: "two", "name": "row two" },
{ id: "three", "name": "row three" }
];

        $("#equiptestgrid").jqGrid({ //set your grid id
        url: '/EquipTrack/GridData/',
        editurl: '/EquipTrack/Edit/',
        datatype: 'json',
        mtype: 'GET',
        hoverrows: false,
        altRows: false,
        height: 255,
        width: 740,
        rowNum: 5000,
        colNames: ['ID', 'Type', 'Make', 'Model', 'Year', 'Location', 'Insp Due', 'Serv Due', 'Miles/Hrs', 'Milage Dt', 'Reg By', 'Mngd By', 'Mngd By Dt', 'Tag Exp', '', '', '', '', 'Vin Num', 'Title Num', 'GVW', 'Unlaiden Wt', 'Tag Num', 'Tag State', 'Fuel', 'Cost', 'Inspect Rmndr(wks)', 'Tag Rmndr(wks)', 'Stolen', 'Sold', 'Lojack', 'In Repair', 'Totaled', 'Hut Sticker', 'Apportioned', 'IFTA Sticker', 'GPS', 'Comment', '', 'Unknown', 'Current Value', 'ImgCnt', 'Leased', 'GCW', '', '', '', '', '', 'To Be Sold', ''],
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
   		        { name: 'vin_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
   		        { name: 'title_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
                { name: 'gross_v_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'unlaiden_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'tag_num', hidden: true, editable: true, editrules: { edithidden: true }, searchoptions: { sopt: ['eq', 'bw', 'ew']} },
            { name: 'tag_state', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
		    { name: 'fuel_descr', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "select", editoptions: { dataUrl: '/EquipTrack/GetFuels' }, search: false },
            { name: 'cost', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
   		    { name: 'insp_rmdr_wks', hidden: true, editable: true, edittype: "select", editoptions: { value: ":;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24" }, editrules: { edithidden: true }, search: false },
            { name: 'tag_expire_rmdr_wks', editable: true, hidden: true, edittype: "select", editoptions: { value: ":;1:1;2:2;3:3;4:4;5:5;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20;21:21;22:22;23:23;24:24" }, editrules: { edithidden: true }, search: false },
            { name: 'stolen', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'lojack', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'in_repair', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'totaled', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'hut_sticker', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'apportioned', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'ifta_sticker', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'gps', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'comment', hidden: true, editable: true, editrules: { edithidden: true }, edittype: "textarea", editoptions: { rows: "2", cols: "27" }, search: false },
   		    { name: 'equip_assign_color', hidden: true, search: false },
            { name: 'unknown', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'current_value', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
   		    { name: 'img_cnt', hidden: true, search: false },
            { name: 'leased', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'gross_c_wt', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'gps_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'ezpass', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'ezpass_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'fuelcard', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'fuelcard_num', hidden: true, editable: true, editrules: { edithidden: true }, search: false },
            { name: 'to_be_sold', hidden: true, editable: true, edittype: "checkbox", editoptions: { value: "True:False" }, editrules: { edithidden: true }, search: true, stype: "select", searchoptions: { sopt: ['eq'], dataUrl: '/EquipTrack/TrueFalseDropdownData'} },
            { name: 'fuel_card_loc', hidden: true, editable: true, editrules: { edithidden: true }, search: false }
            ],
        pager: '#equiptestgridp', //set your pager div id
        sortname: 'equip_id', //the column according to which data is to be sorted; optional
            viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
            sortorder: "asc", //sort order; optional
            caption: "jqGrid Example" //title of grid
        });

    });
    
</script>

    <h2>EquipTest</h2>
        <table id="equiptestgrid" cellpadding="0" cellspacing="0"></table>
    <div id="equiptestgridp"  style="text-align:center"></div>
    

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="EquipHeadContent" runat="server">
</asp:Content>
