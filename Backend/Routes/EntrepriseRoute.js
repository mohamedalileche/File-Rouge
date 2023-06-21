import express from 'express';
import { register, login, createEmployee, logout, getEmployees } from '../Controllers/EntrepriseControllers.js';

export const EntrepriseRouter = express.Router()


EntrepriseRouter.post("/register",register)
EntrepriseRouter.post("/login",login)
EntrepriseRouter.post("/logout",logout)
EntrepriseRouter.post("/:id/createEmployee",createEmployee)
EntrepriseRouter.get("/:id/getEmployees",getEmployees)





