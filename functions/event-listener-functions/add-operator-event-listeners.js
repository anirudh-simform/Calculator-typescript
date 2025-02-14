import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addOperatorEventListeners() {
  // Operator buttons
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const value = String(operator.dataset.value);
      calculator.appendChar(value);
      /*
      if 
      one evalutation has been done
      or
      the display has been cleared once
      or
      new display node is already present with operands
      or
      the latest character is an operator
      then
      append operator normally to display

      Display
      =========================
      eg. 8 --> 8+
      */
      if (
        !globals.getValue("oneEvaluationDone") ||
        globals.getValue("oneClearDone") ||
        globals.getValue("newDisplayNodeAlreadyPresent") ||
        globals.getValue("latestChar") == "operator"
      ) {
        globals.getValue("display").textContent += value;

        // Toggling oneClearDone to false so that any numbers entered after this invocation don't clear the display
        if (globals.getValue("oneClearDone")) {
          globals.setValue("oneClearDone", false);
        }
      } else if (globals.getValue("errorOccured")) {
        /*
      if an error has occured
      then
      setup new nodes with value of zero concatenated with the operator

      Display
      ==========================
      eg. error --> In new node => 0+
      */
        calculator.setInfix("0" + value);
        setupNewNodes("0" + value, "");
        globals.setValue("newDisplayNodeAlreadyPresent", true);
      } else {
        /*
      For all other cases setup new nodes with values of the previous answer concatenated with the operator
      Display
      ================================
      eg.
      5+7
      12 --> 12+
      */
        setupNewNodes(
          globals.getValue("answerDisplay").textContent + value,
          ""
        );
      }

      globals.setValue("errorOccured", false);
      globals.setValue("operatorAlreadyPresent", true);
      globals.setValue("latestChar", "operator");
    });
  });
}

export { addOperatorEventListeners };
