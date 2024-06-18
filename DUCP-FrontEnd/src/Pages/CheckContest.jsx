import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

function CheckContest() {
  const [contestId, setContestId] = useState('');
  const [contestPlatform, setContestPlatform] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contestData, setContestData] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('http://103.209.199.186:5000/admin/all-user-info', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: '',
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
        } else {
          setErrorMessage('Failed to fetch user info');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching user info');
      }
    }

    fetchUserInfo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setContestData(null);

    const requestData = {
      judge_name: contestPlatform,
      judge_contest_id: contestId,
      contest_type: 'individual',
    };

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://103.209.199.186:5000/admin/external_contest_data', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setContestData(data);
        setSuccessMessage('Data fetched successfully');
      } else {
        setErrorMessage('Failed to fetch data');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }
  }

  const getUserInfo = (userId) => {
    return userInfo.find(user => user.id === parseInt(userId)) || {};
  };

  const getPlatformId = (user) => {
    switch (contestPlatform) {
      case 'CF':
        return user.codeforces_id;
      case 'VJ':
        return user.vjudge_id;
      case 'AC':
        return user.atcoder_id;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-8 m-8 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Check Contest Data</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Contest ID</label>
              <input
                type="text"
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter contest ID"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Contest Platform</label>
              <select
                value={contestPlatform}
                onChange={(e) => setContestPlatform(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select platform</option>
                <option value="CF">Codeforces</option>
                <option value="VJ">Vjudge</option>
                <option value="AC">AtCoder</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-dark-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                CheckContest
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="text-green-500 text-center font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center font-semibold">
              {errorMessage}
            </div>
          )}
        </form>
        {contestData && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Contest Data</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">User ID</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Platform ID</th>
                  <th className="py-2 px-4 border-b">Problems Solved</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(contestData).map(([userId, problemsSolved]) => {
                  const user = getUserInfo(userId);
                  return (
                    <tr key={userId}>
                      <td className="py-2 px-4 border-b">{userId}</td>
                      <td className="py-2 px-4 border-b">
                        {user.username}
                        <br />
                        <span className="text-sm text-gray-500">{user.first_name} {user.last_name}</span>
                      </td>
                      <td className="py-2 px-4 border-b">{getPlatformId(user)}</td>
                      <td className="py-2 px-4 border-b">{problemsSolved}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckContest;
