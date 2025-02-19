import { addSecondButtonEventListener } from "./add-second-button-event-listener.js";
import { addAllClearEventListener } from "./add-all-clear-event-listener.js";
import { addBackspaceEventListener } from "./add-backspace-event-listener.js";
import { addEqualsEventListener } from "./add-equals-event-listener.js";
import { addNumberEventListeners } from "./add-number-event-listeners.js";
import { addOperatorEventListeners } from "./add-operator-event-listeners.js";
import { addFunctionEventListeners } from "./add-function-event-listeners.js";
import { addConstantEventListeners } from "./add-constant-event-listeners.js";
import { addSquareRootEventListener } from "./add-square-root-event-listener.js";
import { addParentthesisEventListeners } from "./add-parenthesis-event-listeners.js";
import { addMiscellaneousButtonsEventListeners } from "./add-miscellaneous-buttons-event-listeners.js";
import { addAngleToggleEventListener } from "./add-angle-toggle-event-listeners.js";

// Global constants

type GlobalKey =
  | "calculatorDisplayContainer"
  | "display"
  | "answerDisplay"
  | "trignometricFunctions"
  | "secondButton"
  | "angleToggle"
  | "newDisplay"
  | "newAnswerDisplay"
  | "oneEvaluationDone"
  | "oneClearDone"
  | "errorOccured"
  | "operatorAlreadyPresent"
  | "newDisplayNodeAlreadyPresent"
  | "latestChar";

type GlobalValue = boolean | HTMLDivElement | NodeListOf<HTMLElement> | string;
interface GlobalHTMLElements {
  calculatorDisplayContainer: HTMLDivElement;
  display: HTMLDivElement;
  answerDisplay: HTMLDivElement;
  secondButton: HTMLDivElement;
  angleToggle: HTMLDivElement;
  newDisplay: HTMLDivElement;
  newAnswerDisplay: HTMLDivElement;
}

interface GlobalNodeListElements {
  [index: string]: NodeListOf<HTMLDivElement>;
  trignometricFunctions: NodeListOf<HTMLDivElement>;
}

interface GlobalBooleanVariables {
  [index: string]: boolean;
  oneEvaluationDone: boolean;
  oneClearDone: boolean;
  errorOccured: boolean;
  operatorAlreadyPresent: boolean;
  newDisplayNodeAlreadyPresent: boolean;
}

interface GlobalStringVariables {
  [index: string]: string;
  latestChar: string;
}

const globalHTMLElements: GlobalHTMLElements = {
  calculatorDisplayContainer: document.querySelector(
    ".calculator-display-container"
  ) as HTMLDivElement,
  display: document.querySelector(".calculator-display") as HTMLDivElement,
  answerDisplay: document.querySelector(".answer-display") as HTMLDivElement,
  secondButton: document.querySelector(".second-row") as HTMLDivElement,
  angleToggle: document.querySelector(".angle-toggle") as HTMLDivElement,
  newDisplay: document.createElement("div"),
  newAnswerDisplay: document.createElement("div"),
};

const globalBooleanVariables: GlobalBooleanVariables = {
  oneEvaluationDone: false,
  oneClearDone: false,
  errorOccured: false,
  operatorAlreadyPresent: false,
  newDisplayNodeAlreadyPresent: false,
};

const globalStringVariables: GlobalStringVariables = {
  latestChar: "",
};

const globalNodeListElements: GlobalNodeListElements = {
  trignometricFunctions: document.querySelectorAll(".trignometric"),
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

export {
  addEventListeners,
  globalBooleanVariables,
  globalHTMLElements,
  globalNodeListElements,
  globalStringVariables,
};
