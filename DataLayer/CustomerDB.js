var db = require('./db.js').DB,
  util = require('util'),
  CustomerDB = function () {
    this.customerDB = 'Transaction';
  };

util.inherits(CustomerDB, db);

CustomerDB.prototype.SaveCustomer = function (customer, callback) {
  var db = my.ConnectToDb();
  db.collection()
    .insert({
      customer: customer
    }, function (err, result) {
      db.close();
      callback(err, result);
    });
};

module.exports.CustomerDB = CustomerDB;

