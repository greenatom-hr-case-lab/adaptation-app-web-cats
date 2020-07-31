const User = require('../models/workers')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public
registerUser = async (req, res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    await User.findOne({ email: req.body.email }).then(user => {
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    } else {
        const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
        });// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
        })
    }
    })
}
  // @route POST api/users/login
  // @desc Login user and return JWT token
  // @access Public
  
loginUser = async (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;// Find user by email
    await User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                fullName: user.fullName,
                role: user.role
            };
            // Sign token
            jwt.sign( payload, keys.secretOrKey,
            {
                expiresIn: 2592000 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                success: true,
                token: "Bearer " + token
                });
            }
            );
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        })
    })
}

getUsers = async (req, res) => {
    await User.find({},{email: false, password: false}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({users})
    }).catch(err => console.log(err))
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
}