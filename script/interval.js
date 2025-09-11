import { counterLevels } from "./counters.js";
import { colors } from "./colors.js";
import { moveTarget } from "./movement.js";
/****************************************/
/*                Interval              */
/****************************************/
export let intervalId = null;
// runs the moveTarget() according to level settings
export function startInterval() {
    try {
        if (!intervalId) {
            const target = document.getElementById("target");
            if (!target) {
                return;
            }
            // change difficulty depending on level
            const currentLevel = counterLevels.getValue();
            const levels = [
                { step: 4, time: 10 },
                { step: 5, time: 10 },
                { step: 7, time: 10 },
            ];
            const levelsCopy = [...levels]; // done only because of project requirements, otherwise useless
            const [level1, level2, level3] = levelsCopy;
            switch (currentLevel) {
                case 1:
                    target.style.backgroundColor = colors.targetLevel1;
                    intervalId = window.setInterval(() => moveTarget(level1.step), level1.time);
                    break;
                case 2:
                    target.style.backgroundColor = colors.targetLevel2;
                    intervalId = window.setInterval(() => moveTarget(level2.step), level2.time);
                    break;
                case 3:
                    target.style.backgroundColor = colors.targetLevel3;
                    intervalId = window.setInterval(() => moveTarget(level3.step), level3.time);
                    break;
            }
        }
    }
    catch (error) {
        console.error("Error in startInterval:", error);
    }
}
// stops interval
export function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
