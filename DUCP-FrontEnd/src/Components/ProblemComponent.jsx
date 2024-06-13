import React from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';

const ProblemComponent = ({ pdfPath, timestamps }) => {
  return (
    <div className="flex h-screen">
      {/* Left Side: PDF Viewer */}
      <div className="w-2/3 p-4">
        <iframe src={pdfPath} className="w-full h-full border" title="PDF Viewer" />
      </div>

      {/* Right Side: File Upload and List */}
      <div className="w-1/3 p-4 border-l">
        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-2">Upload File:</label>
          <input type="file" className="w-full p-2 border rounded mb-4" />

          <label className="block mb-2">Select File Type:</label>
          <select className="w-full p-2 border rounded mb-4">
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="java">Java</option>
          </select>

          <button className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
        </div>

        {/* Timestamps List */}
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
