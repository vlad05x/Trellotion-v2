import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBoard } from "../../store/action";
import BoardCard from "./BoardCard";

const BoardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards } = useSelector((state) => state.boards);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(getBoard());
  }, [dispatch, token, navigate]);

  if (!token) return null;

  return (
    <div className="board-list">
      {boards && boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard key={board._id} board={board} /> 
        ))
      ) : (
        <p>No boards available</p>
      )}
    </div>
  );
};

export default BoardList;
