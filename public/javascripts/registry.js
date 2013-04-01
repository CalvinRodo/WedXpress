$(function () {
  $(".item").hover(function () {
    $(this).siblings().stop().fadeTo("fast", 0.5);
  }, function () {
    $(this).siblings().stop().fadeTo("fast", 1);
  });
  $('#thumbnails').masonry({
    itemSelector: '.items'
  });
//  $('#RegistryContents').equalize();
//  $('#RegistryContents').equalize('width');
});