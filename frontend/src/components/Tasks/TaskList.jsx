import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/action";
import TaskCard from "./TaskCard";

const TaskList = ({ boardId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks for board:", boardId); 
      await dispatch(getTasks(boardId));
    };

    fetchTasks();
  }, [dispatch, boardId]);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};


export default TaskList;