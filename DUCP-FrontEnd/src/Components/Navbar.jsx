import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../Resources/csedu.png'
import profile from '../Resources/default_dp.png';  // Adjust the path as necessary

function Navbar(){
    const [user, setUser] = useState({ username: '', profilePic: '' });

    useEffect(() => {
        // Function to fetch user data from the server
        const fetchUserData = async () => {
        try {
            // const response = await fetch('/api/user-data'); // API endpoint to fetch user data
            // const userData = await response.json();
            // setUser({ username: userData.username, profilePic: userData.profilePic });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
        };

        fetchUserData();
    }, []);

    return (
        <nav className="flex items-center justify-between bg-dark-blue p-6">
            {/* Left-aligned section for logo, text, and navigation links */}
            <div className="flex items-center text-white">
                <img src={logo} alt="DUCU Logo" className="h-12 w-auto mr-3" />
                <span className="font-semibold text-3xl tracking-tight">DUCU</span>

                {/* Navigation links */}
                <div className="ml-6 space-x-4">  {/* Adds some margin left after the DUCU text */}
                    <Link to ="/dashboard" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/leaderboard" className="text-gray-300 hover:text-white">Leaderboard</Link>
                    <Link to="/contests" className="text-gray-300 hover:text-white">Contest</Link>
                    <Link to="/practice" className="text-gray-300 hover:text-white">Practice</Link>
                    <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
                </div>
            </div>

            {/* Right-aligned section for profile picture and username */}
            <div className="flex items-center space-x-4"> {/* Using flex to align items horizontally */}
                <div className="flex flex-col items-center space-y-2">
                    <Link to ="/profile" title="My profile">
                    <img src={user.profilePic || profile} alt="Profile" className="h-12 w-12 rounded-full" />
                    </Link>
                    <span className="text-white">{user.username || 'Guest'}</span>
                </div>
                <button className=" bg-transparent text-gray-300  underline py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-white">
                    Logout
                </button>
            </div>

            {/* Mobile menu button - only shown on small screens */}
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white lg:hidden">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </nav>
    );
}
export default Navbar;