exports.index = function AdminIndex(req, res){
  res.render('admin', {
    title : 'Admin Menu',
    loggedIn : true
  });
};