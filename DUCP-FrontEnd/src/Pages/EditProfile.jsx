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

        const userProfilePhotoResponse = await axios.get('http://103.209.199.186:5000/auth/profile-photo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          responseType: 'blob',
        });

        const profilePicUrl = URL.createObjectURL(userProfilePhotoResponse.data);

        setProfilePic(profilePicUrl);

        setFormData({
          username: userProfileResponse.data.username,
          first_name: userProfileResponse.data.first_name,
          last_name: userProfileResponse.data.last_name,
          vjudge_id: userProfileResponse.data.vjudge_id,
          codeforces_id: userProfileResponse.data.codeforces_id,
          atcoder_id: userProfileResponse.data.atcoder_id,
          codechef_id: userProfileResponse.data.codechef_id,
          profile_pic: profilePicUrl,
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
    setFormData({
      ...formData,
      profile_pic: e.target.files[0],
    });
    setProfilePic(URL.createObjectURL(e.target.files[0]));
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

      if (formData.profile_pic) {
        const profilePicData = new FormData();
        profilePicData.append('profile_pic', formData.profile_pic);

        await axios.post('http://103.209.199.186:5000/auth/upload_profile_image', profilePicData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

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
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Profile</h2>

        {[
          { id: 'username', label: 'Username', type: 'text' },
          { id: 'first_name', label: 'First Name', type: 'text' },
          { id: 'last_name', label: 'Last Name', type: 'text' },
          { id: 'vjudge_id', label: 'Vjudge ID', type: 'text' },
          { id: 'codeforces_id', label: 'Codeforces ID', type: 'text' },
          { id: 'atcoder_id', label: 'AtCoder ID', type: 'text' },
          { id: 'codechef_id', label: 'CodeChef ID', type: 'text' },
          { id: 'new_password', label: 'New Password', type: 'password' },
          { id: 'confirm_password', label: 'Confirm New Password', type: 'password' },
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

        <div className="mb-6">
          <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
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
