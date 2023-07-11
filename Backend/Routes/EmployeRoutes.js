import  express  from "express"
// import { createPointage, getPointage, updatePointage, deletePointage, getProjects, getTask, getAllConges, getCongeById, createConge, updateConge, deleteConge } from "../Controllers/EmployeControllers.js";
import { createPointage, getPointagesByEmployeId, getProjects, teminerPointage } from "../Controllers/EmployeControllers.js";
import { createProject } from "../Controllers/EmployeControllers.js";


export const EmployeRouter = express.Router()



///////////////Pointage/////////////////////
// app.get('/pointages/:id', getPointage);
EmployeRouter.post('/:id/createPointage', createPointage);
EmployeRouter.post('/:id/terminerPointage', teminerPointage);
EmployeRouter.get('/:id/getPointage', getPointagesByEmployeId);
EmployeRouter.post('/:id/createProject', createProject)
EmployeRouter.get('/:id/getProjects', getProjects)

// app.put('/pointages/:id', updatePointage);
// app.delete('/pointages/:id',deletePointage);  


///////////////Project/////////////////////
// app.get('/projects', getProjects);

///////////////Task////////////////////////
// app.get('/projects/:id/tasks', getTask);

///////////////Conge////////////////////////
// app.get('/Conges', getAllConges);
// app.get('/Conges/:id', getCongeById);
// app.post('Conges', createConge);
// app.put('/Conges/:id', updateConge);
// app.delete('/Conges/:id', deleteConge);