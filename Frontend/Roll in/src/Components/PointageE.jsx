// import Modal from 'react-modal';
import React, { useState } from "react";
import { createPointage } from '../Api/Apis';
import { useMutation } from "@tanstack/react-query";
// import Addpoint from "../Components/Addpointage"
// import Endpoint from "../Components/Endpointage"
// Modal.setAppElement('#root');
const GPointage = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => {
    //   setIsModalOpen(true);
    // }
  
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // }
    

    // const [isModal_Open, setIsModal_Open] = useState(false);

    // const open_Modal = () => {
    //   setIsModal_Open(true);
    // }
  
    // const close_Modal = () => {
    //   setIsModal_Open(false);
    // }


    const [startTime, setstartTime] = useState("");
    
  

    
    const createPointageMutation = useMutation(createPointage, {
        onSuccess: () => {
            refetch()
        },
    });
    
    const handleNewPointagesubmit = (e) => {
        
        e.preventDefault();

        createPointageMutation.mutate({startTime});
        setstartTime("")

    };

    return(
<section  className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
  <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">

              <form onSubmit={handleNewPointagesubmit} className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                  <button onSubmit={handleNewPointagesubmit}  type="submit" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-green-700 hover:bg-white hover:text-green-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Commencer
                  </button>
                  {/* <Modal className={"flex flex-col items-center gap-5 justify-center "} isOpen={isModal_Open} onRequestClose={close_Modal}>          
                  <Addpoint/>
                  <button className='bg-red-500 px-4 py-2 ml-4 text-xs font-semibold rounded-md' onClick={close_Modal}>Fermer</button>
                  </Modal> */}
               
                  <button  type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-lg focus:outline-none hover:bg-white hover:text-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Terminer
                  </button>
                  {/* <Modal className={"flex flex-col items-center gap-5 justify-center "} isOpen={isModalOpen} onRequestClose={closeModal}>          
                  <Endpoint/>
                  <button className='bg-red-500 px-4 py-2 ml-4 text-xs font-semibold rounded-md' onClick={closeModal}>Fermer</button>
                  </Modal> */}
              </form>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>

                          <th scope="col" className="px-4 py-3">Date</th>
                          <th scope="col" className="px-4 py-3">Start time</th>
                          <th scope="col" className="px-4 py-3">End time</th>
                          <th scope="col" className="px-4 py-3">Heures de travail</th>
                          <th scope="col" className="px-4 py-3">On/Off-line</th>
                      </tr>
                  </thead>
                  <tbody>
       
                    
                  </tbody>
              </table>
          </div>

      </div>
  </div>
</section>
);
};

export default GPointage;