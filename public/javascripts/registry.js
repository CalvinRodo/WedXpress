function Masonry() {
  $('#RegistryContents').masonry({
    itemSelector: '.item',
    columnWidth: $('.span3').width()
  });
}

$(function () {
  Masonry();
  $('window').on('resize', function () {
    Masonry();
  });
});