import { calculator } from "../index.js";
import {
  globalBooleanVariables,
  globalHTMLElements,
  globalStringVariables,
} from "./add-event-listeners.js";
import { getHistoryArray } from "../data-objects/local-history-array.js";
import { getCalculationObject } from "../helper_functions/get-calculation-object.js";
import { pinDisplayToBottom } from "./pin-display-to-bottom.js";
function addEqualsEventListener() {
  // Equals button (evaluates expression)
  const equals = document.querySelector(".equals");
  const allClear = document.querySelector(".all-clear");

  if (equals !== null && allClear !== null) {
    equals.addEventListener("click", () => {
      let outputValue;
      let expression: string | undefined;
      try {
        expression = calculator.getInfix();
        outputValue = Number(calculator.evaluteInfix());
        if (outputValue === undefined || isNaN(outputValue)) {
          throw new Error("The entered expression is incorrect");
        }
        calculator.setInfix(String(outputValue));
      } catch (err: any) {
        alert(err.message);
        outputValue = err.message;
        globalBooleanVariables["errorOccured"] = true;
        globalStringVariables["latestChar"] = "error message";
      }

      globalHTMLElements["answerDisplay"].textContent = outputValue;
      pinDisplayToBottom();

      if (!globalBooleanVariables["oneEvaluationDone"]) {
        globalBooleanVariables["oneEvaluationDone"] = true;
      }

      allClear.textContent = "C";
      globalBooleanVariables["operatorAlreadyPresent"] = false;
      globalBooleanVariables["newDisplayNodeAlreadyPresent"] = false;
      globalBooleanVariables["oneClearDone"] = false;

      const history = getHistoryArray();
      if (expression && outputValue) {
        history.push(getCalculationObject(expression, outputValue));
        localStorage.setItem("history", JSON.stringify(history));
      }
    });
  }
}

export { addEqualsEventListener };
