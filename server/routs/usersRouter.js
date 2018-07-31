

var express = require('express');
var usersRouter = express.Router();
var blGetUsers = require('./../BL/getUsers');
var blDeleteUsers = require('./../BL/deleteUser');
var jwt = require('./../handlers/jwt');

usersRouter.get('/getUser',(req,res) => {
 if(req.body.costumer.obj[0].role == 'admin'){
  blGetUsers.getAllUsers().then((users) => {
    var obj = {users:users,role:req.body.costumer.obj}
    res.json(obj);
  })
 }else{
  var obj = {users:req.body.costumer.obj,role:req.body.costumer.obj}
  res.json(obj);
 } 
});

usersRouter.post('/delete', (req,res) => {
blDeleteUsers.deleteUser(req.body).then((resonse) => {
  res.json(response);
 })
})

usersRouter.put('/edit', (req,res) => {
 blDeleteUsers.editUser(req).then((result) => {
   res.json(result);
 })
})

usersRouter.post('/insertAdmin', (req,res) => {
  req.body.role = 'admin';
  blGetUsers.insertUserToDb(req.body).then((result) => {
   blGetUsers.getAllUsers().then((users) => {
     res.json(users);
   })
  })
 })

module.exports = usersRouter;

