import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/action";
import TaskCard from "./TaskCard";
import "./TaskStyles.scss";

const TaskList = ({ boardId }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  
  // Фильтруем задачи только для текущей доски
  const boardTasks = tasks.filter(task => task.boardId === boardId);

  useEffect(() => {
    dispatch(getTasks(boardId));
  }, [dispatch, boardId]);

  return (
    <div className="task-list">
      {boardTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        boardTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;