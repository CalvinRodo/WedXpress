/*
 * GET home page.
 */
function createMenu(menuItems) {

}

exports.index = function index(req, res) {
  res.render('index', {
    title: "Calvin and Amy's Wedding",
    scrollspy: true,
    rsvp: false
  });
};

exports.rsvp = function indexRsvp(req, res) {
  var async = require('async'),
    InviteDB = require('../DataLayer/InviteDB.js'),
    MenuDB = require('../DataLayer/MenuDB.js'),
    inviteDB = new InviteDB(),
    menuDB = new MenuDB(),
    url = req.param.url;

  if (url === undefined || url === null) {
    res.redirect('/');
  }

  async.parallel([
    function (callback) {
      inviteDB.getInviteByUrl(url, callback);
    },
    function (callback) {
      menuDB.GetItems(0, callback);
    }
  ], function (err, results) {
    var invite = results[0],
      menuItems = results[1];

    res.render('index', {
      title: "Calvin and Amy's Wedding",
      scrollspy: true,
      rsvp: true,
      invite: invite,
      menu: createMenu(menuItems)
    });
  });
};

exports.SongList = function songList(req, res) {
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