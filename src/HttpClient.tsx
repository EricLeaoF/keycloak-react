import axios from 'axios';

const httpClient = axios.create({
   baseURL: 'http://localhost:3030'
});

export {httpClient}