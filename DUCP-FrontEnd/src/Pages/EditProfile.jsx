import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultProfilePic from '../Resources/default_dp.png';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    vjudge_id: '',
    codeforces_id: '',
    atcoder_id: '',
    codechef_id: '',
    profile_pic: null,
    new_password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const userProfileResponse = await axios.get('http://103.209.199.186:5000/auth/current_user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setFormData({
          username: userProfileResponse.data.username,
          first_name: userProfileResponse.data.first_name,
          last_name: userProfileResponse.data.last_name,
          vjudge_id: userProfileResponse.data.vjudge_id,
          codeforces_id: userProfileResponse.data.codeforces_id,
          atcoder_id: userProfileResponse.data.atcoder_id,
          codechef_id: userProfileResponse.data.codechef_id,
          profile_pic: null,
          new_password: '',
          confirm_password: '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profile_pic: file,
      });
      setProfilePic(URL.createObjectURL(file));
      setUploadMessage('');
    }
  };

  const handleUpload = async () => {
    if (!formData.profile_pic) {
      setUploadMessage('No file chosen');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const profilePicData = new FormData();
      profilePicData.append('file', formData.profile_pic); // Change 'profile_pic' to 'file'

      const uploadResponse = await axios.post(
        'http://103.209.199.186:5000/auth/upload_profile_image',
        profilePicData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.status === 200) {
        setUploadMessage('Profile picture uploaded successfully');
      } else {
        setUploadMessage('Error uploading profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      setUploadMessage('Error uploading profile picture');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'Enter first name';
    if (!formData.last_name) newErrors.last_name = 'Enter last name';
    if (!formData.username) newErrors.username = 'Enter username';
    if (!formData.vjudge_id) newErrors.vjudge_id = 'Enter VJudge handle';
    if (!formData.atcoder_id) newErrors.atcoder_id = 'Enter AtCoder handle';
    if (!formData.codeforces_id) newErrors.codeforces_id = 'Enter Codeforces handle';
    if (!formData.codechef_id) newErrors.codechef_id = 'Enter CodeChef handle';
    if (formData.new_password && formData.new_password.length < 6) newErrors.new_password = 'Password must be at least six characters long';
    if (formData.new_password !== formData.confirm_password) newErrors.confirm_password = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const updateData = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        vjudge_id: formData.vjudge_id,
        codeforces_id: formData.codeforces_id,
        atcoder_id: formData.atcoder_id,
        codechef_id: formData.codechef_id,
        new_password: formData.new_password,
      };

      const profileResponse = await axios.post('http://103.209.199.186:5000/auth/update_profile', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (profileResponse.status === 200) {
        setMessage('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-white">
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {[
          { id: 'username', label: 'Username', type: 'text' },
          { id: 'first_name', label: 'First Name', type: 'text' },
          { id: 'last_name', label: 'Last Name', type: 'text' },
          { id: 'vjudge_id', label: 'Vjudge ID', type: 'text' },
          { id: 'codeforces_id', label: 'Codeforces ID', type: 'text' },
          { id: 'atcoder_id', label: 'AtCoder ID', type: 'text' },
          { id: 'codechef_id', label: 'CodeChef ID', type: 'text' },
        ].map((field) => (
          <div className="mb-6" key={field.id}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
              {field.label}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors[field.id] ? 'border-red-500' : 'border-gray-300'
              }`}
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.label}
              value={formData[field.id]}
              onChange={handleChange}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-xs italic">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </button>

          {showChangePassword && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
                  New Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.new_password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="new_password"
                  name="new_password"
                  type="password"
                  placeholder="New Password"
                  value={formData.new_password}
                  onChange={handleChange}
                />
                {errors.new_password && (
                  <p className="text-red-500 text-xs italic">{errors.new_password}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                  Confirm New Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm New Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs italic">{errors.confirm_password}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setShowChangeProfilePhoto(!showChangeProfilePhoto)}
          >
            Change Profile Photo
          </button>

          {showChangeProfilePhoto && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_pic">
                Profile Picture
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                id="profile_pic"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}

          {showChangeProfilePhoto && (
            <div className="mb-6">
              <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={handleUpload}
              >
                Upload
              </button>
              {uploadMessage && (
                <p className="text-green-500 text-xs italic mt-2">{uploadMessage}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
