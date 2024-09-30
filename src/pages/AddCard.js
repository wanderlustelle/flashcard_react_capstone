import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
/* ===========================
   | Routing Hook Usage       |
   =========================== */
// Using useNavigate instead of useHistory due to React Router v6 changes.
// useHistory is no longer available in v6, and useNavigate is the recommended replacement.
// This change resolves compatibility issues with newer versions of React Router.
import { readDeck, createCard } from '../utils/api';
import CardForm from '../components/CardForm';

/* ===========================
   | Add Card Component       |
   =========================== */
function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: '', description: '' });
  const [newCard, setNewCard] = useState({ front: '', back: '' });

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
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, newCard);
      setNewCard({ front: '', back: '' }); // Clear the form
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleDone = () => navigate(`/decks/${deckId}`);

  /* ===========================
     | Component Rendering      |
     =========================== */
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={newCard.front}
            onChange={handleChange}
            placeholder="Front side of card"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={newCard.back}
            onChange={handleChange}
            placeholder="Back side of card"
            required
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;