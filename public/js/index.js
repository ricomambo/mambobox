$(function() {
  $('#light').click(function () {
    var light = $(this);
    disableSwitch(light);
    var data = {};
    if (!getSwitchStatus(light)) {
      data.status = 'on'
    }
    $.ajax({
      url: '/light',
      method: 'PUT',
      dataType: 'json',
      data: data
    })
    .success(function(result) {
      setSwitchStatus(light, result.status);
    })
    .fail(function() {
      alert('Error!');
      setSwitchStatus(light, !data.status);
    })
    .always(function() {
      enableSwitch(light);
    });
  });

  function getSwitchStatus(element) {
    return $(element).hasClass('light-green-text');
  }

  function setSwitchStatus(element, status) {
    if (status) {
      $(element).removeClass('gret-text');
      $(element).addClass('light-green-text');
    } else {
      $(element).removeClass('light-green-text');
      $(element).addClass('grey-text');
    }
  }

  function disableSwitch(element) {
    $(element).text('not_interested');
  }

  function enableSwitch(element) {
    $(element).text('power_settings_new');
  }
});
