import { globals } from "../add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
import { calculator } from "../../index.js";
function addAllClearEventListener() {
  // AC button (clears input)
  const allClear = document.querySelector(".all-clear");
  allClear.addEventListener("click", () => {
    calculator.clearInput();
    if (globals.getValue("oneClearDone")) {
      while (globals.getValue("calculatorDisplayContainer").firstChild) {
        globals
          .getValue("calculatorDisplayContainer")
          .removeChild(
            globals.getValue("calculatorDisplayContainer").firstChild
          );
      }

      setupNewNodes("", "");

      // Reset oneEvaluationDone and oneClearDone
      globals.setValue("oneEvaluationDone", false);
      globals.setValue("oneClearDone", false);
      globals.setValue("errorOccured", false);
    } else {
      // Reset Calculator
      calculator.setInfix("0");
      setupNewNodes("0", "");
    }
    globals.setValue("oneClearDone", true);
    // Setting the button back to all clear
    allClear.textContent = "AC";
  });
}

export { addAllClearEventListener };
