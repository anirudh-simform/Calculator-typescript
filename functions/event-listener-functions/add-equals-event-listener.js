import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
import { getHistoryArray } from "../../data-objects/local-history-array.js";
import { getCalculationObject } from "../get-calculation-object.js";
import { pinDisplayToBottom } from "./pin-display-to-bottom.js";

function addEqualsEventListener() {
  // Equals button (evaluates expression)
  const equals = document.querySelector(".equals");
  const allClear = document.querySelector(".all-clear");

  equals.addEventListener("click", () => {
    let outputValue;
    let expression;
    try {
      expression = calculator.getInfix();
      outputValue = calculator.evaluteInfix();
      if (outputValue === undefined || isNaN(outputValue)) {
        throw new Error("The entered expression is incorrect");
      }
      calculator.setInfix(outputValue);
    } catch (err) {
      alert(err.message);
      outputValue = err.message;
      globals.setValue("errorOccured", true);
      globals.setValue("latestChar", "error message");
    }

    globals.getValue("answerDisplay").textContent = outputValue;
    pinDisplayToBottom();

    if (!globals.getValue("oneEvaluationDone")) {
      globals.setValue("oneEvaluationDone", true);
    }

    allClear.textContent = "C";
    globals.setValue("operatorAlreadyPresent", false);
    globals.setValue("newDisplayNodeAlreadyPresent", false);
    globals.setValue("oneClearDone", false);

    const history = getHistoryArray();
    history.push(getCalculationObject(expression, outputValue));
    localStorage.setItem("history", JSON.stringify(history));
  });
}

export { addEqualsEventListener };
