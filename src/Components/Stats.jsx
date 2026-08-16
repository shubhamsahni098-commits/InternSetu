import React from 'react'
import { useNavigate } from "react-router-dom";
import { GraduationCap } from 'lucide-react';
import { UsersRound } from "lucide-react";
import logo from "../assets/logo.png";
import './Stats.css'
import '../index2.css'

export default function Stats() {
    const navigate = useNavigate()
  return (
    <div className='stats-div flex gap-s hv-cnt'>
        <div className='about flex f-col '>
            <h2 className='about-h2'>ABOUT INTERNSETU</h2>
            <h1 className='about-h1'>Find the Right Internship,Smarter</h1>
            <p className='about-p'>InternSetu is an AI-powered internship recommendation platform
                 designed to help students discover relevant internship
                  opportunities based on their skills, interests, location, 
                  and career preferences.
            </p>
            <div className='more'>
                <button className='btn' onClick={() => navigate("/about")}>
                    More about InternSetu 
                </button>
            </div>

        </div>

        <div className='stats flex hv-cnt'>
            <div className='data'>
                <div className='d1'>
                    <h1><GraduationCap size={40} color='green'/> <span className='num'>500+</span></h1>
                    <p className='d1-p'>Internships</p>

                </div>
                <div className='d2'>
                    <h1><UsersRound size={40} color='green'/> <span className='num'>100+</span></h1>
                    <p className='d1-p'>Roles</p>
                    

                </div>

            </div>

            <div className='s-logo m-auto rel'>
                
                    <img className='s-img abs' src={logo}/>

                

            </div>

        </div>
      
    </div>
  )
}
