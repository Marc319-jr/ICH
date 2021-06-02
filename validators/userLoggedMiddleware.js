const User = require('../models/User');

function userLoggedMiddleware(req,res,next) {
    console.log(req.session.userLogged);
    res.locals.userLogged = req.session.userLogged
    console.log("123");
    console.log(res.locals.userLogged);

    next()
}



module.exports = userLoggedMiddleware;