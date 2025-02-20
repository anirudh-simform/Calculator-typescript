import { calculator } from "../index.js";
import {
  globalHTMLElements,
  globalBooleanVariables,
  globalStringVariables,
} from "./add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addMiscellaneousButtonsEventListeners() {
  // miscellaneous
  const decimal = document.querySelector(".decimal") as HTMLDivElement;

  // Check if decimal is present in the DOM
  if (decimal !== null) {
    decimal.addEventListener("click", () => {
      const value = String(decimal.dataset.value);
      const answerDisplayValue =
        globalHTMLElements["answerDisplay"].textContent;
      const displayValue = globalHTMLElements["display"].textContent;
      // Adding decimals to empty expressions can cause errors
      if (
        globalBooleanVariables["errorOccured"] ||
        (answerDisplayValue != null && answerDisplayValue.length > 0)
      ) {
        calculator.setInfix("0.");
        setupNewNodes("0.", "");
        globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
      } else if (
        displayValue != null &&
        globalStringVariables["latestChar"] == "decimal"
      ) {
        return;
      } else {
        calculator.appendChar(value);
        globalHTMLElements["display"].textContent += value;

        if (globalBooleanVariables["oneClearDone"]) {
          globalBooleanVariables["oneClearDone"] = false;
        }
      }

      globalStringVariables["latestChar"] = "decimal";
    });
  }
}

export { addMiscellaneousButtonsEventListeners };
