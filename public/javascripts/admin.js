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
//$(function () {
//  loadRegistryList();
//  loadInviteList();
//});

