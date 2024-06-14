import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Resources/csedu.png';

function SignUp() {
  const navigate = useNavigate();

  function handleSignUp() {
    // Here you would typically handle the sign-up process
    // If sign-up is successful, navigate to the appropriate page
    navigate('/dashboard');
  }

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
        <form className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Account</h2>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vjudgeHandle">
              VJudge Handle
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vjudgeHandle" type="text" placeholder="VJudge Handle" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="atcoderHandle">
              AtCoder Handle
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="atcoderHandle" type="text" placeholder="AtCoder Handle" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codeforcesHandle">
              Codeforces Handle
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="codeforcesHandle" type="text" placeholder="Codeforces Handle" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codechefHandle">
              CodeChef Handle
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="codechefHandle" type="text" placeholder="CodeChef Handle" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Address" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="Confirm Password" />
          </div>

          <div className="flex items-center justify-center">
            <button onClick={handleSignUp} className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign Up
            </button>
          </div>

          <p className="text-center text-gray-500 text-m" style={{ marginTop: '30px' }}>
            Already have an account? <a href="/#" className="text-dark-blue hover:text-black">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
