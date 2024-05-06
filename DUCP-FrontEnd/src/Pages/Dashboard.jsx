import React,{ useState, useEffect } from 'react';

import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcements'
import Forum from '../Components/Forum'


function Dashboard() {

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar/>

      {/* Body container for side-by-side layout */}
      <div className="flex flex-1 min-h-0"> {/* Ensures that the body takes up all remaining space after Navbar */}

      
          <Announcement/>

          <Forum/>

      </div>


    </div>
  );
}

export default Dashboard;
