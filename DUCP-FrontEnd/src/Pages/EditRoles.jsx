import React, { useState, useEffect } from 'react';
import axios from 'axios';

import profile from '../Resources/grey_dp.png'; // Import default profile picture


const EditRoles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [search, setSearch] = useState(''); // Search state

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.post(
          'http://103.209.199.186:5000/admin/all-user-info',
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.status === 200) {
          const users = response.data.map(user => ({
            username: user.username,
            email: user.email,
            firstName: user.first_name, // Added first name
            role: user.role,
           
          }));
          setRolesData(users);
        }

        const profilePicResponse = await axios.get('http://103.209.199.186:5000/auth/profile-photo', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'image/jpeg',
          },
          responseType: 'blob', // Ensure the response is a blob
        });

        if (profilePicResponse.status === 200) {
          const imageUrl = URL.createObjectURL(profilePicResponse.data);
          profilePic:imageUrl
        }

       
      } catch (error) {
        console.error('Error fetching roles data:', error);
      }
    };

    fetchRolesData();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setSelectedRole(rolesData[index].role);
  };

  const handleSaveClick = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://103.209.199.186:5000/admin/assign-role',
        { email: rolesData[editIndex].email, role: selectedRole },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        const updatedRolesData = rolesData.map((roleData, index) => {
          if (index === editIndex) {
            return { ...roleData, role: selectedRole };
          }
          return roleData;
        });
        setRolesData(updatedRolesData);
        setEditIndex(null);
        setSuccessMessage('Role updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredRolesData = rolesData.filter(roleData =>
    roleData.firstName.toLowerCase().includes(search.toLowerCase()) ||
    roleData.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-8">
        
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-6">

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by first name or role"
              value={search}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRolesData.map((roleData, index) => (
                  <tr key={roleData.email} className="border-t">
                    <td className="py-2 flex items-center">
                      <img src={roleData.profilePic || profile} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <div className="font-bold">{roleData.firstName}</div> {/* Display first name in bold */}
                        <div>{roleData.email}</div> {/* Display email below */}
                      </div>
                    </td>
                    <td className="py-2">
                      {editIndex === index ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Moderator">Moderator</option>
                          <option value="User">No Role</option>
                        </select>
                      ) : (
                        roleData.role
                      )}
                    </td>
                    <td className="py-2">
                      {editIndex === index ? (
                        <>
                          <button
                            onClick={handleSaveClick}
                            className="text-green-500 hover:underline mx-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="text-red-500 hover:underline mx-2"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditClick(index)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
