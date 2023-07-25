import  express  from "express"
// import { createPointage, getPointage, updatePointage, deletePointage, getProjects, getTask, getAllConges, getCongeById, createConge, updateConge, deleteConge } from "../Controllers/EmployeControllers.js";
import { createPointage, createTache, getPointagesByEmployeId, getProjects, getTachesByEmploye, getTachesByManager, teminerPointage, updateTacheStatus } from "../Controllers/EmployeControllers.js";
import { createProject } from "../Controllers/EmployeControllers.js";


export const EmployeRouter = express.Router()



///////////////Pointage/////////////////////
// app.get('/pointages/:id', getPointage);
EmployeRouter.post('/:id/createPointage', createPointage);
EmployeRouter.post('/:id/terminerPointage', teminerPointage);
EmployeRouter.get('/:id/getPointage', getPointagesByEmployeId);
EmployeRouter.post('/:id/createProject', createProject)
EmployeRouter.get('/:id/getProjects', getProjects)
EmployeRouter.post('/:id/createTache', createTache)
EmployeRouter.get('/:id/getTachesByManager', getTachesByManager)
EmployeRouter.get('/:id/getTachesByEmploye', getTachesByEmploye)
EmployeRouter.put('/:id/updateTacheStatus', updateTacheStatus)


