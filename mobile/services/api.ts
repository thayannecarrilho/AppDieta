import axios from 'axios'
//https://192.168.0.18:3333 /create

export const api = axios.create({
    baseURL: "https://192.168.0.18:3333"
})