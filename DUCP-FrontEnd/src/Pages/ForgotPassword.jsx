import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Resources/csedu.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function RecoverPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to reset the password
      // Example API call, replace with your actual API endpoint and logic
      await axios.post('http://103.209.199.186:5000/reset-password', {
        new_password: newPassword,
      });

      setSuccessMessage('Password changed successfully');
      navigate('/signin');
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Error resetting password');
    } finally {
      setIsLoading(false);
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
        <form className="w-full max-w-md" onSubmit={handlePasswordReset}>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Recover Password</h2>
          {isLoading && <div className="mb-4 text-gray-700">Processing...</div>}
          {errorMessage && (
            <div className="mb-4 text-red-500">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 text-green-500">
              {successMessage}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="new-password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 mb-3 flex items-center justify-center"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="confirm-password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 mb-3 flex items-center justify-center"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Change Password
            </button>
          </div>
          <p className="text-center text-gray-500 text-m" style={{marginTop:'30px'}}>
            Remembered your password? <Link to="/" className="text-dark-blue hover:text-black">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
