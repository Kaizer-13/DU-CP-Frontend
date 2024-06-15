import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProblemComponent from '../Components/ProblemComponent.jsx';
import ProblemTable from './ProblemTable.jsx';
import StandingsTable from './StandingsTable.jsx';

const ContestTabs = ({ contestData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const navigate = useNavigate();
  const { contestId, problemId } = useParams();

  useEffect(() => {
    if (problemId) {
      setSelectedProblemId(problemId);
    } else if (contestData.problems.length > 0) {
      setSelectedProblemId(contestData.problems[0].id);
      navigate(`/contests/${contestId}/problem/${contestData.problems[0].id}`);
    }
  }, [problemId, contestData.problems, contestId, history]);

  const problems = contestData.problems.map((problem, index) => ({
    id: problem.id,
    number: `P${index + 1}`,
    name: problem.problem_name,
    solves: 0, // This should be updated based on actual solve data
  }));

  const standingsData = [
    { rank: 1, username: 'john_doe', realName: 'John Doe', solves: 5, tries: 10, problems: ['accepted', 'accepted', 'wrong'] },
    { rank: 2, username: 'jane_smith', realName: 'Jane Smith', solves: 4, tries: 8, problems: ['accepted', 'accepted', 'accepted'] },
    { rank: 3, username: 'mike_johnson', realName: 'Mike Johnson', solves: 3, tries: 6, problems: ['accepted', 'wrong', 'accepted'] },
    // Add more standings data as needed
  ];

  return (
    <div className="w-full">
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
      <div className="p-4">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-bold">Overview</h2>
            <p>Contest Name: {contestData.contest_name}</p>
            <p>Contest Setter: {contestData.contest_setter}</p>
            <p>Duration: {contestData.contest_duration}</p>
            <p>Start Time: {new Date(contestData.contest_start_time).toLocaleString()}</p>
            <p>End Time: {new Date(contestData.contest_end_time).toLocaleString()}</p>
            <ProblemTable problems={problems} />
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Check Plagiarism
              </button>
            </div>
          </div>
        )}
        {activeTab === 'problem' && (
          <div>
            {selectedProblemId && (
              <ProblemComponent problemId={selectedProblemId} timestamps={[]} />
            )}
          </div>
        )}
        {activeTab === 'standings' && (
          <div>
            <h2 className="text-xl font-bold">Standings</h2>
            <StandingsTable problems={problems} standingsData={standingsData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestTabs;
