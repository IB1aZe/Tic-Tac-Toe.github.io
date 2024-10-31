import { useCallback, useState } from "react";
import Square from "./components/Square";
import Reset from "./components/Reset";
import { DEFAULT_SQUARES_STATE, LINES } from "./consts";

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(DEFAULT_SQUARES_STATE);

    const calculateWinner = useCallback(() => {
        const winningLine = LINES.find(
            ([a, b, c]) =>
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
        );

        return winningLine ? squares[winningLine[0]] : null;
    }, [squares]);

    const resetBoard = () => {
        setSquares(DEFAULT_SQUARES_STATE);
    };

    const winner = calculateWinner();
    const currentPlayer = xIsNext ? "X" : "O";
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${currentPlayer}`;

    const handleClick = (idx) => {
        const isSquareExists = squares[idx];
        if (isSquareExists || winner) return;

        const nextSquares = [...squares];
        nextSquares[idx] = currentPlayer;

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    };

    return (
        <div>
            <div className="title">Simple Tic Tac Toe</div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
            <Reset onClick={resetBoard} />
        </div>
    );
};

export default Board;
