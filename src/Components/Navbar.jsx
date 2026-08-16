import React from 'react';
import './Navbar2.css'
import '../index2.css'
import stateEmble from "../assets/stateEmble.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className='nav-1 flex gap'>
          
          <div className='flex gap-1 m'>
            
            <img className='logo' src={logo}/>
           
            <img className='satymev m-auto' src={stateEmble}/>
            <div className=''>
              भारत सरकार<br></br>
              Government Of India
            </div>
          </div>
          
          <div className='flex gap-2 m-r'>
            <div className='pd t'>
              Skip main content
            </div>
          
          <select className="language-select m-auto">
             <option value="en">English</option>
             <option value="hi">हिन्दी</option>
             <option value="mr">मराठी</option>
             <option value="ta">தமிழ்</option>
          </select> 

          
             <button className="btn t" onClick={() => navigate("/login")}>
                 Login/Register
              </button>
          

          
          </div>

          

      </div>

      <div className='nav-2 flex gap-c'>

        <div className='nav-link flex gap-4 m'>
          <div className='link flex hv-cnt t' onClick={() => navigate("/")}>Home</div>
          <div className='link flex hv-cnt t'>Internship</div>
          <div className='link flex hv-cnt t'>Documents</div>
          <div className='link flex hv-cnt t'>How it works</div>
          <div className='link flex hv-cnt t'onClick={() => navigate("/about")}>About</div>
          
        </div>

        <div className='link flex hv-cnt'
         onClick={() => navigate("/dashboard")}
         >
          <Menu size={24} />
        </div>
         
      </div>
      
    </>
  )
}
