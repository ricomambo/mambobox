$(function() {
  $('#light').click(function () {
    $.ajax({
      url: '/light',
      method: 'PUT',
      data: {
        status: $(this).is(':checked')
      }
    }).done(function() {
      // $(this).prop('checked', true);
      alert('Value changed.')
    });
  });
});
