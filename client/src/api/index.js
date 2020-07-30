import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertPlan = payload => api.post(`/plan`, payload)
export const getAllPlans = () => api.get(`/plans`)
export const updatePlanById = (id, payload) => api.put(`/plan/${id}`, payload)
export const deletePlanById = id => api.delete(`/plan/${id}`)
export const getPlanById = id => api.get(`/plan/${id}`)

const apis = {
    insertPlan,
    getAllPlans,
    updatePlanById,
    deletePlanById,
    getPlanById,
}

export default apis
