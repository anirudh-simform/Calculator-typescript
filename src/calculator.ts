import { degToRad } from "./helper_functions/degree-to-radians.js";

interface Precedence {
  [index: string]: number;
}

class Calculator {
  #infixInput: string;
  static #angleInput: string = "deg";

  constructor() {
    this.#infixInput = "";
  }

  setInfix(inputString: string) {
    this.#infixInput = inputString;
  }

  appendChar(char: string) {
    this.#infixInput = this.#infixInput + char;
  }

  removeLastChar() {
    if (this.#infixInput) {
      this.#infixInput = this.#infixInput.slice(0, this.#infixInput.length - 1);
    }
  }

  getInfix(): string {
    return this.#infixInput;
  }

  clearInput() {
    this.#infixInput = "";
  }

  toggleAngleInput() {
    Calculator.#angleInput = Calculator.#angleInput == "deg" ? "rad" : "deg";
  }

  currAngleInput(): string {
    return Calculator.#angleInput;
  }

  // basic operations
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static divide(a: number, b: number): number {
    if (b == 0) {
      throw new Error("Can't divide by 0");
    }
    return a / b;
  }

  static power(a: number, b: number): number {
    return a ** b;
  }

  static modularDivision(a: number, b: number): number {
    return a % b;
  }

  static percentage(a: number): number {
    return a / 100;
  }

  static sin(a: number): number {
    if (this.#angleInput == "deg") {
      a = degToRad(a);
    }
    return Math.round(Math.sin(a) * 10) / 10;
  }

  static cos(a: number): number {
    if (this.#angleInput == "deg") {
      a = degToRad(a);
    }
    return Math.round(Math.cos(a) * 10) / 10;
  }

  static tan(a: number): number {
    if (this.#angleInput == "deg") {
      a = degToRad(a);
    }
    return Math.round(Math.tan(a) * 10) / 10;
  }

  static sini(a: number): number {
    return Math.round(Math.asin(a) * 10) / 10;
  }

  static cosi(a: number): number {
    return Math.round(Math.acos(a) * 10) / 10;
  }

  static tani(a: number): number {
    return Math.round(Math.atan(a) * 10) / 10;
  }

  static log(a: number): number {
    return Math.log10(a);
  }

  static ln(a: number): number {
    return Math.log(a);
  }

  static sqrt(a: number) {
    return Math.sqrt(a);
  }

  static uminus(a: number): number {
    return a * -1;
  }

  static factorial(n: number): number {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }

