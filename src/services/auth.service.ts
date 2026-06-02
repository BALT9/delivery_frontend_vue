import api from './api/api'

export async function loginNest(email: string, password: string){
    const res = await api.post(`/auth/login`, { email, password })
    return res;
}

export async function logout(){
    const res = await api.post(`/auth/logout`)
    return res;
}

