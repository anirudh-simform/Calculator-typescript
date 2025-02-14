import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
import { setupNewNodes } from "./setup-new-nodes.js";
function addConstantEventListeners() {
  // Constants
  const pi = document.querySelector(".pi");
  const e = document.querySelector(".e");

  pi.addEventListener("click", () => {
    const value = String(pi.dataset.value);
    calculator.appendChar(value);
    if (!globals.getValue("operatorAlreadyPresent")) {
      calculator.setInfix(value);
      setupNewNodes(pi.textContent, "");
      globals.setValue("newDisplayNodeAlreadyPresent", true);
    } else {
      globals.getValue("display").textContent += pi.textContent;
    }
  });

  e.addEventListener("click", () => {
    const value = String(e.dataset.value);
    calculator.appendChar(value);
    globals.getValue("display").textContent += e.textContent;
  });
}

export { addConstantEventListeners };
