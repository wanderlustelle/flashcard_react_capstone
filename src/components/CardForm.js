import React from 'react';

/* ===========================
   | Card Form Component      |
   =========================== */
function CardForm({ card, handleChange, handleSubmit, handleDone }) {
  return (
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
      <button type="submit" className="btn btn-primary mr-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={handleDone}>Done</button>
    </form>
  );
}

export default CardForm;