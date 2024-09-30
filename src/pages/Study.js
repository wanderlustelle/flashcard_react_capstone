import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';

/* ===========================
   | Routing Hook Usage       |
   =========================== */
// Using useNavigate instead of useHistory due to React Router v6 changes.
// useHistory is no longer available in v6, and useNavigate is the recommended replacement.
// This change resolves compatibility issues with newer versions of React Router.
function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
     | Card Navigation          |
     =========================== */
  const flipCard = () => setIsFlipped(!isFlipped);

  const nextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      const restartConfirmed = window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      if (restartConfirmed) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  /* ===========================
     | Component Rendering      |
     =========================== */
  if (!deck) {
    return <p>Loading...</p>;
  }

  if (deck.cards.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          + Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <button onClick={flipCard} className="btn btn-secondary mr-2">
            Flip
          </button>
          {isFlipped && (
            <button onClick={nextCard} className="btn btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;