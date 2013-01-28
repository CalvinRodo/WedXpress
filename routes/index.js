/*
 * GET home page.
 */


exports.index = function (req, res) {
  res.render('index', {
    title: "Calvin and Amy's Wedding",
    scrollspy: true
  });
};

exports.SongList = function (req, res) {
  res.render('includes/index/songs',
    { songs: [
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'},
      { name: 'Thunderstruck'}
    ]
    });
};