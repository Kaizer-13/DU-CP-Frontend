import React from 'react';
import Navbar from '../Components/Navbar';
import Table from '../Components/Table';

const contestColumns = [
  { Header: 'Contest ID', accessor: 'contestid' },
  { Header: 'Title', accessor: 'title' },
  { Header: 'Begin Time', accessor: 'BeginTime' },
  { Header: 'Duration', accessor: 'duration' },
];

const contestData = [
  { contestid: 1, title: 'Evaluation', BeginTime: '2023-06-01 10:00', duration: '5h' },
  { contestid: 2, title: 'Lab exam', BeginTime: '2023-09-15 14:00', duration: '4h' },
  { contestid: 3, title: '26 er hogamara', BeginTime: '2023-12-10 09:00', duration: '5h' },
];

function Contests() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
        <div className="flex justify-end space-x-8">
          <a href="#create-contest" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Create a Contest
          </a>
          <a href="#codeforces-rating" className="underline text-gray-500 hover:text-dark-blue font-bold">
            Codeforces Rating
          </a>
        </div>
        <Table
          title="Contests"
          subtitle="Contests held in recent months"
          columns={contestColumns}
          data={contestData}
        />
      </div>
    </div>
  );
}

export default Contests;
