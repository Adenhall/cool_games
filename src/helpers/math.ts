type Settings = {
  addition?: boolean;
  subtraction?: boolean;
  multiplication?: boolean;
  division?: boolean;
};

export class ArithmeticProblemGenerator {
  // Generate a random integer between min and max (inclusive)
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate a random arithmetic problem
  public generateProblem(
    settings?: Settings,
  ): { problem: string; result: number } {
    const num1 = this.getRandomInt(1, 100);
    const num2 = this.getRandomInt(1, 100);
    const operations = ["+", "-", "*", "/"].filter((operation) => {
      if (!settings) return true;
      if (settings.addition && operation === "+") return true;
      if (settings.subtraction && operation === "-") return true;
      if (settings.multiplication && operation === "*") return true;
      if (settings.division && operation === "/") return true;
    });
    const operation = operations[this.getRandomInt(0, operations.length - 1)];

    let problem: string;
    let result: number;

    switch (operation) {
      case "+":
        problem = `${num1} + ${num2}`;
        result = num1 + num2;
        break;
      case "-":
        problem = `${num1} - ${num2}`;
        result = num1 - num2;
        break;
      case "*":
        problem = `${num1} x ${num2}`;
        result = num1 * num2;
        break;
      case "/":
        // Ensure no division by zero
        if (num2 === 0) {
          return this.generateProblem();
        }
        problem = `${num1} ÷ ${num2}`;
        result = num1 / num2;
        break;
      default:
        throw new Error("Unknown operation");
    }

    // Round the result
    result = Math.round(result * 100) / 100;

    return { problem, result };
  }
}

export const arithmeticProblemGenerator = new ArithmeticProblemGenerator();
