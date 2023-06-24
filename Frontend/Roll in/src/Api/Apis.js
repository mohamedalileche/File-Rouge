import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", withCredentials: true,
    headers:{
        Authorization : `Bearer ${localStorage.token}`
    }
})
export const createEmployee = async (data) => {
    console.log(data);
    const res = await api.post(`/entreprises/${data.Entreprise}/createEmployee`,data)
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
    // console.log({entreprise:res.data});
    return res.data;
}
export const getEmployees  = async (entrepriseId) => {
    const res = await api.get(`/entreprises/${entrepriseId}/getEmployees`)
    return res.data;
}
export const logout = async (body) => {
    const res = await api.post('/entreprises/logout', body)
   
    return res.data;
}
////////////////Pointage
export const createPointage = async (employeId, data) => {
    console.log(data);
    const res = await api.post(`/entreprises/employes/${employeId}/createPointage`,data)
    console.log(employeId);
    return res.data;
}