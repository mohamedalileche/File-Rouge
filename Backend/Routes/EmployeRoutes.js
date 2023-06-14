import  express  from "express"
import { createPointage, getPointage, updatePointage, deletePointage, getProjects, getTask, getAllConges, getCongeById, createConge, updateConge, deleteConge } from "../Controllers/EmployeControllers.js";



const app = express()
app.use(express.json());



///////////////Pointage/////////////////////
app.get('/pointages/:id', getPointage);
app.post('/pointages', createPointage);
app.put('/pointages/:id', updatePointage);
app.delete('/pointages/:id',deletePointage);  


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