import React, { useEffect, useState } from "react";
import { getPointagesByEmployeId } from "../Api/Apis.js"; // Importer la fonction getPointagesByEmployeId depuis votre API
import { useQuery } from "@tanstack/react-query";
import useUserId from "../Hooks/useUserId.jsx";

const EmployePoint = () => {
  const { userId} = useUserId()
  const { data: pointages} = useQuery(['Pointage'], 
     async () => {
      const result = await getPointagesByEmployeId(userId);
      console.log(result)
      return result
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    StartTime
                  </th>
                  <th scope="col" className="px-4 py-3">
                    EndTime
                  </th>
                </tr>
              </thead>
              <tbody>
                {pointages?.map((pointage) => (
                  <tr
                    key={pointage.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {pointage.startTime}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {pointage?.endTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployePoint;
