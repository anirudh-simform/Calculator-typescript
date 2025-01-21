import { calculator } from "../index.js";
function addEventListeners() {
  const calculatorDisplayContainer = document.querySelector(
    ".calculator-display-container"
  );
  let display = document.querySelector(".calculator-display");
  let answerDisplay = document.querySelector(".answer-display");
  const trignometricFunctions = document.querySelectorAll(".trignometric");
  const secondButton = document.querySelector(".second-row");
  const angleToggle = document.querySelector(".angle-toggle");
  const theme = document.querySelector("#theme");

  // Dark mode button
  const toggleDarkModeButton = document.querySelector(".toggle-dark-mode");
  toggleDarkModeButton.addEventListener("click", () => {
    if (theme.getAttribute("href") == "light.css") {
      toggleDarkModeButton.textContent = "Light Mode";
      theme.href = "dark.css";
    } else {
      toggleDarkModeButton.textContent = "Dark Mode";
      theme.href = "light.css";
    }
  });

  // To check if the equals button has been pressed once
  let oneEvaluationDone = false;
  let oneClearDone = false;
  let errorOccured = false;
  let numberAfterError = false;

  // 2nd button lets use access the inverse trignometric functions
  secondButton.addEventListener("click", () => {
    trignometricFunctions.forEach((trig) => {
      if (trig.classList.contains("inverse")) {
        trig.innerHTML = trig.dataset.value;
        angleToggle.style.pointerEvents = "auto";
      } else {
        trig.innerHTML = trig.dataset.value + "<sup>-1</sup>";
        angleToggle.style.pointerEvents = "none";
      }
      trig.classList.toggle("inverse");
    });
  });

  // AC button (clears input)
  const allClear = document.querySelector(".all-clear");
  allClear.addEventListener("click", () => {
    calculator.clearInput();
    // Clone the display and answer display nodes
    const newDisplay = display.cloneNode();
    const newAnswerDisplay = answerDisplay.cloneNode();
    if (oneClearDone) {
      while (calculatorDisplayContainer.firstChild) {
        calculatorDisplayContainer.removeChild(
          calculatorDisplayContainer.firstChild
        );
      }

      newDisplay.textContent = "";
      newAnswerDisplay.textContent = "";

      // Update display and answerDisplay to refer to the latest two nodes
      display = newDisplay;
      answerDisplay = newAnswerDisplay;

      // Append the newly created nodes to the calculator display container
      calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

      // Reset oneEvaluationDone and oneClearDone
      oneEvaluationDone = false;
      oneClearDone = false;
      errorOccured = false;
      numberAfterError = false;
    } else {
      // Initialize the text content of both cloned nodes to empty string
      newDisplay.textContent = "0";
      newAnswerDisplay.textContent = "";

      // Reset Calculator
      calculator.setInfix("0");

      // Update display and answerDisplay to refer to the latest two nodes
      display = newDisplay;
      answerDisplay = newAnswerDisplay;

      // Append the newly created nodes to the calculator display container
      calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

      // Pin scrollbar in the display to the bottom
      calculatorDisplayContainer.scrollTop =
        calculatorDisplayContainer.scrollHeight -
        calculatorDisplayContainer.clientHeight;
    }
    oneClearDone = true;

    // Setting the button back to all clear
    allClear.textContent = "AC";
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
    let outputValue;
    try {
      outputValue = calculator.evaluteInfix();
      if (!outputValue) {
        throw new Error("The entered expression is incorrect");
      }
      calculator.setInfix(outputValue);
    } catch (err) {
      alert(err.message);
      outputValue = err.message;
      errorOccured = true;
    }

    answerDisplay.textContent = outputValue;

    // Pin scrollbar in the display to the bottom
    calculatorDisplayContainer.scrollTop =
      calculatorDisplayContainer.scrollHeight -
      calculatorDisplayContainer.clientHeight;

    if (!oneEvaluationDone) {
      oneEvaluationDone = true;
    }

    allClear.textContent = "C";
  });

  // Number buttons
  const numpadNumbers = document.querySelectorAll(".numpad-number");
  numpadNumbers.forEach((numberNode) => {
    numberNode.addEventListener("click", () => {
      const value = String(numberNode.dataset.value);

      // Checking if C has been pressed once to clear the previously present placeholder and not append the current number to the display
      if (oneClearDone) {
        calculator.setInfix(value);
        display.textContent = value;
      } else if (errorOccured) {
        calculator.setInfix(value);
        const newDisplay = display.cloneNode();
        const newAnswerDisplay = answerDisplay.cloneNode();
        newDisplay.textContent = value;
        newAnswerDisplay.textContent = "";

        // Update display and answerDisplay to refer to the latest two nodes
        display = newDisplay;
        answerDisplay = newAnswerDisplay;

        // Append the newly created nodes to the calculator display container
        calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

        // Pin scrollbar in the display to the bottom
        calculatorDisplayContainer.scrollTop =
          calculatorDisplayContainer.scrollHeight -
          calculatorDisplayContainer.clientHeight;

        numberAfterError = true;
        errorOccured = false;
      } else {
        calculator.appendChar(value);
        display.textContent += value;
      }
    });
  });

  // Operator buttons
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const value = String(operator.dataset.value);
      calculator.appendChar(value);
      if (!oneEvaluationDone || oneClearDone || numberAfterError) {
        display.textContent += value;

        // Toggling oneClearDone to false so that any numbers entered after this invocation render don't clear the display
        if (oneClearDone) {
          oneClearDone = false;
        }

        if (numberAfterError) {
          numberAfterError = false;
        }
      } else if (errorOccured) {
        calculator.setInfix("0" + value);
        const newDisplay = display.cloneNode();
        const newAnswerDisplay = answerDisplay.cloneNode();
        newDisplay.textContent = "0" + value;
        newAnswerDisplay.textContent = "";

        // Update display and answerDisplay to refer to the latest two nodes
        display = newDisplay;
        answerDisplay = newAnswerDisplay;

        // Append the newly created nodes to the calculator display container
        calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

        // Pin scrollbar in the display to the bottom
        calculatorDisplayContainer.scrollTop =
          calculatorDisplayContainer.scrollHeight -
          calculatorDisplayContainer.clientHeight;
      } else {
        // Clone the display and answerDisplay node to store the expression and answer for the next calculation
        const newDisplay = display.cloneNode();
        const newAnswerDisplay = answerDisplay.cloneNode();
        newDisplay.textContent = answerDisplay.textContent + value;
        newAnswerDisplay.textContent = "";

        // Update display and answerDisplay to refer to the latest two nodes
        display = newDisplay;
        answerDisplay = newAnswerDisplay;

        // Append the newly created nodes to the calculator display container
        calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

        // Pin scrollbar in the display to the bottom
        calculatorDisplayContainer.scrollTop =
          calculatorDisplayContainer.scrollHeight -
          calculatorDisplayContainer.clientHeight;
      }

      errorOccured = false;
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
      let value;
      let displayValue;
      if (node.classList.contains("inverse")) {
        value = String(node.dataset.inverseValue) + "(";
        displayValue = String(node.dataset.inverseDisplayValue) + "(";
      } else {
        value = String(node.dataset.value) + "(";
        displayValue = value;
      }
      calculator.appendChar(value);
      display.textContent += displayValue;
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
  // const inverse = document.querySelector(".inverse-number");
  // inverse.addEventListener("click", () => {
  //   const value = String(inverse.dataset.value);
  //   calculator.appendChar(value);
  //   display.textContent += value;
  // });

  const decimal = document.querySelector(".decimal");
  decimal.addEventListener("click", () => {
    const value = String(decimal.dataset.value);
    calculator.appendChar(value);
    display.textContent += value;
  });

  const mod = document.querySelector(".mod");
  mod.addEventListener("click", () => {
    if (oneClearDone) {
      oneClearDone = false;
    }
    const value = String(mod.dataset.value);
    calculator.appendChar(value);
    display.textContent += mod.textContent;
  });

  angleToggle.addEventListener("click", () => {
    if (angleToggle.classList.contains("deg")) {
      angleToggle.textContent = "rad";
      angleToggle.classList.remove("deg");
      secondButton.style.pointerEvents = "none";
    } else {
      angleToggle.textContent = "deg";
      angleToggle.classList.add("deg");
      secondButton.style.pointerEvents = "auto";
    }
    calculator.toggleAngleInput();
  });
}

export { addEventListeners };
