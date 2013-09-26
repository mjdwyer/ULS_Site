/*     jQuery("#empqualsgrid").jqGrid({
editurl: '/Qualification/EditEmp/',
datatype: 'json',
mtype: 'GET',
height: 100,
width: 740,
rowNum: 5000,
colNames: ['ID', 'Description', 'Company', 'Test Date', 'Expire Date', 'Evaluator'],
colModel: [
{ name: 'qualId', index: 'qualId', width: 65 },
{ name: 'qualDesc', index: 'qualDesc', width: 150 },
{ name: 'qualCompany', index: 'qualCompany', width: 65 },
{ name: 'qualDate', index: 'qualDate', width: 100 },
{ name: 'qualExpire', index: 'qualExpire', width: 100 },
{ name: 'evaluator', index: 'qualEvaluator', width: 80 }
],
sortname: 'qualId',
sortorder: "desc",
viewrecords: true,
pager: jQuery('#empqualsgridp'),
caption: 'Qualifications',
ondblClickRow: function(rowid) {
///             var data = $("#electronics_asgn").getRowData(curRowAsgn);
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
$("#ddlAsgnCond option:contains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

if (data.ret_condition_id.length > 0)
$("#ddlRetCond option:contains(" + data.ret_condition_id + ")").attr('selected', 'selected');

$('#txtElectronicsAsgnComments').val(data.comments);

$("#electronics_asgn_results").html('');

OpenElectronicsEditAsgnDlg(data);
}

return false;
///             
},
onSelectRow: function(ids) {
if (ids != null) {
curRowQuals = ids;
var data = $("#empqualsgrid").getRowData(curRowQuals);
var eIS = document.getElementById("hdnAsgnID");
eIS.value = data.assign_id;
}
}
}).navGrid('#empqualsgridp', { deltext: "Delete", edit: false, add: false, del: true, search: false, refresh: false }, //options
{}, // edit options
{}, // add options
{reloadAfterSubmit: false, closeOnEscape: true, closeAfterAdd: true //,
//          afterSubmit: function(response, postdata) {

//              if (response.responseText == "Success") {
//                  jQuery("#success").show();
//                  jQuery("#success").html("Assignment successfully deleted");
//                  jQuery("#success").fadeOut(6000);

//                  return [true, response.responseText]
//                  
//              }
//              else {
//                  return [false, response.responseText]
//              }
//          }
}, // del options
{}, // search options
{} // view options
).navButtonAdd('#empqualsgridp', {
caption: "Edit",
buttonicon: "ui-icon-pencil",
//               onClickButton: function() {
//                   var data = $("#electronics_asgn").getRowData(curRowAsgn);
//                   if (data.electronics_id == null)
//                       alert("  Please Select an Assignment Row!");
//                   else {
//                       var eID = document.getElementById("hdnAsgnEditOper");
//                       eID.value = "Edit";

//                       var eID = document.getElementById("hdnAsgnEditID");
//                       eID.value = data.electronics_id;

//                       $('#dtElectronicsAsgnDt').text('');
//                       $('#dtElectronicsRetDt').text('');
//                       $('#ddlAsgnCond').val('');
//                       $('#ddlRetCond').val('');
//                       $('#txtElectronicsAsgnComments').val('');


//                       $('#dtElectronicsAsgnDt').text(data.assigned_dt);
//                       $('#dtElectronicsRetDt').text(data.return_dt);

//                       if (data.asgn_condition_id.length > 0)
//                           $("#ddlAsgnCond option:contains(" + data.asgn_condition_id + ")").attr('selected', 'selected');

//                       if (data.ret_condition_id.length > 0)
//                           $("#ddlRetCond option:contains(" + data.ret_condition_id + ")").attr('selected', 'selected');

//                       $('#txtElectronicsAsgnComments').val(data.comments);

//                       $("#electronics_asgn_results").html('');

//                       OpenElectronicsEditAsgnDlg(data);
//                   }
//                   return false;
//               } //,
position: "first"
}).navButtonAdd('#empqualsgridp', {
caption: "Add",
buttonicon: "ui-icon-plus" ,
//               onClickButton: function() {
//                   var data = $("#electronicsgrid").getRowData(curRow);
//                   if (data.electronics_id == null)
//                       alert("  Please Select a Row!");
//                   else {
//                       var eID = document.getElementById("hdnAsgnEditOper");
//                       eID.value = "Add";

//                       var eID = document.getElementById("hdnAsgnEditID");
//                       eID.value = data.electronics_id;

//                       $('#dtElectronicsAsgnDt').text('');
//                       $('#dtElectronicsRetDt').text('');
//                       $('#ddlAsgnCond').val('');
//                       $('#ddlRetCond').val('');
//                       $('#txtElectronicsAsgnComments').val('');

//                       if (curElectronicsAssignColor == "SET_GREEN") {
//                           $("#electronics_asgn_results").html('');
//                           OpenElectronicsEditAsgnDlg(data);
//                       }
//                       else {
//                           alert('Currently selected electronics is already assigned!');
//                       }

//                   }
//                   return false;
//               },
position: "first"
});

$('#empqualsgridp').remove();
$('#empqualsgridp').remove();

*/          
