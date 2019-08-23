const {Product,validate} = require('../models/products');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth= require('../middleware/auth');
const admin = require('../middleware/admin');
const superAdmin = require('../middleware/superAdmin');
 
//check if ID is valid
const validateId = (id,res) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        return true
    }
    return res.status(400).send('Not a valid Id ');
}


//POST /
//post a new Product
router.post('/',[auth,admin], (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    product = new Product({
    company:req.body.company,
    model:req.body.model,
    screenSize:req.body.screenSize,
    price:req.body.price,
    cameraSpecifications:req.body.cameraSpecifications,
    ram:req.body.ram,
    imageUrl:req.body.imageUrl,
    isDiscountAvailable:req.body.isDiscountAvailable
    });
 
    product.save()
        .then(product=>{
            res.send(product);
            })
        .catch(error=>{
            res.send('Duplicate model is not allowed');
        })
});
 

//GET /
//get all products
router.get('/', async(req,res)=>{
 const product = await Product.find().sort('company');
 res.send(product);
});
 

//GET /:id
//find product by id
router.get('/:id', async (req,res) => {
   
    if(validateId(req.params.id,res)){
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).send("Product with given ID not found");
        res.send(product);
    }
});
 

//DELETE /:id
//delete a product
router.delete('/:id',[auth,superAdmin],async(req,res)=>{
    if(validateId(req.params.id,res)){
        const product = await Product.findByIdAndRemove(req.params.id); 
        if(!product) return res.status(404).send("Product with given ID not found");
        res.send(product);
    }
});


//UPDATE /:id
//update a product
router.put('/:id', [auth,admin] ,async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    if(validateId(req.params.id,res)){
        const updatedProduct = await Product.findOneAndUpdate(
            {_id:req.params.id},
            {$set:{
                company:req.body.company,
                model:req.body.model,
                screenSize:req.body.screenSize,
                price:req.body.price,
                cameraSpecifications:req.body.cameraSpecifications,
                ram:req.body.ram,
                imageUrl:req.body.imageUrl,
                isDiscountAvailable:req.body.isDiscountAvailable,
            }},
            {new:true}
    
        )
        
        if(!updatedProduct) return res.status(404).send('Product not found');
        res.send(updatedProduct);
    }
})

module.exports=router;
