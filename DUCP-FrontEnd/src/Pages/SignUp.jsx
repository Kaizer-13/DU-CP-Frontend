import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../Resources/csedu.png';

function SignUp() {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    codeforcesHandle: '',
    vjudgeHandle: '',
    atcoderHandle: '',
    codechefHandle: ''
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  // Handle form submission
  const handleSignUp = async () => {
    const {
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      codeforcesHandle,
      vjudgeHandle,
      atcoderHandle,
      codechefHandle
    } = formData;

    // Validate form fields
    const newErrors = {};
    if (!firstName) newErrors.firstName = "Enter first name";
    else if (!lastName) newErrors.lastName = "Enter last name";
    else if (!username) newErrors.username = "Enter username";
    
    else if (!vjudgeHandle) newErrors.vjudgeHandle = "Enter VJudge handle";
    else if (!atcoderHandle) newErrors.atcoderHandle = "Enter AtCoder handle";
    else if (!codeforcesHandle) newErrors.codeforcesHandle = "Enter Codeforces handle";
    else if (!codechefHandle) newErrors.codechefHandle = "Enter CodeChef handle";

    else if (!email) newErrors.email = "Enter email address";
    else if (!password) newErrors.password = "Enter password";
    else if (password.length<6) newErrors.password="Password must be at least six characters long"
    else if (!confirmPassword) newErrors.confirmPassword = "Enter confirm password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // Create the request body
    const requestBody = {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      codeforces_id: codeforcesHandle,
      vjudge_id: vjudgeHandle,
      atcoder_id: atcoderHandle,
      codechef_id: codechefHandle
    };

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://103.209.199.186:5000/auth/signup', requestBody);

      // If sign-up is successful, navigate to the home page or dashboard
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);

      // Handle error response from backend
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          
          setErrors({ username: 'Username already exists' });
          
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Dark blue section covering one-third of the screen */}
      <div className="w-1/3 bg-dark-blue flex flex-col items-center justify-start text-white py-20">
        <div className="flex flex-col items-center mt-0 font-sedan">
          {'DUCU'.split('').map((char, index) => (
            <span key={index} className="text-8xl font-bold mb-10">{char}</span>
          ))}
          <img src={logo} alt="DUCU Logo" className="mt-20" style={{ width: '100px', height: '150px' }} />
        </div>
      </div>

      {/* White section covering two-thirds of the screen, centered vertically */}
      <div className="w-2/3 flex flex-col justify-center items-center bg-white">
        <form className="w-full max-w-md py-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Account</h2>

          {errors.general && (
            <div className="mb-4 text-black">
              {errors.general}
            </div>
          )}

          {[
            { id: 'firstName', label: 'First Name', type: 'text' },
            { id: 'lastName', label: 'Last Name', type: 'text' },
            { id: 'username', label: 'Username', type: 'text' },
            { id: 'vjudgeHandle', label: 'VJudge Handle', type: 'text' },
            { id: 'atcoderHandle', label: 'AtCoder Handle', type: 'text' },
            { id: 'codeforcesHandle', label: 'Codeforces Handle', type: 'text' },
            { id: 'codechefHandle', label: 'CodeChef Handle', type: 'text' },
            { id: 'email', label: 'Email Address', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
          ].map((field) => (
            <div className="mb-6" key={field.id}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors[field.id] ? 'border-black' : 'border-gray-300'
                }`}
                id={field.id}
                type={field.type}
                placeholder={field.label}
                value={formData[field.id]}
                onChange={handleInputChange}
              />
              {errors[field.id] && (
                <p className="text-black text-s">{errors[field.id]}</p>
              )}
            </div>
          ))}

          <div className="flex items-center justify-center">
            <button
              onClick={handleSignUp}
              className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-gray-500 text-m mt-8">
            Already have an account? <Link to="/" className="text-dark-blue hover:text-black">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
