import { counterLevels } from "./counters.js";
import { setupStartMenu } from "./startmenu.js";

/****************************************/
/*            Game flo start            */
/****************************************/
// start at level 1
counterLevels.increment();

window.addEventListener('DOMContentLoaded', async function() {
  setupStartMenu();
});
