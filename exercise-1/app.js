

$(function () {
 
  $.get("https://5dc588200bbd050014fb8ae1.mockapi.io/assessment", function(res, status){
      var data= res;
      var source = $("#document-template").html();
      Handlebars.registerHelper("prettifyDate", function(timestamp) {
return new Date(timestamp).toString('yyyy-MM-dd')
});
var template = Handlebars.compile(source);

var html = template({
apidata: data
});

$('#DocumentResults').html(html)
});

})
function showDetails(id){
$("#userdetail-"+id).show();
$("#show-detail-"+id).hide();
}
function deleteUser(id){
if (!confirm("Do you want to delete")){
return false;
}
$.ajax({
url: 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment/'+id,
type: 'DELETE',
success: function(result) {
location.reload();
}
});
}