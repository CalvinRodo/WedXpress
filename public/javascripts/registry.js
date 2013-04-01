function Masonry() {
  $('#RegistryContents').masonry({
    itemSelector: '.item'
  });
}

$(function () {
  $('#RegistryContents').imagesLoaded(function () {
    Masonry();
  });
  $('window').on('resize', function () {
    Masonry();
  });
});