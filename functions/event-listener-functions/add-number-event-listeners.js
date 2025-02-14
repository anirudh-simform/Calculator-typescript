import { globals } from "../add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
import { calculator } from "../../index.js";
function addNumberEventListeners() {
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
      if (
        globals.getValue("oneClearDone") &&
        String(globals.getValue("display").textContent) == "0"
      ) {
        calculator.setInfix(value);
        globals.getValue("display").textContent = value;
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

        globals.getValue("errorOccured") ||
        (globals.getValue("oneEvaluationDone") &&
          !globals.getValue("operatorAlreadyPresent") &&
          !globals.getValue("newDisplayNodeAlreadyPresent"))
      ) {
        calculator.setInfix(value);
        setupNewNodes(value, "");

        if (globals.getValue("errorOccured")) {
          globals.setValue("errorOccured", false);
        }

        if (
          globals.getValue("oneEvaluationDone") &&
          !globals.getValue("operatorAlreadyPresent")
        ) {
          globals.setValue("operatorAlreadyPresent", false);
        }

        globals.setValue("newDisplayNodeAlreadyPresent", true);
      }
      // In all other cases append character to display normally
      else {
        calculator.appendChar(value);
        globals.getValue("display").textContent += value;
        globals.setValue("newDisplayNodeAlreadyPresent", true);
      }

      globals.setValue("latestChar", "number");
    });
  });
}

export { addNumberEventListeners };
