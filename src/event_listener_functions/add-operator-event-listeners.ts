import { calculator } from "../index.js";
import {
  globalBooleanVariables,
  globalHTMLElements,
  globalStringVariables,
} from "./add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addOperatorEventListeners() {
  // Operator buttons
  const operators = document.querySelectorAll(
    ".operator"
  ) as NodeListOf<HTMLDivElement>;
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
        !globalBooleanVariables["oneEvaluationDone"] ||
        globalBooleanVariables["oneClearDone"] ||
        globalBooleanVariables["newDisplayNodeAlreadyPresent"] ||
        globalStringVariables["latestChar"] == "operator"
      ) {
        globalHTMLElements["display"].textContent += value;

        // Toggling oneClearDone to false so that any numbers entered after this invocation don't clear the display
        if (globalBooleanVariables["oneClearDone"]) {
          globalBooleanVariables["oneClearDone"] = false;
        }
      } else if (globalBooleanVariables["errorOccured"]) {
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
        globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
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
          globalHTMLElements["answerDisplay"].textContent + value,
          ""
        );
      }

      globalBooleanVariables["errorOccured"] = false;
      globalBooleanVariables["operatorAlreadyPresent"] = true;
      globalStringVariables["latestChar"] = "operator";
    });
  });
}

export { addOperatorEventListeners };
