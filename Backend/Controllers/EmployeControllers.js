import Pointage from "../Models/Pointage.js";
import Employe from "../Models/Employe.js";
import Project from "../Models/Project.js"
import Entreprise from "../Models/Entreprise.js";
import Task from "../Models/Task.js";



export const createPointage = async (req, res) => {
  const employeId = req.params.id;
  console.log(employeId);
  // const {  startTime} = req.body;
  try {
    // Vérifier si l'employé existe
    const employe = await Employe.findById(employeId);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    // Créer le pointage
    const pointage = await Pointage.create({employeId });

    res.status(201).json( pointage );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du pointage" });
  }
};





export const teminerPointage = async (req, res) => {
  const pointageId = req.params.id;
  console.log(pointageId);
  // const {  startTime} = req.body;

  try {
    // Vérifier si l'employé existe
    // const employe = await Employe.findById(employeId);
    const pointage = await Pointage.findByIdAndUpdate(pointageId, {endTime: new Date()});
    console.log(pointage)
    if (!pointage) {
      return res.status(404).json({ message: "pointage non trouvé" });
    }
    // Créer le pointage

    res.sendStatus(201)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du pointage" });
  }
};



export const getPointagesByEmployeId = async (req, res) => {
  const employeId = req.params.id;
  try {
    const pointages = await Pointage.find({ employeId });
console.log(pointages)
    res.status(200).json(pointages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des pointages de l'employé" });
  }
};




///////////////////////////////////////LES Projets et les Taches(Pour Le Manager)
export const createProject = async (req, res) => {
  
  const employeId = req.params.id;
  const { Titre } = req.body;
  try {
    // Vérifier si l'employé existe
    const employe = await Employe.findById(employeId);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    // Vérifier le rôle de l'employé
    if (employe.Role !== "Manager") {
      return res.status(403).json({ message: "Seuls les managers peuvent créer des projets" });
    }
    // Créer le projet
    const project = await Project.create({  Titre ,Entreprise: employe.Entreprise });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getProjects = async (req, res) => {
  const employeId = req.params.id;
  const { Badge } = req.query;
  console.log({Badge, employeId});
  try {
    let employe ;
    if(Badge === "Entreprise"){

       employe = await Entreprise.findById(employeId);
    }else{

      employe = await Employe.findById(employeId);
    }
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    console.log({role:employe.Role})
    if (employe.Role !== "Manager" && Badge !== "Entreprise") {
      return res.status(403).json({ message: "Seuls les managers peuvent créer des projets" });
    }
let projects;
    if(Badge === "Entreprise"){

       projects = await Project.find({ Entreprise: employe._id });

   }else{

     projects = await Project.find({ Entreprise: employe.Entreprise });

   }
    res.status(200).json(projects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


//Taches

export const createTache = async (req, res) => {
  const { Titre, Description, Assigne } = req.body;
  try {
    // Vérifier si l'employé existe en fonction du nom et prénom donnés (Assigne)
    const employe = await Employe.findOne({ nom: Assigne.Nom, prenom: Assigne.Prenom });

    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Créer la tâche en utilisant l'identifiant de l'employé trouvé
    const tache = await Task.create({ Titre, Description, Employe: employe._id, Manager: employe._id });
    res.status(201).json(tache);
    console.log(tache);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getTachesByManager = async (req, res) => {
  const employeId = req.params.id;
  try {
    const taches = await Task.find({Manager: employeId})
    res.status(200).json(taches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const getTachesByEmploye = async (req, res) => {
  const employeId = req.params.id;
  try {
    const taches = await Task.find({Employe: employeId})
    res.status(200).json(taches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateTacheStatus = async (req, res) => {
  const {tacheId} = req.params
  const {status} = req.body
  try {
    const tache = await Task.findByIdAndUpdate(tacheId, {Status: status})
    res.status(200).json(tache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}