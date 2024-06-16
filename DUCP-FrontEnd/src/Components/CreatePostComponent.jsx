import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreatePostComponent = ({ announcement }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const postData = {
      title: title.trim(),
      text: body.trim(),
    };

    const url = announcement
      ? 'http://103.209.199.186:5000/posts/add-announcement'
      : 'http://103.209.199.186:5000/posts/add-post';

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTitle('');
        setBody('');
        setError('');
        toast.success('Post submitted successfully!');
        // Optionally, you can handle a successful post submission here
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit post');
        toast.error(errorData.message || 'Failed to submit post');
      }
    } catch (error) {
      setError('An error occurred while submitting the post');
      toast.error('An error occurred while submitting the post');
    }
  };

  return (
    <div className="w-2/3 bg-white p-4 flex flex-col">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h2 className="font-bold text-2xl mb-4">{announcement ? 'Create Announcement' : 'Create Post'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            className="w-full p-2 border rounded"
            rows="4"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded" type="submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePostComponent;
