let controller = {
    index: (req,res) => {
        if(req.session.userLogged)
        {

            res.render('./index' , {'user' : req.session.userLogged})
        }
        else
            res.render('./index');
    }
}



module.exports = controller;