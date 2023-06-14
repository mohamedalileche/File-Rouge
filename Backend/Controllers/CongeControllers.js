import Conge from '../Models/Conge.js';

// Get all Conges
export const getAllConges = async (req, res) => {
    try {
      const conges = await Conge.find().populate('employe');
      res.status(200).json(conges);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des congés.' });
    }
  };
  
  // Get Conge by ID
  export const getCongeById = async (req, res) => {
    const { id } = req.params;
    try {
      const conge = await Conge.findById(id).populate('employe');
      if (!conge) {
        return res.status(404).json({ message: 'Congé non trouvé.' });
      }
      res.status(200).json(conge);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du congé.' });
    }
  };
  
  // Create Conge
  export const createConge = async (req, res) => {
    const { employeId, debut, fin, type } = req.body;
    try {
      const conge = new Conge({ employe: employeId, debut, fin, type });
      await conge.save();
      res.status(201).json(conge);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du congé.' });
    }
  };
  
  // Update Conge
  export const updateConge = async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;
    try {
      const conge = await Conge.findByIdAndUpdate(
        id,
        { $set: { statut } },
        { new: true }
      );
      if (!conge) {
        return res.status(404).json({ message: 'Congé non trouvé.' });
      }
      res.status(200).json(conge);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du congé.' });
    }
  };
  
  // Annulation
  export const deleteConge = async (req, res) => {
    const { id } = req.params;
    try {
      const conge = await Conge.findByIdAndDelete(id);
      if (!conge) {
        return res.status(404).json({ message: 'Congé non trouvé.' });
      }
      res.status(200).json({ message: 'Congé supprimé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du Conge d\'employé.' });
    }
  };
  
  