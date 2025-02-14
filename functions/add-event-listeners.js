import { addSecondButtonEventListener } from "./event-listener-functions/add-second-button-event-listener.js";
import { addAllClearEventListener } from "./event-listener-functions/add-all-clear-event-listener.js";
import { addBackspaceEventListener } from "./event-listener-functions/add-backspace-event-listener.js";
import { addEqualsEventListener } from "./event-listener-functions/add-equals-event-listener.js";
import { addNumberEventListeners } from "./event-listener-functions/add-number-event-listeners.js";
import { addOperatorEventListeners } from "./event-listener-functions/add-operator-event-listeners.js";
import { addFunctionEventListeners } from "./event-listener-functions/add-function-event-listeners.js";
import { addConstantEventListeners } from "./event-listener-functions/add-constant-event-listeners.js";
import { addSquareRootEventListener } from "./event-listener-functions/add-square-root-event-listener.js";
import { addParentthesisEventListeners } from "./event-listener-functions/add-parenthesis-event-listeners.js";
import { addMiscellaneousButtonsEventListeners } from "./event-listener-functions/add-miscellaneous-buttons-event-listeners.js";
import { addAngleToggleEventListener } from "./event-listener-functions/add-angle-toggle-event-listeners.js";

// Global constants

const globals = {
  calculatorDisplayContainer: document.querySelector(
    ".calculator-display-container"
  ),
  display: document.querySelector(".calculator-display"),
  answerDisplay: document.querySelector(".answer-display"),
  trignometricFunctions: document.querySelectorAll(".trignometric"),
  secondButton: document.querySelector(".second-row"),
  angleToggle: document.querySelector(".angle-toggle"),
  newDisplay: undefined,
  newAnswerDisplay: undefined,
  oneEvaluationDone: false,
  oneClearDone: false,
  errorOccured: false,
  operatorAlreadyPresent: false,
  newDisplayNodeAlreadyPresent: false,
  latestChar: undefined,

  getValue(value) {
    return globals[value];
  },

  setValue(parameter, value) {
    globals[parameter] = value;
  },
};

// Fetch required DOM nodes

function addEventListeners() {
  addSecondButtonEventListener();

  addAllClearEventListener();

  addBackspaceEventListener();

  addEqualsEventListener();

  addNumberEventListeners();

  addOperatorEventListeners();

  addFunctionEventListeners();

  addConstantEventListeners();

  addSquareRootEventListener();

  addParentthesisEventListeners();

  addMiscellaneousButtonsEventListeners();

  addAngleToggleEventListener();
}

export { addEventListeners, globals };
