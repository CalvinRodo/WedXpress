function Masonry() {
  $('#RegistryContents').masonry({
    itemSelector: '.item'
  });
}

$(function () {
  Masonry();
  $('window').on('resize', function () {
    Masonry();
  });
});