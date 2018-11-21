const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require("../../models/User");


//==============================================
// @route   GET  api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));





//==============================================
// @route   POST  api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        // Check if email already exists.
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            // New email, first, check for gravatar for user.
            const avatar = gravatar.url(req.body.email, {
                s: "200", // size
                r: "pg", // rating
                d: "mm" // Default
            });

            // Create new User model.
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });

            // Encrypt user password, then save
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()                             // save data
                        .then(user => res.json(user))       // return user object
                        .catch(err => console.log(err));    // display error if any
                });
            });
        }
    });
});




//==============================================
// @route   POST  api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user
    User.findOne({ email})
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                      if (isMatch) {
                          // User Matched
                          const payload = { id: user.id, name: user.name, avatar: user.avatar };    // Create JWT payload

                          // Signed Token
                          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                          });
                      } else {
                        errors.password = 'Password incorrect';
                          return res.status(400).json(errors);
                      }
                  });
        });
});




//==============================================
// @route   GET  api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
