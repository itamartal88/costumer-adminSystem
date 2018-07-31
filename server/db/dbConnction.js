


   var mongoose = require('mongoose');
    
    var users = mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true });

    module.exports = {
        mongoose,
        users
    }