/*
 * GET home page.
 */
function createMenu(menuItems) {
  var menu = {};
  menuItems.forEach(function (item) {
    if (menu[item.course] === undefined) {

      menu[item.course] = {
        name: item.course,
        courses: []
      };

    }

    menu[item.course].courses
      .push(item.name);
  });
  return menu;
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
    url = req.params.inviteurl;

  if (url === undefined || url === null) {
    res.redirect('/');
    return;
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


exports.saveRsvp = function saveRsvp(req, res) {

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