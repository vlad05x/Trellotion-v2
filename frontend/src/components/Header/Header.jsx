import React from "react";
import "./Header.scss";
import { FiPlusCircle } from "react-icons/fi";

const Header = ({ openModal }) => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Trellotion</h1>
        <div className="header__actions">
          <button className="header__button" aria-label="Add new task" onClick={openModal}>
            <FiPlusCircle className="header__icon" />
          </button>
          <div className="header__avatar">
            <img
              src="https://g-cqkukw8huft.vusercontent.net/placeholder-user.jpg"
              alt="User"
              className="header__avatar-image"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
