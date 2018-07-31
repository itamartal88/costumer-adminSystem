

var dbUsers = require('./../db/dbUsers');
var mime = require('mime');
var fs = require('fs');

var allowedUpload = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];

 function deleteUser(user){
    return new Promise((resolve,reject) => {
        dbUsers.remove({_id:user._id},(err,res) => {
            if (err) throw err;
            resolve(res);
        })
     })
  }

  function editUser(req){
    return new Promise((resolve,reject) => {
        var user = JSON.parse(req.body.user);
        var img = user.img;
        if(req.files){
        if(checkFile(req.files)){
           img = req.files.img.name; 
         }
        }
        user.img = img;
        dbUsers.update({_id:user._id},{$set: {email:user.email,age:user.age,
            img:img,gender:user.gender}},
            {upsert: true},function(err,response){
              if(err) throw err;
              var obj = {user:user,res:response}
              resolve(obj);
         })
     })  
  }

 function checkFile(file){
 var type = mime.getType(file.img.name);
 if(allowedUpload.indexOf(type) > -1){
  fs.writeFileSync('./Images/' + file.img.name, file.img.data);
  return true;
 }
}


module.exports = {
   deleteUser,
   editUser
}

