import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Ensure uploads directory exists
fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// In-memory data store (replace with a database in a production environment)
let posts = [];

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Create a new post
app.post('/api/posts', upload.single('media'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      author: 'Anonymous', // Replace with actual user authentication
      date: new Date().toISOString(),
      likes: 0,
      replies: 0,
    };

    if (req.file) {
      newPost.media = `/uploads/${req.file.filename}`;
    }

    posts.unshift(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
    res.json({ likes: post.likes });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Serve static files from the React app
app.use(express.static(join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});