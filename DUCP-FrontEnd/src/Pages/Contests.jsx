import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table';
import { Link } from 'react-router-dom';

const contestColumns = [
  { Header: 'Contest ID', accessor: 'id' },
  { Header: 'Title', accessor: 'contest_name' },
  { Header: 'Begin Time', accessor: 'start_time' },
  { Header: 'Duration', accessor: 'duration' },
];

function Contests() {
  const [contestData, setContestData] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
        <div className="flex justify-end space-x-8">
          <Link to="/createContests" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Create a Contest
          </Link>
          <a href="#codeforces-rating" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Codeforces Rating
          </a>
        </div>
        <Table
          title="Contests"
          subtitle="Contests held in recent months"
          columns={contestColumns}
          data={contestData}
        />
      </div>
    </div>
  );
}

export default Contests;
