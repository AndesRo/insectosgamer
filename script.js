// Definición de sonidos e imágenes
const insectImages = ['hormiga.png', 'abeja.png', 'insect3.png'];
const clickSound = new Audio('click-sonido 2.mp3');
const loseLifeSound = new Audio('lose-life-sound.mp3');
const gameOverSound = new Audio('game-over-sound.mp3');
const menuSound = new Audio('menu-sonido 1.mp3');

let score = 0;
let timeLeft = 30;
let difficulty;
let lives = 3;

// Obtener referencias a los elementos del DOM
const insect = document.getElementById('insect');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const livesDisplay = document.getElementById('lives');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const gameArea = document.getElementById('game-area');
const difficultySelect = document.getElementById('difficulty');
const startMenuButton = document.getElementById('start-menu-button');

// Función para obtener una posición aleatoria para el insecto
function getRandomPosition() {
    const x = Math.random() * (gameArea.clientWidth - insect.clientWidth);
    const y = Math.random() * (gameArea.clientHeight - insect.clientHeight);
    return { x, y };
}

// Función para seleccionar un insecto aleatorio
function getRandomInsect() {
    const randomIndex = Math.floor(Math.random() * insectImages.length);
    insect.style.backgroundImage = `url(${insectImages[randomIndex]})`;
}

// Función para mover el insecto a una nueva posición aleatoria
function moveInsect() {
    const position = getRandomPosition();
    insect.style.left = `${position.x}px`;
    insect.style.top = `${position.y}px`;
    getRandomInsect();
}

// Función para actualizar la puntuación
function updateScore() {
    score++;
    scoreDisplay.textContent = `Puntuación: ${score}`;
}

// Función para perder una vida
function loseLife() {
    lives--;
    livesDisplay.textContent = `Vidas: ${lives}`;
    loseLifeSound.play();
    gameArea.classList.add('losing-life');
    setTimeout(() => {
        gameArea.classList.remove('losing-life');
    }, 500);
    
    if (lives === 0) {
        endGame();
    }
}

// Función para actualizar el temporizador
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
    } else {
        endGame();
    }
}

// Función para finalizar el juego
function endGame() {
    gameOverSound.play();
    alert(`¡Juego terminado! Tu puntuación es: ${score}`);
    resetGame();
}

// Función para reiniciar el juego
function resetGame() {
    score = 0;
    timeLeft = 30;
    lives = 3;
    updateScore();
    livesDisplay.textContent = `Vidas: ${lives}`;
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
    moveInsect();
    startGame();
}

// Función para iniciar el juego
function startGame() {
    difficulty = parseInt(difficultySelect.value);
    startMenu.style.display = 'none';
    gameArea.style.display = 'block';

    const timer = setInterval(updateTimer, 1000);
    const insectMovement = setInterval(() => {
        moveInsect();
        if (timeLeft > 0 && lives > 0) {
            loseLife();
        }
    }, difficulty);

    setTimeout(() => {
        clearInterval(timer);
        clearInterval(insectMovement);
    }, timeLeft * 1000);
}

// Evento para el clic en el insecto
insect.addEventListener('click', function() {
    updateScore();
    clickSound.play();
    moveInsect();
});

// Evento para iniciar el juego desde el menú de inicio
startMenuButton.addEventListener('click', function() {
    menuSound.play(); // Reproducir sonido al hacer clic en el botón de inicio
    startGame();
});

// Mostrar el menú de inicio al cargar la página
window.onload = function() {
    startMenu.style.display = 'block';
    gameArea.style.display = 'none';
};
