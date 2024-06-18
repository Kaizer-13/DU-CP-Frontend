import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import StandingsTable from '../Components/StandingsTable';
import axios from 'axios';

const ExternalStandings = () => {
    const [standingsData, setStandingsData] = useState([]);

  
  useEffect(() => {
    const fetchRankList = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        // Fetch rank list data
        const url = `http://103.209.199.186:5000/contestant/contests/${contestId}/rank_list`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const rankList = response.data;

        // Process rank list data to match the required format
        const updatedStandingsData = rankList.map(entry => ({
          rank: entry.rank,
          username: entry.username,
          realName: `${entry.first_name} ${entry.last_name}`,
          solves: entry.solve_count,
          tries: 0, // Keeping tries as 0 for now
          problems: Object.values(entry.status).map(status => {
            if (status === 1) return 'Accepted';
            if (status === 0) return 'None';
            return 'Wrong Answer';
          })
        }));

        setStandingsData(updatedStandingsData);
      } catch (error) {
        console.error('Error fetching rank list:', error);
      }
    };

    fetchRankList();
  }, [contestId, judge]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
      <StandingsTable problems={problems} standingsData={standingsData} />
      </div>
    </div>
  );
};

export default ExternalStandings;
