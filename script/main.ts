import { startInterval } from "./interval.js";
import { counterLevels } from "./counters.js";

/****************************************/
/*            Game flo start            */
/****************************************/
// start at level 1
counterLevels.increment();

// start moving the target
window.onload = function (): void {
  startInterval();
};
