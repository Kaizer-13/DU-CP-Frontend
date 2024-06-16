import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ProblemComponent from '../Components/ProblemComponent';
import axios from 'axios';

const ProblemPage = () => {
  const { problemId } = useParams();
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        // Use the provided endpoint which includes only problem_id in the URL
        const url = `http://103.209.199.186:5000/contestant/submissions/me/${problemId}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const submissions = response.data;

        // Map to the format expected by ProblemComponent
        const mappedSubmissions = submissions.map(submission => ({
          time: submission.updated_at, // or created_at, depending on which is relevant
          status: submission.verdict
        }));
        setTimestamps(mappedSubmissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col p-4 mr-12 ml-12 space-y-4">
        <ProblemComponent problemId={problemId} timestamps={timestamps} />
      </div>
    </div>
  );
};

export default ProblemPage;
