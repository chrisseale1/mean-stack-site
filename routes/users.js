const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


//Register
router.post('/register', (req, res, next) =>{
    let newUser =  new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({sucess: false, msg: "Failed to register user."});
        } else {
            res.json({sucess: true, msg: "User registered."});
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const ussername = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) =>{
        if(err)throw err;
        if(!user){
            return res.json({success: false, msg: "User not found"});
        }
        User.comparePassword(password, user.password, () => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true, 
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: "Wrong password"});
            }
        });
    });
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


module.exports = router;