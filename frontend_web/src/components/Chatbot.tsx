import React from 'react';
import { useState, useEffect } from 'react';

// importing components
import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox';

const Chatbot = () => {
  return(
    <>
    <Navbar />
    <Chatbox />
    </>
  );
}

export default Chatbot;
