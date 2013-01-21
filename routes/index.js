/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', {
    title: "Calvin and Amy's Wedding",
    scrollspy: true,
    songs: [
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'},
      { name: 'Thunderstruck', band: 'AC/DC'}
    ]
  });
};