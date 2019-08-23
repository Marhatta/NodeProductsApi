const winston = require('winston');
module.exports = (err,req,res,next) => {

    //pass the logging level
    winston.error(err.message,err);
    res.status(500).send('something failed');
}