import { globals } from "../add-event-listeners.js";
import { calculator } from "../../index.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addSquareRootEventListener() {
  // Square root button
  const squareRoot = document.querySelector(".square-root");
  squareRoot.addEventListener("click", () => {
    const value = String(squareRoot.dataset.value) + "(";

    if (
      globals.getValue("errorOccured") ||
      !globals.getValue("operatorAlreadyPresent")
    ) {
      calculator.setInfix(value);
      setupNewNodes(squareRoot.dataset.displayValue, "");
      globals.setValue("newDisplayNodeAlreadyPresent", true);

      if (globals.getValue("errorOccured")) {
        globals.setValue("errorOccured", false);
      }
    } else {
      calculator.appendChar(value);
      globals.getValue("display").textContent +=
        squareRoot.dataset.displayValue;
    }
  });
}

export { addSquareRootEventListener };
