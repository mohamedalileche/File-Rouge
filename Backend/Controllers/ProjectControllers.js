import Project from "../Models/Project.js";

//Project
export const addProject = async (req,res) => {
    const {Titre} = req.body; 
    if(! await Project.findOne({Titre})){
        const project =  await Project.create({Titre}); 
         res.status(200).json(project);
    }else{
        res.status(400).json({message: "Le nom existe déja "});
    }
  
  }
  export const getProjects = async (req,res) => {
    const projects = await Project.find({},'Titre _id');
    res.status(200).json(projects);
  }
  export const getProject = async (req,res) => {
    const projectID = req.params.id || "first"; 
    let project ;
    if(projectID !== "first"){
    project = await Project.findById(projectID);
    res.status(200).json(project);
    }else{
        project = await Project.findOne({});
    res.status(200).json(project);
    }
  
  }
  
  export const removeProject = async (req, res) => {
    const projectID = req.params.id;
    if(! await Project.findById(projectID)){
        res.status(400).json({message: "Non trouvé !"});
    }else{
        await Project.deleteOne({_id:projectID });
        res.status(200).json({message: " Supprimé avec succés!"});
    }
    
  }
  
  export const updateProject = async (req, res) => {
    const {Titre} = req.body; 
    const projectID = req.params.id; 
    try{
        const project = await Project.findById(projectID);
        if(! project){
            res.status(400).json({message: "Non trouvé !"});
        }else{
            project.Titre = Titre;
            project.save();
            res.status(200).json({message: "Modifiée avec succés"});
        }  
    }catch(error){
        res.status(400).json({error:error.message});
    }
  }