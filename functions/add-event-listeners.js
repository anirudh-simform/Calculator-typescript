import { calculator } from "../index.js";
import { getCalculationObject } from "./get-calculation-object.js";
import { getHistoryArray } from "../data-objects/local-history-array.js";
function addEventListeners() {
  // Fetch required DOM nodes
  const calculatorDisplayContainer = document.querySelector(
    ".calculator-display-container"
  );
  let display = document.querySelector(".calculator-display");
  let answerDisplay = document.querySelector(".answer-display");
  const trignometricFunctions = document.querySelectorAll(".trignometric");
  const secondButton = document.querySelector(".second-row");
  const angleToggle = document.querySelector(".angle-toggle");

  let newDisplay;
  let newAnswerDisplay;

  // Pins scrollbar of the calculatorDisplayContainer to the bottom
  function pinDisplayToBottom() {
    // Pin scrollbar in the display to the bottom
    calculatorDisplayContainer.scrollTop =
      calculatorDisplayContainer.scrollHeight -
      calculatorDisplayContainer.clientHeight;
  }

  // Sets up new Display and answerDisplay nodes and updates the previous variables
  // to refer to the new nodes
  function setupNewNodes(newDisplayValue, newAnswerDisplayValue) {
    newDisplay = display.cloneNode();
    newAnswerDisplay = answerDisplay.cloneNode();
    newDisplay.textContent = newDisplayValue;
    newAnswerDisplay.textContent = newAnswerDisplayValue;

    // Update display and answerDisplay to refer to the latest two nodes
    display = newDisplay;
    answerDisplay = newAnswerDisplay;

    // Append the newly created nodes to the calculator display container
    calculatorDisplayContainer.append(newDisplay, newAnswerDisplay);

    pinDisplayToBottom();
  }

  // To check if the equals button has been pressed once
  let oneEvaluationDone = false;
  // To check if the display has been cleared once
  let oneClearDone = false;
  // To check if an error occured in the previous calculation
  let errorOccured = false;
  // To check if an operator is already present in the current expression
  let operatorAlreadyPresent = false;
  // To check if a new node to render the number has already been appended
  let newDisplayNodeAlreadyPresent = false;
  // Tracks the type of latest character added to display
  let latestChar;

  // 2nd button lets us access the inverse trignometric functions
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
    if (oneClearDone) {
      while (calculatorDisplayContainer.firstChild) {
        calculatorDisplayContainer.removeChild(
          calculatorDisplayContainer.firstChild
        );
      }

      setupNewNodes("", "");

      // Reset oneEvaluationDone and oneClearDone
      oneEvaluationDone = false;
      oneClearDone = false;
      errorOccured = false;
    } else {
      // Reset Calculator
      calculator.setInfix("0");
      setupNewNodes("0", "");
    }
    oneClearDone = true;

    // Setting the button back to all clear
    allClear.textContent = "AC";
  });

  // Backspace button (deletes the last character)
  const backspace = document.querySelector(".backspace");
  backspace.addEventListener("click", () => {
    let currDisplay = String(display.textContent);
    // if the display contains a function at the end remove all characters
    // of the function till it encounters a binary operator
    if (currDisplay.charAt(currDisplay.length - 1) == "(") {
      while (
        !("+-*/".indexOf(currDisplay.charAt(currDisplay.length - 1)) > -1)
      ) {
        calculator.removeLastChar();
        display.textContent = currDisplay.slice(0, currDisplay.length - 1);
        currDisplay = String(display.textContent);
      }
    } else {
      calculator.removeLastChar();
      display.textContent = currDisplay.slice(0, currDisplay.length - 1);
    }
  });

  // Equals button (evaluates expression)
  const equals = document.querySelector(".equals");
  equals.addEventListener("click", () => {
    let outputValue;
    let expression;
    try {
      expression = calculator.getInfix();
      outputValue = calculator.evaluteInfix();
      if (!outputValue) {
        throw new Error("The entered expression is incorrect");
      }
      calculator.setInfix(outputValue);
    } catch (err) {
      alert(err.message);
      outputValue = err.message;
      errorOccured = true;
      latestChar = "error message";
    }

    answerDisplay.textContent = outputValue;
    pinDisplayToBottom();

    if (!oneEvaluationDone) {
      oneEvaluationDone = true;
    }

    allClear.textContent = "C";
    operatorAlreadyPresent = false;
    newDisplayNodeAlreadyPresent = false;
    oneClearDone = false;

    const history = getHistoryArray();
    history.push(getCalculationObject(expression, outputValue));
    localStorage.setItem("history", JSON.stringify(history));
  });

  // Number buttons
  const numpadNumbers = document.querySelectorAll(".numpad-number");
  numpadNumbers.forEach((numberNode) => {
    numberNode.addEventListener("click", () => {
      const value = String(numberNode.dataset.value);

      /* 
      If the display is in cleared state replace the already present zero with the clicked number
      Display
      =====================================
      0 --> value
      */
      if (oneClearDone && String(display.textContent) == "0") {
        calculator.setInfix(value);
        display.textContent = value;
      } else if (
        /*
      if the display is in error state 
      or 
      if one evaluation has been done 
      and 
      currently the display does not have any operators
      and
      A new display is not present
      then
      make new nodes that contains the value of the clicked number with a blank answer node
      Display
      =========================================================================================================
      Error State                                       |        (oneEvaluationDone && !operatorAlreadyPresent)      
      --------------------------------                  |        ---------------------------------------
      Can't divide by zero --> Can't divide by zero     |        number --> number
                               value (in new node)                          value (in new node)
      */

        errorOccured ||
        (oneEvaluationDone &&
          !operatorAlreadyPresent &&
          !newDisplayNodeAlreadyPresent)
      ) {
        calculator.setInfix(value);
        setupNewNodes(value, "");

        if (errorOccured) {
          errorOccured = false;
        }

        if (oneEvaluationDone && !operatorAlreadyPresent) {
          operatorAlreadyPresent = false;
        }

        newDisplayNodeAlreadyPresent = true;
      }
      // In all other cases append character to display normally
      else {
        calculator.appendChar(value);
        display.textContent += value;
        newDisplayNodeAlreadyPresent = true;
      }

      latestChar = "number";
    });
  });

  // Operator buttons
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const value = String(operator.dataset.value);
      calculator.appendChar(value);
      /*
      if 
      one evalutation has been done
      or
      the display has been cleared once
      or
      new display node is already present with operands
      or
      the latest character is an operator
      then
      append operator normally to display

      Display
      =========================
      eg. 8 --> 8+
      */
      if (
        !oneEvaluationDone ||
        oneClearDone ||
        newDisplayNodeAlreadyPresent ||
        latestChar == "operator"
      ) {
        display.textContent += value;

        // Toggling oneClearDone to false so that any numbers entered after this invocation don't clear the display
        if (oneClearDone) {
          oneClearDone = false;
        }
      } else if (errorOccured) {
        /*
      if an error has occured
      then
      setup new nodes with value of zero concatenated with the operator

      Display
      ==========================
      eg. error --> In new node => 0+
      */
        calculator.setInfix("0" + value);
        setupNewNodes("0" + value, "");
        newDisplayNodeAlreadyPresent = true;
      } else {
        /*
      For all other cases setup new nodes with values of the previous answer concatenated with the operator
      Display
      ================================
      eg.
      5+7
      12 --> 12+
      */
        setupNewNodes(answerDisplay.textContent + value, "");
      }

      errorOccured = false;
      operatorAlreadyPresent = true;
      latestChar = "operator";
    });
  });

  // Constants
  const pi = document.querySelector(".pi");
  const e = document.querySelector(".e");

  pi.addEventListener("click", () => {
    const value = String(pi.dataset.value);
    calculator.appendChar(value);
    if (!operatorAlreadyPresent) {
      calculator.setInfix(value);
      setupNewNodes(pi.textContent, "");
      newDisplayNodeAlreadyPresent = true;
    } else {
      display.textContent += pi.textContent;
    }
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

      /* 
      If the display is in cleared state replace the already present zero with the clicked number
      Display
      =====================================
      0 --> value
      */
      if (oneClearDone) {
        calculator.setInfix(value);
        display.textContent = displayValue;
      } else if (
        /*
      if the display is in error state 
      or 
      if one evaluation has been done and currently the display does not have any operators
      then
      make new nodes that contains the value of the clicked number with a blank answer node
      Display
      =========================================================================================================
      Error State                                       |        (oneEvaluationDone && !operatorAlreadyPresent)      
      --------------------------------                  |        ---------------------------------------
      Can't divide by zero --> Can't divide by zero     |        number --> number
                               value (in new node)                          value (in new node)
      */

        errorOccured ||
        (oneEvaluationDone && !operatorAlreadyPresent)
      ) {
        calculator.setInfix(value);
        setupNewNodes(displayValue, "");

        if (errorOccured) {
          errorOccured = false;
        }

        if (oneEvaluationDone && !operatorAlreadyPresent) {
          operatorAlreadyPresent = false;
        }

        newDisplayNodeAlreadyPresent = true;
      }
      // In all other cases append character to display normally
      else {
        calculator.appendChar(value);
        display.textContent += displayValue;
        newDisplayNodeAlreadyPresent = true;
      }

      latestChar = "function";
      operatorAlreadyPresent = true;
    });
  });

  // Square root button
  const squareRoot = document.querySelector(".square-root");
  squareRoot.addEventListener("click", () => {
    const value = String(squareRoot.dataset.value) + "(";

    if (errorOccured || !operatorAlreadyPresent) {
      calculator.setInfix(value);
      setupNewNodes(squareRoot.dataset.displayValue, "");
      newDisplayNodeAlreadyPresent = true;

      if (errorOccured) {
        errorOccured = false;
      }
    } else {
      calculator.appendChar(value);
      display.textContent += squareRoot.dataset.displayValue;
    }
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

  // Toggle angle between degree and radian
  angleToggle.addEventListener("click", () => {
    if (angleToggle.classList.contains("deg")) {
      angleToggle.textContent = "rad";
      angleToggle.classList.remove("deg");
      // Disable 2nd row button when angle toggle is set to radians
      secondButton.style.pointerEvents = "none";
    } else {
      angleToggle.textContent = "deg";
      angleToggle.classList.add("deg");
      // Enable 2nd row button when angle toggle is set to degree
      secondButton.style.pointerEvents = "auto";
    }
    calculator.toggleAngleInput();
  });
}

export { addEventListeners };
