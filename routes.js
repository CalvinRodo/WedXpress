module.exports = function(app){
    var index = require('./routes/index.js'),
        registry = require('./routes/registry.js'),
        charge = require('./routes/charge.js');


    app.get('/', index.index);
    app.get('/registry', registry.index);
    app.post('/charge', charge.pay);
}