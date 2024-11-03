import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/action";
import "./Board.scss";

const CreateBoardModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBoard({ title }));
    closeModal();
  };

  return (
    <div className="create-board-modal">
      <form onSubmit={handleSubmit} className="create-board-modal__form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board Title"
          required
          className="create-board-modal__form__input"
        />
        <button
          type="submit"
          className="create-board-modal__form__submit-button"
        >
          Create Board
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="create-board-modal__form__cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBoardModal;
