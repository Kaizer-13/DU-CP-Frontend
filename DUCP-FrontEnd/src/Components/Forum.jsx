import React, { useState, useEffect } from 'react';
import profile from '../Resources/default_dp.png';
import { Link } from 'react-router-dom';

function ForumComponent() {
  const defaultPosts = [
    { username: "Default User", profile: profile, topic: "Default Topic", details: "This is a default post because the API fetch failed or returned empty.", timestamp: "4:20 am, 1 January 2024" },
    { username: "Another User", profile: profile, topic: "Another Topic", details: "Another default post for demonstration purposes.", timestamp: "5:15 am, 2 January 2024" }
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://103.209.199.186:5000/posts/');
        const data = await response.json();
        if (data && data.length > 0) {
          const transformedPosts = data.map(post => ({
            username: post.poster,
            profile: profile,
            topic: post.title,
            details: post.text,
            timestamp: new Date(post.created_at).toLocaleString(),
            id: post.id,
          }));
          setPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts(defaultPosts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-2/3 bg-white p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-3xl">Forum</h2>
        <Link to="/create-post">
          <button className="bg-yellow text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-dark-yellow focus:outline-none focus:ring-2 focus:ring-blue-400">Create Post</button>
        </Link>
      </div>
      {posts.map((post, index) => (
        <Link to={`/posts/${post.id}`} key={index}>
          <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <img src={post.profile} alt="User profile" className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg">{post.username}</h3>
                  <p className="text-sm text-gray-600">{post.topic}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <button className="text-gray-400 hover:text-dark-blue flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-dark-blue flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V2.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-dark-blue flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 01-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.75 2.25 2.25 0 009.75 22a.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54" />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ForumComponent;

