function loadSongList() {
  $.get('./songList')
    .done(function (data) {
      $('#songList').html(data);
    }).fail(function (data) {
      console.log(data);
    });
}

function accordionRsvp() {
  $(this).parent().parent().parent().siblings().children('.meal-choice').stop().slideUp('fast');
  $(this).parent().parent().siblings('.meal-choice').stop().slideDown('fast');
};

$(function () {
  //loadSongList();
  $('.meal-choice').hide();
  $('input[name="rsvp"]:radio').on('change', function () {
    if ($(this).val() === 'decline') {
      $('.meal-choice').stop().slideUp('fast');
      $('.invite-name').off('focus');
    } else {
      $('.invite-name').on('focus', accordionRsvp);
      $('.invite-name').parent().parent().siblings('.meal-choice').stop().slideDown('fast');
    }
  });
  $('.invite-name').on('focus', accordionRsvp);
  var $nav = $('#nav');
  $nav.affix({ offset: $nav.position() });
});