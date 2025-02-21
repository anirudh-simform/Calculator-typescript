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

  // Check if equals and allClear are present in the DOM
  if (equals !== null && allClear !== null) {
    equals.addEventListener("click", () => {
      let outputValue: number;
      let expression: string = "";
      try {
        expression = String(globalHTMLElements["display"].textContent);
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

      globalHTMLElements["answerDisplay"].textContent = String(outputValue);
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
        history.push(getCalculationObject(expression, String(outputValue)));
        localStorage.setItem("history", JSON.stringify(history));
      }
    });
  }
}

export { addEqualsEventListener };
