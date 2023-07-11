import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { register } from "../Api/Apis";
import Logo from "../assets/Group.png"
import Bg from "../assets/Q.jpg"



function Registration() {
const [Nom_entreprise, setNom_entreprise] = useState("");
const [Email, setEmail] = useState("");
const [Telephone, setTelephone] = useState("");
const [Password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");



const navigate = useNavigate()


const queryClient = useQueryClient();

const registerMutation = useMutation(register, {
    onSuccess: () => {
        queryClient.invalidateQueries("Inscription");
        navigate("/")
    },
    onError: (error) => {
        setErrorMessage("Verifiez vos identifiant"); // Définit le message d'erreur si l'e-mail est déjà utilisé
      },
});


const handleRegistrationsubmit = (e) => {
    
    e.preventDefault();
    setErrorMessage("");
    registerMutation.mutate({Nom_entreprise,Email,Telephone,Password});
    setNom_entreprise("");
    setEmail("");
    setTelephone("");
    setPassword("");

};

    return (
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50"style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '80%', }}>
                <div>
                <a href="/">
                  <img src={Logo} alt="Logo" className="h-16 w-16 mx-auto mb-2" />
                  <h3 className="text-4xl font-bold text-[#00A9BA]">PunchClock</h3>
                 </a>
                </div>
                <div className="w-10/12 px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg border-2 border-[#00A9BA]">
                    <form onSubmit={handleRegistrationsubmit}>
                        <div className="text-red-500 mt-2">
                           <p>{errorMessage}</p>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Nom de votre entreprise:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setNom_entreprise(e.target.value)}
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Telephone:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setTelephone(e.target.value)}
                                    type="text"
                                    name="Telephone"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password:
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div> */}
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Link to="/" 
                                className="text-sm text-gray-600 underline hover:text-gray-900 cursor-[pointer]"
                            >
                                Already registered?                               
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#00A9BA] border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                     
                    </form>
                </div>
            </div>
    );
};

export default Registration;