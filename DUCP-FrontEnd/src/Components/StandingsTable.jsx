import React from 'react';


const StandingsTable = ({ problems, standingsData }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">


      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Rank</th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Username</th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Solves</th>
                  {problems.map((problem, index) => (
                    <th key={index} scope="col" className="py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900">{problem.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {standingsData.map((standing) => (
                  <tr key={standing.username}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">{standing.rank}</td>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0 text-indigo-600 hover:text-indigo-900">
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{ standing.username }</div>
                      <div className="mt-1 text-gray-500">{ standing.realName }</div>
                    </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{ standing.solves }</div>
                      <div className="mt-1 text-gray-500">{ standing.tries }</div>
                    </div>
                    </td>
                    {standing.problems.map((status, index) => (
                      <td key={index} className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                        {status === 'accepted' && (
                          <span className="bg-green-50 text-green-700 py-1 px-2 rounded-md ring-1 ring-green-600/20">Accepted</span>
                        )}
                        {status === 'wrong' && (
                          <span className="bg-red-50 text-red-700 py-1 px-2 rounded-md ring-1 ring-red-600/20">Wrong Answer</span>
                        )}
                        {status === 'N/A' && (
                          <span className="bg-gray-50 text-gray-700 py-1 px-2 rounded-md ring-1 ring-gray-600/20">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;
