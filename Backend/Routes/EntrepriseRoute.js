import express from 'express';
import { register, login, createEmployee, logout, getEmployees, deleteEmploye, getEmployebyId } from '../Controllers/EntrepriseControllers.js';
import { getProjects,createProject } from '../Controllers/EmployeControllers.js';
export const EntrepriseRouter = express.Router()


EntrepriseRouter.post("/register",register)
EntrepriseRouter.post("/login",login)
EntrepriseRouter.post("/logout",logout)
EntrepriseRouter.post("/:id/createEmployee",createEmployee)
EntrepriseRouter.get("/:id/getEmployees",getEmployees)
EntrepriseRouter.delete("/:id/deleteEmploye/:employeId",deleteEmploye)
EntrepriseRouter.get('/:id/getProjects', getProjects)
EntrepriseRouter.get("/getEmployebyid/:employeId",getEmployebyId)







