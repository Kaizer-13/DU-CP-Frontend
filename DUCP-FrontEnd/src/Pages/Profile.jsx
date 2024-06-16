import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log("Profile component mounted");
    // Simulate an API call
    const fetchProfileData = () => {
      const mockData = {
        username: 'Kaizer01',
        first_name: 'Yeamin',
        last_name: 'Kaiser',
        codeforces_id: '_Kaizer_',
        vjudge_id: '_Kaizer_',
        atcoder_id: '_Kaizer_',
        codechef_id: '_Kaizer_',
      };
      
      setProfileData(mockData);
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const profileFields = [
    { label: 'Username', value: profileData.username },
    { label: 'First Name', value: profileData.first_name },
    { label: 'Last Name', value: profileData.last_name },
    { label: 'Codeforces ID', value: profileData.codeforces_id },
    { label: 'Vjudge ID', value: profileData.vjudge_id },
    { label: 'AtCoder ID', value: profileData.atcoder_id },
    { label: 'CodeChef ID', value: profileData.codechef_id },
  ];

  return (
    <div className="p-8">
        <Navbar />
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 flex justify-between">
          <span className="text-2xl font-bold text-gray-700">Overview</span>
          <Link to="/edit-profile" className="text-blue-500 hover:underline">Edit Profile</Link>
        </div>
        <div className="flex flex-col space-y-4">
          {profileFields.map((field, index) => (
            <div
              key={field.label}
              className="flex justify-between p-2 rounded-md"
              style={{ backgroundColor: index % 2 === 0 ? '#e0e0e0' : 'white' }}
            >
              <span className="font-semibold text-gray-700">{field.label}:</span>
              <span>{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;