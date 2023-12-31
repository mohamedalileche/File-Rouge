import  express  from "express";
import mongoose from "mongoose";
import { EntrepriseRouter } from "./Routes/EntrepriseRoute.js";
import { EmployeRouter } from "./Routes/EmployeRoutes.js";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173" , credentials: true}))
mongoose.connect(process.env.DB_URL_LOCAL)
.then(() => { console.log('Connecté à MongoDB') })
  .then(() => { app.listen(5000); console.log('Connecté Avec succes') })
    .catch(err => console.log(err))

// app.use('/utilisateur',require('./Routes/utilisateurs'));
app.use("/api/entreprises", EntrepriseRouter)
app.use("/api/employes", EmployeRouter)


