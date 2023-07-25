import React, { useState } from "react";
import Logo from "../../assets/Group.png"
import { Link,NavLink,useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../Api/Apis";
import useUserId from "../../Hooks/useUserId";


  import './navbar.css';
  
  const Navbar = ()=> {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
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

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }


    return (

        <nav className="py-2" >
            <h4> <img className='inline-block h-10 w-10'src={Logo} alt="logo" /> PunchClock </h4>
            <form className="hidden md:block" onSubmit={handlelogoutsubmit}>
                <NavLink to="/Home" >Accueil</NavLink>
                <NavLink to="/Tache" > Gestion taches</NavLink>
                <button  type="submit" >Déconnexion</button>
            </form>
            <i  className= " bi bi-three-dots" ></i>
            <div className=" md:hidden menu-toggle" onClick={handleShowMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`${!showMobileMenu && "hidden"} md:hidden menu-toggle`}>
                <NavLink to="/Home" >Accueil</NavLink>
              <NavLink to="/Tache" > Gestion taches</NavLink>
                <button type="button"> A propos</button>
                <button  type="submit" >Déconnexion</button>
          </div> 
        </nav>

    )
   }
   
   export default Navbar
  //  <h4> <img className='inline-block h-10 w-10'src={Logo} alt="logo" /> PunchClock </h4>
  //  <form className="hidden md:block" onSubmit={handlelogoutsubmit}>
  //      <NavLink to="/Home" >Accueil</NavLink>
  //      <NavLink to="/Tache" > Gestion taches</NavLink>
  //      <button type="button"> A propos</button>
  //      <button  type="submit" >Déconnexion</button>
  //  </form>
  //  <i  className= " bi bi-three-dots" onClick={handleShowMobileMenu}></i>
//   <div className=" sm:hidden menu-toggle">
//   <span></span>
//   <span></span>
//   <span></span>
// </div>
  //  {/* <div className={`${!showMobileMenu && "hidden"} md:hidden menu-toggle`}>
  //      <NavLink to="/Home" >Accueil</NavLink>
  //      <NavLink to="/Tache" > Gestion taches</NavLink>
  //      <button type="button"> A propos</button>
  //      <button  type="submit" >Déconnexion</button>
  // </div> */}