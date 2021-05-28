const Tables = require('../models/Tables')
const controller = {
    tech: (req,res) => {
        let techs = Tables.findAll();
        res.render('./tables/table' , {'tabla' : techs})
    }
}


module.exports = controller;