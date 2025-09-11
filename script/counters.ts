/****************************************/
/*               Counters               */
/****************************************/
// making counters for points and levels :
interface Counter {
  increment: () => void;
  getValue: () => number;
  reset: () => void;
}

export function createCounter(): Counter {
  let counter: number = 0;

  return {
    increment: function (): void {
      counter++;
    },
    getValue: function (): number {
      return counter;
    },
    reset: function (): void {
      counter = 0;
    },
  };
}

// Starts counters
export const counterLevels: Counter = createCounter();
export const counterPoints: Counter = createCounter();