const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user.model');

router.get('/', async (req, res) => {
    //res.send('Hello world');
    const users = await User.find();
    console.log(users);
    res.render('index', {
        users // users: users
    });
});

router.get('/login', async (req, res) => {
    //const{error} = loginValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    console.log(req.query)
    const emailExist = await User.findOne({user_name: req.query.user_name, password: req.query.password});
    if (!emailExist) return res.status(400).redirect('/');//'Email or password is wrong'
    //password is correct
    //const validPass = await bcrypt.compare(req.body.password, user.password);

    const token = jwt.sign({_id:emailExist._id}, 'iufbasudfubnsdfuf');
    res.header('auth-token', token)//.send(token);

    //res.send('login innnnnnnnnnnnnnnnnnnnn'+emailExist._id)
    res.redirect('/users');
});

module.exports = router;