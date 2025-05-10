const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Основные настройки игры
let snake = [{ x: 10, y: 10 }]; // Начальная позиция змеи
let dx = 1, dy = 0;              // Направление движения (начало справа)
let speed = 100;                 // Скорость игры (мс)
let gameInterval;                // Таймер обновления игры

// Объект пищи
let food = {};                   // Точка расположения еды

// Размеры игрового поля
const width = canvas.width / 10; // Ширина сетки
const height = canvas.height / 10; // Высота сетки

// Получаем DOM-элементы
const joystickContainer = document.getElementById('joystick-container');
const joystickKnob = document.getElementById('joystick-knob');

// Переменная отслеживает перетаскивание джойстика
let isDraggingJoystick = false;
let initialX, initialY;

// Рисует задний фон (игровое поле)
function drawBackground() {
    ctx.fillStyle = '#EAEAEA'; // Серый оттенок фона
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Основное обновление игры
function update() {
    drawBackground();     // Рисуем фон
    clearCanvas();        // Чистим старый рисунок
    moveSnake();          // Передвигаем змею
    eatFood();            // Проверяем сбор еды
    drawSnake();          // Рисуем змею
    drawFood();           // Рисуем еду
}

// Чистка холста
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Перемещает змею вперед
function moveSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead); // Добавляем голову змеи спереди
    snake.pop();           // Убираем хвост
}

// Рисует змею
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
}

// Генерация новой точки для еды
function placeFood() {
    const randomX = Math.floor(Math.random() * width) * 10;
    const randomY = Math.floor(Math.random() * height) * 10;
    food = { x: randomX, y: randomY };
}

// Рисует еду
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Ловим сбор еды
function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        placeFood(); // Новая еда
        growSnake(); // Растём
    }
}

// Удлиняет змею
function growSnake() {
    const lastSegment = snake[snake.length - 1];
    snake.push(lastSegment); // Копируем последний сегмент
}

// Обработка движений джойстика
function handleJoystickMove(event) {
    const rect = joystickContainer.getBoundingClientRect();
    const knobPositionX = event.clientX - rect.left;
    const knobPositionY = event.clientY - rect.top;

    if (knobPositionX < rect.width / 2) {
        changeDirection(-1, 0); // Влево
    } else if (knobPositionX > rect.width / 2) {
        changeDirection(1, 0); // Вправо
    }

    if (knobPositionY < rect.height / 2) {
        changeDirection(0, -1); // Вверх
    } else if (knobPositionY > rect.height / 2) {
        changeDirection(0, 1); // Вниз
    }
}

// Мышью начали управлять джойстиком
joystickKnob.addEventListener('mousedown', (event) => {
    isDraggingJoystick = true;
    initialX = event.clientX;
    initialY = event.clientY;
});

// Отпустили мышь
window.addEventListener('mouseup', () => {
    isDraggingJoystick = false;
});

// Перемещаем мышь
window.addEventListener('mousemove', (event) => {
    if (isDraggingJoystick) {
        handleJoystickMove(event);
    }
});

// Меняем направление движения змеи
function changeDirection(dxValue, dyValue) {
    dx = dxValue;
    dy = dyValue;
}

// Функция перезапуска игры
function restartGame() {
    clearInterval(gameInterval); // Очищаем интервал
    snake = [{ x: 10, y: 10 }]; // Восстанавливаем исходную позицию змеи
    dx = 1;                     // Возвращаемся направо
    dy = 0;
    placeFood();                // Ставим новую еду
    gameInterval = setInterval(update, speed); // Повторно начинаем игру
}

// Первоначальные установки
placeFood(); // Генерируем первое яблоко
gameInterval = setInterval(update, speed); // Запускаем игровой цикл