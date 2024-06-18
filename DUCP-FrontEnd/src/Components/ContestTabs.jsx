import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProblemComponent from '../Components/ProblemComponent.jsx';
import ProblemTable from './ProblemTable.jsx';
import StandingsTable from './StandingsTable.jsx';
import axios from 'axios';

const ContestTabs = ({ contestData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [selectedProblemUrl, setSelectedProblemUrl] = useState(null);
  const [timestamps, setTimestamps] = useState([]);
  const [problems, setProblems] = useState([]);
  const [standingsData, setStandingsData] = useState([]);
  const [plagiarismResults, setPlagiarismResults] = useState(null);
  const navigate = useNavigate();
  const { contestId, problemId } = useParams();

  useEffect(() => {
    if (problemId) {
      setSelectedProblemId(problemId);
      const problem = contestData.problems.find(p => p.id === problemId);
      if (problem) {
        setSelectedProblemUrl(problem.problem_url);
      }
    } else if (contestData.problems.length > 0) {
      setSelectedProblemId(contestData.problems[0].id);
      setSelectedProblemUrl(contestData.problems[0].problem_url);
      navigate(`/contests/${contestId}/problem/${contestData.problems[0].id}`);
    }
  }, [problemId, contestData.problems, contestId, navigate]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const url = `http://103.209.199.186:5000/contestant/contests/${contestId}/submissions/me/${problemId}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const submissions = response.data;
        const mappedSubmissions = submissions.map(submission => ({
          time: submission.updated_at,
          status: submission.verdict
        }));

        setTimestamps(mappedSubmissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [problemId, contestId]);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const url = `http://103.209.199.186:5000/contestant/contests/${contestId}/submissions`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const submissions = response.data;

        const problemStats = {};
        submissions.forEach(submission => {
          if (!problemStats[submission.problem_id]) {
            problemStats[submission.problem_id] = { accepted: 0, total: 0 };
          }
          problemStats[submission.problem_id].total += 1;
          if (submission.verdict === 'Accepted') {
            problemStats[submission.problem_id].accepted += 1;
          }
        });

        const updatedProblems = contestData.problems.map((problem, index) => {
          const stats = problemStats[problem.id] || { accepted: 0, total: 0 };
          return {
            id: problem.id,
            number: `P${index + 1}`,
            name: problem.problem_name,
            solves: `${stats.accepted}/${stats.total}`
          };
        });

        setProblems(updatedProblems);
      } catch (error) {
        console.error('Error fetching all submissions:', error);
      }
    };

    fetchAllSubmissions();
  }, [contestId, contestData.problems]);

  useEffect(() => {
    const fetchRankList = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const url = `http://103.209.199.186:5000/contestant/contests/${contestId}/rank_list`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const rankList = response.data;

        const updatedStandingsData = rankList.map(entry => ({
          rank: entry.rank,
          username: entry.username,
          realName: `${entry.first_name} ${entry.last_name}`,
          solves: entry.solve_count,
          tries: 0,
          problems: Object.values(entry.status).map(status => {
            if (status === 1) return 'Accepted';
            if (status === -1) return 'Wrong Answer';
            return 'None';
          })
        }));

        setStandingsData(updatedStandingsData);
      } catch (error) {
        console.error('Error fetching rank list:', error);
      }
    };

    fetchRankList();
  }, [contestId]);

  const handleProblemClick = (problemId) => {
    setActiveTab('problem');
    setSelectedProblemId(problemId);
    const problem = contestData.problems.find(p => p.id === problemId);
    if (problem) {
      setSelectedProblemUrl(problem.problem_url);
    }
  };

  const handlePlagiarismCheck = async () => {
    try {
      const response = await axios.get(`http://103.209.199.186:5000/admin/plagarism-check/${contestId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      });
      setPlagiarismResults(response.data);
    } catch (error) {
      console.error('Error fetching plagiarism check:', error);
    }
  };

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
            <ProblemTable problems={problems} onProblemClick={handleProblemClick} />
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handlePlagiarismCheck}>
                Check Plagiarism
              </button>
            </div>
            {plagiarismResults && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Plagiarism Results</h3>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Problem ID</th>
                      <th className="py-2 px-4 border-b">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(plagiarismResults).map(([problemId, link]) => (
                      <tr key={problemId}>
                        <td className="py-2 px-4 border-b">{problemId}</td>
                        <td className="py-2 px-4 border-b">
                          {link.startsWith('http') ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              View Results
                            </a>
                          ) : (
                            link
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'problem' && (
          <div>
            {selectedProblemId && (
              <ProblemComponent problemId={selectedProblemId} problemUrl={selectedProblemUrl} timestamps={timestamps} />
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
