import React from 'react'
import { useNavigate } from "react-router-dom";
import { GraduationCap } from 'lucide-react';
import { UsersRound } from "lucide-react";
import logo from "../assets/logo.png";
import './Stats.css'
import '../index2.css'
import { useLanguage } from "../context/LanguageContext";

export default function Stats() {

    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className='stats-div flex gap-s hv-cnt'>

            <div className='about flex f-col'>

                <h2 className='about-h2'>
                    {t.aboutInternSetu}
                </h2>

                <h1 className='about-h1'>
                    {t.findRightInternship}
                </h1>

                <p className='about-p'>
                    {t.aboutInternSetuDesc}
                </p>

                <div className='more'>

                    <button
                        className='btn'
                        onClick={() => navigate("/about")}
                    >
                        {t.moreAboutInternSetu}
                    </button>

                </div>

            </div>


            <div className='stats flex hv-cnt'>

                <div className='data'>

                    <div className='d1'>

                        <h1>
                            <GraduationCap
                                size={40}
                                color='green'
                            />

                            <span className='num'>
                                500+
                            </span>
                        </h1>

                        <p className='d1-p'>
                            {t.internships}
                        </p>

                    </div>


                    <div className='d2'>

                        <h1>
                            <UsersRound
                                size={40}
                                color='green'
                            />

                            <span className='num'>
                                100+
                            </span>
                        </h1>

                        <p className='d1-p'>
                            {t.roles}
                        </p>

                    </div>

                </div>


                <div className='s-logo m-auto rel'>

                    <img
                        className='s-img abs'
                        src={logo}
                        alt="InternSetu"
                    />

                </div>

            </div>

        </div>
    )
}