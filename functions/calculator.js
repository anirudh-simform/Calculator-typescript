import { degToRad } from "./degree-to-radians.js";
class Calculator {
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

  static sqrt(a) {
    return Math.sqrt(a);
  }
}

function calculator(operator, ...operands) {
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
    case "%":
      return Calculator.percentage(operands[0]);
    case "sqrt":
      return Calculator.sqrt(operands[0]);

    default:
      return "This operator is not supported";
  }
}

export { calculator };
