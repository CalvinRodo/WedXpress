/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', {
    title: "Calvin and Amy's Wedding",
    scrollspy: true,
    invites: 3,
    menu: {
      appetizer: [
        { name: "name1"},
        { name: "name2"}
      ],
      entree: [
        { name: "name3" },
        { name: "name4" }
      ],
      dessert: [
        { name: "name5" },
        { name: "name6" }
      ]
    }
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