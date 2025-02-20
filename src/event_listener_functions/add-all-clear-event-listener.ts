import {
  globalBooleanVariables,
  globalHTMLElements,
} from "./add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
import { calculator } from "../index.js";
function addAllClearEventListener() {
  // AC button (clears input)
  const allClear = document.querySelector(".all-clear");

  // Check if allClear is present in the DOM
  if (allClear !== null) {
    allClear.addEventListener("click", () => {
      calculator.clearInput();
      if (globalBooleanVariables["oneClearDone"]) {
        while (globalHTMLElements["calculatorDisplayContainer"].firstChild) {
          globalHTMLElements["calculatorDisplayContainer"].removeChild(
            globalHTMLElements["calculatorDisplayContainer"].firstChild
          );
        }

        setupNewNodes("", "");

        // Reset oneEvaluationDone and oneClearDone
        globalBooleanVariables["oneEvaluationDone"] = false;
        globalBooleanVariables["oneClearDone"] = false;
        globalBooleanVariables["errorOccured"] = false;
      } else {
        // Reset Calculator
        calculator.setInfix("0");
        setupNewNodes("0", "");
      }
      globalBooleanVariables["oneClearDone"] = true;
      // Setting the button back to all clear
      allClear.textContent = "AC";
    });
  }
}

export { addAllClearEventListener };
