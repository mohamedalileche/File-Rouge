import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", withCredentials: true
})

export const createEmployee = async (data) => {
    console.log(data);
    const res = await api.post('/entreprises/:id/createEmployee',data)
    return res.data;
}


export const register = async (Inscription) => { 
    
    const res = await api.post('/entreprises/register',Inscription)
    console.log(Inscription)
    return res.data;
}
export const login = async (Inscription) => {
    console.log(Inscription);
    const res = await api.post('/entreprises/login',Inscription)
    console.log({entreprise:res.data});
    return res.data;
}
export const getEmployees  = async (data) => {
    const res = await api.get('/entreprises/:id/getEmployees',data)
    return res.data;
}