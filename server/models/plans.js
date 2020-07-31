const {Schema, model} = require('mongoose')

const schemaPlans = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    default: "Some description"
  },
  crtr:{
    type: String,
    required: true,
    default: 'Unkid'
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type:String,
    required: true
  },
  updDate: {
    type: String,
    required: true
  },
  worker:{
    type: String,
    required: true
    
  },
  leader:{
    type: String,
    required: true
  },
  planState: {
    type: String,
    default: "Created"
  },
  planMark:{
    type: String,
    default: '-'
  },
  finalState:{
    type: Boolean,
    default: false
  },
  tasks: {
    type: String
  }
},

{versionKey: false})


const schemaTasks = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    default: "Some task"
  },
  crtr:{
    type: String,
    required: true,
    default: 'Unkid'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type:Date
  },
  updDate: {
    type: Date,
    required: true
  },
  finalState: {
    type: Boolean,
    default: false
  }
},
{versionKey: false}
)
module.exports =
  {plans: model('Plans', schemaPlans),
  tasks: model('Tasks', schemaTasks)}
