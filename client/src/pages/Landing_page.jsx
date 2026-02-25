import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';

import LeadsPage from '../components/Leads/LeadsPage'
import './landing.css'

const Landing_page = () => {

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // This sets the header for EVERY axios call made anywhere in the app
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}, []);

  return (
    <>
      <LeadsPage />
    </>
  )
}

export default Landing_page