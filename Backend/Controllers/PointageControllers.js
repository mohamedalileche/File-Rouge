import Pointage from '../Models/Pointage.js';

// CREATE
export const createPointage = async (req, res) => {
    const { employeId, date, startTime } = req.body;
    try {
      const employeAttendance = new Pointage({
        employeId,
        date,
        startTime,
      });
      const result = await employeAttendance.save();
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du pointage d\'employé.' });
    }
  };
  
  // READ
  export const getPointage = async (req, res) => {
    try {
      const employeAttendances = await Pointage.find().populate('employeeId');
      res.status(200).json(employeAttendances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des pointages d\'employés.' });
    }
  };
  
  
  
  // UPDATE
  export const updatePointage = async (req, res) => {
    const { id } = req.params;
    const { endTime } = req.body;
    try {
      const employeAttendance = await Pointage.findById(id);
      if (!employeAttendance) {
        return res.status(404).json({ message: 'Pointage d\'employé non trouvé.' });
      }
      employeAttendance.endTime = endTime;
      const result = await employeAttendance.save();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du pointage d\'employé.' });
    }
  };
  