    return fact;
  }

  // constants used in calculation
  static #precedence: Precedence = {
    "+": 2,
    "-": 2,
    "*": 3,
    "/": 3,
    "|": 3,
    "^": 4,
    "!": 4,
    "%": 4,
    sin: 10,
    cos: 10,
    tan: 10,
    sini: 10,
    cosi: 10,
    tani: 10,
    log: 10,
    sqrt: 10,
    ln: 10,
    uminus: 11,
  };

  static #unaryOperators: Set<string> = new Set([
    "sin",
    "cos",
    "tan",
    "sini",
    "cosi",
    "tani",
    "log",
    "sqrt",
    "%",
    "ln",
    "uminus",
    "!",
  ]);

  // Functions for processing input string

  // A helper function that selects the correct function based on its inputs
  #calculate(operator: string, ...operands: number[]) {
    switch (operator) {
      case "+":
        return Calculator.add(operands[0], operands[1]);
      case "*":
        return Calculator.multiply(operands[0], operands[1]);
      case "-":
        return Calculator.subtract(operands[0], operands[1]);
      case "/":
        return Calculator.divide(operands[0], operands[1]);
      case "^":
        return Calculator.power(operands[0], operands[1]);
      case "sin":
        return Calculator.sin(operands[0]);
      case "cos":
        return Calculator.cos(operands[0]);
      case "tan":
        return Calculator.tan(operands[0]);
      case "sini":
        return Calculator.sini(operands[0]);
      case "cosi":
        return Calculator.cosi(operands[0]);
      case "tani":
        return Calculator.tani(operands[0]);
      case "log":
        return Calculator.log(operands[0]);
      case "ln":
        return Calculator.ln(operands[0]);
      case "%":
        return Calculator.percentage(operands[0]);
      case "sqrt":
        return Calculator.sqrt(operands[0]);
      case "uminus":
        return Calculator.uminus(operands[0]);
      case "!":
        return Calculator.factorial(operands[0]);
      case "|":
        return Calculator.modularDivision(operands[0], operands[1]);

      default:
        return "This operator is not supported";
    }
  }

  // Divides the input string into individual tokens
  #tokenize(input: string): string[] {
    let str = "";
    let arr: string[] = [];

    let openParaCount = 0;
    let closedParaCount = 0;

    for (let i = 0; i <= input.length - 1; i++) {
      if ("*+-/^%()!|".indexOf(input[i]) > -1) {
        if (input[i] == "(") {
          openParaCount += 1;
        }

        if (input[i] == ")") {
          closedParaCount += 1;
        }

        if (str.length > 0) {
          arr.push(str);
          if (arr[arr.length - 3] == "sqrt") {
            arr.push(")");
          }
        }

        arr.push(input[i]);
        str = "";
      } else {
        str += input[i];
      }
    }

    if (str.length > 0) {
      arr.push(str);
    }

    for (let i = 0; i < openParaCount - closedParaCount; i++) {
      arr.push(")");
    }

    if (arr[arr.length - 2] == "sqrt") {
      arr.push(")");
    }

    let newArr = [...arr];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "-") {
        if (i == 0 || "*+/^%(".indexOf(arr[i - 1]) > -1) {
          newArr[i] = "uminus";
        }
      }
    }
    return newArr;
  }

  // Converts the output from the tokenize function into postfix notation
  #toPostfix(input: string[]): string[] {
    let output: string[] = [];
    let stack: string[] = [];

    for (let i = 0; i <= input.length - 1; i++) {
      if (Calculator.#precedence[input[i]]) {
        if (stack.length == 0) {
          stack.push(input[i]);
        } else if (
          Calculator.#precedence[input[i]] >
          Calculator.#precedence[stack[stack.length - 1]]
        ) {
          stack.push(input[i]);
        } else if (stack[stack.length - 1] == "^" && input[i] == "^") {
          stack.push(input[i]);
        } else {
          while (
            stack.length > 0 &&
            Calculator.#precedence[input[i]] <=
              Calculator.#precedence[stack[stack.length - 1]]
          ) {
            const last = stack.pop();
            if (last) {
              output.push(last);
            }
          }
          stack.push(input[i]);
        }
      } else if (input[i] == "(") {
        stack.push(input[i]);
      } else if (input[i] == ")") {
        while (stack.length > 0 && stack[stack.length - 1] != "(") {
          const last = stack.pop();
          if (last !== undefined) {
            output.push(last);
          }
        }
        stack.pop();
      } else {
        output.push(input[i]);
      }
    }

    while (stack.length > 0) {
      const last = stack.pop();
      if (last !== undefined) {
        output.push(last);
      }
    }

    return output;
  }

  // Evalutes postfix expressions
  #evaluatePostfix(input: string[]): string {
    // Stack will hold both numbers and operators
    let stack: string[] = [];
    for (let item of input) {
      if ("+-*/^|".indexOf(item) > -1) {
        const first: number = Number(stack.pop());
        const second: number = Number(stack.pop());
        stack.push(String(this.#calculate(item, second, first)));
      } else if (Calculator.#unaryOperators.has(item)) {
        const first: number = Number(stack.pop());
        stack.push(String(this.#calculate(item, first)));
      } else {
        stack.push(item);
      }
    }

    return stack[stack.length - 1];
  }

  // Public method that returns an output value after taking the infix string as input
  evaluteInfix() {
    const tokenArray = this.#tokenize(this.#infixInput);
    const postfixArray = this.#toPostfix(tokenArray);
    const outputValue = this.#evaluatePostfix(postfixArray);

    return outputValue;
  }
}

export { Calculator };
