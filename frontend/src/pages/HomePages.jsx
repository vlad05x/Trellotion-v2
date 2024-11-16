import React from "react";
import { useSelector } from "react-redux";
import BoardList from "../components/Boards/BoardList";
import CreateBoardModal from "../components/Boards/CreateBoardModal";
import Header from "../components/Header/Header";
import BoardFilter from "../components/Boards/BoadrFilter";
import TaskFilter from "../components/Tasks/TaskFilter";

const HomePages = () => {
  const { username } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div className="boards">
      <Header username={username} openModal={() => setIsModalOpen(true)} />
      <div className="boards__container">
        <h1 className="boards-container__title">Boards - {username}</h1>
        <BoardFilter />
        <TaskFilter />
        {isModalOpen && (
          <CreateBoardModal closeModal={() => setIsModalOpen(false)} />
        )}
        <BoardList />
      </div>
    </div>
  );
};

export default HomePages;
