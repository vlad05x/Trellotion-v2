import React, { useState } from "react";
import ReactDOM from "react-dom"; // Добавьте импорт ReactDOM
import { useDispatch } from "react-redux";
import { filterTasks } from "../../store/action";

const TaskFilter = () => {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterTasks({ status, startDate, endDate }));
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
          <h2>Task Filter</h2>

          <label>
            Task Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select-input"
            >
              <option value="">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
      <button
        onClick={handleModalOpen}
        className="board-card__add-task-button filter-button"
      >
        Filter Tasks
      </button>

      {isModalOpen &&
        ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default TaskFilter;
