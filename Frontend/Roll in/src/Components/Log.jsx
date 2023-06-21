import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../Api/Apis";
import useUserId from "../Hooks/useUserId";

function Log() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Badge, setBadge] = useState("Entreprise");

  const navigate = useNavigate();
  const {userRole} = useUserId()
  console.log({userRole});
  const loginMutation = useMutation(login, {
    onSuccess: (message) => {
      localStorage.setItem("token", message.accessToken);
      if (Badge === "Entreprise" ) {
        navigate("/Home");   
      } else if ( Badge === "Employe" && userRole === "Salarié") {
        navigate("/HomeE");
      } else if ( Badge === "Employe" && userRole === "Manager") {
        navigate("/Home")
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLoginsubmit = async (e) => {
    e.preventDefault();

    loginMutation.mutate({ Email, Password, Badge });
  };

  return (
    <div>
      <div className="flex flex-col items-center  min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Pointage</h3>
          </a>
        </div>
        <div className="w-full px-10 py-20 mt-6  overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleLoginsubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Badge:
              </label>
              <div className="flex flex-col items-start">
                <select
                  id="Badge"
                  defaultValue={Badge}
                  name="Badge"
                  onChange={(e) => setBadge(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Entreprise">Entreprise</option>
                  <option value="Employe">Employé</option>
                </select>
              </div>
            </div>
            {/* {Badge === "Employe" && (
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Role:
                </label>
                <div className="flex flex-col items-start">
                  <select
                    id="Role"
                    defaultValue={Role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Salarié">Salarié</option>
                  </select>
                </div>
              </div>
            )} */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email:
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password:
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                  type="password"
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Se Connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Log;
