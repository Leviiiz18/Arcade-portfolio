document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    // Set Full-Screen Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load images
    const dinoImg = new Image();
    dinoImg.src = "img\\Old_Lace-removebg-preview.png"; // Use your own dino sprite image

    const cloudImg = new Image();
    cloudImg.src = "img\\Белое облако пиксель значок бесплатную кнопку Png PNG , белые облака, пиксельные иконки, минималист PNG картинки и пнг PSD рисунок для бесплатной загрузки.jpg"; // Add a cloud image

    const groundImg = new Image();
    groundImg.src = "img\\download.jpg"; // Add a ground image

    // Scenery positions
    let cloudX = canvas.width;
    let groundX = 0;

    // Dino settings
    const dino = {
        x: 50,
        y: canvas.height - 100,
        width: 60,
        height: 60,
        dy: 0,
        gravity: 0.6,
        jumpPower: -15,
        onGround: false
    };

    // Obstacle settings
    const obstacles = [];
    let frameCount = 0;
    let gameSpeed = 6;

    // Score settings
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;

    function drawBackground() {
        // Sky
        ctx.fillStyle = "#7A73D1";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clouds
        ctx.drawImage(cloudImg, cloudX, 50, 200, 100);
        cloudX -= 1;
        if (cloudX + 200 < 0) cloudX = canvas.width;

        // Ground
        ctx.drawImage(groundImg, groundX, canvas.height - 50, canvas.width, 50);
        groundX -= gameSpeed / 2;
        if (groundX <= -canvas.width) groundX = 0;
    }

    function drawDino() {
        ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    function drawObstacles() {
        ctx.fillStyle = "#211C84"; // Obstacle Color
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function drawScore() {
        ctx.fillStyle = "#B5A8D5";
        ctx.font = "28px Arial";
        ctx.fillText("Score: " + score, canvas.width - 220, 50);
        ctx.fillText("High Score: " + highScore, canvas.width - 220, 85);
    }

    function updateDino() {
        dino.y += dino.dy;
        dino.dy += dino.gravity;

        if (dino.y >= canvas.height - 100) {
            dino.y = canvas.height - 100;
            dino.onGround = true;
        } else {
            dino.onGround = false;
        }
    }

    function updateObstacles() {
        obstacles.forEach((obstacle, index) => {
            obstacle.x -= gameSpeed;

            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
                score += 10;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("highScore", highScore);
                }
            }

            // Collision detection
            if (
                dino.x < obstacle.x + obstacle.width &&
                dino.x + dino.width > obstacle.x &&
                dino.y < obstacle.y + obstacle.height &&
                dino.y + dino.height > obstacle.y
            ) {
                alert("Game Over! Final Score: " + score);
                resetGame();
            }
        });

        if (frameCount % 90 === 0) {
            obstacles.push({
                x: canvas.width,
                y: canvas.height - 80,
                width: 40,
                height: 40
            });
        }
    }

    function resetGame() {
        dino.y = canvas.height - 100;
        dino.dy = 0;
        obstacles.length = 0;
        score = 0;
        gameSpeed = 6;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();
        drawDino();
        drawObstacles();
        drawScore();

        updateDino();
        updateObstacles();

        frameCount++;
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && dino.onGround) {
            dino.dy = dino.jumpPower;
        }
    });

    gameLoop();
});
