import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcements'
import PostComponent from '../Components/PostComponent';


function PostPage() {
    const { postId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar/>
      <div className="flex flex-1 min-h-0"> 

      
          <Announcement/>

          <PostComponent postId={postId}/>

      </div>


    </div>
  );
}

export default PostPage;
