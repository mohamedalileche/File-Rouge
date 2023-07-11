import React, { useEffect, useState,useMemo } from "react";
import { createPointage, getPointagesByEmployeId, teminerPointage } from '../Api/Apis';
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserId from "../Hooks/useUserId";


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


const GPointage = () => {

    const {userId} = useUserId()
    const [selectedDate, setSelectedDate] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
  
    const { data: pointages, refetch, isLoading } = useQuery(
      ['Pointage'],
      async () => {
        const result = await getPointagesByEmployeId(userId);
        // console.log(result);
        return result;
      }
    );
    
    useEffect(() => {
      if (selectedDate !== null) {
        refetch();
      }
    }, [selectedDate, refetch]);
    
    
    const createPointageMutation = useMutation(createPointage, {
        onSuccess: (response) => {
            // refetch()
            localStorage.pointageId = response._id ; 
            // console.log(response._id)
        },
    });
    const terminerPointageMutation = useMutation(teminerPointage, {
        onSuccess: (response) => {
            refetch()
        //  location.reload()  //// 
            localStorage.removeItem('pointageId'); 
            // console.log(response._id)
        },
    });
    const handleNewPointagesubmit = (e) => {
        e.preventDefault();
        // setstartTime(new Date());
        createPointageMutation.mutate({employeId:userId});
    };
    const handleTerminerPointage = (e) => {
        e.preventDefault();
        // setstartTime(new Date());
        terminerPointageMutation.mutate({pointage:localStorage.pointageId});
    };
    const [showMoreCount, setShowMoreCount] = useState(7);

    const handleShowMore = () => {
      setShowMoreCount((prevCount) => prevCount + 1);
    };
  
    const filteredPointages = useMemo(() => {
      if (!pointages) return [];
      
      const pointagesByDate = {};
    
      // Group pointages by date
      pointages.forEach((pointage) => {
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
    
  
  

    return(
<section  className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
  <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                {
                    !localStorage.pointageId ? 
                  <button onClick={handleNewPointagesubmit}  type="submit" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-green-700 hover:bg-white hover:text-green-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Commencer
                  </button>
                    :  //  Ternary operator
                  <button onClick={handleTerminerPointage} type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-lg focus:outline-none hover:bg-white hover:text-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Terminer
                  </button>
                }
          </div>
          <div className="overflow-x-auto">
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
</section>
);
};

export default GPointage;