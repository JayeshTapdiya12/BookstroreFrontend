import axios from "axios";

const baseUrl = 'http://localhost:3001/api/v1/books'


export const getAllBook = async () => {
    const data = await axios.get(baseUrl);

    return data;
}

export const BookById = async (id) => {
    const data = await axios.get(`${baseUrl}/${id}`);
    return data;
}