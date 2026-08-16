import React from 'react'
import Navbar from '../Components/Navbar'
import rf from '../assets/rf.png'
import './Login.css'
import '../index2.css'
import Footer from '../Components/Footer'
import LogFooter from '../Components/LogFooter'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar/>

      <div className='log-left-mid m-auto'>
        <div className='img-div'>
            <div className='img-overlay'>
               <h1>InternSetu</h1>
               <p>Connecting Students with Opportunities</p>
            </div>

        </div>
        <div className='right'>

        
        <div className='email'>
              <h4 className='e-txt'>Email or Phone</h4>
              <input className='input' type='text' placeholder='  e.g xyz@gmail.com or +91 776455xxxx'></input>
        </div>

        <div className='email'>
              <h4 className='e-txt'>Password</h4>
              <input className='input' type='text' placeholder='  Enter your password'></input>
        </div>

        <div className='btn-div'>
            <button className='log-btn'
                    onClick={() => navigate("/dashboard")} 
            >
                <h4 className='login'>Login</h4>
            </button>
        </div>
        <h4 className='acc'>Dont have an account?<span className="create-link" onClick={() => navigate("/register")}>Create account</span></h4>


      </div>

      </div>
      <LogFooter/>
      
      
      
    </>
  )
}
