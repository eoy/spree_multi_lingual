//= require admin/spree_backend
//= require admin/spree_multi_lingual_class
var handle_rename = function(e, data) {
  last_rollback = data.rlbk;
  var node = data.rslt.obj;
  var name = data.rslt.new_name;
  var params = {_method: "put", "taxon[name]": name, authenticity_token: AUTH_TOKEN};
  params[param_name] = name;
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "taxons" + '/' + node.attr("id"),
    data: params,
    error: handle_ajax_error
  });
};

var handle_create = function(e, data) {
  last_rollback = data.rlbk
  var node = data.rslt.obj
  var name = data.rslt.name
  var position = data.rslt.position
  var new_parent = data.rslt.parent

  $.ajax({
    type: "POST",
    dataType: "json",
    url: "taxons" + '/',
    data: ({"taxon[name]": name, "taxon[parent_id]": new_parent.attr("id"), "taxon[position]": position, authenticity_token: AUTH_TOKEN }),
    error: handle_ajax_error,
    success: function(data,result){
      node.attr('id', data.id);
    }
  });
}
