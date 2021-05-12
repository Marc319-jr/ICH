let controller = {
    register: (req,res) => {
        console.log("Renderizando al login");
        res.send("Register")
    },
    login: (req,res) => {
        console.log("Renderizando al register");
        res.render("./user/login")
    }
}



module.exports = controller;