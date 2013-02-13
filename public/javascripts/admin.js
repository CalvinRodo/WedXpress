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
    .attr('formaction', '/registryAdmin/edit/' + id);
  $('#registryItemForm button[name=submit]')
    .attr('disabled', true);
}

function editRegItem() {
  id = $(this).attr('data-id');
  $.get('./registry/edit/' + id)
    .done(function (data) {
      loadRegistryItemForm(data, id);
    }).fail(function (data) {
      console.log(data);
    });
  return false;
}

$(function () {
  $('#editRegItem').on("click", editRegItem)
});

