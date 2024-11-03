import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../../store/action';
import BoardCard from './BoardCard';

const BoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards.boards);

    useEffect(() => {
        dispatch(getBoard());
    }, [dispatch]);

    return (
        <div className="board-list">
            {boards.map(board => (
                <BoardCard key={board._id} board={board} />
            ))}
        </div>
    );
};

export default BoardList;
