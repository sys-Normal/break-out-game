import React, { useState, useEffect } from "react";

const BallBounceGame = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ dx: 5, dy: 5 });
  const [gameOver, setGameOver] = useState(false);

  const containerRef = React.useRef(null);
  const paddleRef = React.useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const handleAnimation = () => {
      if (!gameOver) {
        setPosition((prevPosition) => ({
          x: prevPosition.x + velocity.dx,
          y: prevPosition.y + velocity.dy,
        }));

        const ballRect = container.getBoundingClientRect();
        const { width, height } = ballRect;

        if (
          position.x < 0 ||
          position.x + width > containerRect.width ||
          position.y < 0 ||
          position.y + height > containerRect.height
        ) {
          setVelocity((prevVelocity) => ({
            dx: -prevVelocity.dx,
            dy: -prevVelocity.dy,
          }));
        }

        const paddleRect = paddleRef.current.getBoundingClientRect();

        if (
          ballRect.bottom >= paddleRect.top &&
          ballRect.top <= paddleRect.bottom &&
          ballRect.right >= paddleRect.left &&
          ballRect.left <= paddleRect.right
        ) {
          setVelocity((prevVelocity) => ({
            dx: prevVelocity.dx,
            dy: -prevVelocity.dy,
          }));
        }

        if (ballRect.bottom >= containerRect.bottom) {
          setGameOver(true);
        }
      }
    };

    const animationId = setInterval(handleAnimation, 16);

    return () => clearInterval(animationId);
  }, [position, velocity, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "red",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      ></div>
      <div
        ref={paddleRef}
        style={{
          width: "100px",
          height: "10px",
          background: "blue",
          position: "absolute",
          bottom: "0",
          left: "150px",
        }}
      ></div>
      {gameOver && <div>Game Over</div>}
      {!gameOver && (
        <button onClick={handleGameOver} style={{ marginTop: "10px" }}>
          End Game
        </button>
      )}
    </div>
  );
};

export default BallBounceGame;