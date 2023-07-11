import React from "react";
import Logo from "../../assets/Group.png"
import { Link,NavLink,useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../Api/Apis";
import useUserId from "../../Hooks/useUserId";


  import './navbar.css';
  
  const Navbar = ()=> {
    const {userId, userRole} = useUserId();
    const navigate = useNavigate()
    const logoutMutation = useMutation(logout, {
      onSuccess: () => {
        localStorage.clear('token')
          navigate("/")
      },
  });
  const handlelogoutsubmit = (e) => {
      e.preventDefault();
      const Badge = userRole === undefined? 'Entreprise' : 'Employe'
      logoutMutation.mutate({userId,Badge});
  
  };


    return (

        <nav className="py-2" >
            <h4> <img className='inline-block h-10 w-10'src={Logo} alt="logo" /> PunchClock </h4>
            <form className="hidden sm:block" onSubmit={handlelogoutsubmit}>
                <NavLink to="/HomeM" >Accueil</NavLink>
                <NavLink to="/TacheM" >Gestion taches</NavLink>
                <NavLink to="/" ></NavLink>
            </form>
            <i  className= "  bi bi-three-dots"></i>
            <div className=" sm:hidden menu-toggle">
               <span></span>
               <span></span>
               <span></span>
           </div>
        </nav>

    )
   }
   
   export default Navbar