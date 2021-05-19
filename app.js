const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
app.use(express.static('public'));

//Declaraciones necesarias para poder utilziar POST
app.use(express.json());
app.use(express.urlencoded ({extended:false}));


//Declaraciones necesarias para PUT Y DELETE
const methodOverrider = require('method-override');
app.use(methodOverrider("_method"));

//Config de engine y sistema de ruteo
app.set('view engine', 'ejs');

//uso de session
app.use(session({secret: 'Shh, Its a secret',
                 resave: false,
                 saveUninitialized: false}));

//declaracion de rutas
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const searchRouter = require('./routes/searchRouter')
//uso de rutas
app.use('/' , indexRouter);
app.use('/user', userRouter);
app.use('/search' , searchRouter);


app.listen(4000 , () => {
    console.log("Corriendo al servidor 3000")
})