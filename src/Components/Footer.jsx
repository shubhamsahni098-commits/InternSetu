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

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {

  const { t } = useLanguage();

  return (
    <>
      <div className='ft-div flex gap-ft'>

        {/* =========================
            FOOTER LEFT
        ========================= */}

        <div className='ft1'>

          <div className='ft-logo flex gap-lg'>

            <div>
              <img
                className='sat-img'
                src={sat}
                alt="Satyamev Jayate"
              />
            </div>

            <div className='in-div'>
              <img
                className='in-logo'
                src={logo}
                alt="InternSetu"
              />
            </div>

          </div>


          {/* Description */}

          <div className='p-div'>

            <p>
              {t.footerDescription}
            </p>

          </div>


          {/* Follow Us */}

          <div className='h2-div'>

            <h2 className='text'>
              {t.followUs}
            </h2>

          </div>


          {/* Social Icons */}

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


          {/* Line */}

          <div className='line-div'>
            <hr className='line' />
          </div>


          {/* Copyright */}

          <div className='cpy'>

            <h4 className='close'>
              {t.copyright}
            </h4>

          </div>

        </div>


        {/* =========================
            FOOTER COLUMN 1
        ========================= */}

        <div className='ft2 flex f-col gap-x'>

          <li className='list-ft2'>
            {t.home}
          </li>

          <li className='list-ft2'>
            {t.aboutUs}
          </li>

          <li className='list-ft2'>
            {t.faq}
          </li>

          <li className='list-ft2'>
            {t.statistics}
          </li>

          <li className='list-ft2'>
            {t.resources}
          </li>

          <li className='list-ft2'>
            {t.circulars}
          </li>

        </div>


        {/* =========================
            FOOTER COLUMN 2
        ========================= */}

        <div className='ft3 flex f-col'>

          <li className='list-ft2'>
            {t.supportFeedback}
          </li>

          <li className='list-ft2'>
            {t.termsConditions}
          </li>

          <li className='list-ft2'>
            {t.credits}
          </li>

          <li className='list-ft2'>
            {t.scholarship}
          </li>

          <li className='list-ft2'>
            {t.contactUs}
          </li>

          <li className='list-ft2'>
            {t.circulars}
          </li>

        </div>


        {/* =========================
            FOOTER COLUMN 3
        ========================= */}

        <div className='ft3 flex f-col'>

          <li className='list-ft2'>
            {t.supportFeedback}
          </li>

          <li className='list-ft2'>
            {t.termsConditions}
          </li>

          <li className='list-ft2'>
            {t.credits}
          </li>

          <li className='list-ft2'>
            {t.scholarship}
          </li>

          <li className='list-ft2'>
            {t.contactUs}
          </li>

          <li className='list-ft2'>
            {t.circulars}
          </li>

        </div>

      </div>
    </>
  )
}