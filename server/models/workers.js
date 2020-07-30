const {Schema, model} = require('mongoose')

const schemaWorkers = new Schema ({
  email:{
    type: String,
    required: true
  },

  password:{
    type: String, 
    required: true
  },

  fullName:{
    type: String,
    required: true,
    default: "Vasya"
  },

  position:{
    type: String,
    required: false
  },

  role:{
    type: String,
    required: true,
    default:"employee",
    enum: ['hr', 'leader', 'employee'],
  }
},
{versionKey: false})

module.exports = model('Workers', schemaWorkers) 
