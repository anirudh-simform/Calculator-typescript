import { calculator } from "../index.js";
import { globalHTMLElements } from "./add-event-listeners.js";
function addMiscellaneousButtonsEventListeners() {
  // miscellaneous
  const decimal = document.querySelector(".decimal") as HTMLDivElement;

  // Check if decimal is present in the DOM
  if (decimal !== null) {
    decimal.addEventListener("click", () => {
      const value = String(decimal.dataset.value);
      calculator.appendChar(value);
      globalHTMLElements["display"].textContent += value;
    });
  }
}

export { addMiscellaneousButtonsEventListeners };
