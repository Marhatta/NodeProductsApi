const config = require('config');
const jwt  = require('jsonwebtoken');
const Joi  = require('@hapi/joi');
const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:50
        },
        email:{
            type:String,
            required:true,
            minlength:10,
            maxlength:255,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:5,
            maxlength:1024 // store the hashed password
        },
        isAdmin:Boolean,
        isSuperAdmin:Boolean
});


//generate auth token
exports.generateAuthToken = userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin,isSuperAdmin:this.isSuperAdmin},config.get('jwtPrivateKey'));
    return token;
}



const User = mongoose.model('User' , userSchema);

const validateUser = user => {
    const schema = {
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(10).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean(),
        isSuperAdmin:Joi.boolean()
    };

    return Joi.validate(user,schema);
}


exports.User = User;
exports.validate = validateUser;
