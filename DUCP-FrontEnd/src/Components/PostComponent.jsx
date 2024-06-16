import React, { useState, useEffect } from 'react';
import profile from '../Resources/default_dp.png';

const PostComponent = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      // Dummy post data
      const postData = {
        username: "Sample User",
        profile: profile,
        topic: "Sample Topic",
        details: "This is the main content of the post. It can be quite detailed and lengthy.",
        timestamp: "12:00 pm, 15 June 2024",
      };
      setPost(postData);
    };

    // Simulate API call for comments data
    const fetchComments = async () => {
      // Dummy comments data
      const commentsData = [
        {
          username: "Commenter One",
          profile: profile,
          details: "This is a sample comment.",
          timestamp: "12:15 pm, 15 June 2024",
        },
        {
          username: "Commenter Two",
          profile: profile,
          details: "Another sample comment.",
          timestamp: "12:30 pm, 15 June 2024",
        },
        {
          username: "Commenter Three",
          profile: profile,
          details: "Yet another sample comment.",
          timestamp: "12:45 pm, 15 June 2024",
        },
      ];
      setComments(commentsData);
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentData = {
      username: "Current User", // Change this to the current logged-in user's name
      profile: profile, // Change this to the current logged-in user's profile picture
      details: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, newCommentData]);
    setNewComment('');
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="w-2/3 bg-white p-4 overflow-auto">
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img src={post.profile} alt="User profile" className="h-12 w-12 rounded-full" />
            <div>
              <h3 className="font-bold text-xl">{post.username}</h3>
              <p className="text-sm text-gray-600">{post.timestamp}</p>
            </div>
          </div>
        </div>
        <h2 className="font-bold text-2xl mb-4">{post.topic}</h2>
        <p className="text-gray-800">{post.details}</p>
      </div>

      <div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-4">
                <img src={comment.profile} alt="User profile" className="h-8 w-8 rounded-full" />
                <div>
                  <h4 className="font-bold text-lg">{comment.username}</h4>
                  <p className="text-sm text-gray-600">{comment.timestamp}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-800">{comment.details}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button className="p-2 bg-blue-500 text-white rounded" type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostComponent;
