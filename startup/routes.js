const express = require('express'); 
const products = require('../routes/products');
const users = require('../routes/users');
const auth = require('../routes/auth'); 
const error = require('../middleware/error');


module.exports = function(app){
    app.use(express.json())
    //if extended is false , you cannot post nested objects
    app.use(express.urlencoded({extended:true}));
    //Routes
    app.use('/api/products',products);
    app.use('/api/users' , users);
    app.use('/api/auth',auth);
    //error middleware
    //keep this at end of all middlewares
    app.use(error);
}