import React, { useContext, useState } from "react";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const TicTacToe = ({ props }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const { t } = useTranslation();
  const [aiEnabled, setAiEnabled] = useState(false);
  const aiPlayer = "O";
  const humanPlayer = "X";

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    return null;
  }

  const handleClick = (idx) => {
    if (board[idx] || calculateWinner(board)) return;

    const newBoard = [...board];

    if (!aiEnabled) {
      newBoard[idx] = xNext ? "X" : "O";
      setBoard(newBoard);
      setXNext(!xNext);
      return;
    }

    newBoard[idx] = humanPlayer;
    setBoard(newBoard);
    setXNext(false);

    if (!calculateWinner(newBoard)) {
      setTimeout(() => {
        const move = findBestMove(newBoard);
        if (move !== undefined) {
          const aiBoard = [...newBoard];
          aiBoard[move] = aiPlayer;
          setBoard(aiBoard);
          setXNext(true);
        }
      }, 500);
    }
  };

  const winner = calculateWinner(board);

  function findBestMove(board) {
    const availableMoves = board
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    for (let move of availableMoves) {
      const temp = [...board];
      temp[move] = aiPlayer;
      if (calculateWinner(temp) === aiPlayer) return move;
    }

    for (let move of availableMoves) {
      const temp = [...board];
      temp[move] = humanPlayer;
      if (calculateWinner(temp) === humanPlayer) return move;
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return (
    <div
      title={props.title}
      className={`flex flex-col items-center gap-3
     w-full h-full p-3 rounded-xl shadow-md
     ${changeTheme ? " shadow-lightTeal bg-white" : " shadow-mainColor"}`}
    >
      <div className={`text-lg font-bold text-gray-700`}>
        {winner
          ? `${t("DragCompo.TicTacToe.Winner")} : ${winner}`
          : `${t("DragCompo.TicTacToe.NextPlayer")} : ${xNext ? "X" : "O"}`}
      </div>
      <div
        className="grid gap-1 "
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%",
          height: "100%",
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="bg-indigo-200  flex items-center justify-center text-2xl font-bold border rounded"
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="flex gap-5 items-center justify-center font-semibold">
        <button
          onClick={() => {
            setBoard(Array(9).fill(null));
            setXNext(true);
          }}
          className={`mt-2 px-3 py-1 shadow-md shadow-black text-white rounded 
         ${changeTheme ? "  bg-mainColor2" : " bg-mainColor"} `}
        >
          {t("DragCompo.TicTacToe.Restart")}
        </button>
        <button
          onClick={() => setAiEnabled(!aiEnabled)}
          className={`mt-2 px-3 py-1 shadow-md shadow-black text-white rounded ${
            aiEnabled
              ? "bg-blue-700"
              : changeTheme
              ? "bg-mainColor2 "
              : "bg-blue-700"
          }`}
        >
          {aiEnabled
            ? t("DragCompo.TicTacToe.1vs1")
            : t("DragCompo.TicTacToe.AIplayer")}
        </button>
      </div>
    </div>
  );
};
export default TicTacToe;
