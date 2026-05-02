import axios from "axios";

//const baseUrl = "http://localhost:3000";
const baseUrl = import.meta.env.VITE_API_URL; // Vite automatically replaces this with the value from .env
const AuthController = "api/auth";

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

export async function register(username: string, email: string,password: string) {

    try {
        const response = await api.post(`/${AuthController}/register`, {
        username, email, password
    }, {
        withCredentials: true
    })

    return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post(`/${AuthController}/login`, {
            email, password
        }, {
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const response = await api.get(`/${AuthController}/logout`, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUser() {
    try {
        const response = await api.get(`/${AuthController}/me`, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}