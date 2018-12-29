import axios from 'axios';

export const login = (email: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    return axios.post('/login', params);
}
