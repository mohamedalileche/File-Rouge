import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEmployee } from "../Api/Apis";
import useUserId from "../Hooks/useUserId";




const Adduser = ({ closeModal }) => {
    const {userId} = useUserId();
    useEffect(()=>{
        
    },[userId]);
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [Email, setEmail] = useState("");
    const [Poste, setPoste] = useState("");
    const [Role, setRole] = useState("Manager");
    const [Password, setPassword] = useState("");
    
    const queryClient = useQueryClient();
    
    const createEmployeeMutation = useMutation(createEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("Employe");
            
        },
    });


    const handleAddusersubmit = (e) => {
        
        e.preventDefault();

        createEmployeeMutation.mutate({Nom,Prenom,Telephone,Email,Poste,Role,Password, Entreprise:userId});
        setNom("");
        setPrenom("");
        setTelephone("");
        setEmail("");
        setPoste("");
        setRole("");
        setPassword("")
    };
    const handleButtonClick = () => {
        closeModal();
      };
    return (
        <div className="w-full h-full">
            <div className="h-full flex flex-col items-center  pt-6 sm:justify-center sm:pt-0 ">
                <div className="w-full px-6 py-4 mt-6 overflow-auto bg-white  shadow-md sm:max-w-md sm:rounded-lg flex flex-col">
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white "
                    data-modal-toggle="defaultModal"
                    onClick={handleButtonClick}
                >
                    <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                    </button>
                    <form onSubmit={handleAddusersubmit} className="h-full">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm  font-medium text-gray-700 undefined"
                            >
                                Nom:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setNom(e.target.value)}
                                    type="text"
                                    name="name"
                                    value={Nom}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Prénom:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPrenom(e.target.value)}
                                    type="text"
                                    name="Prénom"
                                    value={Prenom}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Telephone"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Telephone:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setTelephone(e.target.value)}
                                    type="text"
                                    name="Telephone"
                                    value={Telephone}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    value={Email}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Categorie"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Poste:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPoste(e.target.value)}
                                    type="text"
                                    name="Poste"
                                    value={Poste}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
              
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Role:
                            </label>
                            <div className="flex flex-col items-start">
                                <select
                                id="role"
                                value={Role}
                                onChange={(e) => setRole(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                <option value="Manager">Manager</option>
                                <option value="Salarié">Salarié</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Mots de passe:
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    value={Password}
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">

                            <button 
                                type="submit"
                                className="inline-flex justify-center items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#00C2CB] hover:bg-[#00A9BA] border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Adduser;