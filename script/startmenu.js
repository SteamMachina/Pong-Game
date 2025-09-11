import { startInterval, setDifficulty as setGameDifficulty } from "./interval.js";
export function setupStartMenu() {
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const difficultySelect = document.getElementById('difficulty');
    const gameElements = [
        document.getElementById('info'),
        document.getElementById('target'),
        document.getElementById('platform'),
        document.getElementById('pit'),
        document.getElementById('winText')
    ];
    function startGame() {
        startScreen.style.display = 'none';
        gameElements.forEach(function (el) {
            if (el)
                el.style.display = '';
        });
        startInterval(); // Start the game only when Start is clicked
    }
    function setDifficulty(level) {
        window.gameDifficulty = level;
        setGameDifficulty(level);
        console.log('Difficulty set to', level);
    }
    function changeDifficulty() {
        setDifficulty.apply(this, [difficultySelect === null || difficultySelect === void 0 ? void 0 : difficultySelect.value]);
    }
    // Hide game elements initially
    gameElements.forEach(function (el) {
        if (el)
            el.style.display = 'none';
    });
    // Use bind to ensure 'this' is the window
    startBtn.addEventListener('click', startGame.bind(window));
    difficultySelect.addEventListener('change', changeDifficulty.bind(window));
}
