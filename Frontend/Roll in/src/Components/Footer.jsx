import React from 'react'

//Icons importée
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'


const Footer = () => {
  return(
    <div className='footer p-[5rem] mb-4 bg-bluecolor rounded-[10px] gap-8 grid grid-cols-5 m-auto items-center border[1px] justify-center'>

      <div>
        <div className='logoDiv'>
          <h1 className='logo text-[25px] text-[#00C2CB] pb-[1.5rem]'>
            <strong>Punch</strong>Clock
          </h1>
        </div>
        <p className='text-black pb-[13px] opacity-70 leading-7'>
          Lorem ipsum, dat aspernatur aperes nemo mollitia odio? A provident consequuntur officia consectetur suscipit explicabo sapiente nam repudiandae cumque
        </p>
      </div>
      <div className='grid'>
        <span className='divTitle text-[18px] font-semibold pb[1.5rem] text-black'>
          Companie
        </span>
        <div className='grid gap-3'>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>A Propos</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Features</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Nouveauté</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>FAQ</li>
        </div>
      </div>
      <div className='grid'>
        <span className='divTitle text-[18px] font-semibold pb[1.5rem] text-black'>
          Support
        </span>
        <div className='grid gap-3'>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Evénement</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Promotions</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Nouveauté</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Carrières</li>
        </div>
      </div>
      <div className='grid'>
        <span className='divTitle text-[18px] font-semibold pb[1.5rem] text-black'>
          Ressources
        </span>
        <div className='grid gap-3'>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Comptes</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Centre de support</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Feedback</li>
          <li className='text-black opacity-[.7] hover:opacity-[1]'>Nous Contacter</li>
        </div>
      </div>
      <div className='grid'>
        <span className='divTitle text-[18px] font-semibold pb[1.5rem] text-black'>
          Info Contact
        </span>
        <div className='grid gap-3'>
          <small className='text-[14px] text-black'>
            PunchClock@outlook.com
          </small>
          <div className='icons flex gap-4 py-[1rem]'>
            <AiFillInstagram className='bg-[#00C2CB] hover:bg-[#00A9BA] p-[8px] h-[35px] w-[35px] rounded-full icon text-white'/>
            <AiFillFacebook className='bg-[#00C2CB] hover:bg-[#00A9BA] p-[8px] h-[35px] w-[35px] rounded-full icon text-white'/>
            <AiOutlineTwitter className='bg-[#00C2CB] hover:bg-[#00A9BA] p-[8px] h-[35px] w-[35px] rounded-full icon text-white'/>


          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer
