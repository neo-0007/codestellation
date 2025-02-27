import React from 'react'
import { useState, useEffect } from 'react';

// importing all the components
import Navbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  )
}

export default Dashboard
