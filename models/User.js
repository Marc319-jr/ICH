// 1. Guardar al usuario en las DB
// 2. Editar la informacion de un usuario
// 3. Eliminar a un usuario de la DB 

//CRUD
const fs = require('fs');

const User = {
    fileName: './database/usuarios.JSON', //este es el archivo de usuarios

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName , {encoding: 'utf-8'}));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
        return lastUser.id + 1;
        }
        return 1
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound 
    },

    findByField: function(field , text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData //Una linda forma de adicionar DATA a un objeto literal sin escribir todo desde 0 
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName , JSON.stringify(allUsers ,null ,' '));
        return newUser
        //guardar info
    },

    delete : function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName , JSON.stringify(finalUsers , null ,' '))
     }
}

module.exports = User;