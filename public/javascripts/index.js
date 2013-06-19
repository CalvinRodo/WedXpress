$(function (){
 $('input:radio[name="rsvp"]').on('change', function() {

  var selectedVal = $('input:radio[name="rsvp"]:checked').val();
  if (selectedVal === undefined) {
    return;
  }
  if (selectedVal === "decline"){
    $('#rsvpInvite').hide();
  }
  if (selectedVal === "accept"){
    $('#rsvpInvite').show();
  }
 })
});
