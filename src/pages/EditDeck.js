import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

/* ===========================
   | Routing Hook Usage       |
   =========================== */
// Using useNavigate instead of useHistory due to React Router v6 changes.
// useHistory is no longer available in v6, and useNavigate is the recommended replacement.
// This change resolves compatibility issues with newer versions of React Router.

/* ===========================
   | Edit Deck Component      |
   =========================== */
function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: '', description: '' });

  /* ===========================
     | Data Fetching            |
     =========================== */
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };
    loadDeck();
  }, [deckId]);

  /* ===========================
     | Event Handlers           |
     =========================== */
  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDeck(deck);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
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
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;