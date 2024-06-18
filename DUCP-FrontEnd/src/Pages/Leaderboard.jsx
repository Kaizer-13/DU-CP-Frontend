// Leaderboard.js
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Navbar from '../Components/Navbar'
import Table from '../Components/Table';
import Filter from '../Components/Filter';

const leaderboardColumns = [
    { Header: 'Standing', accessor: 'rank' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Solve Count', accessor: 'solve_count' },
  ];

  
function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.get('http://103.209.199.186:5000/contestant/global_rank', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = response.data.map((item) => ({
          rank: item.rank,
          username: item.username,
          solve_count: item.solve_count
        }));

        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar/>
            <div className="flex flex-row justify-between p-4 mr-12 ml-12">
              {/* Leaderboard Table */}
              <div className="w-full pr-4">
                <Table
                    title="Leaderboard"
                    subtitle="Users participated in recent months"
                    columns={leaderboardColumns}
                    data={leaderboardData}
          
                />
                </div>
                {/* 
                
                    <Filter /> */}
                
            </div>
        </div>
);

    
}

export default Leaderboard;
