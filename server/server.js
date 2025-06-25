const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesapp');

const Note = mongoose.model('Note', {
    title: String,
    content: String,
});

app.get ('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const note =new Note(req.body);
    await note.save();
    res.status(201).json(note);
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(5000, () => console.log(`Server started on http://localhost:5000`));