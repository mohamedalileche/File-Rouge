import validator from "validator"
import bcrypt from "bcrypt"
import Entreprise from "../Models/Entreprise.js"
import Employee from '../Models/Employe.js';
import { createAccessToken } from "../Utils/Token.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import Employe from "../Models/Employe.js";

dotenv.config()



////////////Pour S'entregistrer
export const register = async (req, res) => {
    const {Nom_entreprise, Email, Telephone, Password} = req.body
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(Password, salt)
        const newEntreprise = await Entreprise.create({Nom_entreprise, Email,Telephone, Password: hashedPassword})
        res.status(200).json(newEntreprise)
    } catch (error) {
        res.status(400).json( 'Cest pas sa' );

    }
}


//////////// Pour se connecter
export const login = async (req, res) => {
    const {Email, Password,Badge} = req.body 
    console.log(req.body);
    try {    
        if (!Email || !Password){
        throw Error('tout les champs sont requis !')
    } 
    if (!validator.isEmail(Email)) {
        throw Error('invalid email')
    }
      let user;
    if(Badge === "Entreprise") {
      user = await Entreprise.findOne({Email});
    }else{
      user = await Employe.findOne({Email});
    }
    
    if (!user){
      throw Error('user not found!')
    }
        const passwordCompare = await bcrypt.compare(Password, user.Password)
        if (!passwordCompare) {
          console.log(passwordCompare);
           return res.status(400).json("password invalid")
        }
        user.EnLigne = true;
        await  user.save()
        console.log(user);
        const accessToken = createAccessToken(user._id, user.Role, Badge)

        res.status(200).json({accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
//////// Deconnexion
export const logout = async (req, res) => {
  const {userId, Badge} = req.body;
  
  try {
    let user;
    if(Badge === "Entreprise") {
      user = await Entreprise.findById(userId);
    }else{
      user = await Employe.findById(userId);
    }
    if (!user){
      throw Error('user not found!')
    }
      user.EnLigne = false;
      await user.save();
      
      res.status(200).json({ message:  "Déconnecté avec succès" });
      } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
}
};




// ... Ajouter Un employe Depuis une ENTREPRISE 

export const createEmployee = async (req, res) => {
  const  entrepriseId  = req.params.id;
  console.log(entrepriseId);
  const { Nom, Prenom, Telephone, Email,Categorie,Departement, Role, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(Password, salt)
    const employe =  await Employee.create({Nom, Prenom, Telephone, Email,Categorie, Departement, Role, Password:hashedPassword, Entreprise: entrepriseId});
        const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mouhalileche.ma@gmail.com',
        pass: 'bjzrwduxaegazzmt',
      },
    });
    const mailOptions = {
      from: 'mouhalileche.ma@gmail.com',
      to: employe.Email,
      subject: 'Pointage',
      text: `Cher ${employe.Nom} ${employe.Prenom},\n\nBienvenue sur PunchClock! Votre compte a été créé avec succès.\n\nVoici vos identifiants de connexion :\nEmail: ${employe.Email}\nMots de passe: ${Password}\n\nVeuillez visiter notre site Web pour vous connecter.\n\nCordialement,\nVotre Entreprise de pointage\n\nCeci est un Test.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(201).json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};
//Afficher les Employes D'une entreprise
export const getEmployees = async (req, res) => {
  const entrepriseId = req.params.id;
  // console.log(entrepriseId);
  try {
    const employees = await Employee.find({ Entreprise: entrepriseId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
////////////////////////////Supprimer un 'Employé'
export const deleteEmploye = async (req, res) => {
  const entrepriseId = req.params.id; 
  const employeId  = req.params.employeId
  try { 
    const deletedEmploye = await Employe.findByIdAndRemove({entrepriseId, _id:employeId});
    
    if (!deletedEmploye) {
      return res.status(404).json({ message: 'Employe not found' });
    }
    
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//En Savoir plus sur l'employé
export const getEmployebyId = async (req, res) => {
  const entrepriseId = req.params.id;
  const employeId  = req.params.employeId
  // console.log(entrepriseId);
  try {
    const employees = await Employee.find({ Entreprise: entrepriseId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


