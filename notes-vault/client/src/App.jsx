import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList.jsx';
import NoteForm from './components/NoteForm.jsx';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null); 

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/notes');
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSaveNote = async (noteData) => {
    if (noteToEdit) {
      try {
        const response = await axios.patch(`http://localhost:5000/api/v1/notes/${noteToEdit._id}`, noteData);
        setNotes(notes.map(note => note._id === noteToEdit._id ? response.data : note));
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/notes', noteData);
        setNotes([response.data, ...notes]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
    setNoteToEdit(null);
  };

  const handleDeleteNote = async (idToDelete) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/notes/${idToDelete}`);
      setNotes(notes.filter(note => note._id !== idToDelete));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
  };
  
  const handleCancelEdit = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>📝 NotesVault</h1>
      </header>
      <main>
        <NoteForm
          onSaveNote={handleSaveNote}
          noteToEdit={noteToEdit}
          onCancelEdit={handleCancelEdit}
        />
        <NoteList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditClick}
        />
      </main>
    </div>
  );
}

export default App;