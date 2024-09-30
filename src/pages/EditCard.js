import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

/* ===========================
   | Edit Card Component      |
   =========================== */
function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: '', description: '' });
  const [card, setCard] = useState({ front: '', back: '' });

  /* ===========================
     | Data Fetching            |
     =========================== */
  useEffect(() => {
    const loadDeckAndCard = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
      } catch (error) {
        console.error("Error loading deck or card:", error);
      }
    };
    loadDeckAndCard();
  }, [deckId, cardId]);

  /* ===========================
     | Event Handlers           |
     =========================== */
  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard(card);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
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
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;