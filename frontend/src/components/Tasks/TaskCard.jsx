import React from "react";
import "./TaskStyles.scss";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
    </div>
  );
};

export default TaskCard;
