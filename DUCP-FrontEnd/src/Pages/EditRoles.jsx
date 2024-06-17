import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const EditRole = () => {
  const [roleData, setRoleData] = useState([]);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Simulate an API call
    const fetchRoleData = () => {
      const mockData = [
        { username: 'Bithi01', role: 'Admin' },
        { username: 'Kaizer01', role: 'User' },
        { username: 'Tasnim', role: 'Moderator' },
        { username: 'Sinha', role: 'User' },
        { username: 'Bhola', role: 'User' },
      ];

      setRoleData(mockData);
    };

    fetchRoleData();
  }, []);

  const handleEditClick = (username, role) => {
    setEditField(username);
    setEditValue(role);
  };

  const handleSaveClick = (username) => {
    setRoleData(roleData.map(user => 
      user.username === username ? { ...user, role: editValue } : user
    ));
    setEditField(null);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCancelClick = () => {
    setEditField(null);
  };

  const roles = ['Admin', 'Moderator', 'User'];

  return (
    <div className="p-8">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 flex justify-between">
          <Link to="/profile" className="text-blue-500 hover:underline">Overview</Link>
          <span className="text-2xl font-bold text-gray-700">Edit Role</span>
        </div>
        {showSuccessMessage && (
          <div className="mb-4 text-green-500 text-center bg-green-100 border border-green-400 rounded-md p-2">
            Successfully updated!
          </div>
        )}
        <div className="flex flex-col space-y-4">
          {roleData.map((user, index) => (
            <div
              key={user.username}
              className="flex justify-between p-2 rounded-md"
              style={{ backgroundColor: index % 2 === 0 ? '#e0e0e0' : 'white' }}
            >
              <span className="font-semibold text-gray-700">{user.username}:</span>
              {editField === user.username ? (
                <>
                  <select
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <div>
                    <button
                      onClick={() => handleSaveClick(user.username)}
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
                  <span>{user.role}</span>
                  <button
                    onClick={() => handleEditClick(user.username, user.role)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditRole;
