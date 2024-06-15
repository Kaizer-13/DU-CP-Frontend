import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ProblemTable = ({ problems }) => {
  const { contestId } = useParams();

  return (
    <div>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 py-2 px-4 w-1/6">Number</th>
            <th className="border border-gray-200 py-2 px-4 w-4/6 text-center">Name</th>
            <th className="border border-gray-200 py-2 px-4 text-center">Solves</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td className="border border-gray-200 py-2 px-4 text-center">
                <Link to={`/contests/${contestId}/problem/${problem.id}`} className="text-blue-500 hover:underline">
                  {problem.number}
                </Link>
              </td>
              <td className="border border-gray-200 py-2 px-4 text-center">{problem.name}</td>
              <td className="border border-gray-200 py-2 px-4 text-center">{problem.solves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
