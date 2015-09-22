$(function() {
  $('#light').click(function () {
    var light = $(this);
    light.attr("disabled", true);
    var status = light.is(':checked');
    $.ajax({
      url: '/light',
      method: 'PUT',
      data: {
        status: !status
      }
    })
    .fail(function() {
      alert('Error!');
      light.attr("checked", status);
    })
    .always(function() {
      light.removeAttr("disabled");
    });
  });
});
