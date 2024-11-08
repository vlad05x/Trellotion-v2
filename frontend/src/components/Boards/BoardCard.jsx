import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../store/action";
import TaskModal from "../Tasks/TaskModal";
import TaskList from "../Tasks/TaskList";
import { MdDelete } from "react-icons/md";
import "./Board.scss";

const BoardCard = ({ board }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    console.log(board)
    dispatch(deleteBoard(board._id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="board-card">
      <div className="board-card__action">
        <h3 className="board-card__title">{board.title}</h3>
        <button onClick={handleDelete} className="board-card__delete-button">
          <MdDelete />
        </button>
        <button
          onClick={handleOpenModal}
          className="board-card__add-task-button"
        >
          Add Task
        </button>
      </div>

      <TaskList boardId={board._id} />

      {isModalOpen && (
        <TaskModal boardId={board._id} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default BoardCard;
