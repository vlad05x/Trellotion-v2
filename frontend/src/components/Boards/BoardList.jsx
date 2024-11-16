import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBoard, updateBoardOrder } from "../../store/action";
import BoardCard from "./BoardCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const updatedBoards = Array.from(boards);
    const [movedBoard] = updatedBoards.splice(source.index, 1);
    updatedBoards.splice(destination.index, 0, movedBoard);

    dispatch(updateBoardOrder(updatedBoards)); 
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board-list" direction="horizontal">
        {(provided) => (
          <div
            className="board-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boards && boards.length > 0 ? (
              boards.map((board, index) => (
                <Draggable
                  key={board._id}
                  draggableId={board._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BoardCard board={board} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p>No boards available</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardList;
