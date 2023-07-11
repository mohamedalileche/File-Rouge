import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", withCredentials: true,
    headers:{
        Authorization : `Bearer ${localStorage.token}`
    }
})



export const register = async (Inscription) => { 
    const res = await api.post('/entreprises/register',Inscription)
    // console.log(Inscription)
    return res.data;
}
export const login = async (Inscription) => {
    // console.log(Inscription);
    const res = await api.post('/entreprises/login',Inscription)
    // console.log({entreprise:res.data});
    return res.data;
}
export const logout = async (body) => {
    const res = await api.post('/entreprises/logout', body)
   
    return res.data;
}
///////Employe/////

export const createEmployee = async (data) => {
    // console.log(data);
    const res = await api.post(`/entreprises/${data.Entreprise}/createEmployee`,data)
    return res.data;
}
export const getEmployees  = async (entrepriseId) => {
    const res = await api.get(`/entreprises/${entrepriseId}/getEmployees`)
    return res.data;
}
export const deleteEmploye = async ({entrepriseId, employeId}) => {
    // console.log(entrepriseId, employeId)
    const response = await api.delete(`/entreprises/${entrepriseId}/deleteEmploye/${employeId}`);
    if (response.status !== 200) {
      throw new Error('Employé non Supprimé');
    }
    return response;
}




////////////////Pointage
export const createPointage = async ({employeId}) => {
    // console.log({employeId});
    // return true
    const res = await api.post(`/employes/${employeId}/createPointage`)
    // console.log(employeId);
    return res.data;
}
export const teminerPointage = async ({pointage}) => {
    // console.log({pointage});
    // return true
    const res = await api.post(`/employes/${pointage}/terminerPointage`)
    // console.log(employeId);
    return res.data;
}
export const getPointagesByEmployeId  = async (employeId) => {
    // console.log(employeId);
    const res = await api.get(`/employes/${employeId}/getPointage`)
    return res.data;
}


export const createProject = async ({userId, Titre}) => {
    // console.log({userId});
    const res = await api.post(`/employes/${userId}/createProject`,{Titre})
    return res.data;
}
export const getProjects  = async ({userId, Badge}) => {
    const res = await api.get(`/employes/${userId}/getProjects?Badge=${Badge}`) // query params
    return res.data;
}
