import axios from 'axios';

const baseURL = 'https://tstapi.ffcloud.com.br';

const api = axios.create({
    baseURL,
})

const apiAuthenticated = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('@trabweb:access')}`
    },
})

export { api, apiAuthenticated } 