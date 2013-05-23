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
  };
}

exports.index = function index(req, res) {
  var SongDB = require('../DataLayer/SongDB.js'),
    songDB = new SongDB();

  songDB.GetItems(0, function (err, results) {
    if (err) {
      console.error(err);
      console.error('Failed on loading song list');
      res.redirect('/oops');
    }

    res.render('index', {
      loggedIn: req.session.loggedIn,
      title: "Calvin and Amy's Wedding",
      scrollspy: true,
      rsvp: false,
      songs: results
    });
  });
};

exports.rsvp = function indexRsvp(req, res) {
  var async = require('async'),
    url = req.params.inviteurl.toLowerCase();

  if (url === undefined || url === null) {
    res.redirect('/');
    return;
  }
  async.parallel([
    function (callback) {
      var InviteDB = require('../DataLayer/InviteDB.js'),
        inviteDB = new InviteDB();
      inviteDB.getInviteByUrl(url, callback);
    },
    function (callback) {
      var MenuDB = require('../DataLayer/MenuDB.js'),
        menuDB = new MenuDB();
      menuDB.GetItems(0, callback);
    },
    function GetSongs(callback) {
      var SongDB = require('../DataLayer/SongDB.js'),
        songDB = new SongDB();
      songDB.GetItems(0, callback);

    }
  ], function (err, results) {
//
    if (err) {
      console.error(err);
      res.redirect('/oops');
    }

    var invite = results[0],
      menuItems = results[1],
      songs = results[2];

    if (invite === null ||
      invite === {} ||
      invite === undefined) {
      res.redirect('/');
      return;
    }

    res.render('index', {
      loggedIn: req.session.loggedIn,
      title: "Calvin and Amy's Wedding",
      scrollspy: true,
      rsvp: true,
      invite: invite,
      songs: songs,
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
      if (err) {
        console.error('error saving rsvp');
        console.error(err);
        console.error(results);
        res.redirect('/oops');
      }
      //TODO Redirect to success page
      res.redirect('/');
    });
};

