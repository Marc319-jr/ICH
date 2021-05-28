const fs = require('fs');

const Techs = {
    fileName: './database/techs.JSON',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    }
}



module.exports = Techs;