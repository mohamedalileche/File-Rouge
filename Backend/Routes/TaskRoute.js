import { getTask, addTask, updateTask, removeTask} from "../Controllers/TaskControllers.js";


app.get('/projects/:id/tasks', getTask);
app.post('/tasks', addTask);
app.put('/tasks/:id', updateTask);
app.delete('/task/:id', removeTask);
