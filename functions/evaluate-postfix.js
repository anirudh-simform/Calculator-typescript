import { calculator } from "./calculator.js";
import { unaryOperators } from "../data-objects/constants.js";
function evaluatePostfix(input) {
  let stack = [];
  for (let item of input) {
    if ("+-*/^".indexOf(item) > -1) {
      const first = Number(stack.pop());
      const second = Number(stack.pop());
      stack.push(calculator(item, second, first));
    } else if (unaryOperators.has(item)) {
      const first = Number(stack.pop());
      stack.push(calculator(item, first));
    } else {
      stack.push(item);
    }
  }

  return stack[stack.length - 1];
}

export { evaluatePostfix };
