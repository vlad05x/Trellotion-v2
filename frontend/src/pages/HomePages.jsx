import React from "react";
import BoardList from "../components/Boards/BoardList";
import CreateBoardModal from "../components/Boards/CreateBoardModal";
import Header from "../components/Header/Header";

const HomePages = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="boards">
      <Header openModal={() => setIsModalOpen(true)} />
      <div className="boards__container">
        <h1 className="boards-container__title">My Boards</h1>
        {isModalOpen && (
          <CreateBoardModal closeModal={() => setIsModalOpen(false)} />
        )}
        <BoardList />
      </div>
    </div>
  );
};

export default HomePages;
