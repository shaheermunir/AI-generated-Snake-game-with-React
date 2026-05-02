import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setFood(generateFood());
    setIsPaused(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          if (!gameOver && gameStarted) {
            setIsPaused(prev => !prev);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, gameStarted]);

  useEffect(() => {
    if (gameOver || isPaused || !gameStarted) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 120);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, gameOver, isPaused, gameStarted, generateFood]);

  return (
    <div className="flex flex-col font-digital w-full">
      {/* Score Header */}
      <div className="flex justify-between items-center mb-4 px-3 bg-cyber-magenta text-black border-2 border-cyber-cyan font-bold py-1">
        <h2 className="text-3xl m-0 leading-none">
          ENTITY_COUNT
        </h2>
        <div className="text-4xl leading-none">
          0x{score.toString(16).padStart(4, '0').toUpperCase()}
        </div>
      </div>

      {/* Game Grid */}
      <div 
        className="relative bg-black border-4 border-cyber-cyan"
        style={{
          width: '400px',
          height: '400px',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Snake Layer */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className="z-10"
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
              backgroundColor: i === 0 ? 'var(--color-cyber-cyan)' : 'var(--color-cyber-black)',
              border: '2px solid var(--color-cyber-cyan)',
              transform: 'scale(0.9)',
            }}
          />
        ))}

        <div
          className="z-10 bg-cyber-magenta"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
            transform: 'scale(0.8)',
            animation: 'glitch 0.2s infinite'
          }}
        />

        {/* Overlays */}
        {(!gameStarted || gameOver || isPaused) && (
          <div className="absolute inset-0 z-20 bg-black/95 flex flex-col justify-center items-center p-6 text-center border-4 border-cyber-magenta screen-tear backdrop-blur-sm">
            {gameOver ? (
              <>
                <h3 className="text-cyber-magenta text-6xl mb-2 font-black glitch-text-wrapper leading-none tracking-tight" data-text="FATAL_ERROR">FATAL_ERROR</h3>
                <p className="text-white text-3xl mb-10 bg-cyber-cyan text-black px-2 py-1">SCORE: 0x{score.toString(16).padStart(4, '0').toUpperCase()}</p>
                <button
                  onClick={resetGame}
                  className="glitch-button px-6 py-3 text-3xl w-full flex items-center justify-center gap-2 font-bold"
                >
                  <RotateCcw className="w-8 h-8" />
                  REBOOT_SYSTEM
                </button>
              </>
            ) : !gameStarted ? (
              <>
                <h3 className="text-cyber-cyan text-5xl mb-8 glitch-text-wrapper font-bold leading-none tracking-tight" data-text="AWAITING_INPUT">AWAITING_INPUT</h3>
                <button
                  onClick={resetGame}
                  className="glitch-button px-6 py-3 text-3xl w-full flex items-center justify-center gap-2 font-bold"
                >
                  <Play className="w-8 h-8" />
                  EXECUTE
                </button>
              </>
            ) : isPaused ? (
              <>
                 <h3 className="text-yellow-400 text-6xl mb-8 glitch-text-wrapper font-bold tracking-tight" data-text="HALTED">HALTED</h3>
                 <button
                  onClick={() => setIsPaused(false)}
                  className="bg-yellow-400 text-black border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 w-full px-6 py-3 text-3xl flex items-center justify-center gap-2 font-bold transition-colors"
                >
                  <Play className="w-8 h-8" />
                  RESUME
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
      <div className="mt-4 bg-cyber-cyan text-black px-2 py-2 text-xl font-bold text-center">
        INPUT: [W A S D] / [ARROWS] -- HALT: [SPACE]
      </div>
    </div>
  );
}
