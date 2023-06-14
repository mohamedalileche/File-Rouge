import Task from'../Models/Task.js'

// Ajouter une tache
export const addTask = async (req,res) => {
    const ProjectID = req.params.id;  
    const {Titre, Description} = req.body; 
    
    const task = await Task.create({Titre,Description, Project:ProjectID});
  
         res.status(200).json(task);
     
  }
  
  export const getTask = async (req,res) => {
    const ProjectID = req.params.id;
    const tasks = await Task.find({Project:ProjectID});
    res.status(200).json(tasks);
  }
  
  export const removeTask = async (req, res) => {
    const taskID = req.params.id;
    if(! await Task.findById(taskID)){
        res.status(400).json({message: "Non trouvé!"});
    }else{
        await Task.deleteOne({_id:taskID });
        res.status(200).json({message: "Supprimée avec succés!"});
    }    
  }
  
  export const updateTask = async (req, res) => {
    const {Titre,Description} = req.body; 
    const taskID = req.params.id; 
    try{
        const task = await Task.findById(taskID);
        if(! task){
            res.status(400).json({message: "Non trouvé!"});
        }else{
            task.Titre = Titre;
            task.Description = Description;
            task.save();
            res.status(200).json({message: "Modifiée avec succés!"});
        }  
    }catch(error){
        res.status(400).json({error:error.message});
    }
  }