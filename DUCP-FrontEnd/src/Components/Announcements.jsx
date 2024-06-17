import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AnnouncementsComponent() {
  // Default announcements
  const defaultAnnouncements = [
    { title: "Welcome to Our Platform", details: "Here's some important info to get you started." },
    { title: "Scheduled Maintenance", details: "We will be performing scheduled maintenance on our servers this Saturday." },
    { title: "Feature Updates", details: "Check out our latest feature updates and enhancements!" }
  ];

  // State to hold announcements
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  // Effect to fetch announcements from an API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://103.209.199.186:5000/posts/announcement');
        const data = await response.json();
        if (data && data.length > 0) {
          setAnnouncements(data); 
          console.log(data);
          
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        // Optionally, keep default data if fetch fails
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="w-1/3 bg-white p-4 flex flex-col">
      <div className="flex flex-col items-center mb-4">
        <Link to="/create-announcement">
          <button className="bg-yellow text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-dark-yellow focus:outline-none focus:ring-2 focus:ring-blue-400">Create Announcement</button>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="bg-gray-100 p-4 rounded-2xl shadow min-h-full">
          <h2 className="font-bold text-3xl underline mb-4 text-center">Announcements</h2>
         
            {announcements.map((announcement, index) => (
              <Link to={`/announcements/${announcement.id}`} key={index}>
                 <div className="space-y-6">
              <div key={index} className="bg-gray-300 p-3 rounded-lg shadow">
                <h3 className="font-semibold text-md">{announcement.title}</h3>
                <p className="text-sm text-gray-600">{announcement.text}</p>
              </div>
              </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsComponent;
