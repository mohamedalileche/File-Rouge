import  express  from "express"
import { createPointage, getPointage, updatePointage, deletePointage, getProjects, getTask, getAllConges, getCongeById, createConge, updateConge, deleteConge } from "../Controllers/EmployeControllers.js";



export const EmployeRouter = express.Router()



///////////////Pointage/////////////////////
// app.get('/pointages/:id', getPointage);
EmployeRouter.post('/employes/:id/pointages', createPointage);
// app.put('/pointages/:id', updatePointage);
// app.delete('/pointages/:id',deletePointage);  


///////////////Project/////////////////////
app.get('/projects', getProjects);

///////////////Task////////////////////////
app.get('/projects/:id/tasks', getTask);

///////////////Conge////////////////////////
app.get('/Conges', getAllConges);
app.get('/Conges/:id', getCongeById);
app.post('Conges', createConge);
app.put('/Conges/:id', updateConge);
app.delete('/Conges/:id', deleteConge);