const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const http = require('http');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

let gameData = {
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null,
};

app.get('/api/healthcheck', (req, res) => {
    res.json(`I'm up`);
});

app.get('/api/game', (req, res) => {
    return res.json(gameData);
});

app.post('/api/game/move', (req, res) => {
    const { index } = req.body;

    if (gameData.board[index] || gameData.winner) {
        return res.status(400).json({ error: 'Invalid move' });
    }

    gameData.board[index] = gameData.xIsNext ? 'X' : 'O';
    gameData.xIsNext = !gameData.xIsNext;
    gameData.winner = calculateWinner(gameData.board);

    res.json(gameData);
});

app.post('/api/game/reset', (req, res) => {
    gameData = {
        board: Array(9).fill(null),
        xIsNext: true,
        winner: null,
    };
    res.json(gameData);
});

const calculateWinner = (squares) => {
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
