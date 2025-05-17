import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/v1/users'

export const login = async (email, password) => {
    const data = {
        email: email,
        password: password
    }
    const res = await axios.post(`${baseUrl}/login`, data)
    return res;
}


export const sign = async (name, lname, email, password, mobile) => {
    const data = {
        name: name, lname: lname, email: email, password: password, mobile: mobile
    }
    const res = axios.post(`${baseUrl}/sign`, data)
    return res;
}