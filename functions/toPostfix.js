import { precedence } from "../data-objects/constants.js";
function toPostfix(input) {
  let output = [];
  let stack = [];

  for (let i = 0; i <= input.length - 1; i++) {
    if (precedence[input[i]]) {
      if (stack.length == 0) {
        stack.push(input[i]);
      } else if (precedence[input[i]] > precedence[stack[stack.length - 1]]) {
        stack.push(input[i]);
      } else if (stack[stack.length - 1] == "^" && input[i] == "^") {
        stack.push(input[i]);
      } else {
        while (
          stack.length > 0 &&
          precedence[input[i]] <= precedence[stack[stack.length - 1]]
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

export { toPostfix };
