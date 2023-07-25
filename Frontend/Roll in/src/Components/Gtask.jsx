import Modal from 'react-modal';
import React, { useState, useRef } from "react";
import { useQuery,useMutation } from "@tanstack/react-query";
import Newuser from "./Adduser"
import PointageE from "../Components/PointageE"
import { deleteEmploye, getEmployees } from '../Api/Apis';
import useUserId from '../Hooks/useUserId';
import { Link } from 'react-router-dom';
Modal.setAppElement('#root');
const Gtask = () => {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useUserId();
  const [onlineEmployeeCount, setOnlineEmployeeCount] = useState(0)
  const [employeeCount, setEmployeeCount] = useState(0)
  const [offlineEmployeeCount, setofflineEmployeeCount] = useState(0)
  
  const tableRef = useRef(null); // Référence au tableau

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


  const { data, refetch,isLoading } = useQuery({
    queryKey: ["gfdgff"],
    queryFn: async () => {
      const data = await getEmployees(userId)
      setOnlineEmployeeCount(data.filter((employe) => employe.EnLigne).length)
      setofflineEmployeeCount(data?.filter((employe) => !employe.EnLigne).length)
      setEmployeeCount(data.length)
      return data
    }
  });
  const deleteEmployeMutation = useMutation(deleteEmploye, {
    onSuccess: () => {
      refetch()
    },
  });
  const handleDeleteEmploye = (data) => {
    deleteEmployeMutation.mutate({entrepriseId:userId,employeId:data});
  };

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const onlineEmployeeCount = data
  //   ? data?.filter((employe) => employe.EnLigne).length
  //   : 0;

  // const employeeCount = data ? data.length : 0;
  // const offlineEmployeeCount = data
  //   ? data?.filter((employe) => !employe.EnLigne).length
  //   : 0;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500">All Users:</span>
              <span className="dark:text-white">{employeeCount}</span>
            </h5>
            <h5>
              <span className="text-gray-500">User On-Line :</span>
              <span className="dark:text-white">{onlineEmployeeCount}</span>
            </h5>
            <h5>
              <span className="text-gray-500">User Off-Line :</span>
              <span className="dark:text-white">{offlineEmployeeCount}</span>
            </h5>
          </div>
          <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <button
              onClick={openModal}
              type="button"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-[#00C2CB] hover:bg-[#00A9BA] focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add new User
            </button>
            <Modal
              className="mt-5 h-full flex flex-col items-center gap-8 justify-center "
              isOpen={isModalOpen}
              onRequestClose={closeModal}
            >
              <Newuser closeModal={closeModal} />  
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Nom
                </th>
                <th scope="col" className="px-4 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-4 py-3">
                   Poste
                </th>
                <th scope="col" className="px-4 py-3">
                   Role
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>  
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
                <th scope="col" className="px-4 py-3">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && 
                data?.slice(0, showAll ? data.length : 5).map((employe) => (
                  <tr key={employe._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td>
                          {employe.Nom}  {employe.Prenom}
                    </td>
                    <td>
                      {employe.Email}
                    </td>
                    <td>
                      {employe.Poste}
                    </td>
                    <td>
                      {employe.Role}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {employe?.EnLigne ? (
                          <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                        ) : (
                          <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <button aria-labelledby='nonexistent'
                      className="flex items-center justify-center p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      onClick={() => handleDeleteEmploye(employe._id)}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Supprimer
                    </button>
                    </td>
                    <td>
                    <Link to={`/Ensavoirplus/${employe._id}`} aria-labelledby='nonexistent'
                    // onClick={open_Modal}
                      className="flex items-center justify-center p-1 text-blue-500 hover:text-gray-500 dark:text-gray-400 dark:hover:text-red-400"
                      
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                    En savoir plus
                    </Link>
                    {/* <Modal
                    className={"flex flex-col items-center gap-5 justify-center "}
                    isOpen={isModalOpen}
                    onRequestClose={close_Modal}
                    >
                    <PointageE />
              
                    <button
                    className="bg-red-500 px-4 py-2 ml-4 text-xs font-semibold rounded-md"
                    onClick={close_Modal}
                    >
                    Fermer
                    </button>
                    </Modal> */}
                  </td>
                  </tr>
                ))}
          
            </tbody>
          </table>
        </div>
        {!showAll && data && data.length > 5 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClick}
              className="px-4 py-2 text-sm font-medium text-gray-900 transition duration-500 ease-in-out bg-transparent border border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white focus:outline-none"
            >
              Afficher plus
            </button>
          </div>
        )}
        {showAll && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClick}
              className="px-4 py-2 text-sm font-medium text-gray-900 transition duration-500 ease-in-out bg-transparent border border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white focus:outline-none"
            >
              Remonter
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
  );
};

export default Gtask;
