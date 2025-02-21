import {
  globalBooleanVariables,
  globalHTMLElements,
  globalStringVariables,
} from "./add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
import { calculator } from "../index.js";
function addNumberEventListeners() {
  // Number buttons
  const numpadNumbers = document.querySelectorAll(
    ".numpad-number"
  ) as NodeListOf<HTMLDivElement>;
  numpadNumbers.forEach((numberNode) => {
    numberNode.addEventListener("click", () => {
      const value = String(numberNode.dataset.value);

      /* 
      If the display is in cleared state replace the already present zero with the clicked number
      Display
      =====================================
      0 --> value
      */
      if (
        globalBooleanVariables["oneClearDone"] &&
        String(globalHTMLElements["display"].textContent) == "0"
      ) {
        calculator.setInfix(value);
        globalHTMLElements["display"].textContent = value;
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

        globalBooleanVariables["errorOccured"] ||
        (globalBooleanVariables["oneEvaluationDone"] &&
          !globalBooleanVariables["operatorAlreadyPresent"] &&
          !globalBooleanVariables["newDisplayNodeAlreadyPresent"])
      ) {
        calculator.setInfix(value);
        setupNewNodes(value, "");

        if (globalBooleanVariables["errorOccured"]) {
          globalBooleanVariables["errorOccured"] = false;
        }

        if (
          globalBooleanVariables["oneEvaluationDone"] &&
          !globalBooleanVariables["operatorAlreadyPresent"]
        ) {
          globalBooleanVariables["operatorAlreadyPresent"] = false;
        }

        globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
      }
      // In all other cases append character to display normally
      else {
        calculator.appendChar(value);
        globalHTMLElements["display"].textContent += value;
        // setting newDisplayAlreadyPresent to true so other buttons don't create new nodes
        globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
      }

      globalStringVariables["latestChar"] = "number";
    });
  });
}

export { addNumberEventListeners };
