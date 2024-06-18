import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table';
import { Link } from 'react-router-dom';

const contestColumns = [
  { Header: 'Contest ID', accessor: 'id' },
  { Header: 'Title', accessor: 'name' },
  { Header: 'Begin Time', accessor: 'start_time' },
  { Header: 'Duration', accessor: 'duration' },
];

function Contests() {
  const [contestData, setContestData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.get('http://103.209.199.186:5000/contestant/contests', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setContestData(response.data.contests);
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    fetchContests();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContests = contestData.filter(contest =>
    contest.contest_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search contests..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 w-4/5 border border-gray-300 rounded"
          />
          <div className="flex space-x-8">
            <Link to="/createContests" className="underline text-gray-500 hover:text-dark-blue font-bold">
              Create a Contest
            </Link>
            <Link to="/checkContest" className="underline text-gray-500 hover:text-dark-blue font-bold">
              Check External Contest
            </Link>
          </div>
        </div>
        <Table
          title="Contests"
          subtitle="Contests held in recent months"
          columns={contestColumns}
          data={filteredContests.map(contest => ({
            ...contest,
            name: (
              <Link to={`/contests/${contest.id}`} className="text-blue-500 hover:underline">
                {contest.contest_name}
              </Link>
            )
          }))}
        />
      </div>
    </div>
  );
}

export default Contests;
