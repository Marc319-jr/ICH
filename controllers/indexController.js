let controller = {
    index: (req,res) => {
        console.log("going to index");
        res.render('./index');
    }
}



module.exports = controller;