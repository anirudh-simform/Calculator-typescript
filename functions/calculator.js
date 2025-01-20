import { degToRad } from "./degree-to-radians.js";
class Calculator {
  #infixInput;

  constructor() {
    this.#infixInput = "";
  }

  setInfix(inputString) {
    this.#infixInput = inputString;
  }

  appendChar(char) {
    this.#infixInput = this.#infixInput + char;
  }

  removeLastChar() {
    if (this.#infixInput) {
      this.#infixInput = this.#infixInput.slice(0, this.#infixInput.length - 1);
    }
  }

  getInfix() {
    return this.#infixInput;
  }

  clearInput() {
    this.#infixInput = "";
  }

  // basic operations
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static divide(a, b) {
    return a / b;
  }

  static power(a, b) {
    return a ** b;
  }

  static modularDivision(a, b) {
    return a % b;
  }

  static percentage(a) {
    return a / 100;
  }

  static sin(a) {
    a = degToRad(a);
    return Math.round(Math.sin(a) * 10) / 10;
  }

  static cos(a) {
    a = degToRad(a);
    return Math.round(Math.cos(a) * 10) / 10;
  }

  static tan(a) {
    a = degToRad(a);
    return Math.round(Math.tan(a) * 10) / 10;
  }

  static percentage(a) {
    return this.divide(a, 100);
  }

  static log(a) {
    return Math.log10(a);
  }

  static ln(a) {
    return Math.log(a);
  }

  static sqrt(a) {
    return Math.sqrt(a);
  }

  static uminus(a) {
    return a * -1;
  }

  static factorial(n) {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }

    return fact;
  }

  // constants used in calculation
  static #precedence = {
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
    log: 10,
    sqrt: 10,
    ln: 10,
    uminus: 11,
  };

  static #unaryOperators = new Set([
    "sin",
    "cos",
    "tan",
    "log",
    "sqrt",
    "%",
    "ln",
    "uminus",
    "!",
  ]);

  // Functions for processing input string

  // A helper function that selects the correct function based on its inputs
  #calculate(operator, ...operands) {
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
  #tokenize(input) {
    let str = "";
    let arr = [];

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
  #toPostfix(input) {
    let output = [];
    let stack = [];

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
            output.push(last);
          }
          stack.push(input[i]);
        }
      } else if (input[i] == "(") {
        stack.push(input[i]);
      } else if (input[i] == ")") {
        while (stack.length > 0 && stack[stack.length - 1] != "(") {
          const last = stack.pop();
          output.push(last);
        }
        stack.pop();
      } else {
        output.push(input[i]);
      }
    }

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    return output;
  }

  // Evalutes postfix expressions
  #evaluatePostfix(input) {
    let stack = [];
    for (let item of input) {
      if ("+-*/^|".indexOf(item) > -1) {
        const first = Number(stack.pop());
        const second = Number(stack.pop());
        stack.push(this.#calculate(item, second, first));
      } else if (Calculator.#unaryOperators.has(item)) {
        const first = Number(stack.pop());
        stack.push(this.#calculate(item, first));
      } else {
        stack.push(item);
      }
    }

    return stack[stack.length - 1];
  }

  evaluteInfix() {
    const tokenArray = this.#tokenize(this.#infixInput);
    const postfixArray = this.#toPostfix(tokenArray);
    const outputValue = this.#evaluatePostfix(postfixArray);

    return outputValue;
  }
}

export { Calculator };
