import React, { useState } from "react";
import "./TaskStyles.scss";
import { deleteTask, updateTaskStatus, updateTask } from "../../store/action";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleStatusChange = (newStatus) => {
    dispatch(updateTaskStatus(task._id, newStatus));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSaveChanges = () => {
    if (newTitle.trim() || newDescription.trim()) {
      dispatch(
        updateTask(task._id, {
          title: newTitle.trim(),
          description: newDescription.trim(),
        })
      );
    }
    setIsEditing(false);
  };

  return (
    <div className="task-card" onClick={handleTaskClick}>
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        <button className="delete-button del_task" onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>

      {isModalOpen && (
        <div className="popup-modal" onClick={handleCloseModal}>
          <div
            className="popup-modal__body"
            onClick={(e) => e.stopPropagation()}
          >
            {isEditing ? (
              <div className="input__content">
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  autoFocus
                  className="input-card__title-input"
                  style={{ margin: "10px 0" }}
                />
                <textarea
                  value={newDescription}
                  onChange={handleDescriptionChange}
                  className="input-card__title-input"
                  style={{ margin: "10px 0" }}
                  placeholder="Enter description"
                />
                <button
                  className="popup-modal__save-button"
                  onClick={handleSaveChanges}
                >
                  <FaSave />
                </button>
              </div>
            ) : (
              <>
                <h3 className="popup-modal__title">{task.title}</h3>
                <h3 className="popup-modal__subtitle">Description:</h3>
                <p className="popup-modal__description">{task.description}</p>
                <button
                  onClick={handleEditTask}
                  className="popup-modal__edit-button"
                >
                  <MdEdit />
                </button>
              </>
            )}
            <h3 className="popup-modal__subtitle">
              Status: <span className="box_status">{task.status}</span>
            </h3>
            <div className="popup-modal__status-buttons">
              {["To Do", "In Progress", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="popup-modal__status-button"
                >
                  {status}
                </button>
              ))}
            </div>
            <h3 className="popup-modal__subtitle">
              <FaRegCalendarAlt
                style={{
                  marginRight: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              />{" "}
              Date added:{" "}
              <span style={{ color: "#e0e0e0", marginLeft: "10px" }}>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </h3>
            <button
              onClick={handleCloseModal}
              className="popup-modal__close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
