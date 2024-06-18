import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddProblem() {
  const [problemUrl, setProblemUrl] = useState('');
  const [problemName, setProblemName] = useState('');
  const [problemJudge, setProblemJudge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');

    const requestData = {
      problem_url: problemUrl,
      problem_name: problemName,
      problem_judge: problemJudge,
    };

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://103.209.199.186:5000/admin/upload_problem', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.data != null) {
        toast.success('Problem added successfully');
        setProblemUrl('');
        setProblemName('');
        setProblemJudge('');
      } else {
        const data = await response.json();
      }
    } catch (error) {
        //
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
        <ToastContainer/>
      <Navbar />
      <div className="flex flex-col p-8 m-8 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Add Problem</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Problem URL</label>
              <input
                type="text"
                value={problemUrl}
                onChange={(e) => setProblemUrl(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter problem URL"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Problem Name</label>
              <input
                type="text"
                value={problemName}
                onChange={(e) => setProblemName(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter problem name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Problem Judge</label>
              <select
                value={problemJudge}
                onChange={(e) => setProblemJudge(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select judge</option>
                <option value="Codeforces">Codeforces</option>
                <option value="VJ">Vjudge</option>
                <option value="AC">AtCoder</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-dark-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Problem
              </button>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center font-semibold">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProblem;
