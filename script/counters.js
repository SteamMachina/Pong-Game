export function createCounter() {
    let counter = 0;
    return {
        increment: function () {
            counter++;
        },
        getValue: function () {
            return counter;
        },
        reset: function () {
            counter = 0;
        },
    };
}
// Starts counters
export const counterLevels = createCounter();
export const counterPoints = createCounter();
