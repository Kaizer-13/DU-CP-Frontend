import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("EditProfile component mounted");
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

  const handleEditClick = (field) => {
    setEditField(field);
    setEditValue(profileData[field]);
  };

  const handleSaveClick = () => {
    setProfileData({
      ...profileData,
      [editField]: editValue,
    });
    setEditField(null);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCancelClick = () => {
    setEditField(null);
  };

  const profileFields = [
    { label: 'Username', value: profileData.username, key: 'username' },
    { label: 'First Name', value: profileData.first_name, key: 'first_name' },
    { label: 'Last Name', value: profileData.last_name, key: 'last_name' },
    { label: 'Codeforces ID', value: profileData.codeforces_id, key: 'codeforces_id' },
    { label: 'Vjudge ID', value: profileData.vjudge_id, key: 'vjudge_id' },
    { label: 'AtCoder ID', value: profileData.atcoder_id, key: 'atcoder_id' },
    { label: 'CodeChef ID', value: profileData.codechef_id, key: 'codechef_id' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex-grow p-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4 flex justify-between">
            <Link to="/profile" className="text-blue-500 hover:underline">Overview</Link>
            <span className="text-2xl font-bold text-gray-700">Edit Profile</span>
          </div>
          {showSuccessMessage && (
            <div className="mb-4 text-green-500 text-center bg-green-100 border border-green-400 rounded-md p-2">
              Successfully updated!
            </div>
          )}
          <div className="flex flex-col space-y-4">
            {profileFields.map((field, index) => (
              <div
                key={field.key}
                className="flex justify-between p-2 rounded-md"
                style={{ backgroundColor: index % 2 === 0 ? '#e0e0e0' : 'white' }}
              >
                <span className="font-semibold text-gray-700">{field.label}:</span>
                {editField === field.key ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <div>
                      <button
                        onClick={handleSaveClick}
                        className="text-green-500 hover:underline mx-2"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-red-500 hover:underline mx-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{field.value}</span>
                    <button
                      onClick={() => handleEditClick(field.key)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/edit-role')}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
