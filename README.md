# Pong game

## Game summary

This game is inspired by Pong. The player controls a platform using the left and right keys on their keyboard to prevent the ball from falling into the pit. If the ball falls, the game restarts. Each time the ball bounces on the platform, the player scores a point. After 10 points, the level increases, as does the speed of the ball. After three levels, the player wins the game and can restart if they wish.

## File summary

- main.html: Main HTML file that launches the Pong game in the browser.
- style.css: Stylesheet for the game's appearance.
- script/main.ts / main.js: Main game script, handles gameplay logic (platform control, level management, score, etc.).
- script/startmenu.ts / startmenu.js: Handles the start menu UI and logic.
- script/colors.ts / colors.js: Color palette logic, including fetching palettes from the backend.
- script/counters.ts / counters.js: Level and point counters.
- script/interval.ts / interval.js: Handles game intervals and timing.
- script/movement.ts / movement.js: Handles target/platform movement.
- backend/colormind-proxy.js: Node.js backend proxy for fetching color palettes from Colormind API (avoids CORS issues).
- tsconfig.json: TypeScript configuration to compile .ts files to .js.
- package.json: Manages project dependencies and scripts (notably TypeScript).
- README.md: Project documentation.

## Instructions to run the code:

- In the terminal, run: npm install -y typescript
- In the terminal, run: tsc
- Open the main.html file

## Github link

https://github.com/SteamMachina/Pong-Game
