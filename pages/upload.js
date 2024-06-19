// pages/upload.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Upload = () => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', photo); // Correct key here
    formData.append('description', description);

    try {
      await axios.post('https://instaclonebackend-kxjd.onrender.com/api/posts', formData);
      // Handle success if needed
    } catch (error) {
      console.error("Error uploading post", error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <TextField
        type="file"
        onChange={handlePhotoChange}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
      />
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default Upload;
