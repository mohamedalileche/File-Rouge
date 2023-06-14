import { getAllConges, getCongeById, createConge, updateConge, deleteConge } from "../Controllers/CongeControllers.js";

app.get('/Conges', getAllConges);
app.get('/Conges/:id', getCongeById);
app.post('Conges', createConge);
app.put('/Conges/:id', updateConge);
app.delete('/Conges/:id', deleteConge);