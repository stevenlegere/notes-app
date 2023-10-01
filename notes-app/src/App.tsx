import "./App.css";
import { useState, useEffect } from "react";

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
    // {
    //   id: 1,
    //   title: "test note 1",
    //   content: "hello note 1",
    // },
    // {
    //   id: 2,
    //   title: "test note 2",
    //   content: "hello note 2",
    // },
    // {
    //   id: 3,
    //   title: "test note 3",
    //   content: "hello note 3",
    // },
    // {
    //   id: 4,
    //   title: "test note 4",
    //   content: "hello note 4",
    // },
    // {
    //   id: 5,
    //   title: "test note 5",
    //   content: "hello note 5",
    // },
  ]);

  // useEffect to fetch notes from postgreSQL database
  useEffect(() => {
    // Create an async function that fetches the notes from the database
    const fetchNotes = async () => {
      // try catch block to handle errors
      try {
        const response = await fetch(
          "http://localhost:5001/api/notes"
        );
        const notes: Note[] = await response.json(); // process the response and convert it to JSON
        setNotes(notes); // update the state with the notes from the database
      } catch (e) {
        console.log(e);
      }
    }
    fetchNotes(); // call (invoke) the function
  }, []); // pass an empty array as the second argument to useEffect to ensure that the effect is only run once

  // useState for form input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle form submission
  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();


    // Function to create a new note
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    // Create a new note in the database
    // Add a try catch block to handle errors
    try {

          // Create a new note in the database
    const response = await fetch(
      "http://localhost:5001/api/notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );

    // Process the response and convert it to JSON
    const note = await response.json();
    
      // Update the state by adding the new note to the beginning of the notes array
      setNotes([newNote, ...notes]);
      // Cleat the form inputs
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
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

  // Implement a function to delete a note
  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
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
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
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