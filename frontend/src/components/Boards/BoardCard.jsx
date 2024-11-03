import React from "react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../store/action";
import { MdDelete } from "react-icons/md";
import "./Board.scss";

const BoardCard = ({ board }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBoard(board._id));
  };

  return (
    <div className="board-card">
      <div className="board-card__action">
        <h3 className="board-card__title">{board.title}</h3>
        <button onClick={handleDelete} className="board-card__delete-button">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
