import React from 'react'
import './Features.css';
import '../index2.css'

export default function Features() {
  return (
    <>
      <div className="features m-aut">
        <div className=''>
            <h1 className='cnt f-h1'>Key Features</h1>  
        </div>

        <div className='feat-in flex wrap gap-f hv-cnt'>
            <div className='feat-cards '>
                <h3 className='cnt f-h'>AI-Powered Internship Matching</h3>
                <p className='cnt f-p'>Smart recommendations based on skills, interests, and eligibility.</p>

            </div>
            <div className='feat-cards'>
                <h3 className='cnt f-h'>Skill-Based Matching</h3>
                <p className='cnt f-p'>Match your skills with relevant internship requirements.</p>

            </div>
            <div className='feat-cards'>
                <h3 className='cnt f-h'>Location-Based Matching</h3>
                <p className='cnt f-p'>Discover internships based on your preferred location.</p>

            </div>
            <div className='feat-cards'>
                <h3 className='cnt f-h'>Personalized Recommendations</h3>
                <p className='cnt f-p'>Get the most relevant internships tailored to your profile.</p>

            </div>
            <div className='feat-cards'>
                <h3 className='cnt f-h'>Smart Search & Filters</h3>
                <p className='cnt f-p'>Find opportunities using role, skill, location, and sector filters.</p>

            </div>
            <div className='feat-cards'>
                <h3 className='cnt f-h'>Match Score</h3>
                <p className='cnt f-p'>See how closely each internship matches your profile.</p>

            </div>
            
        </div>

      </div>
      
    </>
  )
}
