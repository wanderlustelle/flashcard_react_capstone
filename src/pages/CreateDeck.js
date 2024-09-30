import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/* ===========================
   | Routing Hook Usage       |
   =========================== */
// Using useNavigate instead of useHistory due to React Router v6 changes.
// useHistory is no longer available in v6, and useNavigate is the recommended replacement.
// This change resolves compatibility issues with newer versions of React Router.
import { createDeck } from '../utils/api';

/* ===========================
   | Create Deck Component    |
   =========================== */
function CreateDeck() {
  const navigate = useNavigate();
  const [newDeck, setNewDeck] = useState({ name: '', description: '' });

  /* ===========================
     | Event Handlers           |
     =========================== */
  const handleChange = (event) => {
    setNewDeck({
      ...newDeck,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdDeck = await createDeck(newDeck);
      navigate(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  /* ===========================
     | Component Rendering      |
     =========================== */
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newDeck.name}
            onChange={handleChange}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newDeck.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
            required
          />
        </div>
        <Link to="/" className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;