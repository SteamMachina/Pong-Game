# Pong game

## Game summary

This game is inspired by Pong. The player controls a platform using the left and right keys on their keyboard to prevent the ball from falling into the pit. If the ball falls, the game restarts. Each time the ball bounces on the platform, the player scores a point. After 10 points, the level increases, as does the speed of the ball. After three levels, the player wins the game and can restart if they wish.

## File summary

- main.html: Main HTML file that launches the Pong game in the browser.
- style.css: Stylesheet for the game's appearance.
- script.ts / script.js: Main game script, handles gameplay logic (platform control, level management, score, etc.).
- functions.ts / functions.js: Contains utility functions or reusable modules for the game.
- tsconfig.json: TypeScript configuration to compile .ts files to .js.
- package.json: Manages project dependencies and scripts (notably TypeScript).
- README.md: Project documentation.
- Projet renforcement module JS \_ TS.pdf: Project specifications (in French).

## Instructions to run the code:

- In the command prompt, run: npm install -y typescript
- Check that in package-lock.json you have: "type": "module"
- Make sure there is a tsconfig.json file with:
  {
  "compilerOptions": {
  "target": "ES6",
  "module": "ES6",
  "outDir": "./",
  "rootDir": ".",
  "strict": true,
  "esModuleInterop": true
  }
  }
- In the command prompt, run: tsc functions.ts --module ES6
- In the command prompt, run: tsc script.ts --module ES6
- Open the main.html file
