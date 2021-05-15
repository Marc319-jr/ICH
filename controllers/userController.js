let fs = require('fs');
let controller = {
    register: (req,res) => {
        console.log("Renderizando al login");
        res.render("./user/register")
    },
    login: (req,res) => {
        console.log("Renderizando al register");
        res.render("./user/login")
    },
    create: (req,res) => {
        console.log("creando al ususario");
        user = req.body;
        console.log(user);
        let users;
        let archivoUsuario = fs.readFileSync('usuarios.JSON' , {encoding: 'utf-8'});
        if(archivoUsuario == "")
        {
            users = [];
        }
        else
        {
            users = JSON.parse(archivoUsuario);
        }
        users.push(user);
        let archivoJSON = JSON.stringify(users)
        fs.writeFileSync('usuarios.JSON' , archivoJSON);
        res.redirect("/")


    }
}



module.exports = controller;