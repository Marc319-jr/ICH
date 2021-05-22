const User = require('../models/User');

function userLoggedMiddleware(req,res,next) {
    res.locals.islogged = false;




    let emailIncookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email' , emailIncookie);
    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }
    next()
}



module.exports = userLoggedMiddleware;