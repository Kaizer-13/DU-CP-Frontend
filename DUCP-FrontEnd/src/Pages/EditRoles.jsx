import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const EditRole = () => {
  const [rolesData, setRolesData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    console.log("EditRole component mounted");
    // Simulate an API call to fetch roles data
    const fetchRolesData = () => {
      const mockData = [
        { username: 'Bithi01', role: 'Admin' },
        { username: 'Kaiser01', role: 'User' },
        { username: 'Tasnim', role: 'Moderator' },
        { username: 'Sinha', role: 'User' },
        { username: 'Bhola', role: 'User' },
      ];
      setRolesData(mockData);
    };

    fetchRolesData();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setSelectedRole(rolesData[index].role);
  };

  const handleSaveClick = () => {
    const updatedRolesData = rolesData.map((roleData, index) => {
      if (index === editIndex) {
        return { ...roleData, role: selectedRole };
      }
      return roleData;
    });
    setRolesData(updatedRolesData);
    setEditIndex(null);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex-grow p-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4 flex justify-between">
            <Link to="/profile" className="text-blue-500 hover:underline">Overview</Link>
            <span className="text-2xl font-bold text-gray-700">Edit Role</span>
          </div>
          <div className="flex flex-col space-y-4">
            {rolesData.map((roleData, index) => (
              <div
                key={roleData.username}
                className="flex justify-between p-2 rounded-md"
                style={{ backgroundColor: index % 2 === 0 ? '#e0e0e0' : 'white' }}
              >
                <span className="font-semibold text-gray-700">{roleData.username}:</span>
                {editIndex === index ? (
                  <>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Moderator">Moderator</option>
                      <option value="User">User</option>
                    </select>
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
                    <span>{roleData.role}</span>
                    <button
                      onClick={() => handleEditClick(index)}
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
    </div>
  );
};

export default EditRole;
