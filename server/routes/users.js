const express = require("express");
const userRouter = express.Router();
const UserCtrl = require('../controllers/user-ctrl')

userRouter.post('/register', UserCtrl.registerUser)
userRouter.post('/login', UserCtrl.loginUser)

module.exports = userRouter