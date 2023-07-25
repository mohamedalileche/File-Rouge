import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Logo from "../assets/Group.png"
import Bg from "../assets/Q.jpg"

import { useMutation } from "@tanstack/react-query";
import { login } from "../Api/Apis";
import useUserId from "../Hooks/useUserId";

function Log() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Badge, setBadge] = useState("Entreprise");

  const navigate = useNavigate();
  const {userRole} = useUserId()
  // console.log({userRole});
 
  const loginMutation = useMutation(login, {
    onSuccess: (message) => {
      localStorage.setItem("token", message.accessToken);
      if (Badge === "Entreprise" ) {
        navigate("/Home");   
      } else if ( Badge === "Employe" && userRole === "Salarié") {
        navigate("/HomeE");
      } else if ( Badge === "Employe" && userRole === "Manager") {
        navigate("/HomeM")
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
      
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50" style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '80%', }}>
        <div>
          <a href="/">
            <img src={Logo} alt="Logo" className="h-16 w-16 mx-auto mb-2" />
            <h3 className="text-4xl font-bold text-[#00A9BA]">PunchClock</h3>
          </a>
        </div>
        <div className="w-10/12 px-6 py-10 mt-6  overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg border-2 border-[#00A9BA]">
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
                  <option className= " block text-sm font-medium " value="Entreprise">Entreprise</option>
                  <option className= " block text-sm font-medium " value="Employe">Employé</option>
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
            <div className="flex items-center justify-center mt-4">
              <Link to="/Signup" 
              className="text-sm text-gray-600 underline hover:text-gray-900 cursor-[pointer]">
                                Créer un compte?                               
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#00A9BA] border border-transparent rounded-md active:bg-gray-900 false"
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
