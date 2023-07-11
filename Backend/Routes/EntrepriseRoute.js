import express from 'express';
import { register, login, createEmployee, logout, getEmployees, deleteEmploye } from '../Controllers/EntrepriseControllers.js';
import { getProjects } from '../Controllers/EmployeControllers.js';
export const EntrepriseRouter = express.Router()


EntrepriseRouter.post("/register",register)
EntrepriseRouter.post("/login",login)
EntrepriseRouter.post("/logout",logout)
EntrepriseRouter.post("/:id/createEmployee",createEmployee)
EntrepriseRouter.get("/:id/getEmployees",getEmployees)
EntrepriseRouter.delete("/:id/deleteEmploye/:employeId",deleteEmploye)
EntrepriseRouter.get('/:id/getProjects', getProjects)







