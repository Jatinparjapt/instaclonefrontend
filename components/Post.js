// components/Post.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';

const socket = io('https://instaclonebackend-kxjd.onrender.com');

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    socket.on('update-like', (updatedPost) => {
      if (updatedPost._id === post._id) {
        setLikes(updatedPost.likes);
      }
    });

    socket.on('update-comment', (updatedPost) => {
      if (updatedPost._id === post._id) {
        setComments(updatedPost.comments);
      }
    });

    return () => {
      socket.off('update-like');
      socket.off('update-comment');
    };
  }, [post._id]);

  const handleLike = async () => {
    try {
      await axios.post(`https://instaclonebackend-kxjd.onrender.com/api/posts/${post._id}/like`);
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
    if (commentText) {
      try {
        await axios.post(`https://instaclonebackend-kxjd.onrender.com/api/posts/${post._id}/comment`, { comment: commentText });
        event.target.comment.value = '';
      } catch (error) {
        console.error('Error adding comment', error);
      }
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`https://instaclonebackend-kxjd.onrender.com${post.imageUrl}`} // Ensure correct URL
        alt="post photo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Button onClick={handleLike}>Like {likes}</Button>
        <form onSubmit={handleComment}>
          <TextField name="comment" label="Add a comment" fullWidth />
        </form>
        <Typography variant="body2" color="text.secondary">
          Comments:
          {comments.map((comment) => (
            <p key={comment._id}>{comment}</p>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
