import React from "react";

function LeaderboardTable() {
  const leaderboardData = [
    { standing: 1, username: 'Kaiser69', solveCount: 69420 },
    { standing: 2, username: 'Bithi01', solveCount: 1289 },
    { standing: 3, username: 'TosnimClasseAsho', solveCount: 690 },
    { standing: 4, username: 'SinhaKoi', solveCount: 420 },
    { standing: 5, username: 'unnoorisd3ad', solveCount: 90 }
  ];

  return (
    <div className="bg-gray-200 p-8 rounded-2xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Leaderboard</h2>
      <p className="text-center text-sm text-gray-500 mb-4">Users participated in recent months</p>
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standing</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solve Count</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.standing} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.standing}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.solveCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;
