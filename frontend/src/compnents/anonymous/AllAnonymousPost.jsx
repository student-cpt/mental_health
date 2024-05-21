import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

const AllAnonymousPost = () => {
  const [anonymousPosts, setAnonymousPosts] = useState([]);

  useEffect(() => {
    const fetchAnonymousPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/anonymousPosts');
        setAnonymousPosts(response.data);
      } catch (error) {
        console.error('Error fetching anonymous posts:', error);
      }
    };
    fetchAnonymousPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 mt-24">
        <h1 className="text-3xl font-bold mb-6 ">All Anonymous Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anonymousPosts.map(post => (
            <div key={post._id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.article}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500">Tags:</span>
                  <ul className="ml-2">
                    {post.tags.map((tag, index) => (
                      <li key={index} className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-sm mr-2">{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAnonymousPost;
