const User = require('../models/User');

function userLoggedMiddleware(req,res,next) {
    console.log("userLoggedMiddleware");
    res.locals.userLogged = req.session.userLogged
    console.log(res.locals.userLogged);
    next()
}



module.exports = userLoggedMiddleware;