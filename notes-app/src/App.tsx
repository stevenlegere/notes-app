import "./App.css";
import { useState } from "react";

// Define the Note type
type Note = {
  id: number;
  title: string;
  content: string;
};

// Create UI for the app

const App = () => {

    // Track selected note the user has clicked on
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // dummy data array for notes with id, title and content

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "hello note 1",
    },
    {
      id: 2,
      title: "test note 2",
      content: "hello note 2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "hello note 3",
    },
    {
      id: 4,
      title: "test note 4",
      content: "hello note 4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "hello note 5",
    },
  ]);

  // useState for form input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle form submission
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();


  // Function to create a new note
  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  // Update the state by adding the new note to the beginning of the notes array
  setNotes([newNote, ...notes]);

  // Cleat the form inputs
  setTitle("");
  setContent("");
};

// Create the click handler that takes a note as an argument
const handleNoteClick = (note: Note) => {
  setSelectedNote(note);
  setTitle(note.title);
  setContent(note.content);
};

// Create a function that allows user to edit a note
const handleUpdateNote = (event: React.FormEvent) => {
  event.preventDefault();

  if (!selectedNote) {
    return;
  }

  const updatedNote: Note = {
    id: selectedNote.id,
    title: title,
    content: content,
  };

  const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

  setNotes(updatedNotesList);
  setTitle("");
  setContent("");
  setSelectedNote(null);
};

// Implement a function to allow the user the reset the form and selected note 
const handleCancel = () => {
  setTitle("");
  setContent("");
  setSelectedNote(null)
};

  return (
    <div className="AppContainer">
      <form className="note-form" 
      onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
         {/* Bind the input values to the state variables */}
        <input value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required />
            {/* Bind the input values to the state variables */}
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required />

          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (

        <button type="submit">Add Note</button>
          )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;