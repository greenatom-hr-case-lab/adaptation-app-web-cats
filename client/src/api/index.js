import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})
const auth = axios.create({
    baseURL: 'http://localhost:5000/auth',
})

export const insertPlan = payload => api.post(`/plan`, payload)
export const getAllPlans = () => api.get(`/plans`)
export const getUserPlans = () => api.get(`/`)
export const updatePlanById = (id, payload) => api.put(`/plan/${id}`, payload)
export const deletePlanById = id => api.delete(`/plan/${id}`)
export const getPlanById = id => api.get(`/plan/${id}`)

export const getUsers = () => auth.get(`/users`)

const apis = {
    insertPlan,
    getAllPlans,
    updatePlanById,
    deletePlanById,
    getPlanById,
    getUsers,
}

export default apis
