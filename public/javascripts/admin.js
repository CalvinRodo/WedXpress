function loadRegistryList() {
  $.get('./regList')
    .done(function (data) {
      $('#regAdminList').html(data);
    }).fail(function (data) {
      console.log(data);
    });
}

function loadInviteList() {
  $.get('./inviteList')
    .done(function (data) {
      $('#inviteList').html(data);
    }).fail(function (data) {
      console.log(data);
    });
}

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
  $('#registryItemForm button[name=edit]')
    .attr('disabled', false)
    .attr('formaction', '/invite/edit/' + id);
}

function GetFromServer(path, func) {
  id = $(this).attr('data-id');
  $.get(path + id)
    .done(function (data) {
      func(data, id);
    }).fail(function (data) {
      console.log(data);
    });
  return false;
}

$(function () {
  $('#editRegItem').on("click", GetFromServer('./registry/edit/', loadRegistryItemForm));
  $('#editInvit').on('click', GetFromServer('./invite/edit', loadInviteForm));
  $('#editRegistryItem').on('click', function () {
    $('#addNew').attr('disabled', false);
  });
});

