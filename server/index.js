
const express = require('express');
const mongoose = require('mongoose')
const plansRoutes = require('./routes/plans.js')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require("./config/keys.js").mongoURI; 
const passport = require("passport");


const app = express();

async function start() {
  try{
    await mongoose.connect( db, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(5000, () => {
      console.log('Server has been started')
    });
  }catch(e){
    console.log(e);
  }
}
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api', plansRoutes)
app.use('/auth', userRoutes)
start()
