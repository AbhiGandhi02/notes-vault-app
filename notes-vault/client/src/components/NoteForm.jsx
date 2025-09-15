import { useState, useEffect } from 'react';

function NoteForm({ onSaveNote, noteToEdit, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setTags(noteToEdit.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please provide a title and content.');
      return;
    }
    const noteData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSaveNote(noteData);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{noteToEdit ? 'Edit Note' : 'Create a New Note'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma, separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
        {noteToEdit && <button type="button" className="cancel-btn" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}

export default NoteForm;