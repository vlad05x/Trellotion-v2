import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../store/action";
import "./TaskStyles.scss";

const TaskModal = ({ boardId, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const success = await dispatch(
      createTask({
        title: title.trim(),
        description: description.trim(),
        boardId,
      })
    );

    if (success) {
      onClose();
    }
  };

  return (
    <div className="task-modal">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="task-textarea"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="task-button" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskModal;