import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEmployee } from "../Api/Apis";




const Adduser = () => {

    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [Email, setEmail] = useState("");
    const [Role, setRole] = useState("");
    const [Horaires, setHoraires] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate()
    const queryClient = useQueryClient();
    
    const createEmployeeMutation = useMutation(createEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("Employe");
            navigate('/')
        },
    });


    const handleAddusersubmit = (e) => {
        
        e.preventDefault();

        createEmployeeMutation.mutate({Nom,Prenom,Telephone,Email,Role,Horaires,Password});
        setNom("");
        setPrenom("");
        setTelephone("");
        setEmail("");
        setRole("");
        setHoraires("");
        setPassword("")
    };

    return (
        <div>
            <div className="flex flex-col items-center h-[440px] pt-6 sm:justify-center sm:pt-0 ">
                <div className="w-full px-6 py-4 mt-6 overflow-auto bg-white  shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={handleAddusersubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm  font-medium text-gray-700 undefined"
                            >
                                Nom
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setNom(e.target.value)}
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Prénom
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPrenom(e.target.value)}
                                    type="text"
                                    name="Prénom"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Telephone
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setTelephone(e.target.value)}
                                    type="text"
                                    name="Telephone"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="Prénom"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Role
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    name="Role"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">

                            <button 
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
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