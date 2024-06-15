import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';
import axios from 'axios';

const ProblemComponent = ({ problemId, timestamps }) => {
  const [pdfContent, setPdfContent] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.get(`http://103.209.199.186:5000/contestant/problem/${problemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        });

        // Convert ArrayBuffer to base64 string
        const base64Pdf = arrayBufferToBase64(response.data);
        const pdfDataUri = `data:application/pdf;base64,${base64Pdf}`;
        console.log('PDF Data URI:', pdfDataUri);
        setPdfContent(pdfDataUri);
      } catch (error) {
        console.error('Error fetching problem data:', error);
        setError(error.message);
      }
    };

    fetchProblemData();
  }, [problemId]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        `http://103.209.199.186:5000/contestant/upload_file?problem_id=${problemId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUploadStatus('File uploaded successfully.');
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file.');
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4">
        {error ? (
          <div>Error: {error}</div>
        ) : pdfContent ? (
          <iframe src={pdfContent} className="w-full h-full border" title="PDF Viewer" />
        ) : (
          <div>Loading PDF...</div>
        )}
      </div>
      <div className="w-1/3 p-4 border-l">
        <div className="mb-4">
          <label className="block mb-2">Upload File:</label>
          <input type="file" className="w-full p-2 border rounded mb-4" onChange={handleFileChange} />
          <label className="block mb-2">Select File Type:</label>
          <select className="w-full p-2 border rounded mb-4">
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="java">Java</option>
          </select>
          <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Submit</button>
        </div>
        <ul className="list-none">
          {timestamps.map((item, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="mr-2">{item.time}</span>
              {item.status === 'check' && <AiOutlineCheck className="text-green-500" />}
              {item.status === 'close' && <AiOutlineClose className="text-red-500" />}
              {item.status === 'minus' && <AiOutlineMinus className="text-gray-500" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemComponent;
