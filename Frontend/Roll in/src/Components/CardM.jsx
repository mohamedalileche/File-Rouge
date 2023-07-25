
import Modal from 'react-modal';
import NProject from './AddProject'
import React, { useState, useEffect} from "react";
import { getProjects } from '../Api/Apis';
import useUserId from '../Hooks/useUserId';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function Card() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId, Badge } = useUserId();


  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects({userId, Badge});

        setProjects(data);
      } catch (error) {
      }
    };
  
    fetchData();
  }, []);
  

  if (!projects) {
    return <div>Loading...</div>;
  }
  
  

    return (
  <section className="bg-white dark:bg-gray-900 ">
    <div className=" mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 ">
        <button onClick={openModal} className="px-4 py-2 bg-[#00C2CB] hover:bg-[#00A9BA] rounded-[10px] text-white">Ajouter un Project</button>
        <Modal
          className="flex flex-col items-center gap-8 justify-center "
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          >
          <NProject closeModal={closeModal} />  
          </Modal>
      </div>
      {projects.map((project) => (
      <div key={project.id} className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 border-[2px] border-[#00A9BA] rounded-lg">
      <h1 className=" text-4xl text-center font-bold mb-8">{project.Titre}</h1>
      <Link to={`/Voirplus`} aria-labelledby='nonexistent'
        className=" items-center justify-center text-center p-1 text-blue-500 hover:text-gray-500 dark:text-gray-400 dark:hover:text-red-400"       
        >Voir plus
        </Link>  
       
      </div>  
      ))}
    </div>
 </section> 
)}
export default Card;
