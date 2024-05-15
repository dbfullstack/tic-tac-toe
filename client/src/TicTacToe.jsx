import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicTacToe = () => {
    const [gameData, setGameData] = useState({
        board: Array(9).fill(null),
        xIsNext: true,
        winner: null,
    });

    useEffect(() => {
        fetchGameData();
    }, []);

    const fetchGameData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/game');
            setGameData(response.data);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };

    const makeMove = async (index) => {
        try {
            const response = await axios.post('http://localhost:8000/api/game/move', { index });
            setGameData(response.data);
        } catch (error) {
            console.error('Error making move:', error);
        }
    };

    const resetGame = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/game/reset');
            setGameData(response.data);
        } catch (error) {
            console.error('Error resetting game:', error);
        }
    };

    const renderSquare = (i) => (
        <button style={{ height: '20px', width: '20px' }} className="square" onClick={() => makeMove(i)}>
            {gameData.board[i]}
        </button>
    );

    const winner = gameData.winner;

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (gameData.xIsNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default TicTacToe;
