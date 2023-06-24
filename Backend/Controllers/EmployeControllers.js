import Pointage from "../Models/Pointage";
import Employe from "../Models/Employe";
// export const logout = async (req, res) => {
//     const {userId, Badge} = req.body;
    
//     try {
//       let user;
//       if(Badge === "Entreprise") {
//         user = await Entreprise.findById(userId);
//       }else{
//         user = await Employe.findById(userId);
//       }
//       if (!user){
//         throw Error('user not found!')
//       }
//         user.EnLigne = false;
//         await user.save();
        
//         res.status(200).json({ message:  "Déconnecté avec succès" });
//         } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//   }
//   };
export const createPointage = async (req, res) => {
  const employeId = req.params.id;
  console.log(employeId);
  const {  startTime} = req.body;

  try {
    // Vérifier si l'employé existe
    const employe = await Employe.findById(employeId);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    // Créer le pointage
    const pointage = await Pointage.create({ Employe: employeId, startTime });

    res.status(201).json({ message: "Pointage créé avec succès", pointage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du pointage" });
  }
};








