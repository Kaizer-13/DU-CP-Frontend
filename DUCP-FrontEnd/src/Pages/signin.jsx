import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Resources/csedu.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error messages

    // Check if the fields are empty
    if (!username || !password) {
      setErrorMessage('Please enter your email and password');
      return;
    }

    setIsLoading(true); // Start loading

    const requestBody = new URLSearchParams({
      'grant_type': '',
      'username': username,
      'password': password,
      'scope': '',
      'client_id': '',
      'client_secret': ''
    });

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
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during sign in:', error);

      if (!error.response) {
        // Network error
        setErrorMessage('Network error');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Dark blue section covering one-third of the screen */}
      <div className="w-1/3 bg-dark-blue flex flex-col items-center justify-start text-white py-20 sticky top-0 h-screen">
        <div className="flex flex-col items-center mt-0 font-sedan">
          {'DUCU'.split('').map((char, index) => (
            <span key={index} className="text-6xl font-bold mb-10">{char}</span>
          ))}
          <img src={logo} alt="DUCU Logo" className="mt-10" style={{ width: '100px', height: '150px' }} />
        </div>
      </div>
   

      {/* White section covering two-thirds of the screen */}
      <div className="w-2/3 bg-white flex justify-center items-center">
        <form className="w-full max-w-md" onSubmit={handleSignIn}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign In</h2>
          {isLoading && <div className="mb-4 text-gray-700">Signing in...</div>}
          {errorMessage && (
            <div className="mb-4 text-black"> {/* Changed text color to black */}
              {errorMessage}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 mb-3  flex items-center justify-right"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="text-right mb-0">
              <a href="./forgot-password" className="inline-block align-baseline text-sm text-neutral-500 hover:text-dark-blue underline mt-2 text-right">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
