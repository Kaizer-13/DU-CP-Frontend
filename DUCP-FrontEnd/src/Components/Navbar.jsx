import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../Resources/csedu.png';
import profile from '../Resources/default_dp.png'; // Adjust the path as necessary

function Navbar() {
  const [user, setUser] = useState({ username: '', profilePic: '' });
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
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

        const userData = response.data;
        setUser(prevUser => ({ ...prevUser, username: userData.username }));

        const profilePicResponse = await axios.get('http://103.209.199.186:5000/auth/profile-photo', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'image/jpeg',
          },
          responseType: 'blob',
        });

        if (profilePicResponse.status === 200) {
          const imageUrl = URL.createObjectURL(profilePicResponse.data);
          setUser(prevUser => ({ ...prevUser, profilePic: imageUrl }));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="flex items-center justify-between bg-dark-blue p-6">
      <div className="flex items-center text-white">
        <img src={logo} alt="DUCU Logo" className="h-12 w-auto mr-3" />
        <span className="font-sedan text-3xl tracking-tight">DUCU</span>
        <div className="ml-6 space-x-4">
          <NavLinkItem to="/dashboard">Home</NavLinkItem>
          <NavLinkItem to="/leaderboard">Leaderboard</NavLinkItem>
          <NavLinkItem to="/contests">Contest</NavLinkItem>
          <NavLinkItem to="/practice">Practice</NavLinkItem>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <NavLink to="/profile" title="My profile">
            <img src={user.profilePic || profile} alt="Profile" className="h-12 w-12 rounded-full" />
          </NavLink>
          <span className="text-white">{user.username || 'Guest'}</span>
        </div>
        <Link to='/'>
          <button className="bg-transparent text-gray-300 underline py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-white">
            Logout
          </button>
        </Link>
      </div>

      <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white lg:hidden">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </nav>
  );

  function NavLinkItem({ to, children }) {
    const isActive = location.pathname === to;
    return (
      <NavLink to={to} className={`text-gray-300 hover:text-white ${isActive ? 'text-white font-bold' : ''}`}>
        {children}
      </NavLink>
    );
  }
}

export default Navbar;
