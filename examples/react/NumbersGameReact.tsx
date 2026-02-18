import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const SIZE = 3; // Зміни на 4 для 4x4 гри

const generateTiles = (size) => {
  const numbers = [...Array(size * size - 1).keys()].map((n) => n + 1);
  numbers.push(null); // порожня плитка

  // Перемішування
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

const isSolvable = (tiles, size) => {
  const invCount = tiles.reduce((count, val, i) => {
    if (val === null) return count;
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[j] !== null && tiles[j] < val) count++;
    }
    return count;
  }, 0);

  if (size % 2 !== 0) return invCount % 2 === 0;

  const emptyRow = Math.floor(tiles.indexOf(null) / size);
  return (invCount + emptyRow) % 2 === 1;
};

const GameBoard = ({ size }) => {
  const [tiles, setTiles] = useState([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    startGame();
  }, [size]);

  const startGame = () => {
    let newTiles;
    do {
      newTiles = generateTiles(size);
    } while (!isSolvable(newTiles, size));

    setTiles(newTiles);
    setWon(false);
  };

  const handleClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      checkWin(newTiles);
    }
  };

  const checkWin = (arr) => {
    const correct = [...Array(size * size - 1).keys()].map((n) => n + 1);
    correct.push(null);
    const won = arr.every((val, idx) => val === correct[idx]);
    if (won) setWon(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, 60px)`
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded shadow cursor-pointer select-none transition-all duration-200
            ${tile === null ? "bg-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            onClick={() => handleClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>

      <div className="text-center">
        {won ? <p className="text-green-600 font-bold">🎉 You Win!</p> : <p>Keep playing...</p>}
      </div>

      <Button onClick={startGame}>Restart</Button>
    </div>
  );
};

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <GameBoard size={SIZE} />
    </main>
  );
}
