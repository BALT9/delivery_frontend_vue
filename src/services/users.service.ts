import type { UserInterface } from '../interface/User.interface'
import api from './api/api'

export default {
    async index(){
        return await api.get(`/users`)
    },

    async store(data : UserInterface){
        return await api.post(`/users`,data)
    },

    async show(id:string,){
        return await api.get(`/users/`+id);
    },

    async update(id:string, data: UserInterface){
        return await api.patch(`/users/`+id, data);
    },

    async delete(id:string,){
        return await api.delete(`/users/`+id);
    },
}