import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../store/action";

const TaskModal = ({ boardId, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, description, boardId }));
    onClose();
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskModal;
