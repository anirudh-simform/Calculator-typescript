import { calculator } from "../index.js";
import {
  globalBooleanVariables,
  globalHTMLElements,
} from "./add-event-listeners.js";
import { setupNewNodes } from "../../functions/event-listener-functions/setup-new-nodes.js";
function addConstantEventListeners() {
  // Constants
  const pi = document.querySelector(".pi") as HTMLDivElement;
  const e = document.querySelector(".e") as HTMLDivElement;

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
