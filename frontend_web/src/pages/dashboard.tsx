import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FourBoxes from '../components/Boxes';
import TwoBoxes from '../components/TwoBoxes';
import AnalysisTwoBoxes from '../components/Analysis';
import Mood from '../components/Mood';
import UneasyBanner from '../components/Emergency'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 p-4">
          <Mood />
          <AnalysisTwoBoxes />
          <TwoBoxes />
          <FourBoxes />
          <UneasyBanner />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
