

var dbConnect = require('./dbConnction');
var mongoose  = dbConnect.mongoose;
var store = dbConnect.users;

var schema = mongoose.Schema;

var userSchema = new schema({
  name:String,
  email:String,
  id:String,
  role:String,
  age:Number,
  gender:String,
  img:String
})

mongoose.model('users', userSchema);
var user = mongoose.model('users');

module.exports = user;