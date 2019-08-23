const auth = require('../middleware/auth');
const _ = require('lodash');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();


router.get('/me',auth,async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    if(!user) res.status(404).send('Not found');
    res.send(user);
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(401).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(401).send('Invalid email or Password');

    const token = user.generateAuthToken();
    //payload,private key

    res.send(token);

});

const validate = req => {
    const schema = {
        email:Joi.string().min(10).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req,schema);
}

module.exports = router;