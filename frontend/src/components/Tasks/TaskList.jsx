import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, updateTaskOrder } from "../../store/action";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./TaskStyles.scss";

const TaskList = ({ boardId }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const boardTasks = tasks.filter((task) => task.boardId === boardId);

  useEffect(() => {
    dispatch(getTasks(boardId));
  }, [dispatch, boardId]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const updatedTasks = Array.from(boardTasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    dispatch(updateTaskOrder(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`task-list-${boardId}`} direction="horizontal">
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardTasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
              boardTasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
