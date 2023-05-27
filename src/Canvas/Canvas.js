import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import styles from './Canvas.module.css';

function Canvas () {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        var x = canvas.width/2;
        var y = canvas.height-30;
        var dx = 2;
        var dy = -2;
        var ballRadius = 10;

        const paddleHeight = 10;
        const paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;

        let rightPressed = false;
        let leftPressed = false;

        const brickRowCount = 3;
        const brickColumnCount = 5;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;

        const bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        let score = 0;
        
        let lives = 3;
        
        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            
        }
        const drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            // ctx.fillStyle = "#0095DD";
            ctx.fillStyle = "#f00";
            ctx.fill();
            ctx.closePath();
        }

        const drawBricks = () => {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }

        }

        const drawScore = () => {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText(`Score: ${score}`, 8, 20);
        }

        const drawLives = () => {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
        }

        const collisionDetection = () => {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                x > b.x &&
                x < b.x + brickWidth &&
                y > b.y &&
                y < b.y + brickHeight
                ) {
                dy = -dy;
                b.status = 0;
                score++;

                if (score === brickRowCount * brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                    // clearInterval(interval); // Needed for Chrome to end game
                  }
                }
            }
            }
        }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            drawBricks();
            collisionDetection();
            drawScore();
            drawLives();

            if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if(y + dy < ballRadius) {
                dy = -dy;
            }
            else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                }
                else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                        // clearInterval(interval); // Needed for Chrome to end game
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 2;
                        dy = -2;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
            
            if(rightPressed) {
                paddleX += 7;
                if (paddleX + paddleWidth > canvas.width){
                    paddleX = canvas.width - paddleWidth;
                }
            }
            else if(leftPressed) {
                paddleX -= 7;
                if (paddleX < 0){
                    paddleX = 0;
                }
            }

            x += dx;
            y += dy;
            requestAnimationFrame(draw);
        }

        

        const keyDownHandler = (e) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
        }
          
        const keyUpHandler = (e) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
        }

        const mouseMoveHandler = (e) => {
            const relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
              paddleX = relativeX - paddleWidth / 2;
            }
          }

        // ctx.beginPath();
        // ctx.arc(50, 50, 10, 0, Math.PI*2);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill();
        // ctx.closePath();

        // 정사각형-빨강
        // ctx.beginPath();
        // ctx.rect(20, 40, 50, 50);
        // ctx.fillStyle = "#FF0000";
        // ctx.fill();
        // ctx.closePath();

        // 원 - 초록
        // ctx.beginPath();
        // ctx.arc(240, 160, 20, 0, Math.PI*2, false);
        // ctx.fillStyle = "green";
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.rect(160, 10, 100, 40);
        // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        // ctx.stroke();
        // ctx.closePath();

        // // 블럭 색상
        // const blockColor = 'blue';

        // // 블럭의 크기와 위치
        // const blockSize = 50;
        // const blockX = 100;
        // const blockY = 100;

        // // Canvas에 블럭 그리기
        // ctx.fillStyle = blockColor;
        // ctx.fillRect(blockX, blockY, blockSize, blockSize);

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
        
        // const interval = setInterval(draw, 10);
        draw();
    }, [])

    return(
        <canvas ref={canvasRef} width={500} height={480}>
            
        </canvas>
    )
}

export default Canvas;