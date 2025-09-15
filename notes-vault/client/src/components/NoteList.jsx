import NoteCard from './NoteCard.jsx';

function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDeleteNote}
          onEdit={onEditNote} 
        />
      ))}
    </div>
  );
}

export default NoteList;