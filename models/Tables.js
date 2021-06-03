const fs = require('fs');

const Techs = {
    fileNames: ['./database/techs.JSON', './database/dispatch.JSON'],


    getData: function(data){
        return JSON.parse(fs.readFileSync(this.fileNames[data] , {encoding: 'utf-8'}));
    },

    findAll: function(tableType){
        let data;
        if(tableType == "Techs")
        {
            data = 0
        }
        else{
            data = 1
        }
        
        return this.getData(data);
        
    },

    printFile: function(array, tableNum){
        console.log("estoy por grabar un archivo :)");
        let fileToPrint = JSON.stringify(array,null,' ');
        fs.writeFileSync(this.fileNames[0] , fileToPrint);

        return true
    }
}



module.exports = Techs;