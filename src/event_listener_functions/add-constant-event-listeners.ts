import { calculator } from "../index.js";
import {
  globalBooleanVariables,
  globalHTMLElements,
} from "./add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addConstantEventListeners() {
  // Constants
  const pi = document.querySelector(".pi") as HTMLDivElement;
  const e = document.querySelector(".e") as HTMLDivElement;

  // Check if pi is present in the DOM
  if (pi !== null) {
    pi.addEventListener("click", () => {
      const value = String(pi.dataset.value);
      calculator.appendChar(value);
      if (!globalBooleanVariables["operatorAlreadyPresent"]) {
        calculator.setInfix(value);
        const piContent = pi.textContent;
        if (piContent !== null) {
          setupNewNodes(piContent, "");
        }

        globalBooleanVariables["newDisplayNodeAlreadyPresent"] = true;
      } else {
        const piContent = pi.textContent;
        if (piContent !== null) {
          globalHTMLElements["display"].textContent += piContent;
        }
      }
    });
  }

  // Check if e is present in the DOM
  if (e !== null) {
    e.addEventListener("click", () => {
      const value = String(e.dataset.value);
      calculator.appendChar(value);
      const eContent = e.textContent;
      if (eContent !== null) {
        globalHTMLElements["display"].textContent += eContent;
      }
    });
  }
}

export { addConstantEventListeners };
