import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table';
import { Link } from 'react-router-dom';

const problemColumns = [
  { Header: 'Problem ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Judge', accessor: 'problem_judge' },
];

function Practice() {
  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.get('http://103.209.199.186:5000/contestant/problems', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setProblemData(response.data.Problems);
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };
    
    
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
        <div className="flex justify-end space-x-8">
          <Link to="/contests" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Contests
          </Link>
          <a href="#practice-problems" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Practice Problems
          </a>
        </div>
        <Table
          title="Practice Problems"
          subtitle="Practice problems available for you"
          columns={problemColumns}
          data={problemData.map(problem => ({
            ...problem,
            name: (
              <Link to={`/problem/${problem.id}`} className="text-blue-500 hover:underline">
                {problem.problem_name}
              </Link>
            )
          }))}
        />
      </div>
    </div>
  );
}

export default Practice;
