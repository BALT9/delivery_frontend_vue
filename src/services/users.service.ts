import api from './api/api'

export default {
    async index(){
        return await api.get(`/users`)
    },

    
}