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

function getInvite(req, appender) {
  return {
    name: req.body['invite-name-' + appender],
    specialRequirements: req.body['requirement-' + appender],
    menu: {
      appetizer: req.body['Appetizer-' + appender],
      entree: req.body['Entree-' + appender],
      dessert: req.body['Dessert-' + appender]
    }
  }
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
  var id = req.params.id,
    async = require('async');

  async.auto({
      LoadInvite: function (callback) {
        var InviteDB = require('../DataLayer/InviteDB.js'),
          inviteDB = new InviteDB();

        inviteDB.GetItemByID(id, callback);
      },
      SaveSong: function (callback) {
        var SongDb = require('../DataLayer/SongDB.js'),
          songDb = new SongDb();

        songDb.SaveItem({ userId: id, songName: req.body.song }, callback);

      },
      SaveRsvp: ['LoadInvite', function (callback, results) {
        var RsvpDb = require('../DataLayer/RsvpDB.js'),
          rsvpDB = new RsvpDb(),
          invites = results.LoadInvite.invites,
          rsvp = {
            coming: req.body.rsvp,
            inviteId: id,
            mainInvite: getInvite(req, 'main')
          };
        for (var i, i = 0; i < invites; i++) {

          rsvp['guest' + i] = getInvite(req, i);
        }

        rsvpDB.SaveItem(rsvp, callback);
      }],
      UpdateInvite: [ 'SaveSong', 'SaveRsvp', function (callback, results) {
        var InviteDb = require('../DataLayer/InviteDB.js'),
          inviteDb = new InviteDb();

        inviteDb.updateRSVPStatus(id, true, callback);
      }]},
    function (err, results) {
      if (err) throw err;
      //TODO Redirect to success page
      res.redirect('/');
    });
};

