import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';

function Home() {
  /* ===========================
     | State Management         |
     =========================== */
  const [decks, setDecks] = useState([]);

  /* ===========================
     | Data Fetching            |
     =========================== */
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await listDecks();
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  /* ===========================
     | Delete Deck Functionality|
     =========================== */
  const handleDelete = async (deckId) => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter(deck => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  /* ===========================
     | Component Rendering      |
     =========================== */
  return (
    <div className="container">
      {/* Create Deck Button */}
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        + Create Deck
      </Link>

      {/* Deck List Rendering */}
      {decks.map(deck => (
        <div key={deck.id} className="card mb-1">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              <small className="text-muted">{deck.cards.length} cards</small>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="mt-2 d-flex justify-content-between">
              <div>
                {/* View and Study Buttons */}
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                  👁️ View
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                  📚 Study
                </Link>
              </div>
              {/* Delete Button */}
              <button onClick={() => handleDelete(deck.id)} className="btn btn-danger">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;