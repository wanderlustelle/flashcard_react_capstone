import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../pages/Home";
import Study from "../pages/Study";
import CreateDeck from "../pages/CreateDeck";
import Deck from "../pages/Deck";
import EditDeck from "../pages/EditDeck";
import AddCard from "../pages/AddCard";
import EditCard from "../pages/EditCard";

/* ===========================
   | Layout Component         |
   =========================== */
function Layout() {
  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content Container */}
      <div className="container">
        {/* ===========================
            | Route Definitions        |
            =========================== */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Create Deck Route */}
          <Route path="/decks/new" element={<CreateDeck />} />

          {/* View Deck Route */}
          <Route path="/decks/:deckId" element={<Deck />} />

          {/* Study Deck Route */}
          <Route path="/decks/:deckId/study" element={<Study />} />

          {/* Edit Deck Route */}
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />

          {/* Add Card Route */}
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />

          {/* Edit Card Route */}
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
