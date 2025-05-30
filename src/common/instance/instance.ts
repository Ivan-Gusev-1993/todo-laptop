import axios from "axios";

const token = 'b5120dd7-39f8-44f2-9353-5b1086ba5c96'
const apiKey = 'f87d0b15-33ee-4521-89af-8f71ab35cde0'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
})