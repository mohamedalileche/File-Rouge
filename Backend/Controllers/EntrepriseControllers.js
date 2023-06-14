import validator from "validator"
import bcrypt from "bcrypt"
import Entreprise from "../Models/Entreprise.js"
import Employee from '../Models/Employe.js';
import { createAccessToken, createRefreshToken } from "../Utils/Token.js"
import { RefreshToken } from "../Models/RefreshToken.js"
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
           return res.status(400).json("password invalid")
        }
        const accessToken = createAccessToken(user._id)
        const refreshToken = createRefreshToken(user._id)

        await RefreshToken.create({
          userId: user._id,
          refreshToken,
        })
        res.cookie(
          "refreshToken",
          { refreshToken },
          {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 24 * 1000 * 7, //7days
          }
        )
        res.status(200).json({accessToken})
    } catch (error) {
        console.log
        res.status(500).json({ message: error.message });

    }
}

export const Logout = async (req, res) => {
    try {
      res.clearCookie("authToken")
      res.status(200).json("logout success")
    } catch (error) {
      res.status(400).json(error)
    }
  }




// ...

export const createEmployee = async (req, res) => {
  const  entrepriseId  = res.locals.entrepriseId;
  console.log(entrepriseId);
  const { Nom, Prenom, Telephone, Email, Role, Horaires, Password } = req.body;
  try {
    const employe =  await Employee.create({Nom, Prenom, Telephone, Email, Role, Horaires, Password, Entreprise: entrepriseId});
    res.status(201).json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const getEmployees = async (req, res) => {
  const entrepriseId = res.locals.entrepriseId;
  console.log(entrepriseId);
  
  try {
    const employees = await Employee.find({ Entreprise: entrepriseId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

