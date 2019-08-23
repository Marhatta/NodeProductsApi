const Joi  = require('@hapi/joi');
const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
        company:{
            type:String,
            required:true,
            minlength:3,
            maxlength:50
        },
        model:{
            type:String,
            required:true,
            minlength:3,
            maxlength:255,
            unique:true
        },
        screenSize:{
            type:Number,
            required:true,
            minlength:1,
            maxlength:20
        },
        price:{
            type:Number,
            required:true,
            minlength:4,
            maxlength:8,
        },
        cameraSpecifications:{
            type:String,
            required:true,
            minlength:4,
            maxlength:100
        },
        ram:{
            type:Number,
            required:true,
            minlength:1,
            maxlength:3
        },
        imageUrl:{
            type:String,
            required:true
        },
        isDiscountAvailable:{
            type:Boolean,
            required:true
        }
});




const Product = mongoose.model('Product' , productSchema);

const validateProduct = product => {
    const schema = {
        company:Joi.string().min(3).max(50).required(),
        model:Joi.string().min(3).max(255).required(),
        screenSize:Joi.number().min(4).max(10).required(),
        price:Joi.number().min(1000).max(30000).required(),
        cameraSpecifications:Joi.string().min(4).max(100).required(),
        ram:Joi.number().min(2).max(16).required(),
        imageUrl:Joi.string().regex(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/).required()
        .error(errors => {
            return {
              message: "Please enter a valid url"
            };
        }),
        isDiscountAvailable:Joi.boolean().required(),
    }

    return Joi.validate(product,schema);
}


exports.Product = Product;
exports.validate = validateProduct;
