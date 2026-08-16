/*import React from 'react'
import './About.css'
import '../index2.css'
import Navbar from '../Components/Navbar'
import modi from '../assets/modi.jpg'

export default function About() {
  return (
    <>
      <Navbar/>
      <div className='header flex'>
          <div className='l-hd flex hv-cnt'>
            <div className='img-hd '>
                <img className='img-hd'src ={modi }/>
            </div>

          </div>

          <div className='r-hd'>
            <h4 className='r-h4'>
                “Every student deserves the right opportunity.InternSetu is a journey towards  
                 
            </h4>
            <h4 className='r-h4'>
                 making internships more accessible, relevant, and meaningful for every aspiring professional.”
            </h4>
            <div className='line-dv'>
                <hr className='l-dv'></hr>
            </div>
            <div className='m-t1 hd-e'>EMPOWERING STUDENTS THROUGH OPPORTUINITIES</div>
            <span className='m-t1 hd-e'>INTERNSETU · 2026</span>



          </div>

      </div>
       
    </>
  )
}
*/
import React from 'react'
import './About.css'
import '../index2.css'
import Navbar from '../Components/Navbar'
import modi from '../assets/modi.jpg'
import { FaUserFriends } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import LogFooter from '../Components/LogFooter'
import '../Components/LogFooter.css'
import l1 from '../assets/l1.png'
import l2 from '../assets/l2.png'
import l3 from '../assets/l3.png'
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'

