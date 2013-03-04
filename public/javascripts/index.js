function loadSongList() {
  $.get('./songList')
    .done(function (data) {
      $('#songList').html(data);
    }).fail(function (data) {
      console.log(data);
    });
}

$(function () {
  loadSongList();
  $('.meal-choice').hide();
  $('.invite-name').on('click', function () {
    $(this).parent().parent().parent().siblings().children('.meal-choice').stop().slideUp('fast');
    $(this).parent().parent().siblings('.meal-choice').stop().slideDown('fast');
  });
  var $nav = $('#nav');
  $nav.affix({ offset: $nav.position() });
});