let basket, ball, scoreDisplay, startBtn;
let score = 0;
let ballInterval;
let basketSpeed = 20;
let gameStarted = false;

window.onload = function () {
    basket = document.getElementById("basket");
    ball = document.getElementById("ball");
    scoreDisplay = document.getElementById("score");
    startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", startGame);
    document.addEventListener("keydown", moveBasket);
};

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    updateScore();
    ball.style.display = "block";
    ball.style.top = "0px";
    ball.style.left = Math.random() * (window.innerWidth - 30) + "px";
    startBtn.style.display = "none";
    dropBall();
}

function dropBall() {
    ballInterval = setInterval(() => {
        let ballTop = parseInt(ball.style.top);
        ballTop += 5;
        ball.style.top = ballTop + "px";

        if (ballTop > window.innerHeight - 60) {
            if (checkCollision(ball, basket)) {
                score++;
                updateScore();
                resetBall();
            } else {
                gameOver();
            }
        }
    }, 20);
}

function moveBasket(event) {
    if (!gameStarted) return;
    let basketLeft = parseInt(basket.style.left);
    if (event.key === "ArrowLeft" && basketLeft > 0) {
        basketLeft -= basketSpeed;
    } else if (event.key === "ArrowRight" && basketLeft < window.innerWidth - 100) {
        basketLeft += basketSpeed;
    }
    basket.style.left = basketLeft + "px";
}

function checkCollision(ball, basket) {
    let ballRect = ball.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();

    return !(
        ballRect.right < basketRect.left ||
        ballRect.left > basketRect.right ||
        ballRect.bottom < basketRect.top ||
        ballRect.top > basketRect.bottom
    );
}

function resetBall() {
    clearInterval(ballInterval);
    ball.style.top = "0px";
    ball.style.left = Math.random() * (window.innerWidth - 30) + "px";
    dropBall();
}

function gameOver() {
    clearInterval(ballInterval);
    ball.style.display = "none";
    startBtn.style.display = "block";
    startBtn.innerText = "Restart Game";
    gameStarted = false;
}

function updateScore() {
    scoreDisplay.innerText = "Score: " + score;
}
