const db = require('../models/plans')
const Plan = db.plans

createPlan = (req,res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
          success:false,
          error: 'You must provide a plan'
        })
    }

    const plan = new Plan(body)

    if (!plan){
        return res.status(400).json({success: false, error:err})
    }

    plan.save()
        .then(() => {
           return res.status(201).json({
             success: true,
             id: plan._id,
             message: 'Plan created'
           })
         })
         .catch(error => {
           return res.status(400).json({
             error,
             message: 'Plan not created'
           })
         })
}

updatePlan = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Plan.findOne({ _id: req.params.id }, (err, plan) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Plan not found!',
            })
        }
        plan.title = body.title
        plan.description = body.description
        plan.startDate = body.startDate
        plan.endDate = body.endDate
        plan.worker = body.worker
        plan.leader = body.leader
        plan.planState = body.planState
        plan.planMark = body.planMark
        plan.finalState = body.finalState
        plan.tasks = body.tasks
        plan
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: plan._id,
                    message: 'plan updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Plan not updated!',
                })
            })
    })
}

deletePlan = async (req, res) => {
    await Plan.findOneAndDelete({ _id: req.params.id }, (err, plan) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!plan) {
            return res
                .status(404)
                .json({ success: false, error: `Plan not found` })
        }

        return res.status(200).json({ success: true, data: plan })
    }).catch(err => console.log(err))
}

getPlanById = async (req, res) => {
    await Plan.findOne({ _id: req.params.id }, (err, plan) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!plan) {
            return res
                .status(404)
                .json({ success: false, error: `Plan not found` })
        }
        return res.status(200).json({ success: true, data: plan })
    }).catch(err => console.log(err))
}

getPlanByWorker = async (req, res) => {
    await Plan.find({ worker: req.params.id }, (err, plans) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!plans) {
            return res
                .status(404)
                .json({ success: false, error: `Plans not found` })
        }
        return res.status(200).json({ success: true, data: plans })
    }).catch(err => console.log(err))
}

getPlans = async (req, res) => {
    await Plan.find({}, (err, plans) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!plans.length) {
            return res
                .status(404)
                .json({ success: false, error: `Plans not found` })
        }
        return res.status(200).json({plans })
    }).catch(err => console.log(err))
}

module.exports = {
    createPlan,
    updatePlan,
    deletePlan,
    getPlans,
    getPlanById,
    getPlanByWorker,
}
