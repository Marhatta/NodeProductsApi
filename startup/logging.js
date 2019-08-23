//to get rid of try catch
require('express-async-errors');
//logging package
const winston = require('winston');
//logging to mongodb
require('winston-mongodb');

module.exports = function(){
    //handle unhandled promise rejections   
    process.on('unhandledRejection' , ex => {
        throw ex;
    })

    winston.add(new winston.transports.File({filename : 'logfile.log'}))
}