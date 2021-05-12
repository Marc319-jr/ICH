const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));

//Declaraciones necesarias para poder utilziar POST
app.use(express.urlencoded ({extended:false}));
app.use(express.json());


//Declaraciones necesarias para PUT Y DELETE
const methodOverrider = require('method-override');
app.use(methodOverrider("_method"));

//Config de engine y sistema de ruteo
app.set('view engine', 'ejs');

//declaracion de rutas
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
//uso de rutas
app.use('/' , indexRouter);
app.use('/user', userRouter);


app.listen(3000 , () => {
    console.log("Corriendo al servidor 3000")
})