import { calculator } from "../../index.js";
import { globals } from "../add-event-listeners.js";
function addMiscellaneousButtonsEventListeners() {
  // miscellaneous
  const decimal = document.querySelector(".decimal");
  decimal.addEventListener("click", () => {
    const value = String(decimal.dataset.value);
    calculator.appendChar(value);
    globals.getValue("display").textContent += value;
  });

  const mod = document.querySelector(".mod");
  mod.addEventListener("click", () => {
    if (globals.getValue("oneClearDone")) {
      globals.setValue("oneClearDone", false);
    }
    const value = String(mod.dataset.value);
    calculator.appendChar(value);
    globals.getValue("display").textContent += mod.textContent;
  });
}

export { addMiscellaneousButtonsEventListeners };
