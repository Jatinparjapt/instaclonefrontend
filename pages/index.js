// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '@/components/Post';
import io from 'socket.io-client';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://instaclonebackend-kxjd.onrender.com/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();

    const socket = io('https://instaclonebackend-kxjd.onrender.com');
    socket.on('new-post', (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    return () => {
      socket.off('new-post');
    };
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
