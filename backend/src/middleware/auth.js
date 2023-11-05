const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const authToken = req.headers.authorization;
    
    if(!authToken) return res.status(400).json({msg: "Token não identificado"});
        
    const [,token] = authToken.split(" ");

    jwt.verify(token, process.env.TOKEN_KEY, (error,data) => {

        if(error){
            return res.status(401).json({err:"Token inválido"});
        }
        else{
            req.user_id = data.id;
            req.token = token;
            return next();
        }  
    })
}

module.exports = auth;