import { calculator } from "../index.js";
import {
  globalBooleanVariables,
  globalHTMLElements,
} from "./add-event-listeners.js";
function addMiscellaneousButtonsEventListeners() {
  // miscellaneous
  const decimal = document.querySelector(".decimal") as HTMLDivElement;

  if (decimal !== null) {
    decimal.addEventListener("click", () => {
      const value = String(decimal.dataset.value);
      calculator.appendChar(value);
      globalHTMLElements["display"].textContent += value;
    });
  }

  const mod = document.querySelector(".mod") as HTMLDivElement;
  if (mod !== null) {
    mod.addEventListener("click", () => {
      if (globalBooleanVariables["oneClearDone"]) {
        globalBooleanVariables["oneClearDone"] = false;
      }
      const value = String(mod.dataset.value);
      calculator.appendChar(value);
      const modContent = mod.textContent;
      if (modContent !== null) {
        globalHTMLElements["display"].textContent += modContent;
      }
    });
  }
}

export { addMiscellaneousButtonsEventListeners };
