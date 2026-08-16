import React from 'react'
import sat from '../assets/sat.png'
import logo from '../assets/logo.png'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css'
import '../index2.css'

export default function Footer() {
  return (
    <>
      <div className='ft-div flex gap-ft'>
          <div className='ft1'>
            <div className='ft-logo flex gap-lg'>
                <div className=''>
                  <img className='sat-img'src ={sat}/>
               
                </div>
                <div className='in-div'>
                  <img className='in-logo' src={logo}/>
                </div>
            </div>
            <div className='p-div'>
                <p>
                    InternSetu aims to empower students by providing access to relevant
                     internship opportunities through personalized,
                      AI-powered recommendations based on their skills,
                       interests, and career preferences.
                </p>
            </div>

            <div className='h2-div'>
                <h2 className='text'>FOLLOW US</h2>

            </div>

            <div className="social-icons">
                <div className="social facebook">
                   <FaFacebookF />
                </div>
    

                <div className="social twitter">
                   <FaXTwitter />
                </div>

                <div className="social instagram">
                   <FaInstagram />
                </div>

                <div className="social linkedin">
                   <FaLinkedinIn />
                </div>

                <div className="social youtube">
                   <FaYoutube />
                </div>

            </div>
            <div className='line-div'>
                <hr className='line'></hr>
            </div>
            <div className='cpy'>
                <h4 className='close'>Copyright © 2026, InternSetu. All Rights Reserved.</h4>
            </div>

            
          </div>
          
          <div className='ft2 flex f-col gap-x'>
             <li className='list-ft2'>Home</li>
             <li className='list-ft2'>About Us</li>
             <li className='list-ft2'>FAQ</li>
             <li className='list-ft2'>Statistics</li>
             <li className='list-ft2'>Resources</li>
             <li className='list-ft2'>Circulars</li>
             
          </div>
          <div className='ft3 flex f-col'>
             <li className='list-ft2'>Support/feedbacks</li>
             <li className='list-ft2'>Terms & Conditions</li>
             <li className='list-ft2'>Credits</li>
             <li className='list-ft2'>Scholarship</li>
             <li className='list-ft2'>Contact Us</li>
             <li className='list-ft2'>Circulars</li>
          </div>
          <div className='ft3 flex f-col'>
             <li className='list-ft2'>Support/feedbacks</li>
             <li className='list-ft2'>Terms & Conditions</li>
             <li className='list-ft2'>Credits</li>
             <li className='list-ft2'>Scholarship</li>
             <li className='list-ft2'>Contact Us</li>
             <li className='list-ft2'>Circulars</li>
          </div>
      </div>
    </>
  )
}
