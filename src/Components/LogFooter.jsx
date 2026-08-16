import React from 'react'
import './LogFooter.css'
import '../index2.css'
import sat from '../assets/sat.png'
import logo from '../assets/logo.png'

export default function LogFooter() {
  return (
    <>
       <div className='log-ft2 flex f-col out'>
         

          
          <div className='ft-logo2 flex gap-lg'>
                          <div className=''>
                            <img className='sat-img'src ={sat}/>
                         
                          </div>
                          <div className='in-div'>
                            <img className='in-logo' src={logo}/>
                          </div>
                      </div>

                      <div className='p-div2'>
                          <p>
                              InternSetu aims to empower students by providing access to relevant
                               internship opportunities through personalized,
                                AI-powered recommendations based on their skills,
                                 interests, and career preferences.
                          </p>
                      </div>
                     <div className='end'>
                        <hr className='e-l'></hr>
                     </div>
                     <div className='end-txt'><h4 className='c-text'>Copyright © 2026, InternSetu. All Rights Reserved.</h4></div>
                   
      </div>
      
    </>
  )
}
