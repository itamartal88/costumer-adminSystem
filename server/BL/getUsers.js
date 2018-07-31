

var dbUsers = require('./../db/dbUsers');
var jwt = require('./../handlers/jwt');

 function checkUser(user){
    return new Promise((resolve,reject) => {
        dbUsers.find({id:user.id,name:user.name},(err,res) => {
          user.user = res;  
          if(err) resolve([]);
          if(res.length > 0){
              jwt.getWebToken(res,user).then((result) => {  
                resolve(result);
              })
          }else{
            resolve(res);  
          }
        })  
      })    
    }

function insertUserToDb(user){
    return new Promise((resolve,reject) => {
        var objInsert = new dbUsers({
            name:user.name,
            email:user.mail,
            id:user.id,
            role:user.role,
            age:null,
            gender:null,
            img:'userImage.png'
        });
            objInsert.save(function(err, response) {
               if (err) throw err;
              jwt.getWebToken([objInsert],user).then((token) => {
                user.user = [objInsert]; 
                resolve([objInsert]);
              })
          });
      })    
}

function getAllUsers(){
    return new Promise((resolve,reject) => {
    dbUsers.find({},(err,res) => {
        if (err) throw err;
        resolve(res);
    })
 })
}

function checkIfIdExcist(id){
    return new Promise((resolve,reject) => {
        dbUsers.find({id:id},(err,res) => {
            if (err) throw err;
            resolve(res);
        })
     }) 
}

module.exports = {
    checkUser,
    insertUserToDb,
    getAllUsers,
    checkIfIdExcist
}