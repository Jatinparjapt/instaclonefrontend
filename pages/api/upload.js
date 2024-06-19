// pages/api/upload.js
import axios from 'axios';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { photo, description } = req.body;
    try {
      const response = await axios.post('https://instaclonebackend-kxjd.onrender.com/api/upload', { photo, description });
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload photo' });
    }
  }
}
