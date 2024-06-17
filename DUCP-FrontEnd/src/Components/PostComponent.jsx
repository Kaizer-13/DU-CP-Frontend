import React, { useState, useEffect } from 'react';
import profile from '../Resources/default_dp.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostComponent = ({ postId, isPost }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://103.209.199.186:5000/posts/post/${postId}`);
        const postData = await response.json();
        console.log(postData);
        setPost({
          username: postData.poster, // Replace with actual user data if available
          profile: profile,
          topic: postData.title,
          details: postData.text,
          timestamp: new Date(postData.created_at).toLocaleString(),
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`http://103.209.199.186:5000/posts/announcement`);
        const postData = await response.json();
        const filteredPost = postData.find((announcement) => announcement.id === Number(postId));
        if (filteredPost) {
          setPost({
            username: filteredPost.poster,
            profile: profile,
            topic: filteredPost.title,
            details: filteredPost.text,
            timestamp: new Date(filteredPost.created_at).toLocaleString(),
          });
        } else {
          console.log(`No announcement found with ID: ${postId}`);
          toast.error('Announcement not found');
        }
      } catch (error) {
        console.error('Error fetching announcement:', error);
        toast.error(error);
      }
    };    const fetchComments = async () => {
      try {
        const response = await fetch(`http://103.209.199.186:5000/posts/post/${postId}/comments`);
        const commentsData = await response.json();
        setComments(commentsData.map(comment => ({
          username: "Commenter", // Replace with actual commenter data if available
          profile: profile,
          details: comment.text,
          timestamp: new Date(comment.created_at).toLocaleString(),
        })));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    if(isPost){
      fetchPost();
      fetchComments();
    } else {
      fetchAnnouncement();
    }
  }, [postId, isPost]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const token = localStorage.getItem('access_token'); // Replace with your actual JWT token

    try {
      const response = await fetch(`http://103.209.199.186:5000/posts/post/${postId}/add-comment`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newComment })
      });

      if (!response.ok) {
        toast.error('Error submitting comment');
        throw new Error('Error submitting comment');
      }

      const newCommentData = await response.json();

      setComments([...comments, {
        username: "Current User", // Replace with actual current user data if available
        profile: profile, // Replace with actual current user profile picture if available
        details: newCommentData.text,
        timestamp: new Date(newCommentData.created_at).toLocaleString(),
      }]);
      toast.success('Comment submitted successfully');
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="w-2/3 bg-white p-4 overflow-auto">
       <ToastContainer />
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
      {(isPost)?(
        <>
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
          <button className="bg-yellow text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-dark-yellow focus:outline-none focus:ring-2 focus:ring-blue-400" type="submit">Submit Comment</button>
        </form>
      </div>
    </>
      ):(
        <></>
      )}
    </div> 
  );
};

export default PostComponent;
