

const express = require('express');
const http = require('http');
const app = express();
var myServer = http.createServer(app);
var cors = require('cors');
var bodyParser = require('body-parser');
var loginRouter = require('./routs/loginRouter');
var userRouter = require('./routs/usersRouter');
var jwt = require('./handlers/jwt');
var upload = require('express-fileupload');

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(cors());
 app.use(upload());
 app.use('/pictures', express.static(__dirname + '/Images'));

 app.use('/Auth',(req,res,next) => {
    jwt.verifyToken(req,next);
 })

app.use('/login',loginRouter); 
app.use('/Auth/users',userRouter);
myServer.listen(4000);

myServer.on('listening',()=>{
  console.log('server listening');
});


//clean code
