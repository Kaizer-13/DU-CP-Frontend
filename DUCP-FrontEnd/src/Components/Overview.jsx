import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
);

const Overview = ({ role }) => {
  // Dummy data for solve counts
  const solveCountsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Solve Counts',
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dummy data for participation in contests
  const participationData = {
    labels: ['Contest 1', 'Contest 2', 'Contest 3', 'Contest 4', 'Contest 5'],
    datasets: [
      {
        label: 'Participation',
        data: [2, 3, 2, 1, 4],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-center mb-2">Solve Counts</h3>
          <div className="h-64 bg-gray-200 rounded-lg p-4">
            <Bar data={solveCountsData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-center mb-2">Participation in Contests</h3>
          <div className="h-64 bg-gray-200 rounded-lg p-4">
            <Line data={participationData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between text-gray-600">
          <div>Status: <span className="font-semibold text-gray-700">{role}</span></div>
          
        </div>
      </div>
    </div>
  );
};

export default Overview;
