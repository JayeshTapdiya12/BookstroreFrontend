import axios from "axios";

const baseUrl = ' http://localhost:3001/api/v1/books/cart'

const token = localStorage.getItem("token")
const headers = { headers: { 'Authorization': 'bearer ' + token } }

export const getCart = async () => {
    const data = await axios.get(`${baseUrl}/getcart`, headers)
    return data;
}

export const addCart = async (id) => {
    const data = axios.get(`${baseUrl}/add/${id}`, headers)
    return data
}

export const removeCart = async (id) => {
    const data = axios.delete(`${baseUrl}/remove/${id}`, headers)
    return data
}

export const getBook = async (id) => {
    const data = axios.get(`${baseUrl}/get/${id}`, headers)
    return data
}