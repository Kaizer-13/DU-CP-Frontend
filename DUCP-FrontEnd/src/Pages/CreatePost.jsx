import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcements'
import CreatePostComponent from '../Components/CreatePostComponent';


function CreatePost({announcement}) {
    const { postId } = useParams();
    console.log(postId);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar/>
      <div className="flex flex-1 min-h-0"> 

      
          <Announcement/>

          <CreatePostComponent announcement={announcement}/>

      </div>


    </div>
  );
}

export default CreatePost;
