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
});