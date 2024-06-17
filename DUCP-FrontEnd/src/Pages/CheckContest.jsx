import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function CheckContest() {
  const [contestTitle, setContestTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [problemId, setProblemId] = useState('');
  const [problemPlatform, setProblemPlatform] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProblem = async () => {
    try {
      const response = await fetch(`/admin/add_problem_to_contest?problem_id=${problemId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          const errorDetail = errorData.detail[0];
          const errorMsg = `${errorDetail.msg} at ${errorDetail.loc.join(' -> ')}`;
          throw new Error(errorMsg);
        } else {
          const errorText = await response.text();
          throw new Error(`Unexpected response: ${errorText}`);
        }
      }

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        throw new Error(`Unexpected response: ${textData}`);
      }

      console.log(data);
      // Handle the response data here

      // Set success message
      setSuccessMessage('Problem successfully added to the contest!');
      setErrorMessage('');

      // Reset problem ID and platform after adding
      setProblemId('');
      setProblemPlatform('');
    } catch (error) {
      console.error('Error adding problem to contest:', error);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  
  const handleCreateContest = () => {
    // Handle create contest logic here
    console.log({
      contestTitle,
      startTime,
      duration,
      problemId,
      problemPlatform,
    });
    // You may want to clear the form fields here after creating the contest
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-8 m-8 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Check Contest Data</h2>
        <form className="space-y-6">
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
                <option value="AtCoder">AtCoder</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddProblem}
                className="bg-dark-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Problem
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="text-green-500 text-center font-semibold">
              {successMessage}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCreateContest}
              className="bg-yellow text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-dark-yellow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckContest;
