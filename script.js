
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Параметры игры
let snake = [{ x: 10, y: 10 }];
let dx = 1, dy = 0;
let speed = 100;
let gameInterval;

function drawBackground() {
    ctx.fillStyle = '#EAEAEA'; // Цвет фона
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Добавляем вызов метода рисования фона в основном цикле
function update() {
    drawBackground(); // Сначала рисуем фон
    clearCanvas(); // Затем очищаем старый рисунок
    moveSnake(); // Далее двигаемся
    drawSnake(); // И наконец перерисовываем змею
}

// Джойстик
#joystick-container {
    position: fixed; /* Позиционируем фиксировано */
    bottom: calc(50% - 50px); /* Центрирование по вертикали */
    left: calc(50% - 50px); /* Центрирование по горизонтали */
    z-index: 1000; /* Поднимаем поверх остальных элементов */
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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

let food = {};

function placeFood() {
    const randomX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const randomY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    food = { x: randomX, y: randomY };
}

placeFood(); // Изначально размещаем еду

// Метод для рисования еды
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Логика съедения пищи
function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        placeFood(); // Размещаем новую пищу
        growSnake(); // Удлиняем змею
    }
}

// Увеличение длины змеи
function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y }); // Просто копируем последнюю точку
}

// Основная игровая логика
function update() {
    drawBackground();
    clearCanvas();
    moveSnake();
    eatFood(); // Проверяем съедено ли яблоко
    drawSnake();
    drawFood(); // Рисуем еду
}

// Кнопка перезагрузки игры
function restartGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    gameInterval = setInterval(update, speed);
}