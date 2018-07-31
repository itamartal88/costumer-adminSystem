

var jwt = require('jsonwebtoken');

function getWebToken(obj,req){
    return new Promise((resolve,reject) => {
        var token = jwt.sign({obj}, 'secret-key',{expiresIn: 800});
        if(token !== null){
            req.token = token;
            resolve(token);
        }else{
            reject(Error("token not created"));
        }
    })
}

function verifyToken(req,next){
    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, 'secret-key', function(err, decoded) {
        if(err){
         throw err;
        }else{
            req.body.costumer = decoded
            next();
        }
    });
}

module.exports = {
    getWebToken,
    verifyToken
}

