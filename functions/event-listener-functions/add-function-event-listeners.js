import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addFunctionEventListeners() {
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
      if (globals.getValue("oneClearDone")) {
        calculator.setInfix(value);
        globals.getValue("display").textContent = displayValue;
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

        globals.getValue("errorOccured") ||
        (globals.getValue("oneEvaluationDone") &&
          !globals.getValue("operatorAlreadyPresent"))
      ) {
        calculator.setInfix(value);
        setupNewNodes(displayValue, "");

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
        globals.getValue("display").textContent += displayValue;
        globals.setValue("newDisplayNodeAlreadyPresent", true);
      }

      globals.setValue("latestChar", "function");
      globals.setValue("operatorAlreadyPresent", true);
    });
  });
}

export { addFunctionEventListeners };
