import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBoard, updateBoard } from "../../store/action";
import TaskModal from "../Tasks/TaskModal";
import TaskList from "../Tasks/TaskList";
import { MdDelete } from "react-icons/md";
import "./Board.scss";

const BoardCard = ({ board }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);

  const handleDelete = () => {
    dispatch(deleteBoard(board._id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (newTitle.trim()) {
      dispatch(updateBoard(board._id, { title: newTitle.trim() }));
    }
    setIsEditing(false);
  };

  return (
    <div className="board-card">
      <div className="board-card__action">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
            className="input-card__title-input"
          />
        ) : (
          <h3 className="board-card__title" onClick={handleTitleClick}>
            {board.title}
          </h3>
        )}
        <button onClick={handleDelete} className="board-card__delete-button">
          <MdDelete />
        </button>
      </div>

      <TaskList boardId={board._id} />

      {isModalOpen && (
        <TaskModal boardId={board._id} onClose={handleCloseModal} />
      )}
      <button onClick={handleOpenModal} className="board-card__add-task-button">
        Add Task
      </button>
    </div>
  );
};

export default BoardCard;
