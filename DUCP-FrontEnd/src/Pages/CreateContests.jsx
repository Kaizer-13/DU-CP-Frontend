import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { refreshToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function CreateContests() {
  const [contestTitle, setContestTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [contestPassword, setContestPassword] = useState('');
  const [problemId, setProblemId] = useState('');
  const [problemPlatform, setProblemPlatform] = useState('');
  const [problems, setProblems] = useState([]);
  const [addedProblems, setAddedProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const fetchProblems = async (token) => {
    try {
      const response = await axios.get('http://103.209.199.186:5000/contestant/problems', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && Array.isArray(response.data.Problems)) {
        setProblems(response.data.Problems);
      } else {
        setProblems([]);
        setErrorMessage('Unexpected response format. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshToken();
          localStorage.setItem('access_token', newToken); // Ensure the new token is stored
          await fetchProblems(newToken);
        } catch (refreshError) {
          setErrorMessage('Session expired. Please log in again.');
        }
      } else {
        setErrorMessage('Error fetching problems. Please try again.');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchProblems(token);
    } else {
      setErrorMessage('No access token found. Please log in.');
    }
  }, []);

  const handleAddProblem = () => {
    if (!problems || problems.length === 0) {
      setErrorMessage('Problems not loaded yet. Please wait.');
      return;
    }

    const problem = problems.find(
      (p) => p.id.toString() === problemId && p.problem_judge === problemPlatform
    );

    if (problem) {
      setAddedProblems([...addedProblems, problem]);
      setSuccessMessage('Problem added successfully!');
      setErrorMessage('');
    } else {
      setErrorMessage('Problem not found. Please check the Problem ID and Platform.');
      setSuccessMessage('');
    }
  };

  const handleCreateContest = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      setErrorMessage('No access token found. Please log in.');
      setLoading(false);
      return;
    }
  
    if (!contestTitle || !startTime || !endTime || addedProblems.length === 0) {
      setErrorMessage('Please fill out all required fields and add at least one problem.');
      setLoading(false);
      return;
    }
  
    const formattedStartTime = new Date(startTime).toISOString();
    const formattedEndTime = new Date(endTime).toISOString();
  
    const queryParams = new URLSearchParams({
      contest_name: contestTitle,
      contest_password: contestPassword,
      start_time: formattedStartTime,
      end_time: formattedEndTime
    });
  
    // Ensure problem IDs are integers
    const requestBody =   addedProblems.map(p => (parseInt(p.id)));
  
    console.log('Query Params:', queryParams); // Log the query params for debugging
    console.log('Token:', token); // Log the response data for debugging

    try {
      const response = await axios.post(
        `http://103.209.199.186:5000/admin/add_contest?${queryParams}`,requestBody,
        
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Response:', response.data); // Log the response data for debugging

  
      if (response.status===200) {
        setSuccessMessage('Contest created successfully!');
        setContestTitle('');
        setStartTime('');
        setEndTime('');
        setContestPassword('');
        setAddedProblems([]);

        setTimeout(() => {
          navigate('/contests');
        }, 3000);
      } else {
        setErrorMessage('Error creating contest. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response); // Log the error response for debugging
  
      if (error.response && error.response.status === 401) {
        try {
          console.log("Token:",token); // Ensure the new token is stored

          const newToken = await refreshToken();
          localStorage.setItem('access_token', newToken);
          console.log("New Token:",newToken); // Ensure the new token is stored
          await handleCreateContest();
        } catch (refreshError) {
          setErrorMessage('Session expired. Please log in again.');
        }
      } else if (error.response && error.response.status === 422) {
        const errorDetails = error.response.data.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ');
        setErrorMessage(errorDetails || 'Validation error. Please check your input.');
      } else {
        setErrorMessage('Error creating contest. Please try again.');
      }
    }
  
    setLoading(false);
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-8 m-8 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Create a Contest</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contest Title</label>
            <input
              type="text"
              value={contestTitle}
              onChange={(e) => setContestTitle(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter contest title"
            />
          </div>
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter start time"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter end time"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contest Password</label>
            <input
              type="password"
              value={contestPassword}
              onChange={(e) => setContestPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter contest password"
            />
          </div>
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Problem ID</label>
              <input
                type="text"
                value={problemId}
                onChange={(e) => setProblemId(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter problem ID"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Problem Platform</label>
              <select
                value={problemPlatform}
                onChange={(e) => setProblemPlatform(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select platform</option>
                <option value="Codeforces">Codeforces</option>
                <option value="HackerRank">HackerRank</option>
                <option value="CodeChef">CodeChef</option>
                <option value="LeetCode">LeetCode</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddProblem}
                className="bg-dark-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Problem'}
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="text-black text-center font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center font-semibold">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
      <div className="mt-6 px-8">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/3 px-4 py-2">Problem ID</th>
              <th className="w-1/3 px-4 py-2">Problem Name</th>
            </tr>
          </thead>
          <tbody>
            {addedProblems.map((problem, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{problem.id}</td>
                <td className="border px-4 py-2">{problem.problem_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleCreateContest}
          className="bg-yellow text-black font-bold py-3 px-6 mb-4 rounded-lg shadow-md hover:bg-dark-yellow focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Contest'}
        </button>
      </div>
    </div>
  );
}

export default CreateContests;
