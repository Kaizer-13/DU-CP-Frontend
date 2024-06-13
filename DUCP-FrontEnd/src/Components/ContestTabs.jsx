import React, { useState } from 'react';
import ProblemComponent from '../Components/ProblemComponent.jsx';
import ProblemTable from './ProblemTable.jsx';
import StandingsTable from './StandingsTable.jsx';
const ContestTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const timestamps = [
    { time: '10:00 AM', status: 'check' },
    { time: '10:30 AM', status: 'close' },
    { time: '11:00 AM', status: 'minus' },
  ];
  const problems = [
    { id: 1, number: 'P1', name: 'Problem 1', solves: 69 },
    { id: 2, number: 'P2', name: 'Problem 2', solves: 420 },
    { id: 3, number: 'P3', name: 'Problem 3', solves: 42 },
    // Add more problems as needed
  ];
  const standingsData = [
    { rank: 1, username: 'john_doe', realName: 'John Doe', solves: 5, tries:10, problems: ['accepted', 'accepted', 'wrong'] },
    { rank: 2, username: 'jane_smith', realName: 'Jane Smith', solves: 4, tries:8, problems: ['accepted', 'accepted', 'accepted'] },
    { rank: 3, username: 'mike_johnson', realName: 'Mike Johnson', solves: 3, tries:6, problems: ['accepted', 'wrong', 'accepted'] },
    // Add more standings data as needed
  ];
  return (
    <div className="w-full">
    {/* Tab Headers */}
    <div className="flex border-b">
      <button
        className={`w-1/3 py-2 text-center ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
      <button
        className={`w-1/3 py-2 text-center ${activeTab === 'problem' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => setActiveTab('problem')}
      >
        Problem
      </button>
      <button
        className={`w-1/3 py-2 text-center ${activeTab === 'standings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => setActiveTab('standings')}
      >
        Standings
      </button>
    </div>

    {/* Tab Content */}
    <div className="p-4">
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-bold">Overview</h2>
          <ProblemTable problems={problems}/>
            <div className="mt-4 flex justify-center">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Check Plagiarism
                </button>
            </div>
        </div>
      )}
      {activeTab === 'problem' && (
        <div>
          <ProblemComponent pdfPath="/public/sample.pdf" timestamps={timestamps} />
        </div>
      )}
      {activeTab === 'standings' && (
        <div>
          <h2 className="text-xl font-bold">Standings</h2>
          <StandingsTable problems={problems}standingsData={standingsData} />
        </div>
      )}
    </div>
  </div>
  );
};

export default ContestTabs;
