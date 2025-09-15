
function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="tags-container">
        {note.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="card-actions">
      <button onClick={() => onEdit(note)}>Edit</button>
        <button
          className="delete-btn"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;