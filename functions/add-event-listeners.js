import { calculator } from "../index.js";
function addEventListeners() {
  const display = document.querySelector(".calculator-display");
  const answerDisplay = document.querySelector(".answer-display");

  // AC button (clears input)
  const allClear = document.querySelector(".all-clear");
  allClear.addEventListener("click", () => {
    calculator.clearInput();
    answerDisplay.textContent = "";
    display.textContent = "";
  });

  // Backspace button (deletes the last character)
  const backspace = document.querySelector(".backspace");
  backspace.addEventListener("click", () => {
    calculator.removeLastChar();
    const currDisplay = String(display.textContent);
    display.textContent = currDisplay.slice(0, currDisplay.length - 1);
  });

  // Equals button (evaluates expression)
  const equals = document.querySelector(".equals");
  equals.addEventListener("click", () => {
    const outputValue = calculator.evaluteInfix();

    answerDisplay.textContent = outputValue;
    calculator.setInfix(outputValue);
  });

  // Number buttons
  const numpadNumbers = document.querySelectorAll(".numpad-number");
  numpadNumbers.forEach((numberNode) => {
    numberNode.addEventListener("click", () => {
      const value = String(numberNode.dataset.value);
      calculator.appendChar(value);
      display.textContent += numberNode.textContent;
    });
  });

  // Operator buttons
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const value = String(operator.dataset.value);
      calculator.appendChar(value);
      display.textContent += value;
    });
  });

  // Constants
  const pi = document.querySelector(".pi");
  const e = document.querySelector(".e");

  pi.addEventListener("click", () => {
    const value = String(pi.dataset.value);
    calculator.appendChar(value);
    display.textContent += pi.textContent;
  });

  e.addEventListener("click", () => {
    const value = String(e.dataset.value);
    calculator.appendChar(value);
    display.textContent += e.textContent;
  });

  // Functions
  const functionNodes = document.querySelectorAll(".function");
  functionNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const value = String(node.dataset.value) + "(";
      calculator.appendChar(value);
      display.textContent += value;
    });
  });

  const squareRoot = document.querySelector(".square-root");
  squareRoot.addEventListener("click", () => {
    const value = String(squareRoot.dataset.value) + "(";
    calculator.appendChar(value);
    display.textContent += squareRoot.dataset.displayValue;
  });

  // Parenthesis
  const openPara = document.querySelector(".open-para");
  const closedPara = document.querySelector(".close-para");

  openPara.addEventListener("click", () => {
    const value = String(openPara.dataset.value);
    calculator.appendChar(value);
    display.textContent += value;
  });

  closedPara.addEventListener("click", () => {
    const value = String(closedPara.dataset.value);
    calculator.appendChar(value);
    display.textContent += value;
  });

  // miscellaneous
  const inverse = document.querySelector(".inverse-number");
  inverse.addEventListener("click", () => {
    const value = String(inverse.dataset.value);
    calculator.appendChar(value);
    display.textContent += value;
  });

  const decimal = document.querySelector(".decimal");
  decimal.addEventListener("click", () => {
    const value = String(decimal.dataset.value);
    calculator.appendChar(value);
    display.textContent += value;
  });

  const mod = document.querySelector(".mod");
  mod.addEventListener("click", () => {
    const value = String(mod.dataset.value);
    calculator.appendChar(value);
    display.textContent += mod.textContent;
  });
}

export { addEventListeners };
