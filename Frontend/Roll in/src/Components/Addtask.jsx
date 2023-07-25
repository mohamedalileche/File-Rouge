
import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useUserId from "../Hooks/useUserId";
import Modal from 'react-modal';
import { createTache } from "../Api/Apis";
Modal.setAppElement('#root');



const AddTask= () => {
  const [Titre, setTitre] = useState("");
  const [Description, setDescription] = useState("");
  const [Assigne, setAssigne] = useState("");


  const {userId} = useUserId()
  const queryClient = useQueryClient();
  
  const createTacheMutation = useMutation(createTache, {
      onSuccess: () => {
          queryClient.invalidateQueries("");
          
      },
  });


  const handlecreateTachesubmit = (e) => {
      
      e.preventDefault();

      createTacheMutation.mutate({userId,Titre, Assigne,Description});
      setTitre("");
      setAssigne("");
      setDescription("");



  };
 
    // ...
  
    const handleButtonClick = () => {
      // Actions spécifiques du bouton dans le composant NProject
  
      // Appel de la fonction de fermeture pour fermer le modal
      closeModal();
    };

      

    
  return (
    <div>
        <div id="root" className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ajoutez une Tache
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </button>
            </div>
            <form onSubmit={handlecreateTachesubmit} className="flex flex-col items-center justify-center">
              <div className="grid gap-4 mb-2 sm:grid-cols-2">


                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Titre:
                  </label>
                  <input onChange={(e) => setTitre(e.target.value)}
                    type="text"
                    name="Titre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Titre"
                    value={Titre}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Personne:
                  </label>
                  <input onChange={(e) => setAssigne(e.target.value)}
                    type="text"
                    name="Assigne"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Titre"
                    value={Assigne}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="Discription"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={Description}
                  />
                  
                </div>
              </div>
              <button
                type="submit"
                className="text-[#00A9BA] hover:text-black inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"

                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Nouvelle Tache
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default AddTask;
