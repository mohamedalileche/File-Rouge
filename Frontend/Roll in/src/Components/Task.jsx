
import Modal from 'react-modal';
import NTask from './Addtask'
import React, { useState, useEffect} from "react";
import { getProjects } from '../Api/Apis';
import useUserId from '../Hooks/useUserId';

Modal.setAppElement('#root');

function Task() {
  const [isModal_Open, setIsModal_Open] = useState(false);

  const { userId, Badge } = useUserId();
  
  const open_Modal = () => {
    setIsModal_Open(true);
  }

  const close_Modal = () => {
    setIsModal_Open(false);
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
      <button onClick={open_Modal} className="px-4 py-2 bg-[#00C2CB] hover:bg-[#00A9BA] rounded-[10px] text-white">Ajouter une nouvelle tache</button>
          <Modal
          className="flex flex-col items-center gap-8 justify-center "
          isOpen={isModal_Open}
          onRequestClose={close_Modal}
          >
          <NTask closeModal={close_Modal} />  
          </Modal>
      </div>
      <div  className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 border-[2px] border-[#00A9BA] rounded-lg">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        </div> 
        <div className="grid gap-8 lg:grid-cols-2">         
          <article  className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Tache
              </span>
              <span className="text-sm">20h:30</span>
            </div>
            <h2 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">TITRE</a></h2>
            <p className="mb-5 font-light text-gray-500 text-center dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam unde vel reiciendis hic</p>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              {/* <div className="flex items-center space-x-4">
                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
                  <span className="font-medium dark:text-white">
                  </span>
              </div> */}
              <button  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-[10px] text-white">Supprimer</button>
              <button className='px-4 py-2 bg-white hover:bg-[#E6F4F1] rounded-[10px]'>Modifier</button>
              <h4>Employé:,<br /> jhjhhojohguifudtycfghjk</h4>
            </div>
          </article>                              
        </div>  
      </div>
    </div>
 </section> 
)}
export default Task;
