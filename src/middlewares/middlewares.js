let jwt = require('jsonwebtoken');
let secret = require('../configurations/secret');

function ifLogged(req, res, next) {
     if (req.headers['authorization']) {
         let token = req.headers['authorization']
         let user = jwt.verify(token, secret)
         req.user = user
     } 
     next()
 }


module.exports = (server) => {
    server.use(ifLogged)
      
}