export default function About() {
  return (
    <>
      <Navbar />

      <div className='header flex'>

        <div className='l-hd flex hv-cnt'>
          <div className='img-hd'>
            <img className='about-img' src={modi} />
          </div>
        </div>

        <div className='r-hd'>

          <h4 className='r-h4'>
            “Every student deserves the right opportunity.
            InternSetu is a journey towards
          </h4>

          <h4 className='r-h4'>
            making internships more accessible, relevant,
            and meaningful for every aspiring professional.”
          </h4>

          <div className='line-dv'>
            <hr className='l-dv' />
          </div>

          <div className='m-t1 hd-e'>
            EMPOWERING STUDENTS THROUGH OPPORTUNITIES
          </div>

          <span className='m-t1 hd-e'>
            INTERNSETU · 2026
          </span>

        </div>

      </div>

      <div className='ab-dv flex hv-cnt'>
        <div className='ab-l'>
          <div className='ab-l-in1'>
              <h4 className='ab-h4'>About Us</h4>
              <p className='ab-p'>
                To empower students by providing access to relevant internship opportunities,
                 personalized career guidance, and skill-based recommendations, 
                 helping them connect their academic learning with real-world professional opportunities.
              </p>
                   

             
              
          </div>
          <div className='ab-l-in2 flex hv-cnt gap-ab'>
              <div className="ab-cards1 flex hv-cnt f-col">
                <div className='icon-div'>
                   <FaUserFriends className="card-icon" />

                </div>
                
                <h3>Our Team</h3>
              </div>
              <div className="ab-cards1 flex hv-cnt f-col">
                <div className='icon-div'>
                   <IoGridOutline className="card-icon" />

                </div>
                
                <h3>Our Performance</h3>
              </div>
              <div className="ab-cards1 flex hv-cnt f-col">
                <div className='icon-div'>
                   <IoBarChartOutline className="card-icon" />

                </div>
                
                <h3>Our Directory</h3>
              </div>

              

          </div>

         

        </div>
        <div className='ab-r flex gap-ab hv-cnt'>
           <div className='ab-dv1'>
              <div className='img-div-ab'>
                 <img className='ab-img' src={l1}/>

              </div>
              <div className='post'>Shri Prahlad Joshi</div>
              <p className='post-p'>Hon'ble Union Minister of Education</p>
                 
            </div>
           <div className='ab-dv2'>
              <div className='img-div-ab'>
                  <img className='ab-img' src={l2}/>

              </div>
              <div className='post'>Shri Jayant Choudhary</div>
              <p className='post-p'>Union Minister of State</p>

            </div>
           <div className='ab-dv3'>
              <div className='img-div-ab'>
                 <img className='ab-img3' src={l3}/>

              </div>
              <div className='post '>Shri Manshuk Mandavya</div>
              <p className='post-p'>Union Minister of Labour & Employment</p>

            </div>

        </div>

      </div>

      <div className='why-dv'>
      <div className='x'>
         <div className='wh-in m-auto'>
             <h2 className='wh-h2'>Why InternSetu exists</h2>
             <p className='wh-p1'>
               Students often struggle to find internships that genuinely match their skills, interests, career goals, and preferred locations.
               With opportunities spread across multiple platforms, it can be difficult to identify relevant internships and make informed career decisions.
             </p>
             <p className='wh-p1'>
               InternSetu brings internship discovery and career guidance into one student-focused platform. It helps students explore relevant internship opportunities through personalized, AI-powered recommendations based on their skills, interests, and career preferences.
             </p>
             <p className='wh-p1'>
               Our platform is designed to make the internship journey simpler, more relevant, and accessible. By connecting students with opportunities that align with their profiles, InternSetu helps bridge the gap between academic learning and real-world professional experience.
             </p>
             <p className='wh-p1'>
               With InternSetu, students can focus on building their careers instead of endlessly searching for the right opportunity.
             </p>
         </div>

         <div className='wh-card m-auto'>
            <h3 className='wh-c-h3 m-l1'>
              OUR MISSION
            </h3>
            <p className='wh-p1 m-l1'>
               To empower students with accessible, personalized, and relevant internship opportunities that help them develop practical skills, gain professional experience, and move confidently toward their career goals.
             </p>
             <li className='wh-p1 m-l2'>Reduce the time and effort required to find relevant internships.</li>
             <li className='wh-p1 m-l2'>Help students discover opportunities aligned with their skills and interests.</li>
             <li className='wh-p1 m-l2'>Provide personalized AI-powered internship recommendations.</li>
             <li className='wh-p1 m-l2'>Bridge the gap between academic learning and industry experience.</li>
             <li className='wh-p1 m-l2'>Enable students to make more informed career decisions.</li>
            
         </div>

         <div className="focus-dv">

    <div className="focus-container">

        <h2 className="focus-title">
            What InternSetu focuses on
        </h2>

        <div className="focus-cards">

            {/* CARD 1 */}
            <div className="focus-card">

                <h3 className="focus-card-title">
                    Personalized Opportunities
                </h3>

                <p className="focus-card-text">
                    Help students discover internships that match their
                    skills, interests, career goals, and preferred locations.
                </p>

                <ul>
                    <li>AI-powered internship recommendations.</li>
                    <li>Opportunities matched to student skills.</li>
                    <li>Personalized suggestions based on career interests.</li>
                    <li>Location and preference-based internship discovery.</li>
                    <li>Relevant opportunities instead of endless searching.</li>
                </ul>

            </div>


            {/* CARD 2 */}
            <div className="focus-card">

                <h3 className="focus-card-title">
                    Career & Skill Development
                </h3>

                <p className="focus-card-text">
                    InternSetu helps students understand what skills they
                    need and guides them toward opportunities that support
                    their long-term career goals.
                </p>

                <ul>
                    <li>Identify skills required for desired roles.</li>
                    <li>Connect academic learning with industry experience.</li>
                    <li>Discover internships based on career goals.</li>
                    <li>Improve employability through practical experience.</li>
                    <li>Make better-informed career decisions.</li>
                </ul>

            </div>


            {/* CARD 3 */}
            <div className="focus-card">

                <h3 className="focus-card-title">
                    Smart & Accessible Platform
                </h3>

                <p className="focus-card-text">
                    A simple digital platform that brings internship
                    discovery, career guidance, and relevant opportunities
                    together in one place.
                </p>

                <ul>
                    <li>Easy-to-use student dashboard.</li>
                    <li>Smart internship search and discovery.</li>
                    <li>AI-powered career assistance through Disha.</li>
                    <li>Centralized access to internship information.</li>
                    <li>Accessible opportunities for students.</li>
                </ul>

            </div>

        </div>

    </div>

</div>

      {/* =========================
    OUR CORE VALUES
========================= */}

<div className="values-dv">

    <div className="values-container">

        <h2 className="values-title">
            Our Core Values
        </h2>

        <div className="values-cards">

            {/* CARD 1 */}
            <div className="value-card">
                <h3>Accessibility</h3>

                <p>
                    We believe every student deserves access to
                    relevant internship opportunities regardless of
                    their background or location.
                </p>
            </div>


            {/* CARD 2 */}
            <div className="value-card">
                <h3>Personalization</h3>

                <p>
                    We use student skills, interests, career goals,
                    and preferences to make internship discovery
                    more relevant and meaningful.
                </p>
            </div>


            {/* CARD 3 */}
            <div className="value-card">
                <h3>Innovation</h3>

                <p>
                    We continuously use AI and modern technology
                    to simplify internship discovery and improve
                    the student career experience.
                </p>
            </div>


            {/* CARD 4 */}
            <div className="value-card">
                <h3>Trust & Integrity</h3>

                <p>
                    We value transparency, responsible use of
                    technology, and protection of student information
                    throughout the platform.
                </p>
            </div>

        </div>

    </div>

</div>
         
      </div>

      <div className='excellence'>
        <div className='ex-d1'>
           <h4 className='ed1-h4 cnt'>Recognising Youth Skills & Excellence</h4>

        </div>
        <div className='ex-d2 flex hv-cnt gap-ex'>
          <div className='ex-c1'>
            <img className='ex1-img'src={ ex1}/>

          </div>
          <div className='ex-c2'>
             <img className='ex1-img'src={ ex2}/>
          </div>
          <div className='ex-c3'>
               <img className='ex1-img'src={ ex3}/>  
          </div>

        </div>

      </div>

      <div className="contact-support">

  <h2 className="cs-h2">Contact & Support</h2>

  <div className="cs-cards">

    {/* Card 1 */}
    <div className="cs-card">
      <h3>Technical Support</h3>

      <p>
        For technical assistance, platform issues,
        and account-related support.
      </p>

      <a href="mailto:support@internsetu.in">
        support@internsetu.in
      </a>
    </div>


    {/* Card 2 */}
    <div className="cs-card">
      <h3>Government & Career Resources</h3>

      <p>
        Access official education, skill development,
        and employment resources.
      </p>

      <a
        href="https://www.ncs.gov.in/"
        target="_blank"
        rel="noreferrer"
      >
        Visit National Career Service
      </a>
    </div>


    {/* Card 3 */}
    <div className="cs-card">
      <h3>Help & Documentation</h3>

      <p>
        Find user guides, FAQs, internship guidance,
        and information about using InternSetu.
      </p>

      <a href="#">
        Visit Help Center
      </a>
    </div>

  </div>

</div>
       
      
      </div> 
      <LogFooter/> 
    </>
  )
}