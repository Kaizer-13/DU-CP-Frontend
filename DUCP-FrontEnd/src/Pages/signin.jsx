import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Resources/csedu.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const requestBody = {
      'grant_type': '',
      'username': username,
      'password': password,
      'scope': '',
      'client_id': '',
      'client_secret': ''
    };

    try {
      const response = await axios.post('http://103.209.199.186:5000/token', requestBody, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const data = response.data;
      console.log('Successful response data:', data);

      // Handle the response data here, such as storing the tokens
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      console.log(response.status);
      // Navigate to the dashboard
      if (response.status === 200 && data.access_token!=null) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Utility function to make authenticated requests
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data from server:', errorData);
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
  };

  return (
    <div className="min-h-screen flex">
      {/* Dark blue section covering one-third of the screen */}
      <div className="w-1/3 bg-dark-blue flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center mt-0 font-sedan">
          {'DUCU'.split('').map((char, index) => (
            <span key={index} className="text-8xl font-bold mb-10">{char}</span>
          ))}
          <img src={logo} alt="DUCU Logo" className="mt-20" style={{ width: '100px', height: '150px' }} />
        </div>
      </div>

      {/* White section covering two-thirds of the screen */}
      <div className="w-2/3 bg-white flex justify-center items-center">
        <form className="w-full max-w-md" onSubmit={handleSignIn}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign In</h2>
          {isLoading && <div className="mb-4 text-gray-700">Signing in...</div>}
          {errorMessage && (
            <div className="mb-4 text-red-500">
              {errorMessage}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="text-right mb-0">
              <a href="#" className="inline-block align-baseline text-sm text-neutral-500 hover:text-dark-blue underline mt-2 text-right">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading} // Disable button while loading
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-gray-500 text-m" style={{marginTop:'30px'}}>
            New to DUCU? <Link to="/signup" className="text-dark-blue hover:text-black">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
