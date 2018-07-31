

var express = require('express');
var logintRouter = express.Router();
var blGetUsers = require('./../BL/getUsers');
var jwt = require('./../handlers/jwt');

logintRouter.post('/checkUser',(req,res) => {
   blGetUsers.checkUser(req.body).then((user) => {
     res.json(req.body);
   });
});

logintRouter.post('/inserUser',(req,res) => {
  req.body.role = 'user';
  blGetUsers.insertUserToDb(req.body).then((users) => {
    res.json(req.body);
  });
});

logintRouter.post('/checkId',(req,res) => {
  blGetUsers.checkIfIdExcist(req.body.id).then((result) => {
    res.json(result);
  })
})

module.exports = logintRouter;