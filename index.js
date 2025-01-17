import { tokenize } from "./functions/tokenize.js";
import { evaluatePostfix } from "./functions/evaluate-postfix.js";
import { toPostfix } from "./functions/toPostfix.js";

// main script

const input = document.querySelector(".calculator-input");
const output = document.querySelector(".output");
const button = document.querySelector(".evalute");
const safeToStart = false;

button.addEventListener("click", (event) => {
  try {
    const tokenArray = tokenize(String(input.value));
    const postfixArray = toPostfix(tokenArray);
    const outputValue = evaluatePostfix(postfixArray);

    output.textContent = outputValue;
  } catch (err) {
    console.log(err.message);
  }
});
