import { startInterval, setDifficulty as setGameDifficulty } from "./interval.js";

/****************************************/
/*              start menu              */
/****************************************/
export function setupStartMenu() {
    //get HTML elements info
  const startScreen = document.getElementById('startScreen') as HTMLDivElement;
  const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
  const difficultySelect = document.getElementById('difficulty') as HTMLSelectElement;
  const gameElements = [
    document.getElementById('info'),
    document.getElementById('target'),
    document.getElementById('platform'),
    document.getElementById('pit'),
    document.getElementById('winText')
  ];

   // Hide game elements initially
  gameElements.forEach(function(element) {
    if (element) element.style.display = 'none';
  });

  // function for starting the game
  function startGame(this: any) {
    startScreen.style.display = 'none'; // hide start menu when game is started
    gameElements.forEach(function(element) {
      if (element) element.style.display = '';
    });
    changeDifficulty();
    startInterval(); // Start the game only when Start is clicked
  }

  // function for setting difficulty
  function setDifficulty(this: any, level: string) {
    (window as any).gameDifficulty = level;
    setGameDifficulty(level as 'easy' | 'medium' | 'hard');
  }

  // function for changing difficulty
  function changeDifficulty(this: any) {
    setDifficulty.apply(this, [difficultySelect?.value]);
  }

  // launch startGame function when startBtn is clicked
  startBtn.addEventListener('click', startGame.bind(window));

  // launch changeDifficulty function when difficulty selectioner is changed
  difficultySelect.addEventListener('change', changeDifficulty.bind(window));
}
