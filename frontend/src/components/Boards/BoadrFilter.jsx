import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { filterBoards } from "../../store/action";

const BoardFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterBoards(startDate, endDate));
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleFilter} className="filter-form">
          <h2>Filter boards by date of addition</h2>

          <label>
            Start date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="date-input"
            />
          </label>

          <label>
            End date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="date-input"
            />
          </label>

          <button type="submit" className="button">
            Filter
          </button>
          <button
            type="button"
            className="popup-modal__close-button"
            onClick={handleModalClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={handleModalOpen} className="board-card__add-task-button">
        Filter boards
      </button>

      {isModalOpen &&
        ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default BoardFilter;
