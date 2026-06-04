import api from './api/api'

import type { UserInterface } from '../interface/User.interface';

export async function loginNest(email: string, password: string) {
    const res = await api.post(`/auth/login`, { email, password })
    return res;
}

export async function registerNest(user :UserInterface) {
    const res = await api.post(`/auth/register`,user)
    return res;
}

export async function logout() {
    const res = await api.post(`/auth/logout`)
    return res;
}

export async function profile() {
    const res = await api.get(`/auth/profile`)
    return res;
}

