function accordionRsvp() {
  $('.meal-choice').stop().slideUp('fast');
  $('.invite').has(this).children('.meal-choice').stop().slideDown('fast');
}

function SetupRSVPList() {
  $('.meal-choice').hide();

  $('input[name="rsvp"]:radio').on('change', function () {
    if ($(this).val() === 'decline') {
      $('.meal-choice').stop().slideUp('fast');
      $('.invite-name').off('focus');
      $('.guest').hide();
    } else {
      $('.invite-name').on('focus', accordionRsvp);
      $('.meal-choice').first().stop().slideDown('fast');
      $('.guest').show();
    }
  });
  $('.invite-name').on('focus', accordionRsvp);
}

function SetupNavMenu() {
  var $nav = $('#nav');
  $nav.affix({ offset: $nav.position() });
}

$(function () {
  SetupRSVPList();
  SetupNavMenu();
});