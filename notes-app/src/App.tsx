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
    console.log("title: ", title);
    console.log("content: ", content);


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

  return (
    <div className="AppContainer">
      <form className="note-form" onSubmit={handleAddNote}>
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

        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" key={note.id}>
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