
import Modal from 'react-modal';
import React, { useState, useRef,useMemo,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getEmployebyId, getPointagesByEmployeId } from '../Api/Apis';
import useUserId from '../Hooks/useUserId';
import { useParams } from 'react-router-dom';
Modal.setAppElement('#root');


const calculateHeurDeTravailTotale = (createdAt, endTime) => {
    const createdDate = new Date(createdAt)
    const endTimeDate = new Date(endTime)
    const diffInMilliseconds = endTimeDate - createdDate
    const diffInHours = diffInMilliseconds / (1000* 60 * 60)
    const hh = Math.floor(diffInHours)
    const mm = Math.round((diffInHours - hh) * 60)
    const result = `${hh}h:${mm}min`
    return result
}


const UserProfile = () => {
    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userId } = useUserId();
    const tableRef = useRef(null); // Référence au tableau
  
    const {id} = useParams()
    console.log(id)
    const openModal = () => {
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
    }
  
  
    const { data, refetch } = useQuery({
      queryKey: ["ff"],
      queryFn: async () => {
        const data = await getEmployebyId(id)
        console.log({data})
        return data
      }
    });
    const { data: pointages, refetch:refetchpointage, isLoading } = useQuery(
        ['Pointage'],
        async () => {
          const result = await getPointagesByEmployeId(id);
          console.log(result);
          return result;
        }
      );
     
      const [selectedDate, setSelectedDate] = useState(null);
      const [isFiltered, setIsFiltered] = useState(false);
      const [showMoreCount, setShowMoreCount] = useState(7);
      useEffect(() => {
        if (selectedDate !== null) {
          refetch();
        }
      }, [selectedDate, refetch]);

      const handleShowMore = () => {
        setShowMoreCount((prevCount) => prevCount + 1);
      };
    
      const filteredPointages = useMemo(() => {
        if (!pointages) return [];
        
        const pointagesByDate = {};
      
        // Group pointages by date
        pointages?.forEach((pointage) => {
          const date = pointage.createdAt.slice(0, 10);
          if (!pointagesByDate[date]) {
            pointagesByDate[date] = [];
          }
          pointagesByDate[date].push(pointage);
        });
      
        // Sort pointages by date
        const sortedDates = Object.keys(pointagesByDate).sort((a, b) =>
          b.localeCompare(a)
        );
      
        if (selectedDate) {
          setIsFiltered(true); // Set isFiltered to true when a date is selected
          return pointagesByDate[selectedDate] || [];
        } else {
          setIsFiltered(false); // Set isFiltered to false when no date is selected
          return sortedDates.map((date) => pointagesByDate[date][0]);
        }
      }, [pointages, selectedDate]);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center container mx-auto my-5 p-5">

            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              {data &&
                // data.slice(0, showAll ? data.length : 5).map((employe) => (
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Nom:</div>
                    <div className="px-4 py-2">{data.Nom}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Prénom:</div>
                    <div className="px-4 py-2">{data.Prenom}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Téléphone:</div>
                    <div className="px-4 py-2">{data.Telephone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email:</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" >{data.Email}</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Role:</div>
                    <div className="px-4 py-2">{data.Role}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Poste:</div>
                    <div className="px-4 py-2">{data.Poste}</div>
                  </div>
                </div>
              </div>
              }

            <div className="mt-11 overflow-x-auto">
          <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="mb-2 block mx-auto border-[#00A9BA] border-2 rounded-[10px]"/> 
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-4 py-3">Date</th>
                          <th scope="col" className="px-4 py-3">Début</th>
                          <th scope="col" className="px-4 py-3">Fin</th>
                          <th scope="col" className="px-4 py-3">Heures de travil</th>

                      </tr>
                  </thead>
                  <tbody>
                  {!isLoading && (
                  <>
                    {isFiltered ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Tout les pointages de la journée du: {selectedDate}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Tout les Pointages
                        </td>
                      </tr>
                    )}
                    {filteredPointages?.slice(0, showMoreCount)?.map(
                      (pointage,i) => {
                        const HeurDeTravail = calculateHeurDeTravailTotale(
                          pointage.createdAt,
                          pointage.endTime
                        );
                    return (
                  <tr
                    key={i}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td key={i} className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {pointage.createdAt.slice(0,10)}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {pointage.createdAt.slice(11,16)}    
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {pointage?.endTime && pointage.endTime.slice(11, 16)|| 'mazal lehal'}  
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {HeurDeTravail}  
                    </td>
                  </tr>
                    );
                  }
                )}
              </>
            )}
                  </tbody>
              </table>
              {!isLoading && Object.values(filteredPointages)?.length > showMoreCount && (
                <button
                  onClick={handleShowMore}
                  className="block w-full py-2 mt-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Afficher plus
                </button>
              )}
          </div>
            </div>
          </div>

  );
};

export default UserProfile;
