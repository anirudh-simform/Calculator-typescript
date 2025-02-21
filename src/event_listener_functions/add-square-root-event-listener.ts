import {
  globalBooleanVariables,
  globalHTMLElements,
} from "./add-event-listeners.js";
import { calculator } from "../index.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addSquareRootEventListener() {
  // Square root button
  const squareRoot = document.querySelector(".square-root") as HTMLDivElement;
  if (squareRoot !== null) {
    squareRoot.addEventListener("click", () => {
      const value = String(squareRoot.dataset.value) + "(";

      if (
        globalBooleanVariables["errorOccured"] ||
        !globalBooleanVariables["operatorAlreadyPresent"]
      ) {
        calculator.setInfix(value);
        const squareRootDisplayValue = squareRoot.dataset.displayValue;
        if (squareRootDisplayValue !== undefined) {
          setupNewNodes(squareRootDisplayValue, "");
          globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
        }

        if (globalBooleanVariables["errorOccured"]) {
          globalBooleanVariables["errorOccured"] = false;
        }
      } else {
        calculator.appendChar(value);
        const squareRootDisplayValue = squareRoot.dataset.displayValue;
        if (squareRootDisplayValue !== undefined) {
          globalHTMLElements["display"].textContent += squareRootDisplayValue;
        }
      }
    });
  }
}

export { addSquareRootEventListener };
