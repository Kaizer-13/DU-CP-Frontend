// Leaderboard.js
import React from 'react';

import Navbar from '../Components/Navbar'
import Table from '../Components/Table';
import Filter from '../Components/Filter';

const leaderboardColumns = [
    { Header: 'Standing', accessor: 'standing' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Solve Count', accessor: 'solveCount' },
  ];

  const leaderboardData = [
    { standing: 1, username: 'Kaiser69', solveCount: 69420 },
    { standing: 2, username: 'Bithi01', solveCount: 1289 },
    { standing: 3, username: 'TosnimClasseAsho', solveCount: 690 },
    { standing: 4, username: 'SinhaKoi', solveCount: 420 },
    { standing: 5, username: 'unnoorisd3ad', solveCount: 90 },
  ];
  
  
function Leaderboard() {

    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar/>
            <div className="flex flex-row justify-between p-4 mr-12 ml-12">
              {/* Leaderboard Table */}
              <div className="w-2/3 pr-4">
                <Table
                    title="Leaderboard"
                    subtitle="Users participated in recent months"
                    columns={leaderboardColumns}
                    data={leaderboardData}
          
                />
                </div>
                {/* Filter Section */}
                
                    <Filter />
                
            </div>
        </div>
);

    
}

export default Leaderboard;
