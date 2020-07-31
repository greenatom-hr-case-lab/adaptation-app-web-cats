const express = require('express')
const PlanCtrl = require('../controllers/plan-ctrl')
const planRouter = express.Router()

planRouter.post('/plan', PlanCtrl.createPlan)
planRouter.put('/plan/:id', PlanCtrl.updatePlan)
planRouter.delete('/plan/:id', PlanCtrl.deletePlan)
planRouter.get('/plan/:id', PlanCtrl.getPlanById)
planRouter.get('/plans', PlanCtrl.getPlans)
planRouter.get('/:id', PlanCtrl.getPlanByWorker)

module.exports = planRouter
