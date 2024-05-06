// Leaderboard.js
import React from 'react';

import Navbar from '../Components/Navbar'
import LeaderboardTable from '../Components/LeaderboardTable';
import Filter from '../Components/Filter';


function Leaderboard() {

    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar/>
            <div className="flex flex-row justify-between p-4">
              {/* Leaderboard Table */}
              <div className="w-2/3 pr-4">
                    <LeaderboardTable />
                </div>
                {/* Filter Section */}
                
                    <Filter />
                
            </div>
        </div>
);

    
}

export default Leaderboard;
