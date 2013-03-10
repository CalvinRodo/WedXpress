$(function () {
  $(".item").hover(function () {
    $(this).siblings().stop().fadeTo("fast", 0.5);
  }, function () {
    $(this).siblings().stop().fadeTo("fast", 1);
  })
});