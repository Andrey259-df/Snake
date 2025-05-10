
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Параметры игры
let snake = [{ x: 10, y: 10 }];
let dx = 1, dy = 0;
let speed = 100;
let gameInterval;

// Джойстик
const joystickContainer = document.getElementById('joystick-container');
const joystickKnob = document.getElementById('joystick-knob');
let isDraggingJoystick = false;
let initialX, initialY;

// Управление направлением
function changeDirection(dxValue, dyValue) {
    dx = dxValue;
    dy = dyValue;
}

// Определение направления по движению джойстика
function handleJoystickMove(event) {
    const rect = joystickContainer.getBoundingClientRect();
    const knobPositionX = event.clientX - rect.left;
    const knobPositionY = event.clientY - rect.top;

    if (knobPositionX < rect.width / 2) {
        changeDirection(-1, 0); // Лево
    } else if (knobPositionX > rect.width / 2) {
        changeDirection(1, 0); // Право
    }

    if (knobPositionY < rect.height / 2) {
        changeDirection(0, -1); // Верх
    } else if (knobPositionY > rect.height / 2) {
        changeDirection(0, 1); // Низ
    }
}

// Начало перетаскивания джойстика
joystickKnob.addEventListener('mousedown', (event) => {
    isDraggingJoystick = true;
    initialX = event.clientX;
    initialY = event.clientY;
});

// Отмена перетаскивания
window.addEventListener('mouseup', () => {
    isDraggingJoystick = false;
});

// Обработка движения мыши
window.addEventListener('mousemove', (event) => {
    if (isDraggingJoystick) {
        handleJoystickMove(event);
    }
});

// Основной игровой цикл
function update() {
    clearCanvas();
    moveSnake();
    drawSnake();
}

// Очищаем холст
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Движение змеи
function moveSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);
    snake.pop();
}

// Рисуем змею
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
}

// Кнопка перезагрузки игры
function restartGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    gameInterval = setInterval(update, speed);
}