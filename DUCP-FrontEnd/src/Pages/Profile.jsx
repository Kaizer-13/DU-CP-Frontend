import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import EditRoles from './EditRoles'; // Import the EditRole component
import EditProfile from './EditProfile';

import profile from '../Resources/grey_dp.png'; // Import default profile picture


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // State to manage active tab

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://103.209.199.186:5000/auth/current_user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
        console.log("Profile component mounted :", response.data );

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditRolesClick = () => {
    if (profileData.role === 'Admin') {
      window.location.href = '/edit-role';
    } else {
      setShowPopup(true);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const profileFields = [
    { label: 'Email', value: profileData.email },
    { label: 'Username', value: profileData.username },
    { label: 'First Name', value: profileData.first_name },
    { label: 'Last Name', value: profileData.last_name },
    { label: 'Codeforces ID', value: profileData.codeforces_id },
    { label: 'Vjudge ID', value: profileData.vjudge_id },
    { label: 'AtCoder ID', value: profileData.atcoder_id },
    { label: 'CodeChef ID', value: profileData.codechef_id },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex-grow p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex">
          <div className="w-1/4 pr-8">
            <div className="flex-shrink-0 mb-4">
              <img 
                src={profileData.profile_pic || profile} 
                alt="Profile" 
                className="rounded-full w-32 h-32 object-cover" 
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {profileFields.map((field) => (
                <div key={field.label} className="p-2 rounded-md">
                  <span className="font-semibold text-gray-700">{field.label}:</span> <span>{field.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-px bg-gray-200"></div> {/* Vertical line separator */}
          <div className="w-3/4 pl-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold text-gray-700">{profileData.username}</div>
              <div className="flex space-x-4">
                <button onClick={() => setActiveTab('Overview')} className={`px-4 py-2 ${activeTab === 'Overview' ? 'border-b-2 border-blue-500' : ''}`}>Overview</button>
                <button onClick={() => setActiveTab('Edit Profile')} className={`px-4 py-2 ${activeTab === 'Edit Profile' ? 'border-b-2 border-blue-500' : ''}`}>Edit Profile</button>
                {profileData.role === 'Admin' && (
                  <button onClick={() => setActiveTab('Edit Roles')} className={`px-4 py-2 ${activeTab === 'Edit Roles' ? 'border-b-2 border-blue-500' : ''}`}>Edit Roles</button>
                )}
              </div>
            </div>
            {activeTab === 'Overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="font-bold">12%</div>
                    <div className="text-gray-600">of the profile is filled out</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="font-bold">0h</div>
                    <div className="text-gray-600">reported time this month</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="font-bold text-center">One important thing...</div>
                    <div className="text-gray-600 text-center">Arlene is waiting for the draft contract</div>
                    <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg block mx-auto">Create contract</button>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-gray-600">
                    <div>Status: <span className="font-semibold text-gray-700">Recruitment stage</span></div>
                    <div>Created: <span className="font-semibold text-gray-700">February 24, 2023</span></div>
                    <div>Last updated: <span className="font-semibold text-gray-700">February 24, 2023</span></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Edit Profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                    <EditProfile/>                {/* Add Edit Profile content here */}
              </div>
            )}
            {activeTab === 'Edit Roles' && (
               <div>
               <h2 className="text-2xl font-bold mb-4">Current Users</h2>
               {profileData.role === 'Admin' ? (
                 <EditRoles/>
               ) : (
                 <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                   No access. Please contact an admin for access.
                 </div>
               )}
               {/* Add Edit Roles content here */}
             </div>
           )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
