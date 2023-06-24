import Modal from 'react-modal';
import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Newuser from "../Components/Adduser"
import { getEmployees } from '../Api/Apis';
import useUserId from '../Hooks/useUserId';

const Gtask = () => {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useUserId();
  const tableRef = useRef(null); // Référence au tableau

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const { data } = useQuery({
    queryKey: ["ff"],
    queryFn: async () => {
      const data = await getEmployees(userId)
      return data
    }
  });

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onlineEmployeeCount = data
    ? data.filter((employee) => employee.EnLigne).length
    : 0;

  const employeeCount = data ? data.length : 0;
  const offlineEmployeeCount = data
    ? data.filter((employee) => !employee.EnLigne).length
    : 0;

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
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
              className={"flex flex-col items-center gap-5 justify-center "}
              isOpen={isModalOpen}
              onRequestClose={closeModal}
            >
              <Newuser />
              <button
                className="bg-red-500 px-4 py-2 ml-4 text-xs font-semibold rounded-md"
                onClick={closeModal}
              >
                Fermer
              </button>
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Employés
                </th>
                <th scope="col" className="px-4 py-3">
                  On/Off-line
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.slice(0, showAll ? data.length : 5).map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {employee.Nom} {employee.Prenom}
                    </th>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {employee?.EnLigne ? (
                          <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                        ) : (
                          <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                        )}
                      </div>
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
