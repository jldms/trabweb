import axios from 'axios';

const baseURL = 'https://tstapi.ffcloud.com.br';

const api = axios.create({
    baseURL,
})

const apiAuthenticated = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTY3MjI4NTIxNiwiZXhwIjoxNzAzODIxMjE2fQ.H3OlMYyB3zKV4HvdjWQyLnqMXelDpkkau4nEkfpJeqs`,
    },
})
export { api, apiAuthenticated } 