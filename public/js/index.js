$(function() {
  $('#light').click(function () {
    var light = $(this);
    light.attr("disabled", true);
    var data = {};
    if (light.is(':checked')) {
      data.status = 'on'
    }
    $.ajax({
      url: '/light',
      method: 'PUT',
      dataType: 'json',
      data: data
    })
    .fail(function() {
      alert('Error!');
      light.attr("checked", data.status ? true : false);
    })
    .always(function() {
      light.removeAttr("disabled");
    });
  });
});
