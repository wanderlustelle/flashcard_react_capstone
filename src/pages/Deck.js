import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

/* ===========================
   | Routing Hook Usage       |
   =========================== */
// Using useNavigate instead of useHistory due to React Router v6 changes.
// useHistory is no longer available in v6, and useNavigate is the recommended replacement.
// This change resolves compatibility issues with newer versions of React Router.
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

/* ===========================
   | Deck Component           |
   =========================== */
// Route: /decks/:deckId
function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

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
     | Delete Deck Functionality|
     =========================== */
  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        navigate('/');
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  /* ===========================
     | Delete Card Functionality|
     =========================== */
  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
      try {
        await deleteCard(cardId);
        setDeck({
          ...deck,
          cards: deck.cards.filter(card => card.id !== cardId)
        });
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  /* ===========================
     | Loading State            |
     =========================== */
  if (!deck) {
    return <p>Loading...</p>;
  }

  /* ===========================
     | Component Rendering      |
     =========================== */
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="mb-4">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          ✏️ Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          📚 Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
          ➕ Add Cards
        </Link>
        <button onClick={handleDeleteDeck} className="btn btn-danger float-right">
          🗑️ Delete
        </button>
      </div>
      <h3>Cards</h3>
      {deck.cards.map(card => (
        <div key={card.id} className="card mb-2">
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-6">
                <p>{card.front}</p>
              </div>
              <div className="col-6">
                <p>{card.back}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                  ✏️ Edit
                </Link>
                <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;