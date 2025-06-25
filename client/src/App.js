import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional if you want additional custom styling

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await axios.get('https://new-folder-w6ck.onrender.com/notes');
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!form.title || !form.content) return alert("Please fill all fields.");
    await axios.post('https://new-folder-w6ck.onrender.com/notes', form);
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://new-folder-w6ck.onrender.com/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📝 Notes App</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Content"
            rows="3"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <button className="btn btn-primary w-100" onClick={addNote}>
            Add Note
          </button>
        </div>

        <ul className="list-group">
          {notes.map((note) => (
            <li key={note._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{note.title}</strong>
                <div className="text-muted small">{note.content}</div>
              </div>
              <button className="btn btn-sm btn-danger" onClick={() => deleteNote(note._id)}>
                Delete
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android" viewBox="0 0 16 16">
  <path d="M2.76 3.061a.5.5 0 0 1 .679.2l1.283 2.352A8.9 8.9 0 0 1 8 5a8.9 8.9 0 0 1 3.278.613l1.283-2.352a.5.5 0 1 1 .878.478l-1.252 2.295C14.475 7.266 16 9.477 16 12H0c0-2.523 1.525-4.734 3.813-5.966L2.56 3.74a.5.5 0 0 1 .2-.678ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
