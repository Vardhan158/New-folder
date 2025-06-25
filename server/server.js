const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Note Schema
const Note = mongoose.model('Note', {
  title: String,
  content: String,
});

// Routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
