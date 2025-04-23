

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [{x: 10, y: 10}];
let food = {x: Math.floor(Math.random() * 15), y: Math.floor(Math.random() * 15)};
let direction = 'right';
let score = 0;

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
});

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    ctx.fillStyle = 'orange';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function move() {
    let head = {...snake[0]};
    switch(direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: Math.floor(Math.random() * 15), y: Math.floor(Math.random() * 15)};
    } else {
        snake.pop();
    }

    snake.unshift(head);

    checkCollision();
    draw();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15 ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        alert(`Game Over! Your score: ${score}`);
        location.reload(); // перезагрузка страницы
    }
}

setInterval(move, 100); // автоматическое обновление игры каждые 100мс