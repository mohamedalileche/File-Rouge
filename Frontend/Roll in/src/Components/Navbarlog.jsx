import React from "react";
import Logo from "../assets/Logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {
 return(
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <img
                  className="h-16 w-16"
                  src={Logo}
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline justify-end space-x-4">
                  <Link to="/Signup" className="flex items-center justify-self-end gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                            Sign up                 
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
            </div>
          </div>
        </div>
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">    
            <Link to="/Signup"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </div>
 ); 
  };
export default Navbar;