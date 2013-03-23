exports.index = function (req, res) {
  res.render('oops', {
    loggedIn: req.session.loggedIn,
    title: "Oops (╯°□°）╯︵ ┻━┻"
  });
};