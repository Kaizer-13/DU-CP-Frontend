import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Resources/csedu.png'

function Signin() {

  
  const navigate = useNavigate();
  
  function handleSignIn() {
      // Here you would typically validate the user's credentials
      // If validation is successful, navigate to the Dashboard
    navigate('/dashboard');
  }
    
  return (
    
    <div className="min-h-screen flex">
    {/* Dark blue section covering one-third of the screen */}
    <div className="w-1/3 bg-dark-blue flex flex-col items-center justify-center text-white"> 
      <div className="flex flex-col items-center mt-0 font-sedan"> {/* Reduced margin here */}
        {'DUCU'.split('').map((char, index) => (
          <span key={index} className="text-8xl font-bold mb-10">{char}</span> // Increased spacing between letters and larger text size
        ))}
        <img src={logo} alt="DUCU Logo" className="mt-20" style={{ width: '100px', height: '150px' }} /> {/* Increased margin above image */}
      </div>
    </div>
  
  
    
    

      {/* White section covering two-thirds of the screen */}
      <div className="w-2/3 bg-white flex justify-center items-center">
        <form className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign In</h2>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
          </div>
          <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"/>
              <div className="text-right mb-0"> {/* Adjusted positioning for right alignment and vertical positioning */}
                <a href="#" className="inline-block align-baseline text-sm text-neutral-500 hover:text-dark-blue underline mt-2 text-right">
                Forgot Password?
                </a>
              </div>
        
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleSignIn} className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            
          </div>
          <p className="text-center text-gray-500 text-m" style={{marginTop:'30px'}}>
            New to DUCU? <a href="#" className="text-dark-blue hover:text-black">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
