import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

const ProblemTable = ({ problems, onProblemClick }) => {
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
              {problem.number}
              </td>
              <td className="border border-gray-200 py-2 px-4 text-center"><Link
              to={`/contests/${contestId}/problem/${problem.id}`}
              className="text-blue-500 hover:underline"
              onClick={() => onProblemClick(problem.id)}
            > {problem.name}
            </Link></td>
              <td className="border border-gray-200 py-2 px-4 text-center">{problem.solves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProblemTable.propTypes = {
  problems: PropTypes.array.isRequired,
  onProblemClick: PropTypes.func.isRequired,
};

export default ProblemTable;
