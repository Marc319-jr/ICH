let controller = {
    index: (req,res) => {
        if(req.session.userLogged)
        {
            res.render('./index' )
        }
        else
            res.render('./index');
    }
}



module.exports = controller;