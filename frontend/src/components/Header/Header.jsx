import React, { useState } from "react";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../store/action";
import { FiPlusCircle } from "react-icons/fi";

const Header = ({ openModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useSelector((state) => state.auth);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAvatarClick = () => {
    if (isModalOpen) {
      handleCloseModal();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Trellotion</h1>
        <div className="header__actions">
          <button
            className="header__button"
            aria-label="Add new task"
            onClick={openModal}
          >
            <FiPlusCircle className="header__icon" />
          </button>
          <div className="header__avatar" onClick={handleAvatarClick}>
            <img
              src="https://g-cqkukw8huft.vusercontent.net/placeholder-user.jpg"
              alt="User"
              className="header__avatar-image"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            {username && <p className="modal__username">{username}</p>}
            <button className="modal__logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
