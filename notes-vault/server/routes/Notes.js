const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); 


router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: 'Please provide a title and content.' });
    }

    const newNote = new Note({
      title,
      content,
      tags: tags || [] // Default to empty array if tags are not provided
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {}; 

    const notes = await Note.find(filter).sort({ createdAt: -1 }); // Sort by newest first
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.patch('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json({ msg: 'Note deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;