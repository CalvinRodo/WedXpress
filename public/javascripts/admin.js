function loadRegistryItemForm(data, id) {
  $('#registryItemForm input[name=name]').val(data.name);
  $('#registryItemForm textarea[name=description]').val(data.description);
  $('#registryItemForm input[name=price]').val(data.price);
  $('#registryItemForm button[name=edit]')
    .attr('disabled', false)
    .attr('formaction', '/registry/edit/' + id);
  $('#addNew').attr('disabled', true);
}

function loadInviteForm(data, id) {
  $('#guestInviteForm input[name=name]').val(data.name);
  $('#guestInviteForm input[name=guests]').val(data.invites);
  $('#guestInviteForm input[name=url]').val(data.url);
  $('#guestInviteForm button[name=edit]')
    .attr('disabled', false)
    .attr('formaction', '/invite/edit/' + id);
}

function GetFromServer(obj, path, func) {
  id = $(obj).attr('data-id');
  $.get(path + '/' + id)
    .done(function (data) {
      func(data, id);
    }).fail(function (data) {
      console.log(data);
    });
  return false;
}

$(function () {
  $('#editRegItem').on("click", function () {
    return GetFromServer(this, './registry/edit', loadRegistryItemForm)
  });
  $('#editInvite').on('click', function () {
    return GetFromServer(this, './invite/edit', loadInviteForm)
  });
  $('#editRegistryItem').on('click', function () {
    $('#addNew').attr('disabled', false);
  });
});

